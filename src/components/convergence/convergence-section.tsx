"use client";

import { useRef } from "react";
import { useScene } from "@/lib/use-scene";
import { IconSSO } from "@/components/icons";

const ORBITS = [
  { label: "Kernel Defense (Umar Ahmed)", color: "#4E635E", pos: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" },
  { label: "AI Onboarding (Syed Sirajuddin Zain)", color: "#A6B49E", pos: "bottom-[6%] left-0 -translate-x-[15%] translate-y-1/2" },
  { label: "Financial Audit (Syed Hammad Hussain)", color: "#818C78", pos: "bottom-[6%] right-0 translate-x-[15%] translate-y-1/2" },
];

const PILLARS = [
  {
    k: "SHARED SOVEREIGN IDENTITY",
    v: "Single SSO domain, role-based access control, and unified session audit across all three core micro-engines.",
  },
  {
    k: "IMMUTABLE EVIDENCE SPINE",
    v: "Kernel-level sys-events, vector embedding citations, and financial ledger graphs land in a single tamper-proof log.",
  },
  {
    k: "ZERO-TRUST PERIMETER",
    v: "Self-hosted deployment inside your private VPC. No proprietary source code or financial records ever leave your boundary.",
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
    <section id="convergence" ref={sectionRef} className="relative border-t border-line bg-abyssal py-28 md:py-40">
      <div
        className="bloom absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 bg-ocean-deep/20"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[110rem] px-6 md:px-10">
        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-10">
          <div className="conv-copy">
            <p className="label-story text-siren-song">CHAPTER 05 // CONVERGENCE</p>
            <h2 className="display-chapter mt-4 text-villa-nova max-w-[14ch]">
              THREE ENGINES. <br />
              <span className="italic text-siren-song">ONE FOUNDATION.</span>
            </h2>
            <p className="body-editorial mt-6 max-w-lg text-foreground-muted">
              Aelfra is a unified sovereign micro-platform suite. Kernel defense, developer onboarding, and autonomous financial audit share a core foundation layer — identity, telemetry, policy, and vector embeddings — so every system event and audit record resolves into one single source of truth.
            </p>
          </div>

          <div className="conv-diagram relative mx-auto aspect-square w-full max-w-xl">
            <div className="conv-ring conv-ring-slow absolute inset-0 rounded-full border border-line-hi" />
            <div className="conv-ring conv-ring-mid absolute inset-[13%] rounded-full border border-line-hi" />
            <div className="conv-ring absolute inset-[27%] rounded-full border border-siren-song/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="ocean-glass-hi flex flex-col items-center gap-2 rounded-full px-9 py-9 text-center border border-line-hi">
                <IconSSO className="h-8 w-8 text-villa-nova" />
                <p className="font-sans text-2xl font-bold tracking-tight text-villa-nova">AELFRA</p>
                <p className="label-story text-[0.6rem] text-siren-song">SOVEREIGN CORE</p>
              </div>
            </div>
            {ORBITS.map((o) => (
              <div
                key={o.label}
                className={`conv-orbit ocean-glass absolute ${o.pos} whitespace-nowrap rounded-full px-4 py-2 border border-line-hi`}
                style={{ boxShadow: `0 0 24px -8px ${o.color}88` }}
              >
                <span className="label-story text-[0.65rem] text-villa-nova">
                  {o.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="conv-pillars mt-24 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.k} className="conv-pillar ocean-glass p-8 md:p-10">
              <p className="label-story text-siren-song">{p.k}</p>
              <p className="body-editorial mt-3 text-sm text-foreground-muted">{p.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
