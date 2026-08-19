"use client";

import { useRef } from "react";
import { useScene } from "@/lib/use-scene";
import { IconKernel, IconNeuroSymbolic, IconPulseSignal } from "@/components/icons";
import { ModuleCard, type ModuleData } from "./module-card";

const MODULES: ModuleData[] = [
  {
    index: "01",
    short: "Kernel Layer",
    title: "Kernel-Level Runtime Defense",
    engineer: "Umar Ahmed",
    problem:
      "Threat actors obfuscate malicious code within trusted packages that bypass static scanners and activate only at runtime to steal credentials.",
    solution:
      "Deploys safe eBPF probes directly in the Linux kernel to intercept system calls and block unauthorized actions using Temporal Provenance Graphs.",
    cta: "Launch eBPF Engine",
    accent: "#06B6D4",
    icon: IconKernel,
  },
  {
    index: "02",
    short: "People Layer",
    title: "AI-Powered HR Performance & Attrition Management",
    engineer: "Syed Sirajuddin Zain",
    problem:
      "Companies lack early warning indicators for workplace burnout, relying on biased reviews and discovering problems only after key talent resigns.",
    solution:
      "Combines NLP sentiment analysis with daily work signals to generate live, predictive risk scores and early flight-risk alerts.",
    cta: "Launch People Ops Engine",
    accent: "#9333EA",
    icon: IconPulseSignal,
  },
  {
    index: "03",
    short: "Ledger Layer",
    title: "Autonomous AI CA & Trade Audit Engine",
    engineer: "Syed Hammad Hussain",
    problem:
      "Standard LLMs hallucinate deterministic arithmetic causing costly accounting errors, while manual audits miss complex shell company fraud.",
    solution:
      "Uses a Neuro-Symbolic Architecture to extract data, cross-references policies via local RAG, and utilizes a Graph Database to hunt for vendor spoofing.",
    cta: "Launch Financial Audit Engine",
    accent: "#7C5CDB",
    icon: IconNeuroSymbolic,
  },
];

export function ModulesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useScene(sectionRef, ({ gsap, reduced }) => {
    gsap.from(".modules-head > *", {
      opacity: 0,
      y: 32,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: { trigger: ".modules-head", start: "top 78%" },
    });

    const inners = gsap.utils.toArray<HTMLElement>(".module-card-inner");
    inners.forEach((inner) => {
      gsap.from(inner.querySelectorAll(".module-reveal"), {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: { trigger: inner, start: "top 68%" },
      });
    });

    if (reduced) return;

    const spacers = gsap.utils.toArray<HTMLElement>(".module-spacer");
    spacers.forEach((spacer, i) => {
      if (i === 0) return;
      const prevInner = inners[i - 1];
      gsap.to(prevInner, {
        scale: 0.92,
        filter: "brightness(0.5)",
        ease: "none",
        scrollTrigger: {
          trigger: spacer,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
    });
  });

  return (
    <section id="modules" ref={sectionRef} className="relative bg-obsidian">
      <div className="modules-head mx-auto max-w-[110rem] px-6 pb-16 pt-28 md:px-10 md:pt-36">
        <p className="label-mono text-cyan">The Micro-Platform Suite</p>
        <h2 className="display-lg mt-5 max-w-3xl">
          Three engines.
          <br />
          Independently lethal.
        </h2>
        <p className="body-lg mt-6 max-w-xl">
          Not a bundle of point solutions — three purpose-built engines,
          each solving a distinct enterprise liability, deployed on one
          shared foundation.
        </p>
      </div>

      <div className="relative">
        {MODULES.map((m, i) => (
          <ModuleCard key={m.title} data={m} order={i} total={MODULES.length} />
        ))}
      </div>
    </section>
  );
}
