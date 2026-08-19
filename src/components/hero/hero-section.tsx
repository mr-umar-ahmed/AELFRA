"use client";

import { useCallback, useRef, useState } from "react";
import { useLenis } from "@/components/smooth-scroll-provider";
import { HeroCanvas, STAGE_SCROLL_TARGETS } from "./hero-canvas";

const STAGES = [
  { id: "01", name: "SOVEREIGN SENTINEL", label: "PROLOGUE" },
  { id: "02", name: "ENTERPRISE CRISIS", label: "THE CRISIS" },
  { id: "03", name: "LINUX KERNEL SANDBOX", label: "MODULE 01" },
  { id: "04", name: "AI ONBOARDING RAG", label: "MODULE 02" },
  { id: "05", name: "AUTONOMOUS AI AUDIT", label: "MODULE 03" },
  { id: "06", name: "UNIFIED CONVERGENCE", label: "EPILOGUE" },
];

export function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const lenis = useLenis();

  // Stable identity so HeroCanvas never sees a new callback per render.
  const handleStageChange = useCallback((idx: number) => {
    setActiveStage(idx);
  }, []);

  function handleJumpToStage(index: number) {
    if (!wrapperRef.current) return;
    const totalHeight = wrapperRef.current.clientHeight - window.innerHeight;
    // Map through the camera keyframes so each dot lands exactly on its stage.
    const targetScroll =
      wrapperRef.current.offsetTop + STAGE_SCROLL_TARGETS[index] * totalHeight;

    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 1.8 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }

  return (
    <section
      id="hero"
      ref={wrapperRef}
      className="relative h-[550vh] bg-abyssal"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-abyssal">
        <HeroCanvas wrapperRef={wrapperRef} onStageChange={handleStageChange} />

        {/* Oceanic Grid & Vignette Overlay */}
        <div className="oceanic-grid pointer-events-none absolute inset-0 opacity-30" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(9,15,13,0.85) 100%)",
          }}
        />

        {/* 3D Journey HUD Badge */}
        <div className="pointer-events-none absolute top-24 sm:top-20 left-1/2 -translate-x-1/2 z-20 w-[90%] sm:w-auto flex justify-center">
          <div className="ocean-glass flex items-center gap-2 sm:gap-3 rounded-full px-3 py-1.5 sm:px-5 sm:py-2 border border-line-hi shadow-xl max-w-full">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0 rounded-full bg-villa-nova shadow-[0_0_8px_#E2E0C8] animate-pulse" />
            <span className="font-mono text-[9px] sm:text-xs font-bold text-siren-song uppercase tracking-widest truncate">
              3D JOURNEY // STAGE {STAGES[activeStage]?.id}: {STAGES[activeStage]?.name}
            </span>
          </div>
        </div>

        {/* Hero Title & Opening CTA Overlay (Stage 0) */}
        <div
          className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-6 text-center transition-opacity duration-700 ${
            activeStage === 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="label-story mb-4 flex items-center gap-2.5 text-siren-song bg-abyssal-surface/80 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full border border-line-hi backdrop-blur-md max-w-full">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0 rounded-full bg-villa-nova shadow-[0_0_10px_#E2E0C8] animate-pulse" />
            <span className="truncate text-[8px] sm:text-[11.5px]">SOVEREIGN INTELLIGENCE PLATFORM</span>
          </div>

          <h1 className="display-hero text-villa-nova tracking-tighter drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            AELFRA
          </h1>

          <p className="body-editorial mt-4 max-w-[42rem] text-balance text-foreground-muted text-sm sm:text-base">
            The ultimate autopilot and runtime defense sentinel for modern software ecosystems.
            Unifying Linux kernel probes, repository onboarding, and deterministic audit under one unbreakable 3D foundation.
          </p>

          <button
            type="button"
            onClick={() => handleJumpToStage(1)}
            data-cursor="BEGIN"
            className={`group relative mt-8 sm:mt-10 flex items-center justify-center gap-2 sm:gap-3 overflow-hidden rounded-full border border-siren-song/50 bg-ocean-deep/30 px-6 py-3 sm:px-8 sm:py-4 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-villa-nova shadow-[0_0_30px_rgba(78,99,94,0.4)] transition-all duration-300 hover:border-villa-nova hover:bg-ocean-deep hover:shadow-[0_0_40px_rgba(226,224,200,0.5)] w-[85%] sm:w-auto ${
              activeStage === 0 ? "pointer-events-auto" : ""
            }`}
          >
            <span className="text-siren-song">&gt;</span>
            START 3D FLY-THROUGH
            <span
              className="ml-1 inline-block h-3 w-1.5 bg-villa-nova"
              style={{ animation: "ocean-wave-pulse 1.2s ease-in-out infinite" }}
            />
          </button>
        </div>

        {/* Right Nav Stage Selector Dots — scoped to the hero viewport */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3">
          {STAGES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => handleJumpToStage(i)}
              data-cursor={`STAGE ${s.id}`}
              aria-label={`Jump to stage ${s.id}: ${s.name}`}
              className={`group flex items-center justify-end gap-3 transition-all ${
                activeStage === i ? "scale-110" : "opacity-50 hover:opacity-100"
              }`}
              title={s.name}
            >
              <span className="font-mono text-[10px] font-bold text-siren-song hidden group-hover:inline transition-all">
                {s.name}
              </span>
              <span
                className={`h-3 w-3 rounded-full border transition-all ${
                  activeStage === i
                    ? "bg-villa-nova border-villa-nova shadow-[0_0_10px_#E2E0C8]"
                    : "bg-abyssal-surface border-siren-song"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Bottom Scroll Indicator — fades out once the journey begins */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 transition-opacity duration-500 ${
            activeStage === 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="label-story text-[0.65rem] text-siren-song/70">
            SCROLL TO ADVANCE 3D JOURNEY
          </span>
          <span
            className="text-villa-nova text-sm"
            style={{ animation: "aelfra-drift 1.5s ease-in-out infinite" }}
          >
            ↓
          </span>
        </div>
      </div>
    </section>
  );
}
