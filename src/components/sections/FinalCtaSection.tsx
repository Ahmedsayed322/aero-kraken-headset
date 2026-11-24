"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { sound } from "@/utils/audio";
import { ViewMode } from "@/types";
import { ArrowRight, RotateCw, CheckCircle2, Shield, Truck, Headphones } from "lucide-react";

interface FinalCtaSectionProps {
  onPreOrderClick: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function FinalCtaSection({
  onPreOrderClick,
  viewMode,
  onViewModeChange,
}: FinalCtaSectionProps) {
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const handleExplore = () => {
    sound.playClick();
    if (!hasCelebrated) {
      setHasCelebrated(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#E52432", "#FFFFFF", "#151515"],
      });
    }
    onPreOrderClick();
  };

  return (
    <section
      id="final-cta"
      className="relative min-h-screen w-full pt-32 pb-16 flex flex-col justify-between border-t border-black/8 bg-white/60 backdrop-blur-xs"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-center items-center text-center relative z-20">
        {/* Subtle Tech Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151515] text-white font-mono text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#E52432] animate-ping" />
          TOURNAMENT READY // WORLDWIDE RELEASE
        </div>

        {/* Oversized Headline */}
        <h2 className="text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.9] text-[#151515] uppercase font-display max-w-4xl mb-6">
          YOUR GAME. <br />
          <span className="text-[#E52432]">YOUR WORLD.</span>
        </h2>

        {/* Subtitle */}
        <p className="max-w-xl text-base sm:text-lg text-black/75 font-normal leading-relaxed mb-10">
          Step into uncompromised acoustic clarity. Engineered for champions,
          calibrated for victory. Experience tournament-grade spatial advantage today.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            type="button"
            onClick={handleExplore}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-3 px-8 py-5 rounded-full bg-[#E52432] text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-black transition-all duration-300 shadow-xl glow-red group"
          >
            <span>Explore The Headset</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onViewModeChange(viewMode === "orbit" ? "cinematic" : "orbit");
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2.5 px-7 py-5 rounded-full bg-white text-[#151515] border border-black/15 font-mono text-xs font-bold tracking-widest uppercase hover:border-black/50 hover:bg-[#F4F4F4] transition-all duration-200"
          >
            <RotateCw className="w-4 h-4 text-[#E52432]" />
            <span>{viewMode === "orbit" ? "Exit 360°" : "Launch 360° Inspector"}</span>
          </button>
        </div>

        {/* Value Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full pt-10 border-t border-black/8 text-left">
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-black/5 shadow-xs">
            <div className="p-2.5 rounded-lg bg-[#E52432]/10 text-[#E52432]">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-black">
                2-Year Global Warranty
              </span>
              <span className="text-[11px] text-black/50">
                Official manufacturer replacement
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-black/5 shadow-xs">
            <div className="p-2.5 rounded-lg bg-[#E52432]/10 text-[#E52432]">
              <Truck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-black">
                Expedited Delivery
              </span>
              <span className="text-[11px] text-black/50">
                Free worldwide tournament shipping
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-black/5 shadow-xs">
            <div className="p-2.5 rounded-lg bg-[#E52432]/10 text-[#E52432]">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-black">
                14-Day Sonic Trial
              </span>
              <span className="text-[11px] text-black/50">
                100% money-back satisfaction
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Minimal Brand Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-16 border-t border-black/8 mt-16 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-black/50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#E52432] rounded-xs" />
          <span className="font-bold text-black">AERO // APEX EXPERIENCE</span>
          <span>© 2026. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hover:text-black transition-colors"
          >
            Back to Top ↑
          </a>
          <span>3D Draco Engine</span>
          <span>WebGL 2.0</span>
          <span>PBR Photoreal</span>
        </div>
      </footer>
    </section>
  );
}
