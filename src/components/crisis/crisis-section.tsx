"use client";

import { useRef } from "react";
import { useScene } from "@/lib/use-scene";
import { IconAttritionDrop, IconLedgerCrack, IconShieldAlert } from "@/components/icons";

const PANELS = [
  {
    n: "01",
    vertical: "Cybersecurity",
    color: "var(--color-cyan)",
    icon: IconShieldAlert,
    statement: "Untraceable runtime intrusions.",
    body: "Threat actors obfuscate malicious code inside trusted packages. Static scanners approve the manifest — the payload only activates at runtime, quietly exfiltrating credentials.",
    tag: "eBPF blind spot",
  },
  {
    n: "02",
    vertical: "Human Capital",
    color: "var(--color-purple)",
    icon: IconAttritionDrop,
    statement: "Attrition discovered too late.",
    body: "Biased annual reviews miss the daily signals of burnout. Key engineers are already gone before any dashboard shows a problem.",
    tag: "Zero early warning",
  },
  {
    n: "03",
    vertical: "Financial Compliance",
    color: "var(--color-cyan)",
    icon: IconLedgerCrack,
    statement: "Arithmetic you can't audit.",
    body: "Manual reconciliation misses vendor spoofing and shell-company fraud hidden one hop away in the ledger — and LLMs hallucinate the math.",
    tag: "Unverified ledger",
  },
  {
    n: "04",
    vertical: "The Resolution",
    color: "var(--color-purple)",
    icon: null,
    statement: "One foundation. Not three tools.",
    body: "Rather than deploying isolated, disconnected point solutions, Aelfra unifies these critical verticals under a shared microservices foundation.",
    tag: "Aelfra unifies",
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
            Math.max(1, Math.round(self.progress * PANELS.length) || 1),
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
      className="relative border-t border-line bg-obsidian"
    >
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-[0.15]" />

      <div className="relative flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[110rem] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:gap-6 md:px-10">
          {/* Sticky intro column — stays put while panels scroll past on the right */}
          <div className="crisis-intro relative z-10 md:col-span-4">
            <p className="label-mono text-cyan">The Problem</p>
            <h2 className="display-lg mt-5">
              The Enterprise
              <br />
              Liability Crisis.
            </h2>
            <p className="body-lg mt-6 max-w-sm">
              Modern enterprises suffer from fragmented, manual, and
              high-risk operational silos across Cybersecurity, Human
              Capital, and Financial Compliance.
            </p>
            <div className="mt-10 flex items-center gap-3 font-mono text-xs text-muted-hi">
              <span className="text-foreground">
                <span ref={counterRef}>01</span>
              </span>
              <span className="h-px w-8 bg-line-hi" />
              <span>{String(PANELS.length).padStart(2, "0")}</span>
              <span className="ml-2 label-mono text-[0.6rem] text-muted">
                Scroll to advance →
              </span>
            </div>
          </div>

          {/* Horizontally-scrolling panel track */}
          <div
            ref={trackViewportRef}
            className="relative col-span-1 h-[62vh] overflow-hidden md:col-span-8 md:h-[68vh]"
          >
            <div
              ref={trackRef}
              className="flex h-full items-stretch gap-6 will-change-transform"
            >
              {PANELS.map((p) => (
                <article
                  key={p.n}
                  className="crisis-panel glass edge-glow relative flex h-full w-[78vw] shrink-0 flex-col justify-between rounded-2xl p-8 sm:w-[420px] md:p-9"
                >
                  <div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-60"
                    style={{
                      boxShadow: `0 0 0 1px ${p.color}22, 0 0 60px -20px ${p.color}55`,
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <p className="label-mono" style={{ color: p.color }}>
                        {p.n} — {p.vertical}
                      </p>
                      {p.icon ? (
                        <p.icon
                          className="h-7 w-7 opacity-80"
                          style={{ color: p.color }}
                        />
                      ) : null}
                    </div>
                    <h3 className="display-sm mt-6 text-foreground">
                      {p.statement}
                    </h3>
                    <p className="body-sm mt-4">{p.body}</p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-2">
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ background: p.color }}
                    />
                    <span className="label-mono text-[0.62rem] text-muted-hi">
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
