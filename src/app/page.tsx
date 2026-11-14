"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { COLOR_EDITIONS, ColorEdition } from "@/data/components";
import { translations, Language } from "@/data/translations";
import { sound, cyberAudio } from "@/utils/audio";
import { ShoppingBag, Box, Play, Square, RotateCw, Check, Sparkles, X, ArrowDown, ChevronRight, ChevronLeft, Globe } from "lucide-react";
import confetti from "canvas-confetti";

const HeadsetExperience = dynamic(
  () => import("@/components/canvas/HeadsetExperience"),
  { ssr: false }
);

export default function Home() {
  const [lang, setLang] = useState<Language>("ar");
  const isRtl = lang === "ar";
  const t = translations[lang];

  const [activeColor, setActiveColor] = useState<ColorEdition>(COLOR_EDITIONS[0]);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isAcquireOpen, setIsAcquireOpen] = useState(false);
  const [engraving, setEngraving] = useState("CHAMPION-01");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Sync HTML dir and lang
  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  const toggleLanguage = () => {
    sound.playClick();
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const handleToggleMusic = () => {
    const playing = cyberAudio.toggleBGM();
    setIsPlayingMusic(playing);
  };

  const scrollToSection = (sectionId: string) => {
    sound.playClick();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAcquireClick = () => {
    sound.playClick();
    setIsAcquireOpen(true);
  };

  const handleConfirmOrder = () => {
    sound.playClick();
    setOrderConfirmed(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: [activeColor.emissiveHex, "#FFFFFF", "#151515"],
    });
  };

  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="relative bg-white text-neutral-900 overflow-x-hidden selection:bg-[#E52432] selection:text-white font-sans min-h-screen"
    >
      {/* 3D WebGL Canvas Layer with Mobile-First Vertical Separation */}
      <HeadsetExperience
        onPinClick={scrollToSection}
        activeColor={activeColor}
        wireframe={wireframe}
        autoRotate={autoRotate}
        isRtl={isRtl}
        onLoaded={() => {}}
      />

      {/* Floating Header */}
      <header className="fixed top-0 left-0 w-full z-40 px-3.5 sm:px-8 md:px-12 py-3 sm:py-4 flex items-center justify-between pointer-events-none">
        {/* Brand */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 text-start focus:outline-none group"
          >
            <div
              className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-white font-bold text-xs shadow-sm transition-transform group-hover:scale-105"
              style={{ backgroundColor: activeColor.dotHex }}
            >
              AK
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-extrabold tracking-tight text-neutral-900 uppercase">
                {t.brand.name}
              </span>
              <span className="text-[9px] sm:text-[11px] font-medium text-neutral-500">
                {t.brand.tagline} · {isRtl ? activeColor.nameAr : activeColor.name}
              </span>
            </div>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 pointer-events-auto">
          {/* Language Toggle Button (AR / EN) */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold tracking-tight bg-white/90 text-neutral-800 border border-neutral-200 hover:border-neutral-400 shadow-xs backdrop-blur-md transition-all focus:outline-none"
            title={isRtl ? "Switch to English" : "التبديل إلى العربية"}
          >
            <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-600" />
            <span>{isRtl ? "EN" : "العربية"}</span>
          </button>

          {/* Audio Beats Toggle */}
          <button
            type="button"
            onClick={handleToggleMusic}
            onMouseEnter={() => sound.playHover()}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-semibold tracking-tight border transition-all ${
              isPlayingMusic
                ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                : "bg-white/90 text-neutral-800 border-neutral-200 hover:border-neutral-400 shadow-xs backdrop-blur-md"
            }`}
            style={{
              borderColor: isPlayingMusic ? activeColor.dotHex : undefined,
              color: isPlayingMusic ? activeColor.dotHex : undefined,
            }}
          >
            {isPlayingMusic ? <Square className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />}
            <span className="hidden md:inline">
              {isPlayingMusic ? t.brand.audioPlaying : t.brand.audioPaused}
            </span>
          </button>

          {/* Acquire CTA */}
          <button
            type="button"
            onClick={handleAcquireClick}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-white text-xs font-bold tracking-tight uppercase transition-all shadow-sm hover:opacity-95"
            style={{ backgroundColor: activeColor.dotHex }}
          >
            <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{t.brand.acquire}</span>
          </button>
        </div>
      </header>

      {/* Floating 3D Control Center Dock */}
      <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-xl pointer-events-auto max-w-[96vw] overflow-x-auto">
        {/* Chroma Color Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2 pe-2 sm:pe-3 border-e border-neutral-200 shrink-0">
          {COLOR_EDITIONS.map((c) => {
            const isSelected = activeColor.id === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveColor(c);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-all flex items-center justify-center focus:outline-none shrink-0 ${
                  isSelected
                    ? "ring-2 ring-neutral-900 shadow-md scale-110"
                    : "hover:scale-105 opacity-80 hover:opacity-100"
                }`}
                style={{ backgroundColor: c.dotHex }}
                title={`${t.dock.switchColorTitle} ${isRtl ? c.nameAr : c.name}`}
              >
                {isSelected && (
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shadow-xs" />
                )}
              </button>
            );
          })}
        </div>

        {/* 360° Auto Turntable Toggle */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setAutoRotate(!autoRotate);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all focus:outline-none shrink-0 ${
            autoRotate
              ? "bg-neutral-900 text-white shadow-xs"
              : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100"
          }`}
          title={t.dock.turntable}
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
          <span>{t.dock.turntable}</span>
        </button>

        {/* Wireframe Mesh Toggle */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setWireframe(!wireframe);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all focus:outline-none shrink-0 ${
            wireframe
              ? "bg-neutral-900 text-white shadow-xs"
              : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100"
          }`}
          title={t.dock.mesh}
        >
          <Box className="w-3.5 h-3.5" />
          <span>{t.dock.mesh}</span>
        </button>

        {/* Drag Hint */}
        <span className="hidden xl:inline text-[11px] text-neutral-400 uppercase tracking-wider ps-3 pe-1 border-s border-neutral-200 whitespace-nowrap font-medium">
          {t.dock.dragHint}
        </span>
      </div>

      {/* Stage 0: Hero Section (Model in upper screen on mobile, content in lower card) */}
      <section
        id="hero"
        className="min-h-screen w-full flex flex-col justify-end md:justify-center items-start relative z-20 pointer-events-none px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 pt-16 sm:pt-24 pb-20 md:pb-8"
      >
        <div className="w-full max-w-xl text-start pointer-events-auto bg-white/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-5 sm:p-7 md:p-0 rounded-3xl md:rounded-none border border-neutral-200/80 md:border-none shadow-xl md:shadow-none mb-2 md:mb-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 text-white text-[11px] sm:text-xs font-semibold tracking-tight mb-2.5 sm:mb-4 shadow-xs">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
              style={{ backgroundColor: activeColor.dotHex }}
            />
            {t.hero.badge}
          </div>

          {/* Headline */}
          <h1
            className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold sm:font-black uppercase font-display mb-3 sm:mb-5 text-neutral-950 ${
              isRtl ? "leading-[1.38] sm:leading-[1.32] tracking-normal" : "leading-[1.05] tracking-tight"
            }`}
          >
            <span className="block">{t.hero.titleLine1}</span>
            <span className="block mt-1 sm:mt-1.5" style={{ color: activeColor.dotHex }}>
              {t.hero.titleHighlight}
            </span>
            <span className="block mt-1 sm:mt-1.5">{t.hero.titleLine2}</span>
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-base text-neutral-600 font-normal leading-relaxed max-w-md mb-3 sm:mb-5">
            {t.hero.description}
          </p>

          {/* Quick Component Jump Badges */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {[
              { id: "section-drivers", label: t.quickNav.drivers },
              { id: "section-cushions", label: t.quickNav.cushions },
              { id: "section-headband", label: t.quickNav.headband },
              { id: "section-mic", label: t.quickNav.mic },
              { id: "section-controls", label: t.quickNav.controls },
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => scrollToSection(btn.id)}
                className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white text-neutral-800 border border-neutral-200/90 hover:border-neutral-400 text-[10px] sm:text-xs font-semibold tracking-tight transition-all shadow-xs hover:shadow-sm focus:outline-none"
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("section-drivers")}
              className="flex items-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:opacity-95"
              style={{ backgroundColor: activeColor.dotHex }}
            >
              <span>{t.hero.exploreBtn}</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleAcquireClick}
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white text-neutral-900 border border-neutral-300 text-xs font-bold uppercase tracking-wider hover:border-neutral-500 transition-colors shadow-xs"
            >
              {t.brand.acquire}
            </button>
          </div>
        </div>
      </section>

      {/* Stage 1: 50mm Acoustic Drivers Section */}
      <section
        id="section-drivers"
        className="min-h-screen w-full flex flex-col justify-end md:justify-center items-end relative z-20 pointer-events-none px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 pb-20 md:pb-8 pt-12"
      >
        <div className="w-full max-w-lg md:max-w-[420px] lg:max-w-[450px] xl:max-w-[480px] text-start pointer-events-auto bg-white/92 backdrop-blur-md p-5 sm:p-7 lg:p-8 rounded-3xl border border-neutral-200/80 shadow-xl mb-2 md:mb-0">
          <span
            className="text-xs font-bold uppercase tracking-widest block mb-1.5 sm:mb-2"
            style={{ color: activeColor.dotHex }}
          >
            {t.sections.drivers.badge}
          </span>
          <h2
            className={`text-2xl sm:text-4xl md:text-5xl font-extrabold sm:font-black uppercase font-display mb-3 sm:mb-4 text-neutral-950 ${
              isRtl ? "leading-[1.38] sm:leading-[1.32] tracking-normal" : "leading-[1.05] tracking-tight"
            }`}
          >
            <span className="block">{t.sections.drivers.titleLine1}</span>
            <span className="block mt-1 sm:mt-1.5" style={{ color: activeColor.dotHex }}>
              {t.sections.drivers.titleHighlight}
            </span>
          </h2>
          <p className="text-xs sm:text-base text-neutral-600 font-normal leading-relaxed mb-4 sm:mb-5">
            {t.sections.drivers.description}
          </p>

          {/* Clean Specification Display */}
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 py-3 border-y border-neutral-200/80 mb-4 sm:mb-5">
            {t.sections.drivers.specs.map((sp, idx) => (
              <div key={idx}>
                <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-0.5">
                  {sp.label}
                </span>
                <span className="text-xs sm:text-base font-bold text-neutral-900 tracking-tight block">
                  {sp.value}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToSection("section-cushions")}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: activeColor.dotHex }}
          >
            <span>{t.sections.drivers.nextBtn}</span>
            <NextIcon className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Stage 2: Thermal Cooling Gel Section */}
      <section
        id="section-cushions"
        className="min-h-screen w-full flex flex-col justify-end md:justify-center items-start relative z-20 pointer-events-none px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 pb-20 md:pb-8 pt-12"
      >
        <div className="w-full max-w-lg md:max-w-[420px] lg:max-w-[450px] xl:max-w-[480px] text-start pointer-events-auto bg-white/92 backdrop-blur-md p-5 sm:p-7 lg:p-8 rounded-3xl border border-neutral-200/80 shadow-xl mb-2 md:mb-0">
          <span
            className="text-xs font-bold uppercase tracking-widest block mb-1.5 sm:mb-2"
            style={{ color: activeColor.dotHex }}
          >
            {t.sections.cushions.badge}
          </span>
          <h2
            className={`text-2xl sm:text-4xl md:text-5xl font-extrabold sm:font-black uppercase font-display mb-3 sm:mb-4 text-neutral-950 ${
              isRtl ? "leading-[1.38] sm:leading-[1.32] tracking-normal" : "leading-[1.05] tracking-tight"
            }`}
          >
            <span className="block">{t.sections.cushions.titleLine1}</span>
            <span className="block mt-1 sm:mt-1.5" style={{ color: activeColor.dotHex }}>
              {t.sections.cushions.titleHighlight}
            </span>
          </h2>
          <p className="text-xs sm:text-base text-neutral-600 font-normal leading-relaxed mb-4 sm:mb-5">
            {t.sections.cushions.description}
          </p>

          {/* Clean Specification Display */}
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 py-3 border-y border-neutral-200/80 mb-4 sm:mb-5">
            {t.sections.cushions.specs.map((sp, idx) => (
              <div key={idx}>
                <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-0.5">
                  {sp.label}
                </span>
                <span className="text-xs sm:text-base font-bold text-neutral-900 tracking-tight block">
                  {sp.value}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToSection("section-headband")}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: activeColor.dotHex }}
          >
            <span>{t.sections.cushions.nextBtn}</span>
            <NextIcon className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Stage 3: Bauxite Aluminum Headband Section */}
      <section
        id="section-headband"
        className="min-h-screen w-full flex flex-col justify-end md:justify-center items-end relative z-20 pointer-events-none px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 pb-20 md:pb-8 pt-12"
      >
        <div className="w-full max-w-lg md:max-w-[420px] lg:max-w-[450px] xl:max-w-[480px] text-start pointer-events-auto bg-white/92 backdrop-blur-md p-5 sm:p-7 lg:p-8 rounded-3xl border border-neutral-200/80 shadow-xl mb-2 md:mb-0">
          <span
            className="text-xs font-bold uppercase tracking-widest block mb-1.5 sm:mb-2"
            style={{ color: activeColor.dotHex }}
          >
            {t.sections.headband.badge}
          </span>
          <h2
            className={`text-2xl sm:text-4xl md:text-5xl font-extrabold sm:font-black uppercase font-display mb-3 sm:mb-4 text-neutral-950 ${
              isRtl ? "leading-[1.38] sm:leading-[1.32] tracking-normal" : "leading-[1.05] tracking-tight"
            }`}
          >
            <span className="block">{t.sections.headband.titleLine1}</span>
            <span className="block mt-1 sm:mt-1.5" style={{ color: activeColor.dotHex }}>
              {t.sections.headband.titleHighlight}
            </span>
          </h2>
          <p className="text-xs sm:text-base text-neutral-600 font-normal leading-relaxed mb-4 sm:mb-5">
            {t.sections.headband.description}
          </p>

          {/* Clean Specification Display */}
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 py-3 border-y border-neutral-200/80 mb-4 sm:mb-5">
            {t.sections.headband.specs.map((sp, idx) => (
              <div key={idx}>
                <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-0.5">
                  {sp.label}
                </span>
                <span className="text-xs sm:text-base font-bold text-neutral-900 tracking-tight block">
                  {sp.value}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToSection("section-mic")}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: activeColor.dotHex }}
          >
            <span>{t.sections.headband.nextBtn}</span>
            <NextIcon className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Stage 4: Retractable Microphone Section */}
      <section
        id="section-mic"
        className="min-h-screen w-full flex flex-col justify-end md:justify-center items-start relative z-20 pointer-events-none px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 pb-20 md:pb-8 pt-12"
      >
        <div className="w-full max-w-lg md:max-w-[420px] lg:max-w-[450px] xl:max-w-[480px] text-start pointer-events-auto bg-white/92 backdrop-blur-md p-5 sm:p-7 lg:p-8 rounded-3xl border border-neutral-200/80 shadow-xl mb-2 md:mb-0">
          <span
            className="text-xs font-bold uppercase tracking-widest block mb-1.5 sm:mb-2"
            style={{ color: activeColor.dotHex }}
          >
            {t.sections.mic.badge}
          </span>
          <h2
            className={`text-2xl sm:text-4xl md:text-5xl font-extrabold sm:font-black uppercase font-display mb-3 sm:mb-4 text-neutral-950 ${
              isRtl ? "leading-[1.38] sm:leading-[1.32] tracking-normal" : "leading-[1.05] tracking-tight"
            }`}
          >
            <span className="block">{t.sections.mic.titleLine1}</span>
            <span className="block mt-1 sm:mt-1.5" style={{ color: activeColor.dotHex }}>
              {t.sections.mic.titleHighlight}
            </span>
          </h2>
          <p className="text-xs sm:text-base text-neutral-600 font-normal leading-relaxed mb-4 sm:mb-5">
            {t.sections.mic.description}
          </p>

          {/* Clean Specification Display */}
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 py-3 border-y border-neutral-200/80 mb-4 sm:mb-5">
            {t.sections.mic.specs.map((sp, idx) => (
              <div key={idx}>
                <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-0.5">
                  {sp.label}
                </span>
                <span className="text-xs sm:text-base font-bold text-neutral-900 tracking-tight block">
                  {sp.value}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToSection("section-controls")}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: activeColor.dotHex }}
          >
            <span>{t.sections.mic.nextBtn}</span>
            <NextIcon className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Stage 5: Tactile Controls Section */}
      <section
        id="section-controls"
        className="min-h-screen w-full flex flex-col justify-end md:justify-center items-end relative z-20 pointer-events-none px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 pb-20 md:pb-8 pt-12"
      >
        <div className="w-full max-w-lg md:max-w-[420px] lg:max-w-[450px] xl:max-w-[480px] text-start pointer-events-auto bg-white/92 backdrop-blur-md p-5 sm:p-7 lg:p-8 rounded-3xl border border-neutral-200/80 shadow-xl mb-2 md:mb-0">
          <span
            className="text-xs font-bold uppercase tracking-widest block mb-1.5 sm:mb-2"
            style={{ color: activeColor.dotHex }}
          >
            {t.sections.controls.badge}
          </span>
          <h2
            className={`text-2xl sm:text-4xl md:text-5xl font-extrabold sm:font-black uppercase font-display mb-3 sm:mb-4 text-neutral-950 ${
              isRtl ? "leading-[1.38] sm:leading-[1.32] tracking-normal" : "leading-[1.05] tracking-tight"
            }`}
          >
            <span className="block">{t.sections.controls.titleLine1}</span>
            <span className="block mt-1 sm:mt-1.5" style={{ color: activeColor.dotHex }}>
              {t.sections.controls.titleHighlight}
            </span>
          </h2>
          <p className="text-xs sm:text-base text-neutral-600 font-normal leading-relaxed mb-4 sm:mb-5">
            {t.sections.controls.description}
          </p>

          {/* Clean Specification Display */}
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 py-3 border-y border-neutral-200/80 mb-4 sm:mb-5">
            {t.sections.controls.specs.map((sp, idx) => (
              <div key={idx}>
                <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-0.5">
                  {sp.label}
                </span>
                <span className="text-xs sm:text-base font-bold text-neutral-900 tracking-tight block">
                  {sp.value}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToSection("section-finale")}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: activeColor.dotHex }}
          >
            <span>{t.sections.controls.nextBtn}</span>
            <NextIcon className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Stage 6: Finale Section */}
      <section
        id="section-finale"
        className="min-h-screen w-full flex flex-col justify-end md:justify-center items-start relative z-20 pointer-events-none px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 pb-20 md:pb-8 pt-12"
      >
        <div className="w-full max-w-lg md:max-w-[420px] lg:max-w-[450px] xl:max-w-[480px] text-start pointer-events-auto bg-white/92 backdrop-blur-md p-5 sm:p-7 lg:p-8 rounded-3xl border border-neutral-200/80 shadow-xl mb-2 md:mb-0">
          <span
            className="text-xs font-bold uppercase tracking-widest block mb-1.5 sm:mb-2"
            style={{ color: activeColor.dotHex }}
          >
            {t.sections.finale.badge}
          </span>

          <h2
            className={`text-2xl sm:text-4xl md:text-5xl font-extrabold sm:font-black uppercase font-display mb-3 sm:mb-4 text-neutral-950 ${
              isRtl ? "leading-[1.38] sm:leading-[1.32] tracking-normal" : "leading-[1.05] tracking-tight"
            }`}
          >
            <span className="block">{t.sections.finale.titleLine1}</span>
            <span className="block mt-1 sm:mt-1.5" style={{ color: activeColor.dotHex }}>
              {t.sections.finale.titleHighlight}
            </span>
          </h2>

          <p className="text-xs sm:text-base text-neutral-600 font-normal leading-relaxed mb-4 sm:mb-6">
            {t.sections.finale.description}
          </p>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={handleAcquireClick}
              className="flex items-center gap-1.5 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full text-white text-xs font-bold tracking-widest uppercase transition-all shadow-xl hover:opacity-95"
              style={{ backgroundColor: activeColor.dotHex }}
            >
              <span>{t.sections.finale.ctaBtn}</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white text-neutral-900 border border-neutral-300 text-xs font-bold tracking-widest uppercase hover:border-neutral-500 transition-all shadow-xs"
            >
              <span>{t.sections.finale.topBtn}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Acquire Modal */}
      {isAcquireOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border border-neutral-200 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setIsAcquireOpen(false);
                setOrderConfirmed(false);
              }}
              className={`absolute top-5 ${isRtl ? "left-5" : "right-5"} p-2 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors`}
            >
              <X className="w-5 h-5" />
            </button>

            {orderConfirmed ? (
              <div className="text-center py-6 sm:py-8 space-y-4">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 text-white"
                  style={{ backgroundColor: activeColor.dotHex }}
                >
                  <Check className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
                </div>
                <span
                  className="text-xs uppercase tracking-widest font-bold"
                  style={{ color: activeColor.dotHex }}
                >
                  {t.modal.confirmedBadge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-display uppercase">
                  {t.modal.confirmedTitle}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                  {t.modal.confirmedDesc(isRtl ? activeColor.nameAr : activeColor.name, engraving)}
                </p>
                <button
                  type="button"
                  onClick={() => setIsAcquireOpen(false)}
                  className="px-7 py-3 rounded-full bg-neutral-900 text-white text-xs uppercase tracking-wider font-bold hover:bg-neutral-800 transition-colors"
                >
                  {t.modal.returnBtn}
                </button>
              </div>
            ) : (
              <div>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-tight mb-3 text-white"
                  style={{ backgroundColor: activeColor.dotHex }}
                >
                  <Sparkles className="w-3 h-3" /> {t.modal.officialRig}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-neutral-950 uppercase font-display mb-1">
                  {t.modal.configureTitle}
                </h3>
                <p className="text-xs text-neutral-500 mb-5 font-medium">
                  {t.modal.subtitle}
                </p>

                {/* Color Selection */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                    {t.modal.colorLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {COLOR_EDITIONS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setActiveColor(c);
                        }}
                        className={`flex items-center gap-2 p-2 sm:p-2.5 rounded-xl border text-start transition-all ${
                          activeColor.id === c.id
                            ? "border-neutral-900 bg-neutral-100 shadow-xs font-bold"
                            : "border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-neutral-300 shrink-0"
                          style={{ backgroundColor: c.dotHex }}
                        />
                        <span className="text-[11px] sm:text-xs truncate text-neutral-900 font-semibold">
                          {isRtl ? c.nameAr : c.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Engraving */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                    {t.modal.engravingLabel}
                  </label>
                  <input
                    type="text"
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value.toUpperCase().slice(0, 16))}
                    placeholder={t.modal.engravingPlaceholder}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-neutral-300 text-xs font-bold uppercase tracking-wider text-neutral-900 focus:outline-none focus:border-neutral-900 text-start"
                  />
                  <span className="block mt-1 text-[10px] sm:text-[11px] text-neutral-400">
                    {t.modal.engravingHint}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3.5 border-t border-neutral-200 mb-5">
                  <div>
                    <span className="block text-[10px] sm:text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                      {t.modal.totalLabel}
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-neutral-950">199.99 $</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-emerald-600 font-bold uppercase bg-emerald-50 px-2.5 py-1 rounded-full">
                    {t.modal.inStock}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="w-full py-3.5 rounded-full text-white text-xs font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-xl hover:opacity-95"
                  style={{ backgroundColor: activeColor.dotHex }}
                >
                  {t.modal.confirmBtn}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
