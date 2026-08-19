"use client";

import { useRef } from "react";
import { useLenis } from "@/components/smooth-scroll-provider";
import { HeroCanvas } from "./hero-canvas";

const MODULE_PILLS = [
  { label: "MODULE 01", title: "Linux Kernel Sandbox" },
  { label: "MODULE 02", title: "Enterprise AI Onboarding" },
  { label: "MODULE 03", title: "Autonomous AI Chartered Accountant" },
];

export function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  function handleInitialize() {
    const target = document.getElementById("crisis");
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.8, offset: 0 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section
      id="hero"
      ref={wrapperRef}
      className="relative h-[320vh] bg-abyssal"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-abyssal">
        <HeroCanvas wrapperRef={wrapperRef} overlayRef={overlayRef} hintRef={hintRef} />

        {/* Oceanic Grid & Vignette Overlay */}
        <div className="oceanic-grid pointer-events-none absolute inset-0 opacity-40" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(9,15,13,0.85) 100%)",
          }}
        />

        {/* Hero Content Overlay */}
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          {/* Top Tagline */}
          <div className="label-story mb-4 flex items-center gap-2.5 text-siren-song bg-abyssal-surface/80 px-4 py-1.5 rounded-full border border-line-hi backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-villa-nova shadow-[0_0_10px_#E2E0C8] animate-pulse" />
            <span>SOVEREIGN INTELLIGENCE PLATFORM</span>
          </div>

          {/* Main Title */}
          <h1 className="display-hero text-villa-nova tracking-tighter drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            AELFRA
          </h1>

          {/* Narrative Subtitle */}
          <p className="body-editorial mt-4 max-w-[42rem] text-balance text-foreground-muted">
            The ultimate autopilot and runtime defense sentinel for modern software ecosystems.
            Unifying Linux kernel probes, repository onboarding, and deterministic audit into one unbreakable foundation.
          </p>

          {/* Module Pills */}
          <div className="mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {MODULE_PILLS.map((m) => (
              <div
                key={m.label}
                className="ocean-glass flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-line hover:border-siren-song transition-all"
              >
                <span className="font-mono text-[10px] font-bold text-siren-song">{m.label} //</span>
                <span className="font-sans font-medium text-villa-nova">{m.title}</span>
              </div>
            ))}
          </div>

          {/* Scroll / Begin Story CTA */}
          <button
            type="button"
            onClick={handleInitialize}
            className="group relative mt-10 flex items-center gap-3 overflow-hidden rounded-full border border-siren-song/50 bg-ocean-deep/30 px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-villa-nova shadow-[0_0_30px_rgba(78,99,94,0.4)] transition-all duration-300 hover:border-villa-nova hover:bg-ocean-deep hover:shadow-[0_0_40px_rgba(226,224,200,0.5)]"
            style={{ pointerEvents: "auto" }}
          >
            <span className="text-siren-song">&gt;</span>
            EXPLORE THE STORY
            <span
              className="ml-1 inline-block h-3 w-1.5 bg-villa-nova"
              style={{ animation: "ocean-wave-pulse 1.2s ease-in-out infinite" }}
            />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={hintRef}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 transition-opacity duration-500"
        >
          <span className="label-story text-[0.65rem] text-siren-song/70">SCROLL TO EXPERIENCE</span>
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
