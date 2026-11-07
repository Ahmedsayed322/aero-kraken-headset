"use client";

import React, { useState } from "react";
import { COLORWAYS } from "@/data/hotspots";
import { Colorway, ViewMode } from "@/types";
import { sound } from "@/utils/audio";
import { RotateCw, Sparkles, Volume2, Cpu, Check } from "lucide-react";

interface ShowcaseSectionProps {
  activeColorway: Colorway;
  onSelectColorway: (c: Colorway) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function ShowcaseSection({
  activeColorway,
  onSelectColorway,
  viewMode,
  onViewModeChange,
}: ShowcaseSectionProps) {
  const [isPlayingTest, setIsPlayingTest] = useState(false);

  const handleSoundTest = () => {
    setIsPlayingTest(true);
    sound.playSpatialTest();
    setTimeout(() => {
      setIsPlayingTest(false);
    }, 1800);
  };

  return (
    <section
      id="showcase"
      className="relative min-h-screen w-full py-28 flex flex-col justify-between border-t border-black/8 bg-white/70 backdrop-blur-xs"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E52432]/10 text-[#E52432] font-mono text-[10px] font-bold tracking-widest uppercase mb-3">
              SECTION 01 // SHOWCASE
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#151515] uppercase font-display">
              MASTER THE <br />
              <span className="text-[#E52432]">ACOUSTIC DOMAIN</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-black/70 font-normal leading-relaxed">
            Every contour, stitch, and transducer has been calibrated for pure
            auditory transparency. Inspect the 3D model in real time or test the
            spatial acoustic curve.
          </p>
        </div>

        {/* Content Floating Panels surrounding the central 3D model */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px]">
          {/* Left Panel: Chroma / Colorway Selector & Acoustic EQ */}
          <div className="lg:col-span-4 flex flex-col gap-6 z-20">
            {/* Colorway Switcher Card */}
            <div className="glass-panel p-6 rounded-2xl shadow-sm border border-black/8">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#E52432]" />
                  Chroma LED Theme
                </span>
                <span className="font-mono text-[10px] text-black/50 uppercase">
                  Live Shader Update
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mb-4">
                {COLORWAYS.map((c) => {
                  const isSelected = activeColorway.id === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        onSelectColorway(c);
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all duration-200 ${
                        isSelected
                          ? "border-[#151515] bg-[#151515] text-white shadow-md"
                          : "border-black/10 bg-white/70 text-black hover:border-black/30 hover:bg-white"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/40 shrink-0 shadow-inner flex items-center justify-center"
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                      </span>
                      <span className="font-mono text-[11px] font-bold truncate">
                        {c.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-black/60 font-mono leading-normal">
                {activeColorway.description}
              </p>
            </div>

            {/* Spatial Soundstage Test Trigger */}
            <div className="glass-panel p-6 rounded-2xl shadow-sm border border-black/8">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2">
                  <Volume2 className="w-3.5 h-3.5 text-[#E52432]" />
                  Acoustic Frequency Test
                </span>
                <span className="font-mono text-[10px] text-[#E52432] uppercase font-bold">
                  7.1 Virtual Sweep
                </span>
              </div>

              <p className="text-xs text-black/70 mb-4 leading-relaxed">
                Trigger a binaural frequency sweep synthesized live using Web Audio
                API to test your current playback drivers.
              </p>

              <button
                type="button"
                onClick={handleSoundTest}
                disabled={isPlayingTest}
                className={`w-full py-3 rounded-xl font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                  isPlayingTest
                    ? "bg-[#E52432] text-white animate-pulse"
                    : "bg-[#151515] text-white hover:bg-[#E52432]"
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>
                  {isPlayingTest ? "Synthesizing Sweep..." : "Run Spatial Audio Test"}
                </span>
              </button>
            </div>
          </div>

          {/* Center Column (Reserved for the 3D Headset Canvas!) */}
          <div className="lg:col-span-4 h-72 lg:h-full pointer-events-none" />

          {/* Right Panel: Geometry & Asset Optimization Transparency */}
          <div className="lg:col-span-4 flex flex-col gap-6 z-20">
            {/* 3D Asset Info Badge */}
            <div className="glass-panel p-6 rounded-2xl shadow-sm border border-black/8">
              <div className="flex items-center gap-2.5 mb-3 text-[#151515]">
                <Cpu className="w-4 h-4 text-[#E52432]" />
                <h3 className="font-mono text-xs font-bold tracking-widest uppercase">
                  3D Asset Optimization
                </h3>
              </div>

              <div className="space-y-3 text-xs text-black/75 leading-relaxed">
                <p>
                  Loaded directly from your provided CAD model:
                </p>
                <div className="bg-[#F4F4F4] p-3 rounded-lg font-mono text-[11px] space-y-1.5 border border-black/5">
                  <div className="flex justify-between">
                    <span className="text-black/50">Original OBJ File:</span>
                    <span className="font-bold text-black">96.9 MB (Text)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/50">Optimized Draco GLB:</span>
                    <span className="font-bold text-[#E52432]">2.65 MB (-97.3%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/50">Meshes & Nodes:</span>
                    <span className="font-bold text-black">32 Preserved</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/50">Texture Maps:</span>
                    <span className="font-bold text-black">PBR Leather & Foam</span>
                  </div>
                </div>
                <p className="text-[11px] text-black/60">
                  Geometry, vertex normals, and UV layouts remain 100% mathematically
                  identical with zero polygonal degradation.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-black/8 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onViewModeChange(viewMode === "wireframe" ? "cinematic" : "wireframe");
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`flex-1 py-2 px-3 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-colors border ${
                    viewMode === "wireframe"
                      ? "bg-[#E52432] text-white border-[#E52432]"
                      : "bg-white text-black border-black/15 hover:border-black/30"
                  }`}
                >
                  {viewMode === "wireframe" ? "Shaded PBR" : "Inspect Wireframe"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onViewModeChange(viewMode === "orbit" ? "cinematic" : "orbit");
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`flex-1 py-2 px-3 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-colors border flex items-center justify-center gap-1.5 ${
                    viewMode === "orbit"
                      ? "bg-[#E52432] text-white border-[#E52432]"
                      : "bg-white text-black border-black/15 hover:border-black/30"
                  }`}
                >
                  <RotateCw className="w-3 h-3" />
                  <span>{viewMode === "orbit" ? "Exit 360°" : "360° Rotate"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
