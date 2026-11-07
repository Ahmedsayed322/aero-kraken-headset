import { Hotspot, Colorway } from "@/types";

export const HOTSPOTS: Hotspot[] = [
  {
    id: "cushions",
    title: "Cooling-Gel Ear Cushions",
    subtitle: "Thermal Management & Isolation",
    badge: "01 // COMFORT",
    description:
      "Infused with a specialized thermal cooling-gel layer under breathable heat-transfer fabric to eliminate heat buildup during marathon gaming sessions. Plush memory foam conforms seamlessly around eyewear.",
    position: [-5.8, -1.8, -1.6],
    cameraTarget: [-4.0, -1.8, -1.6],
    cameraPosition: [-16.0, 0.5, 8.0],
    specs: [
      { label: "Inner Diameter", value: "54 mm x 65 mm" },
      { label: "Material", value: "Cooling Gel + Memory Foam" },
      { label: "Fabric", value: "Heat-Transfer Protein Leather" },
      { label: "Passive Isolation", value: "-24 dB" },
    ],
  },
  {
    id: "headband",
    title: "Bauxite Aluminum Headband",
    subtitle: "Aerospace Structural Rigidity",
    badge: "02 // STRUCTURE",
    description:
      "Crafted from high-tensile bauxite aluminum alloy. Engineered for lightweight durability with an ultra-thick pressure-relieving memory foam crown that distributes weight evenly across the skull.",
    position: [0.0, 8.6, -1.6],
    cameraTarget: [0.0, 7.5, -1.6],
    cameraPosition: [0.0, 16.0, 14.0],
    specs: [
      { label: "Chassis Material", value: "Bauxite Aluminum Alloy" },
      { label: "Padding Depth", value: "22 mm Plush Crown" },
      { label: "Flexibility Rating", value: "180° Inversion Tested" },
      { label: "Weight Distribution", value: "50/50 Balanced Axis" },
    ],
  },
  {
    id: "drivers",
    title: "50mm Neodymium Acoustic Drivers",
    subtitle: "Acoustically Tuned Chamber",
    badge: "03 // ACOUSTICS",
    description:
      "Custom-calibrated 50mm neodymium magnet drivers deliver rich bass punch, transparent mids, and razor-sharp highs. Optimized internal acoustic cavities create an expansive 360-degree soundstage.",
    position: [4.2, -6.8, -1.6],
    cameraTarget: [3.5, -6.0, -1.6],
    cameraPosition: [14.0, -5.0, 9.0],
    specs: [
      { label: "Driver Diameter", value: "50 mm Neodymium" },
      { label: "Frequency Range", value: "12 Hz – 28,000 Hz" },
      { label: "Impedance", value: "32 Ω @ 1 kHz" },
      { label: "Sensitivity", value: "109 dB SPL / mW" },
    ],
  },
  {
    id: "microphone",
    title: "Retractable Cardioid Mic",
    subtitle: "Acoustic Noise Rejection",
    badge: "04 // VOICE",
    description:
      "Unidirectional cardioid pickup pattern captures your voice with studio-grade vocal clarity while rejecting background keyboard chatter, fan noise, and ambient reverberations. Fully retractable into the earcup.",
    position: [5.1, -4.6, 9.8],
    cameraTarget: [4.8, -5.0, 8.0],
    cameraPosition: [9.0, -2.0, 17.0],
    specs: [
      { label: "Pickup Pattern", value: "Unidirectional Cardioid" },
      { label: "Frequency Response", value: "100 Hz – 10,000 Hz" },
      { label: "Signal-to-Noise", value: "> 60 dB" },
      { label: "Deployment", value: "Stealth Retractable" },
    ],
  },
  {
    id: "controls",
    title: "Tactile Precision Controls",
    subtitle: "Immediate In-Game Adjustment",
    badge: "05 // INTERFACE",
    description:
      "Intuitive analog rotary volume wheel with textured knurling for blind adjustment in high-pressure matches, paired with a solid mechanical microphone mute switch and reinforced Kevlar braided cabling.",
    position: [-3.8, -7.2, -0.5],
    cameraTarget: [-3.2, -7.0, -0.5],
    cameraPosition: [-11.0, -10.0, 11.0],
    specs: [
      { label: "Volume Control", value: "Analog Knurled Potentiometer" },
      { label: "Mute Switch", value: "Direct Hardware Cut-Off" },
      { label: "Cable Type", value: "1.3m Kevlar Braided Core" },
      { label: "Interface", value: "Gold-Plated 3.5mm Analog" },
    ],
  },
];

export const COLORWAYS: Colorway[] = [
  {
    id: "apex-red",
    name: "Apex Crimson",
    hex: "#E52432",
    accentHex: "#FF4555",
    description: "Iconic championship red accent with stealth matte black polycarbonate chassis.",
  },
  {
    id: "stealth-black",
    name: "Stealth Phantom",
    hex: "#222222",
    accentHex: "#555555",
    description: "Triple-black blackout finish with subtle smoke chrome reflections.",
  },
  {
    id: "cyber-green",
    name: "Razer Chroma Green",
    hex: "#00FF41",
    accentHex: "#26FF63",
    description: "Vibrant high-contrast esports electric green illumination.",
  },
  {
    id: "arctic-frost",
    name: "Glacier White",
    hex: "#00E5FF",
    accentHex: "#66EFFF",
    description: "Clean cryogenic cyan illumination inspired by tournament ice arenas.",
  },
];
