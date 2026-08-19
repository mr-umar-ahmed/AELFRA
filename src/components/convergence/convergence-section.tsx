"use client";

import { useRef } from "react";
import { useScene } from "@/lib/use-scene";
import { IconSSO } from "@/components/icons";

const ORBITS = [
  { label: "Kernel Defense", color: "#06B6D4", pos: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" },
  { label: "People Intelligence", color: "#9333EA", pos: "bottom-[6%] left-0 -translate-x-[15%] translate-y-1/2" },
  { label: "Financial Audit", color: "#7C5CDB", pos: "bottom-[6%] right-0 translate-x-[15%] translate-y-1/2" },
];

const PILLARS = [
  {
    k: "Shared identity",
    v: "One SSO domain, one directory, one session across all three engines.",
  },
  {
    k: "Shared telemetry",
    v: "Kernel events, sentiment signals, and financial evidence land in a single immutable audit spine.",
  },
  {
    k: "Shared deployment",
    v: "Self-hosted or private VPC over a real-time WebSocket fabric. No proprietary data ever leaves the perimeter.",
  },
];

export function ConvergenceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useScene(sectionRef, ({ gsap, reduced }) => {
    gsap.from(".conv-copy > *", {
      opacity: 0,
      y: 32,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: { trigger: ".conv-copy", start: "top 78%" },
    });

    gsap.from(".conv-ring", {
      scale: 0.7,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      stagger: 0.12,
      scrollTrigger: { trigger: ".conv-diagram", start: "top 72%" },
    });
    gsap.from(".conv-orbit", {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: "expo.out",
      stagger: 0.12,
      scrollTrigger: { trigger: ".conv-diagram", start: "top 65%" },
    });
    gsap.from(".conv-pillar", {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: { trigger: ".conv-pillars", start: "top 85%" },
    });

    if (!reduced) {
      gsap.to(".conv-ring-slow", {
        rotation: 360,
        duration: 90,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".conv-ring-mid", {
        rotation: -360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });
    }
  });

  return (
    <section id="convergence" ref={sectionRef} className="relative border-t border-line bg-obsidian py-28 md:py-40">
      <div
        className="bloom absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 bg-purple/[0.14]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[110rem] px-6 md:px-10">
        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-10">
          <div className="conv-copy">
            <p className="label-mono text-cyan">The Convergence</p>
            <h2 className="display-lg mt-6 max-w-[14ch]">
              Three engines. <span className="italic text-purple">One foundation.</span>
            </h2>
            <p className="body-lg mt-8 max-w-lg">
              Aelfra is a micro-platform suite, not a bundle. Runtime defense,
              people intelligence, and the audit engine share a foundation
              layer — identity, policy, embeddings, and an immutable
              evidence log — so a blocked syscall, a flight-risk alert, and a
              flagged invoice all resolve into the same record of what
              happened.
            </p>
          </div>

          <div className="conv-diagram relative mx-auto aspect-square w-full max-w-xl">
            <div className="conv-ring conv-ring-slow absolute inset-0 rounded-full border border-line-hi" />
            <div className="conv-ring conv-ring-mid absolute inset-[13%] rounded-full border border-line-hi" />
            <div className="conv-ring absolute inset-[27%] rounded-full border border-cyan/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass flex flex-col items-center gap-2 rounded-full px-9 py-9 text-center">
                <IconSSO className="h-7 w-7 text-cyan" />
                <p className="font-sans text-2xl font-bold tracking-[-0.02em]">Aelfra</p>
                <p className="label-mono text-[0.6rem]">Foundation · SSO</p>
              </div>
            </div>
            {ORBITS.map((o) => (
              <div
                key={o.label}
                className={`conv-orbit glass absolute ${o.pos} whitespace-nowrap rounded-full px-4 py-2`}
                style={{ borderColor: `${o.color}55`, boxShadow: `0 0 24px -8px ${o.color}66` }}
              >
                <span className="label-mono text-[0.62rem]" style={{ color: o.color }}>
                  {o.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="conv-pillars mt-24 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.k} className="conv-pillar bg-obsidian p-8 md:p-10">
              <p className="label-mono text-purple">{p.k}</p>
              <p className="body-sm mt-4">{p.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
