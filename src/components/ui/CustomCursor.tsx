"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      setEnabled(true);
      document.body.classList.add("custom-cursor-active");
    } else {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;

      // Check if target is clickable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      posRef.current.x += (posRef.current.targetX - posRef.current.x) * 0.2;
      posRef.current.y += (posRef.current.targetY - posRef.current.y) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${posRef.current.targetX}px, ${posRef.current.targetY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Central Sharp Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#E52432] pointer-events-none z-50 transition-transform duration-75 ease-out"
      />
      {/* Outer Follower Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 transition-all duration-150 ease-out border rounded-full ${
          isHovered
            ? "w-10 h-10 -ml-5 -mt-5 border-[#E52432] bg-[#E52432]/10 scale-110"
            : "w-6 h-6 -ml-3 -mt-3 border-black/30"
        }`}
      />
    </>
  );
}
