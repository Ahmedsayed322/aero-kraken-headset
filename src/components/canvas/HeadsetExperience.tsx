"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { HEADSET_COMPONENTS, HeadsetComponent, ColorEdition } from "@/data/components";
import { cyberAudio, sound } from "@/utils/audio";

interface HeadsetExperienceProps {
  onPinClick: (sectionId: string) => void;
  activeColor: ColorEdition;
  wireframe: boolean;
  autoRotate: boolean;
  isRtl?: boolean;
  onLoaded: () => void;
}

interface ProjectedPin {
  component: HeadsetComponent;
  x: number;
  y: number;
  visible: boolean;
  isFront: boolean;
  isActive: boolean;
}

// Stage keyframes matching the exact page sections with mobile-first vertical separation
interface StageKeyframe {
  id: string;
  componentId: string | null;
  camDist: number;
  posX: (isMob: boolean, isTablet: boolean) => number;
  posY: (isMob: boolean) => number;
  posZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
}

const SECTION_KEYFRAMES: StageKeyframe[] = [
  {
    // Stage 0: Hero
    id: "hero",
    componentId: null,
    camDist: 44,
    posX: (mob, tab) => (mob ? 0 : tab ? 4.2 : 6.5),
    posY: (mob) => (mob ? 3.8 : 0),
    posZ: 0,
    rotX: 0.12,
    rotY: -0.65,
    rotZ: -0.05,
  },
  {
    // Stage 1: 50mm Acoustic Drivers
    id: "section-drivers",
    componentId: "drivers",
    camDist: 38,
    posX: (mob, tab) => (mob ? 0 : tab ? -4.2 : -6.2),
    posY: (mob) => (mob ? 3.6 : -0.4),
    posZ: 0,
    rotX: 0.08,
    rotY: -1.45, // Right earcup faces camera
    rotZ: 0,
  },
  {
    // Stage 2: Cooling-Gel Memory Foam Cushions
    id: "section-cushions",
    componentId: "cushions",
    camDist: 34,
    posX: (mob, tab) => (mob ? 0 : tab ? 3.8 : 5.5),
    posY: (mob) => (mob ? 3.6 : -0.5),
    posZ: 0,
    rotX: -0.15,
    rotY: 1.25, // Inner ear cushion faces camera
    rotZ: 0.05,
  },
  {
    // Stage 3: Bauxite Aluminum Headband
    id: "section-headband",
    componentId: "headband",
    camDist: 36,
    posX: (mob, tab) => (mob ? 0 : tab ? -3.8 : -5.5),
    posY: (mob) => (mob ? 0.8 : -4.8), // On mobile, keep arch visible in top screen
    posZ: 0,
    rotX: 0.45, // Tilted forward to showcase unibody arch
    rotY: -0.2,
    rotZ: 0,
  },
  {
    // Stage 4: Retractable Cardioid Mic
    id: "section-mic",
    componentId: "mic",
    camDist: 34,
    posX: (mob, tab) => (mob ? 0 : tab ? 3.6 : 5.2),
    posY: (mob) => (mob ? 3.6 : -0.2),
    posZ: 0,
    rotX: 0.05,
    rotY: -0.42, // Mic extends forward into camera view
    rotZ: 0,
  },
  {
    // Stage 5: Tactile Hardware Controls
    id: "section-controls",
    componentId: "controls",
    camDist: 35,
    posX: (mob, tab) => (mob ? 0 : tab ? -3.8 : -5.5),
    posY: (mob) => (mob ? 3.6 : -0.6),
    posZ: 0,
    rotX: 0.2,
    rotY: -2.6, // Rear of left earcup faces camera
    rotZ: 0,
  },
  {
    // Stage 6: Tour Specification Finale
    id: "section-finale",
    componentId: null,
    camDist: 40,
    posX: () => 0,
    posY: (mob) => (mob ? 3.8 : 0),
    posZ: 0,
    rotX: 0.1,
    rotY: 0.15,
    rotZ: 0,
  },
];

