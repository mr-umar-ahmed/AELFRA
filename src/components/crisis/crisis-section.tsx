"use client";

import { useRef } from "react";
import { useScene } from "@/lib/use-scene";
import { IconAttritionDrop, IconLedgerCrack, IconShieldAlert } from "@/components/icons";

const PANELS = [
  {
    n: "01",
    vertical: "Cybersecurity // Runtime Risk",
    color: "#4E635E",
    accent: "#E2E0C8",
    icon: IconShieldAlert,
    statement: "Untraceable runtime payload intrusions.",
    body: "Threat actors obfuscate malicious code inside trusted open-source packages. Static scanners approve the manifest — the payload activates at runtime in memory, silently exfiltrating credentials.",
    tag: "eBPF Blindspot",
    metric: "84%",
    metricLabel: "Attacks bypass static CI/CD scans",
  },
  {
    n: "02",
    vertical: "Human Capital // Developer Attrition",
    color: "#A6B49E",
    accent: "#E2E0C8",
    icon: IconAttritionDrop,
    statement: "Onboarding churn & silent burnout.",
    body: "Traditional annual performance reviews miss daily signals of developer friction. Key senior engineers burn out and churn before any HR dashboard flags a risk.",
    tag: "Zero Early Warning",
    metric: "4.2 mo",
    metricLabel: "Average enterprise engineering onboarding delay",
  },
  {
    n: "03",
    vertical: "Financial Compliance // Audit Hallucination",
    color: "#818C78",
    accent: "#E2E0C8",
    icon: IconLedgerCrack,
    statement: "Arithmetic that fails deterministic audit.",
    body: "Manual reconciliation misses vendor spoofing and shell-company fraud hidden inside multi-hop ledgers — while raw LLMs hallucinate financial decimal calculations.",
    tag: "Unverified Ledger",
    metric: "$2.4M",
    metricLabel: "Average undetected invoice fraud loss",
  },
  {
    n: "04",
    vertical: "The Resolution // Sovereign Foundation",
    color: "#E2E0C8",
    accent: "#4E635E",
    icon: null,
    statement: "One sovereign engine. Zero point-solution silos.",
    body: "Rather than deploying three disconnected, fragmented SaaS platforms, Aelfra unifies Kernel Defense, AI Onboarding, and Autonomous Audit under one microservices core.",
    tag: "Aelfra Convergence",
    metric: "100%",
    metricLabel: "Sovereign local VPC runtime verification",
  },
];

export function CrisisSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackViewportRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useScene(sectionRef, ({ gsap, reduced }) => {
    const track = trackRef.current;
    const viewport = trackViewportRef.current;
    const section = sectionRef.current;
    if (!track || !viewport || !section) return;

    gsap.from(".crisis-intro > *", {
      opacity: 0,
      y: 32,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: { trigger: section, start: "top 75%" },
    });

    if (reduced) {
      gsap.set(track, { x: 0 });
      return;
    }

    const getScrollAmount = () =>
      Math.max(0, track.scrollWidth - viewport.clientWidth);

    gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount() + window.innerHeight * 0.6}`,
        scrub: 0.6,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!counterRef.current) return;
          const idx = Math.min(
            PANELS.length,
            Math.max(1, Math.round(self.progress * PANELS.length) || 1)
          );
          counterRef.current.textContent = String(idx).padStart(2, "0");
        },
      },
    });
  });

  return (
    <section
      id="crisis"
      ref={sectionRef}
      className="relative border-t border-line bg-abyssal py-12"
    >
      <div className="oceanic-grid pointer-events-none absolute inset-0 opacity-[0.15]" />

      <div className="relative flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[110rem] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:gap-6 md:px-10">
          {/* Sticky intro column */}
          <div className="crisis-intro relative z-10 md:col-span-4">
            <p className="label-story text-siren-song">CHAPTER 01 // THE CRISIS</p>
            <h2 className="display-chapter mt-4 text-villa-nova">
              THE ENTERPRISE
              <br />
              LIABILITY CRISIS.
            </h2>
            <p className="body-editorial mt-5 max-w-sm text-foreground-muted">
              Modern enterprises suffer from fragmented operational silos across Cybersecurity, Human Capital Onboarding, and Financial Compliance.
            </p>

            <div className="mt-8 flex items-center gap-3 font-mono text-xs text-siren-song">
              <span className="text-villa-nova text-base font-bold">
                <span ref={counterRef}>01</span>
              </span>
              <span className="h-px w-10 bg-siren-song/30" />
              <span>{String(PANELS.length).padStart(2, "0")}</span>
              <span className="ml-2 label-story text-[0.6rem] text-siren-song/60">
                SCROLL TO ADVANCE →
              </span>
            </div>
          </div>

          {/* Horizontally-scrolling panel track */}
          <div
            ref={trackViewportRef}
            className="relative col-span-1 h-[64vh] overflow-hidden md:col-span-8 md:h-[70vh]"
          >
            <div
              ref={trackRef}
              className="flex h-full items-stretch gap-6 will-change-transform"
            >
              {PANELS.map((p) => (
                <article
                  key={p.n}
                  className="crisis-panel ocean-glass relative flex h-full w-[82vw] shrink-0 flex-col justify-between rounded-2xl p-8 sm:w-[440px] md:p-9 border border-line-hi hover:border-siren-song transition-all"
                >
                  <div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-40"
                    style={{
                      boxShadow: `0 0 40px -10px ${p.color}`,
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between border-b border-line pb-4">
                      <p className="label-story text-siren-song">
                        {p.n} — {p.vertical}
                      </p>
                      {p.icon ? (
                        <p.icon className="h-6 w-6 text-villa-nova opacity-90" />
                      ) : null}
                    </div>

                    <h3 className="display-title mt-6 text-villa-nova">
                      {p.statement}
                    </h3>
                    <p className="body-editorial mt-4 text-sm text-foreground-muted leading-relaxed">
                      {p.body}
                    </p>
                  </div>

                  <div className="relative mt-6 pt-4 border-t border-line flex items-center justify-between">
                    <div>
                      <span className="font-sans text-2xl font-extrabold text-villa-nova">
                        {p.metric}
                      </span>
                      <p className="font-mono text-[10px] text-foreground-dim uppercase tracking-wider">
                        {p.metricLabel}
                      </p>
                    </div>
                    <span className="villa-tag text-[0.62rem]">
                      {p.tag}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
