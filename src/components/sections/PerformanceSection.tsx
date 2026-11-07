"use client";

import React, { useState } from "react";
import { sound } from "@/utils/audio";
import { Activity, Shield, Feather, Mic2, ArrowRight } from "lucide-react";

interface PerformancePillar {
  id: string;
  number: string;
  title: string;
  headline: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  metrics: { label: string; value: string; unit?: string }[];
  visualCallout: string;
}

const PILLARS: PerformancePillar[] = [
  {
    id: "audio",
    number: "01",
    title: "Acoustic Purity",
    headline: "50MM CUSTOM-TUNED NEODYMIUM DRIVERS",
    subtitle: "Tournament-grade directional imaging & sub-bass depth",
    description:
      "Engineered with high-flux neodymium magnets and bio-cellulose diaphragms. Custom-calibrated internal chambers deliver lightning-fast transient response, allowing you to pinpoint enemy footsteps, reloads, and directional cues with millisecond accuracy.",
    icon: Activity,
    metrics: [
      { label: "Frequency Range", value: "12 – 28,000", unit: "Hz" },
      { label: "Harmonic Distortion", value: "< 0.1", unit: "% THD" },
      { label: "Sound Pressure", value: "109", unit: "dB SPL" },
    ],
    visualCallout: "DUAL ACOUSTIC CHAMBERS // ZERO RESONANCE",
  },
  {
    id: "comfort",
    number: "02",
    title: "Thermal Comfort",
    headline: "COOLING-GEL INFUSED MEMORY FOAM",
    subtitle: "Sustained temperature management during extended play",
    description:
      "Say goodbye to heat buildup. A specialized thermal transfer cooling-gel layer rests directly beneath breathable protein leather and cooling fabric, dissipating body warmth while plush slow-rebound foam eliminates jaw and eyewear pressure.",
    icon: Feather,
    metrics: [
      { label: "Thermal Dissipation", value: "-4.2", unit: "°C Delta" },
      { label: "Foam Density", value: "65", unit: "kg/m³" },
      { label: "Eyewear Relief", value: "Channel", unit: "Integrated" },
    ],
    visualCallout: "HEAT-TRANSFER TEXTILE + THERMAL GEL MATRIX",
  },
  {
    id: "build",
    number: "03",
    title: "Structural Integrity",
    headline: "AEROSPACE BAUXITE ALUMINUM FRAME",
    subtitle: "Ultra-resilient durability without the punishing weight",
    description:
      "Crafted from premium bauxite aluminum alloy, the unibody headband structure undergoes rigorous 180° twist and drop testing. The entire headset tips the scales at a featherweight 250 grams, eliminating crown fatigue.",
    icon: Shield,
    metrics: [
      { label: "Chassis Weight", value: "250", unit: "Grams" },
      { label: "Torsional Flex", value: "180", unit: "Degrees" },
      { label: "Headband Depth", value: "22", unit: "mm Foam" },
    ],
    visualCallout: "ANODIZED BAUXITE ALLOY UNIBODY ARCHITECTURE",
  },
  {
    id: "mic",
    number: "04",
    title: "Vocal Clarity",
    headline: "RETRACTABLE CARDIOID MICROPHONE",
    subtitle: "Studio voice isolation with ambient cancellation",
    description:
      "Designed with an engineered cardioid pickup pattern that zeroes in on the human voice sweet spot while rejecting background mechanical switch clicks, desk thumps, and fan noise. When the match ends, simply retract it cleanly into the left earcup.",
    icon: Mic2,
    metrics: [
      { label: "Pickup Pattern", value: "Cardioid", unit: "Unidirectional" },
      { label: "Vocal Bandwidth", value: "100 – 10k", unit: "Hz" },
      { label: "Signal Rejection", value: "> 22", unit: "dB Off-Axis" },
    ],
    visualCallout: "DISCRETE RETRACTABLE HOUSING // ZERO LATENCY",
  },
];

export default function PerformanceSection() {
  const [selectedPillar, setSelectedPillar] = useState<string>("audio");
  const current = PILLARS.find((p) => p.id === selectedPillar) || PILLARS[0];
  const Icon = current.icon;

  return (
    <section
      id="performance"
      className="relative min-h-screen w-full py-28 flex flex-col justify-center border-t border-black/8 bg-[#F4F4F4]/70 backdrop-blur-xs"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151515] text-white font-mono text-[10px] font-bold tracking-widest uppercase mb-3">
            SECTION 02 // PERFORMANCE
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#151515] uppercase font-display">
            DESIGNED FOR <br />
            <span className="text-[#E52432]">COMPETITIVE DOMINANCE</span>
          </h2>
        </div>

        {/* 4 Interactive Pillars Switcher Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {PILLARS.map((p) => {
            const isSelected = p.id === selectedPillar;
            const TabIcon = p.icon;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedPillar(p.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`flex flex-col text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? "bg-[#151515] text-white border-[#151515] shadow-lg"
                    : "bg-white/80 text-black border-black/10 hover:border-black/30 hover:bg-white"
                }`}
              >
                {/* Active Red Accent Corner */}
                {isSelected && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-[#E52432]" />
                )}

                <div className="flex items-center justify-between w-full mb-3">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? "text-[#E52432]" : "text-black/40"
                    }`}
                  >
                    {p.number}
                  </span>
                  <TabIcon
                    className={`w-4 h-4 ${
                      isSelected ? "text-[#E52432]" : "text-black/40 group-hover:text-black"
                    }`}
                  />
                </div>

                <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                  {p.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Pillar Deep Dive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[420px]">
          {/* Reserved Space for 3D model (on the left side in this section) */}
          <div className="lg:col-span-5 h-64 lg:h-full pointer-events-none" />

          {/* Detailed Narrative Card (on the right side) */}
          <div className="lg:col-span-7 flex flex-col justify-center z-20">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl shadow-sm border border-black/8 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-[#E52432]/10 text-[#E52432]">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-widest text-[#E52432] uppercase font-bold">
                    {current.visualCallout}
                  </span>
                  <span className="font-mono text-xs text-black/50 uppercase">
                    Architecture // {current.number}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#151515] uppercase font-display mb-3">
                {current.headline}
              </h3>

              <p className="text-sm font-medium text-[#E52432] mb-4">
                {current.subtitle}
              </p>

              <p className="text-sm sm:text-base text-black/75 leading-relaxed mb-8">
                {current.description}
              </p>

              {/* Metrics Counter Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/8">
                {current.metrics.map((m, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-[#151515] tracking-tight">
                        {m.value}
                      </span>
                      {m.unit && (
                        <span className="font-mono text-xs text-[#E52432] font-bold">
                          {m.unit}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-black/50 uppercase tracking-wider mt-1">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
