"use client";

import React from "react";
import { HOTSPOTS } from "@/data/hotspots";
import { Hotspot } from "@/types";
import { sound } from "@/utils/audio";
import { ChevronRight, X, Info, Target, RotateCcw } from "lucide-react";

interface HotspotsSectionProps {
  activeHotspot: Hotspot | null;
  onSelectHotspot: (hotspot: Hotspot | null) => void;
}

export default function HotspotsSection({
  activeHotspot,
  onSelectHotspot,
}: HotspotsSectionProps) {
  return (
    <section
      id="hotspots"
      className="relative min-h-screen w-full py-28 flex flex-col justify-between border-t border-black/8 bg-white/75 backdrop-blur-xs"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E52432]/10 text-[#E52432] font-mono text-[10px] font-bold tracking-widest uppercase mb-3">
              SECTION 03 // EXPLORATION
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#151515] uppercase font-display">
              EXPLORE EVERY <br />
              <span className="text-[#E52432]">ENGINEERING DETAIL</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-black/50 uppercase hidden sm:inline">
              Click pins or select below to zoom
            </span>
            {activeHotspot && (
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onSelectHotspot(null);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#151515] text-white font-mono text-[11px] uppercase tracking-wider hover:bg-[#E52432] transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset View</span>
              </button>
            )}
          </div>
        </div>

        {/* Hotspots Navigation Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10 z-20 relative">
          {HOTSPOTS.map((hs) => {
            const isSelected = activeHotspot?.id === hs.id;
            return (
              <button
                key={hs.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  onSelectHotspot(isSelected ? null : hs);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-2 ${
                  isSelected
                    ? "bg-[#E52432] text-white border-[#E52432] shadow-md glow-red-sm"
                    : "bg-white/80 text-black border-black/10 hover:border-black/30 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`font-mono text-[9px] font-bold uppercase tracking-wider ${
                      isSelected ? "text-white/80" : "text-black/40"
                    }`}
                  >
                    {hs.badge}
                  </span>
                  <Target
                    className={`w-3.5 h-3.5 ${
                      isSelected ? "text-white animate-pulse" : "text-black/30"
                    }`}
                  />
                </div>

                <span className="font-mono text-xs font-bold truncate">
                  {hs.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card & 3D Center Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">
          {/* Active Hotspot Engineering Card (Pops up when a hotspot is selected) */}
          <div className="lg:col-span-5 z-20">
            {activeHotspot ? (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-xl border-l-4 border-l-[#E52432] border-black/10 animate-in fade-in slide-in-from-left duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-[#E52432] uppercase font-bold tracking-widest">
                    {activeHotspot.badge}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onSelectHotspot(null);
                    }}
                    className="p-1 rounded-full hover:bg-black/10 text-black/50 hover:text-black transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-2xl font-black text-[#151515] uppercase font-display mb-1">
                  {activeHotspot.title}
                </h3>
                <p className="font-mono text-xs text-[#E52432] font-semibold mb-4">
                  {activeHotspot.subtitle}
                </p>

                <p className="text-sm text-black/75 leading-relaxed mb-6">
                  {activeHotspot.description}
                </p>

                {/* Sub-specs list */}
                <div className="bg-[#F4F4F4] rounded-xl p-4 space-y-2 border border-black/5 mb-4">
                  {activeHotspot.specs.map((sp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs font-mono"
                    >
                      <span className="text-black/50">{sp.label}</span>
                      <span className="font-bold text-black">{sp.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onSelectHotspot(null);
                    }}
                    className="text-xs font-mono font-bold text-black hover:text-[#E52432] flex items-center gap-1 transition-colors"
                  >
                    <span>Back to full headset</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-black/8">
                <div className="flex items-center gap-2.5 text-[#E52432] mb-3">
                  <Info className="w-4 h-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Interactive Macro Telemetry
                  </span>
                </div>
                <p className="text-sm text-black/70 leading-relaxed mb-4">
                  Select any component pin hovering over the 3D model or choose from the top
                  strip to smoothly zoom the cinematic lens onto individual components.
                </p>
                <div className="text-[11px] font-mono text-black/50 space-y-1">
                  <div>// 5 PINPOINT TELEMETRY NODES ACTIVE</div>
                  <div>// DRIVERS · CUSHIONS · HEADBAND · MIC · CONTROLS</div>
                </div>
              </div>
            )}
          </div>

          {/* Reserved Space for 3D Camera Focus in the Center */}
          <div className="lg:col-span-7 h-72 lg:h-full pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
