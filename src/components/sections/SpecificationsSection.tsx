"use client";

import React, { useState } from "react";
import { SPEC_GROUPS, COMPATIBLE_PLATFORMS } from "@/data/specs";
import { sound } from "@/utils/audio";
import { Check, Monitor, Gamepad2, Gamepad, Tv, Layers, Smartphone, FileText } from "lucide-react";

export default function SpecificationsSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const getPlatformIcon = (iconName: string) => {
    switch (iconName) {
      case "Monitor":
        return <Monitor className="w-4 h-4" />;
      case "Gamepad2":
        return <Gamepad2 className="w-4 h-4" />;
      case "Gamepad":
        return <Gamepad className="w-4 h-4" />;
      case "Tv":
        return <Tv className="w-4 h-4" />;
      case "Layers":
        return <Layers className="w-4 h-4" />;
      case "Smartphone":
        return <Smartphone className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="specifications"
      className="relative min-h-screen w-full py-28 flex flex-col justify-center border-t border-black/8 bg-[#F4F4F4]/80 backdrop-blur-xs"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151515] text-white font-mono text-[10px] font-bold tracking-widest uppercase mb-3">
              SECTION 04 // SPECIFICATIONS
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#151515] uppercase font-display">
              TECHNICAL <br />
              <span className="text-[#E52432]">SPECIFICATIONS</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-black/70 font-normal leading-relaxed">
            Every component engineered to tournament standards. Compare specifications
            across acoustics, microphone isolation, and unibody architecture.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-black/10 pb-4 mb-8 overflow-x-auto">
          {SPEC_GROUPS.map((group, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveTab(idx);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-[#E52432] text-white shadow-sm glow-red-sm"
                    : "bg-white/80 text-black/70 hover:text-black hover:bg-white border border-black/10"
                }`}
              >
                {group.category}
              </button>
            );
          })}
        </div>

        {/* Specifications Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {SPEC_GROUPS[activeTab].items.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all duration-200 ${
                item.highlight
                  ? "bg-white border-[#E52432]/30 shadow-md ring-1 ring-[#E52432]/20"
                  : "bg-white/90 border-black/8 hover:border-black/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-black/50">
                  {item.name}
                </span>
                {item.highlight && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-[#E52432] text-white">
                    Flagship
                  </span>
                )}
              </div>

              <div className="text-xl sm:text-2xl font-black text-[#151515] font-display mb-2">
                {item.value}
              </div>

              {item.description && (
                <p className="text-xs text-black/60 leading-relaxed font-sans">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Multi-Platform Compatibility Matrix */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-black/8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="font-mono text-[10px] text-[#E52432] uppercase font-bold tracking-widest">
                UNIVERSAL CROSS-PLATFORM
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-[#151515] font-display">
                Plug & Play Compatibility
              </h3>
            </div>
            <span className="font-mono text-xs text-black/50">
              Gold-plated 3.5mm analog + dual audio/mic splitter included
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {COMPATIBLE_PLATFORMS.map((plat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#F4F4F4] border border-black/5 flex flex-col items-center text-center gap-2"
              >
                <div className="p-2.5 rounded-lg bg-white text-[#E52432] shadow-xs">
                  {getPlatformIcon(plat.icon)}
                </div>
                <span className="font-mono text-xs font-bold text-[#151515]">
                  {plat.name}
                </span>
                <span className="text-[10px] text-black/50 leading-tight">
                  {plat.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
