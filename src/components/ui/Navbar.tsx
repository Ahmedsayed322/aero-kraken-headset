"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, RotateCw, ShoppingBag, Radio } from "lucide-react";
import { sound } from "@/utils/audio";
import { ViewMode } from "@/types";

interface NavbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onPreOrderClick: () => void;
}

export default function Navbar({
  viewMode,
  onViewModeChange,
  onPreOrderClick,
}: NavbarProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const scrollTo = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-black/8 py-3.5 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("hero");
            }}
            className="flex items-center gap-2.5 text-black hover:opacity-90 transition-opacity group"
          >
            <div className="w-8 h-8 rounded-sm bg-[#151515] flex items-center justify-center text-white font-mono font-bold text-xs relative overflow-hidden group-hover:bg-[#E52432] transition-colors">
              <span className="relative z-10">AK</span>
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#E52432] group-hover:bg-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-black tracking-widest uppercase flex items-center gap-1.5">
                AERO <span className="text-[#E52432] font-black">//</span> KRAKEN
              </span>
              <span className="text-[9px] font-mono tracking-wider text-black/50 uppercase">
                Acoustic System
              </span>
            </div>
          </a>
        </div>

        {/* Minimal Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase">
          <button
            onClick={() => scrollTo("showcase")}
            onMouseEnter={() => sound.playHover()}
            className="text-black/70 hover:text-black transition-colors hover:underline underline-offset-4 decoration-[#E52432]"
          >
            01. Showcase
          </button>
          <button
            onClick={() => scrollTo("performance")}
            onMouseEnter={() => sound.playHover()}
            className="text-black/70 hover:text-black transition-colors hover:underline underline-offset-4 decoration-[#E52432]"
          >
            02. Performance
          </button>
          <button
            onClick={() => scrollTo("hotspots")}
            onMouseEnter={() => sound.playHover()}
            className="text-black/70 hover:text-black transition-colors hover:underline underline-offset-4 decoration-[#E52432]"
          >
            03. Details
          </button>
          <button
            onClick={() => scrollTo("specifications")}
            onMouseEnter={() => sound.playHover()}
            className="text-black/70 hover:text-black transition-colors hover:underline underline-offset-4 decoration-[#E52432]"
          >
            04. Specs
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* 360 Mode Pill */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onViewModeChange(viewMode === "orbit" ? "cinematic" : "orbit");
            }}
            onMouseEnter={() => sound.playHover()}
            className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-200 border ${
              viewMode === "orbit"
                ? "bg-[#E52432] text-white border-[#E52432] glow-red-sm"
                : "bg-white/80 text-black border-black/15 hover:border-black/40 hover:bg-white"
            }`}
          >
            <RotateCw
              className={`w-3.5 h-3.5 ${
                viewMode === "orbit" ? "animate-spin" : ""
              }`}
            />
            <span>{viewMode === "orbit" ? "Exit 360°" : "360° View"}</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            type="button"
            onClick={handleAudioToggle}
            onMouseEnter={() => sound.playHover()}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className={`p-2 rounded-full border transition-all duration-200 ${
              !isMuted
                ? "bg-[#151515] text-[#E52432] border-[#151515]"
                : "bg-white/80 text-black/60 border-black/15 hover:text-black hover:border-black/30"
            }`}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {/* Pre-Order / Buy CTA */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onPreOrderClick();
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#151515] text-white font-mono text-[11px] font-bold tracking-widest uppercase hover:bg-[#E52432] transition-colors duration-200 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Acquire</span>
          </button>
        </div>
      </div>
    </header>
  );
}
