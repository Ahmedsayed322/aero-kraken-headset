"use client";

import React, { useEffect, useState } from "react";

interface PreloaderProps {
  isLoaded: boolean;
}

export default function Preloader({ isLoaded }: PreloaderProps) {
  const [displayProgress, setDisplayProgress] = useState(12);
  const [shouldRender, setShouldRender] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isLoaded) {
      interval = setInterval(() => {
        setDisplayProgress((prev) => {
          if (prev < 90) return prev + Math.floor(Math.random() * 8 + 3);
          return prev;
        });
      }, 120);
    } else {
      setDisplayProgress(100);
      const timer1 = setTimeout(() => {
        setFadeOut(true);
      }, 400);
      const timer2 = setTimeout(() => {
        setShouldRender(false);
      }, 1000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }

    return () => clearInterval(interval);
  }, [isLoaded]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-8 md:p-12 bg-white transition-opacity duration-700 pointer-events-none ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Top Header */}
      <div className="w-full flex justify-between items-center text-[10px] font-mono tracking-widest text-black/40 uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E52432] animate-ping" />
          <span>INITIALIZING HARDWARE SUBSYSTEMS</span>
        </div>
        <div>SYS // BUILD 2026.04</div>
      </div>

      {/* Center Hologram Brand Progress */}
      <div className="flex flex-col items-center justify-center gap-6 max-w-md w-full">
        <div className="relative flex items-center justify-center">
          {/* Animated geometric ring */}
          <div className="w-28 h-28 rounded-full border border-black/10 flex items-center justify-center relative">
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#E52432] animate-spin"
              style={{ animationDuration: "1.2s" }}
            />
            <div className="w-20 h-20 rounded-full border border-dashed border-black/20 flex items-center justify-center">
              <span className="font-mono text-2xl font-bold tracking-tighter text-[#151515]">
                {displayProgress}%
              </span>
            </div>
          </div>
        </div>

        <div className="text-center space-y-1.5">
          <h2 className="font-mono text-sm font-bold tracking-widest uppercase text-black">
            AERO // KRAKEN EXPERIENCE
          </h2>
          <p className="font-mono text-[11px] text-black/50 tracking-wider">
            Compiling 3D Acoustic Geometry & PBR Shaders
          </p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#E52432] transition-all duration-200 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      </div>

      {/* Bottom Technical Logs */}
      <div className="w-full flex justify-between items-center text-[10px] font-mono text-black/40">
        <div>DRACO GEOMETRY 32 NODES // 50MM DRIVERS</div>
        <div>PRECISION CALIBRATED</div>
      </div>
    </div>
  );
}
