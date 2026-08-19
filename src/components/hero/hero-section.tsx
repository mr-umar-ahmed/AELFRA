"use client";

import { useRef } from "react";
import { useLenis } from "@/components/smooth-scroll-provider";
import { HeroCanvas } from "./hero-canvas";

const PILLS = ["Kernel Defense", "People Intelligence", "Financial Audit"];

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
      className="relative h-[320vh] bg-obsidian"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">
        <HeroCanvas wrapperRef={wrapperRef} overlayRef={overlayRef} hintRef={hintRef} />

        {/* Technical grid + vignette dressing, matched to the source file */}
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-40" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, var(--color-cyan-line), transparent)" }}
        />

        {/* Overlay copy — opacity/transform driven imperatively by HeroCanvas's RAF loop */}
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <div className="label-mono mb-6 flex items-center gap-2 text-cyan">
            <span className="h-1.5 w-1.5 rounded-[2px] bg-cyan shadow-[0_0_10px_var(--color-cyan)]" />
            Enterprise Governance Suite
          </div>

          <h1 className="display-xl text-foreground">AELFRA</h1>

          <p className="body-lg mt-6 max-w-[36rem] text-balance">
            The ultimate autopilot and security guard for modern software
            teams.
          </p>

          <div className="mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2.5">
            {PILLS.map((p) => (
              <span
                key={p}
                className="glass label-mono rounded-full px-4 py-2 text-[0.65rem] text-foreground/80"
              >
                {p}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={handleInitialize}
            className="group relative mt-11 flex items-center gap-3 overflow-hidden rounded-md border border-cyan/40 bg-cyan/[0.06] px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-cyan shadow-[0_0_24px_-4px_rgba(6,182,212,0.5)] transition-all duration-300 hover:border-cyan hover:bg-cyan/[0.12] hover:shadow-[0_0_36px_-4px_rgba(6,182,212,0.75)]"
            style={{ pointerEvents: "auto" }}
          >
            <span className="text-cyan/70">&gt;</span>
            Initialize Suite
            <span
              className="ml-1 inline-block h-3 w-1.5 bg-cyan"
              style={{ animation: "aelfra-pulse 1.1s ease-in-out infinite" }}
            />
          </button>
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="pointer-events-none absolute inset-x-0 bottom-9 z-10 flex flex-col items-center gap-2 transition-opacity duration-500"
        >
          <span className="label-mono text-[0.65rem] text-muted-hi">Scroll to explore</span>
          <span
            className="text-cyan"
            style={{ animation: "aelfra-drift 1.4s ease-in-out infinite" }}
          >
            ↓
          </span>
        </div>
      </div>
    </section>
  );
}
