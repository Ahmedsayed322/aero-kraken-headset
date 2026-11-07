"use client";

import React from "react";
import { ArrowDownRight, Compass, ShieldCheck, Zap } from "lucide-react";
import { sound } from "@/utils/audio";
import { ViewMode } from "@/types";

interface HeroSectionProps {
  onExploreClick: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function HeroSection({
  onExploreClick,
  viewMode,
  onViewModeChange,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center tech-grid-pattern overflow-hidden pt-24 pb-16"
    >
      {/* Decorative Red Geometric Crosshair & HUD Lines */}
      <div className="absolute top-28 left-8 md:left-14 flex items-center gap-3 pointer-events-none opacity-80">
        <span className="w-2.5 h-2.5 bg-[#E52432] rotate-45" />
        <span className="font-mono text-[10px] tracking-widest text-black/50 uppercase">
          CALIBRATED // TOURNAMENT SPEC 0.1
        </span>
      </div>

      <div className="absolute right-8 top-32 hidden lg:flex flex-col items-end gap-1 pointer-events-none font-mono text-[9px] text-black/40">
        <div>POLAR PATTERN: CARDIOID</div>
        <div>MAGNETIC FLUX: 1.45T</div>
        <div>DIAPHRAGM: 50MM BIO-CELL</div>
        <div className="w-16 h-0.5 bg-[#E52432] mt-1" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">
        {/* Left Column: Headlines & Editorial Storytelling (takes 7 columns) */}
        <div className="lg:col-span-7 flex flex-col justify-center max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#151515] text-white w-fit mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E52432] animate-pulse" />
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
              Next-Gen Spatial Acoustics
            </span>
          </div>

          {/* Large Headline */}
          <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.92] text-[#151515] uppercase font-display mb-6">
            HEAR <br />
            <span className="text-[#E52432] relative inline-block">
              BEYOND
              {/* Subtle architectural underline */}
              <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-[#E52432]/30" />
            </span> <br />
            LIMITS.
          </h1>

          {/* Supporting Text */}
          <p className="text-lg md:text-xl text-black/75 font-normal leading-relaxed max-w-xl mb-8">
            Engineered for precision. Designed for immersion. Custom-tuned 50mm
            neodymium drivers paired with cooling-gel memory foam deliver an
            uncompromising competitive edge.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onExploreClick();
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-3 px-7 py-4 rounded-full bg-[#E52432] text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-black transition-all duration-300 shadow-lg glow-red-sm group"
            >
              <span>Explore Soundstage</span>
              <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onViewModeChange(viewMode === "orbit" ? "cinematic" : "orbit");
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2.5 px-6 py-4 rounded-full bg-white text-[#151515] border border-black/15 font-mono text-xs font-bold tracking-widest uppercase hover:border-black/50 hover:bg-[#F4F4F4] transition-all duration-200"
            >
              <Compass className="w-4 h-4 text-[#E52432]" />
              <span>{viewMode === "orbit" ? "Exit 360° Mode" : "Interactive 360°"}</span>
            </button>
          </div>

          {/* Hardware Specs Micro-Bar */}
          <div className="pt-6 border-t border-black/8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-black flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#E52432]" /> 50mm
              </span>
              <span className="font-mono text-[10px] text-black/50 uppercase tracking-wider">
                Neodymium Drivers
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-black flex items-center gap-1">
                <span className="text-[#E52432] font-black">7.1</span>
              </span>
              <span className="font-mono text-[10px] text-black/50 uppercase tracking-wider">
                Surround Spatial
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-black flex items-center gap-1">
                250g
              </span>
              <span className="font-mono text-[10px] text-black/50 uppercase tracking-wider">
                Bauxite Featherweight
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-black flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#E52432]" /> Gel
              </span>
              <span className="font-mono text-[10px] text-black/50 uppercase tracking-wider">
                Cooling Memory Foam
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (takes 5 columns):
            Reserved whitespace framing the 3D Headset Canvas which renders right here! */}
        <div className="lg:col-span-5 h-[380px] sm:h-[450px] lg:h-[600px] pointer-events-none relative flex items-center justify-center">
          {/* Subtle concentric red telemetry rings rendered behind 3D model */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-black/5 flex items-center justify-center animate-pulse">
            <div className="w-56 h-56 sm:w-80 sm:h-80 rounded-full border border-dashed border-[#E52432]/20 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border border-[#E52432]/10" />
            </div>
          </div>

          {/* Quick Indicator Tag */}
          <div className="absolute bottom-4 right-2 font-mono text-[10px] tracking-wider text-black/40 uppercase bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded border border-black/10">
            3D REAL ASSET // 1:1 SCALE
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60">
        <span className="font-mono text-[9px] tracking-widest text-black uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-4 h-7 rounded-full border-2 border-black/30 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-[#E52432] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
