"use client";

import React, { useState } from "react";
import { COLORWAYS } from "@/data/hotspots";
import { Colorway } from "@/types";
import { sound } from "@/utils/audio";
import { X, Check, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeColorway: Colorway;
  onSelectColorway: (c: Colorway) => void;
}

export default function OrderModal({
  isOpen,
  onClose,
  activeColorway,
  onSelectColorway,
}: OrderModalProps) {
  const [isOrdered, setIsOrdered] = useState(false);
  const [platform, setPlatform] = useState("Universal (PC/PS5/Xbox/Switch)");

  if (!isOpen) return null;

  const handleComplete = () => {
    sound.playClick();
    setIsOrdered(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#E52432", "#151515", "#FFFFFF"],
    });
  };

  const handleClose = () => {
    sound.playClick();
    setIsOrdered(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-black/10 relative overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 text-black/40 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isOrdered ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E52432]/10 text-[#E52432] flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#E52432] font-bold">
              ORDER CONFIRMED
            </span>
            <h3 className="text-3xl font-black text-[#151515] font-display uppercase">
              WELCOME TO THE ARENA
            </h3>
            <p className="text-sm text-black/70 max-w-sm mx-auto leading-relaxed">
              Your <strong>AERO // KRAKEN</strong> in{" "}
              <span className="text-[#E52432] font-bold">{activeColorway.name}</span> has
              been queued for priority dispatch with express tracking.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-8 py-3.5 rounded-full bg-[#151515] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#E52432] transition-colors"
              >
                Return to Experience
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E52432]/10 text-[#E52432] font-mono text-[10px] font-bold tracking-widest uppercase mb-3">
              <Sparkles className="w-3 h-3" /> OFFICIAL TOURNAMENT RIG
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#151515] uppercase font-display mb-1">
              CONFIGURE YOUR HEADSET
            </h3>
            <p className="font-mono text-xs text-black/50 mb-6">
              AERO // KRAKEN — Model No. RZ-2026-X
            </p>

            {/* Select Colorway */}
            <div className="mb-6">
              <label className="block font-mono text-xs font-bold text-black uppercase mb-2">
                1. Select Edition & Chroma Glow
              </label>
              <div className="grid grid-cols-2 gap-2">
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
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "border-[#151515] bg-[#151515] text-white"
                          : "border-black/10 hover:border-black/30 text-black"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/50"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="font-mono text-xs font-bold truncate">
                        {c.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* What's in the Box */}
            <div className="bg-[#F4F4F4] rounded-2xl p-4 mb-6 border border-black/5 text-xs font-mono space-y-1.5">
              <div className="font-bold text-black uppercase mb-1">Included in Package:</div>
              <div className="text-black/70 flex items-center gap-2">
                <Check className="w-3 h-3 text-[#E52432]" /> Aero Kraken 50mm Headset
              </div>
              <div className="text-black/70 flex items-center gap-2">
                <Check className="w-3 h-3 text-[#E52432]" /> 1.3m Kevlar Braided 3.5mm Cable
              </div>
              <div className="text-black/70 flex items-center gap-2">
                <Check className="w-3 h-3 text-[#E52432]" /> 2.0m Mic/Audio Extension Splitter
              </div>
              <div className="text-black/70 flex items-center gap-2">
                <Check className="w-3 h-3 text-[#E52432]" /> 2-Year Full Global Warranty
              </div>
            </div>

            {/* Price & Checkout CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-black/8">
              <div>
                <span className="font-mono text-[10px] text-black/40 block">PRICE</span>
                <span className="font-mono text-2xl font-black text-[#151515]">
                  $129.99
                </span>
              </div>

              <button
                type="button"
                onClick={handleComplete}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E52432] text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#151515] transition-all shadow-lg glow-red-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Confirm Order</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