export default function HeadsetExperience({
  onPinClick,
  activeColor,
  wireframe,
  autoRotate,
  isRtl = false,
  onLoaded,
}: HeadsetExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js Core Refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const accentLightRef = useRef<THREE.PointLight | null>(null);
  const rimLight2Ref = useRef<THREE.DirectionalLight | null>(null);
  const floorRingRef = useRef<THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial> | null>(null);
  const shadowPlaneRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null>(null);
  const bodyMeshesRef = useRef<THREE.Mesh[]>([]);
  const logoMeshesRef = useRef<THREE.Mesh[]>([]);

  // User Drag State
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragRotation = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const userInteractedTimeout = useRef<NodeJS.Timeout | null>(null);
  const isUserOrbiting = useRef(false);

  // Mouse Parallax & Continuous Scroll Stage
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const stageProgress = useRef({ current: 0, target: 0 });
  const activeComponentRef = useRef<string | null>(null);
  const animFrame = useRef<number | null>(null);

  // Projected 2D screen pins (Always tracked and displayed)
  const [projectedPins, setProjectedPins] = useState<ProjectedPin[]>([]);

  // DYNAMIC LOGO & CHROMA LIGHTING COLOR UPDATE
  useEffect(() => {
    const emissiveCol = new THREE.Color(activeColor.emissiveHex);

    // 1. Update all ear-cup logo meshes & illumination rings
    logoMeshesRef.current.forEach((mesh) => {
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.emissive.copy(emissiveCol);
        mesh.material.emissiveIntensity = 4.8;
        mesh.material.needsUpdate = true;
      }
    });

    // 2. Update studio accent light
    if (accentLightRef.current) {
      accentLightRef.current.color.copy(emissiveCol);
    }
    // 3. Update studio rim light
    if (rimLight2Ref.current) {
      rimLight2Ref.current.color.copy(emissiveCol);
    }
    // 4. Update floor halo ring
    if (floorRingRef.current) {
      floorRingRef.current.material.color.copy(emissiveCol);
    }
  }, [activeColor]);

  // Wireframe Toggle
  useEffect(() => {
    if (!modelGroupRef.current) return;
    modelGroupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => (m.wireframe = wireframe));
        } else {
          child.material.wireframe = wireframe;
        }
      }
    });
  }, [wireframe]);

  // Pointer Drag Handlers (Horizontal drag spins, vertical drag permits scrolling)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    isUserOrbiting.current = true;
    if (userInteractedTimeout.current) clearTimeout(userInteractedTimeout.current);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const { innerWidth, innerHeight } = window;
    mouse.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
    mouse.current.targetY = (e.clientY / innerHeight - 0.5) * 2;

    if (!isDragging.current) return;

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    dragStart.current = { x: e.clientX, y: e.clientY };

    dragRotation.current.targetY += dx * 0.008;
    dragRotation.current.targetX += dy * 0.008;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    if (userInteractedTimeout.current) clearTimeout(userInteractedTimeout.current);
    userInteractedTimeout.current = setTimeout(() => {
      isUserOrbiting.current = false;
      dragRotation.current.targetX = 0;
      dragRotation.current.targetY = 0;
    }, 2800);
  };

  // Three.js Scene Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Responsive Camera Frustum
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const baseCamDist = isMobile ? 52 : isTablet ? 48 : 44;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 500);
    camera.position.set(0, 0, baseCamDist);
    cameraRef.current = camera;

    // WebGLRenderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      precision: "highp",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    rendererRef.current = renderer;

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(12, 28, 18);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xedf4ff, 1.8);
    fillLight.position.set(-18, 12, 16);
    scene.add(fillLight);

    const rimLight1 = new THREE.DirectionalLight(0xffffff, 3.2);
    rimLight1.position.set(0, 20, -25);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(new THREE.Color(activeColor.emissiveHex), 2.5);
    rimLight2.position.set(-14, -8, -18);
    scene.add(rimLight2);
    rimLight2Ref.current = rimLight2;

    const accentLight = new THREE.PointLight(new THREE.Color(activeColor.emissiveHex), 4.2, 35);
    accentLight.position.set(0, -2, 8);
    scene.add(accentLight);
    accentLightRef.current = accentLight;

    // Soft Pre-baked Contact Shadow
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d")!;
    const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 60);
    grad.addColorStop(0, "rgba(21, 21, 21, 0.22)");
    grad.addColorStop(0.4, "rgba(21, 21, 21, 0.12)");
    grad.addColorStop(1, "rgba(21, 21, 21, 0)");
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(26, 26),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -10.45;
    scene.add(shadowPlane);
    shadowPlaneRef.current = shadowPlane;

    // Floor Ring Halo
    const ringGeo = new THREE.RingGeometry(7.0, 7.12, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(activeColor.emissiveHex),
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = -10.44;
    scene.add(ringMesh);
    floorRingRef.current = ringMesh;

    // Textures
    const textureLoader = new THREE.TextureLoader();
    const leatherDiff = textureLoader.load("/textures/Coarse_leather_DIFF.jpg");
    leatherDiff.wrapS = THREE.RepeatWrapping;
    leatherDiff.wrapT = THREE.RepeatWrapping;
    leatherDiff.repeat.set(3, 3);

    const leatherNrm = textureLoader.load("/textures/coarse_leather_NRM.jpg");
    leatherNrm.wrapS = THREE.RepeatWrapping;
    leatherNrm.wrapT = THREE.RepeatWrapping;
    leatherNrm.repeat.set(3, 3);

    const foamTex = textureLoader.load("/textures/Foam.jpg");
    foamTex.wrapS = THREE.RepeatWrapping;
    foamTex.wrapT = THREE.RepeatWrapping;
    foamTex.repeat.set(2, 2);

    // Model Group Root
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Load Model using GLTF + Draco
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(
      "/models/headset.glb",
      (gltf) => {
        const root = gltf.scene;
        root.position.set(0, -12.2, -4.53);

        bodyMeshesRef.current = [];
        logoMeshesRef.current = [];

        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const name = child.name;
            const nameLower = name.toLowerCase();
            const matName = child.material?.name?.toLowerCase() || "";

            // Hide stand meshes (base, stand arm, base logo)
            child.geometry.computeBoundingBox();
            const bb = child.geometry.boundingBox;
            const isStandMesh = (bb && bb.min.y < 4.0) || nameLower.includes("stand");

            if (isStandMesh) {
              child.visible = false;
              return;
            }

            // 1. EAR-CUP LOGO & CHROMA ILLUMINATION (Checked first so nothing steals it)
            const isLogoPart =
              name === "Logo" ||
              matName.includes("mat.6") ||
              name === "Rounding_1" ||
              name === "Rounding_2" ||
              name === "Cap_1_2" ||
              name === "Cap_2_2";

            if (isLogoPart) {
              const emissiveCol = new THREE.Color(activeColor.emissiveHex);
              child.material = new THREE.MeshStandardMaterial({
                color: 0x111111,
                emissive: emissiveCol,
                emissiveIntensity: 4.8,
                metalness: 0.1,
                roughness: 0.2,
              });
              logoMeshesRef.current.push(child);
            }
            // 2. Headband Leather (Textured)
            else if (nameLower.includes("top_band") || matName.includes("coarse_leather")) {
              child.material = new THREE.MeshStandardMaterial({
                map: leatherDiff,
                normalMap: leatherNrm,
                normalScale: new THREE.Vector2(1.0, 1.0),
                color: 0x1c1c1c,
                metalness: 0.05,
                roughness: 0.58,
              });
            }
            // 3. Ear Cushion & Inner Band Foam (Textured)
            else if (
              nameLower.includes("cushon") ||
              nameLower.includes("band_cushon") ||
              matName.includes("carbon_weave")
            ) {
              child.material = new THREE.MeshStandardMaterial({
                map: foamTex,
                color: 0x222222,
                roughness: 0.88,
                metalness: 0.04,
              });
            }
            // 4. Chrome Screws & Metal Pivot Details
            else if (
              matName.includes("chrome") ||
              name === "Cap_1_1" ||
              name === "Cap_2_1" ||
              name === "Central_part"
            ) {
              child.material = new THREE.MeshStandardMaterial({
                color: 0xe0e0e0,
                metalness: 0.98,
                roughness: 0.12,
              });
            }
            // 5. Acoustic Honeycomb Grille
            else if (nameLower.includes("mesh")) {
              child.material = new THREE.MeshStandardMaterial({
                color: 0x181818,
                metalness: 0.85,
                roughness: 0.28,
              });
            }
            // 6. Headset Body Chassis (Tournament matte black finish)
            else {
              child.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(0x151515),
                metalness: 0.22,
                roughness: 0.38,
              });
              bodyMeshesRef.current.push(child);
            }
          }
        });

        modelGroup.add(root);
        onLoaded();
      },
      undefined,
      (error) => {
        console.error("Fallback to uncompressed GLB:", error);
        gltfLoader.load("/models/headset_uncompressed.glb", (gltf) => {
          const root = gltf.scene;
          root.position.set(0, -12.2, -4.53);
          modelGroup.add(root);
          onLoaded();
        });
      }
    );

    // Calculate Dynamic Stage Progress from Section Offsets
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = SECTION_KEYFRAMES.map((kf) => document.getElementById(kf.id));

      let targetProgress = 0;
      for (let i = 0; i < elements.length - 1; i++) {
        const curEl = elements[i];
        const nextEl = elements[i + 1];

        if (!curEl || !nextEl) continue;

        const curTop = curEl.offsetTop;
        const nextTop = nextEl.offsetTop;

        if (scrollY >= curTop && scrollY <= nextTop) {
          const fraction = (scrollY - curTop) / Math.max(1, nextTop - curTop);
          targetProgress = i + Math.max(0, Math.min(1, fraction));
          break;
        } else if (scrollY > nextTop && i === elements.length - 2) {
          targetProgress = elements.length - 1;
        }
      }

      stageProgress.current.target = targetProgress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Resize Handler with responsive frustum
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mob = w < 640;
      const tab = w >= 640 && w < 1024;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      camera.position.z = mob ? 52 : tab ? 48 : 44;
      renderer.setSize(w, h);
      handleScroll();
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let time = 0;
    const tempVec = new THREE.Vector3();
    const pinWorld = new THREE.Vector3();
    const viewDir = new THREE.Vector3();
    const pinNorm = new THREE.Vector3();

    const animate = () => {
      animFrame.current = requestAnimationFrame(animate);
      time += 0.016;

      // 1. Fast & Smooth Stage Progress Lerp
      stageProgress.current.current +=
        (stageProgress.current.target - stageProgress.current.current) * 0.12;
      const sp = Math.max(0, Math.min(SECTION_KEYFRAMES.length - 1, stageProgress.current.current));

      // 2. Audio Beat Energy
      const bassEnergy = cyberAudio.getAudioFrequencyData();
      if (accentLightRef.current && bassEnergy > 0) {
        accentLightRef.current.intensity = 4.2 + bassEnergy * 4.5;
      }

      // 3. Mouse Parallax & Drag Inertia
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      dragRotation.current.x += (dragRotation.current.targetX - dragRotation.current.x) * 0.1;
      dragRotation.current.y += (dragRotation.current.targetY - dragRotation.current.y) * 0.1;

      // 4. Interpolate Stage Keyframes mathematically
      const w = window.innerWidth;
      const mob = w < 640;
      const tab = w >= 640 && w < 1024;
      const baseDistOffset = mob ? 8 : tab ? 4 : 0;

      const idx = Math.floor(sp);
      const nextIdx = Math.min(SECTION_KEYFRAMES.length - 1, idx + 1);
      const frac = sp - idx;

      const kf1 = SECTION_KEYFRAMES[idx];
      const kf2 = SECTION_KEYFRAMES[nextIdx];

      // Determine active component ID for highlighting pins
      const roundedIdx = Math.round(sp);
      activeComponentRef.current = SECTION_KEYFRAMES[roundedIdx]?.componentId || null;

      // In RTL layout on desktop/tablet, mirror the horizontal X offset!
      const rtlMultiplier = isRtl ? -1 : 1;
      const rawPosX1 = kf1.posX(mob, tab);
      const rawPosX2 = kf2.posX(mob, tab);

      let targetCamZ = THREE.MathUtils.lerp(kf1.camDist, kf2.camDist, frac) + baseDistOffset;
      let targetPosX = THREE.MathUtils.lerp(rawPosX1, rawPosX2, frac) * (mob ? 1 : rtlMultiplier);
      let targetPosY = THREE.MathUtils.lerp(kf1.posY(mob), kf2.posY(mob), frac);
      let targetPosZ = THREE.MathUtils.lerp(kf1.posZ, kf2.posZ, frac);
      let targetRotX = THREE.MathUtils.lerp(kf1.rotX, kf2.rotX, frac);
      let targetRotY = THREE.MathUtils.lerp(kf1.rotY, kf2.rotY, frac);
      let targetRotZ = THREE.MathUtils.lerp(kf1.rotZ, kf2.rotZ, frac);

      if (autoRotate) {
        // 360 Turntable Mode
        targetPosX = 0;
        targetPosY = mob ? 3.8 : 0;
        targetRotX = 0.1;
        targetRotY = time * 0.6;
        targetRotZ = 0;
        targetCamZ = (mob ? 52 : tab ? 48 : 44) - 2;
      }

      // Smooth Camera Lerp
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.08);

      // Model position with subtle idle float + bass kick pulse
      const floatY = Math.sin(time * 1.5) * 0.22;
      const bassScale = 1.0 + bassEnergy * 0.035;

      modelGroup.scale.set(bassScale, bassScale, bassScale);
      modelGroup.position.x = THREE.MathUtils.lerp(
        modelGroup.position.x,
        targetPosX + mouse.current.x * 0.35,
        0.08
      );
      modelGroup.position.y = THREE.MathUtils.lerp(
        modelGroup.position.y,
        targetPosY + floatY - mouse.current.y * 0.2,
        0.08
      );
      modelGroup.position.z = THREE.MathUtils.lerp(modelGroup.position.z, targetPosZ, 0.08);

      // Model rotation
      const finalRotX = targetRotX + dragRotation.current.x - mouse.current.y * 0.08;
      const finalRotY = targetRotY + dragRotation.current.y + mouse.current.x * 0.14;
      const finalRotZ = targetRotZ;

      modelGroup.rotation.x = THREE.MathUtils.lerp(modelGroup.rotation.x, finalRotX, 0.08);
      modelGroup.rotation.y = THREE.MathUtils.lerp(modelGroup.rotation.y, finalRotY, 0.08);
      modelGroup.rotation.z = THREE.MathUtils.lerp(modelGroup.rotation.z, finalRotZ, 0.08);

      if (shadowPlaneRef.current) {
        shadowPlaneRef.current.position.x = modelGroup.position.x * 0.8;
        shadowPlaneRef.current.position.y = modelGroup.position.y - 10.45;
      }
      if (floorRingRef.current) {
        floorRingRef.current.position.x = modelGroup.position.x * 0.8;
        floorRingRef.current.position.y = modelGroup.position.y - 10.44;
      }

      // 5. Project 3D Hotspot Pins to Screen Space
      if (modelGroup && camera) {
        const pins: ProjectedPin[] = [];
        const winW = window.innerWidth;
        const winH = window.innerHeight;

        HEADSET_COMPONENTS.forEach((comp) => {
          tempVec.set(...comp.position);
          tempVec.applyMatrix4(modelGroup.matrixWorld);

          // Calculate Facing Direction
          pinWorld.copy(tempVec);
          viewDir.subVectors(pinWorld, camera.position).normalize();
          pinNorm
            .set(...comp.position)
            .normalize()
            .applyQuaternion(modelGroup.quaternion);
          const dot = pinNorm.dot(viewDir);
          const isFront = dot < 0.35;

          // Project to Screen NDC
          tempVec.project(camera);

          const isBehindCamera = tempVec.z > 1.0;
          const x = (tempVec.x * 0.5 + 0.5) * winW;
          const y = (-(tempVec.y * 0.5) + 0.5) * winH;

          pins.push({
            component: comp,
            x,
            y,
            visible: !isBehindCamera && x >= 15 && x <= winW - 15 && y >= 30 && y <= winH - 30,
            isFront,
            isActive: activeComponentRef.current === comp.id,
          });
        });

        setProjectedPins(pins);
      } else {
        setProjectedPins([]);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      renderer.dispose();
      dracoLoader.dispose();
    };
  }, [onLoaded, autoRotate, activeColor, isRtl]);

  const isMobileScreen = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="fixed inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing touch-pan-y select-none font-sans"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* 3D Hotspot Pins */}
      {projectedPins.map(({ component, x, y, visible, isFront, isActive }) => {
        if (!visible) return null;

        return (
          <div
            key={component.id}
            style={{
              transform: `translate3d(${x}px, ${y}px, 0)`,
              opacity: isActive ? 1 : isFront ? 0.95 : 0.45,
              filter: isFront ? "none" : "grayscale(0.5)",
            }}
            className="absolute -top-4 -left-4 pointer-events-auto transition-opacity duration-200 will-change-transform z-30"
          >
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onPinClick(component.sectionId);
              }}
              onMouseEnter={() => sound.playHover()}
              className="group relative flex items-center justify-center p-2 focus:outline-none"
              aria-label={`Jump to ${component.name}`}
            >
              {/* Outer Radar Ring */}
              <span
                className={`absolute rounded-full border transition-all duration-300 ${
                  isActive
                    ? "w-9 h-9 sm:w-10 sm:h-10 scale-110 opacity-100 ring-2 ring-white/60 animate-pulse"
                    : "w-7 h-7 sm:w-8 sm:h-8 opacity-60 group-hover:scale-125 group-hover:opacity-100"
                }`}
                style={{
                  borderColor: activeColor.dotHex,
                  backgroundColor: isActive ? `${activeColor.dotHex}18` : "transparent",
                }}
              />

              {/* Pin Core */}
              <span
                className={`relative flex items-center justify-center rounded-full font-bold text-white shadow-lg transition-transform ${
                  isActive ? "w-6 h-6 sm:w-7 sm:h-7 text-[11px] sm:text-xs scale-110 ring-2 ring-neutral-900" : "w-5 h-5 sm:w-6 sm:h-6 text-[9px] sm:text-[10px] group-hover:scale-115"
                }`}
                style={{
                  backgroundColor: activeColor.dotHex,
                }}
              >
                {component.number}
              </span>

              {/* Callout Tag (Adapts gracefully on mobile vs desktop) */}
              <div
                className={`absolute ${
                  isMobileScreen
                    ? "bottom-8 left-1/2 -translate-x-1/2 text-center"
                    : isRtl
                    ? "right-9 text-right"
                    : "left-9 text-left"
                } flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 text-white text-[11px] tracking-tight whitespace-nowrap shadow-xl transition-all duration-200 pointer-events-none ${
                  isActive
                    ? "opacity-100 translate-x-0 ring-1 ring-white/20"
                    : "opacity-0 group-hover:opacity-100"
                }`}
                style={{
                  borderInlineStart: isMobileScreen ? "none" : `3px solid ${activeColor.dotHex}`,
                  borderBottom: isMobileScreen ? `2px solid ${activeColor.dotHex}` : "none",
                }}
              >
                <div className="flex flex-col">
                  <span className="font-semibold leading-tight">
                    {isRtl ? component.nameAr : component.name}
                  </span>
                  <span className="text-[9px] text-neutral-400 font-normal">
                    {isActive ? (isRtl ? "العرض الحالي" : "Active View") : isRtl ? "انقر للعرض" : "Click to View"}
                  </span>
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
