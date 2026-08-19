"use client";

import { useRef } from "react";
import { useScene } from "@/lib/use-scene";
import { IconKernel, IconNeuroSymbolic, IconPulseSignal } from "@/components/icons";
import { ModuleCard, type ModuleData } from "./module-card";

const MODULES: ModuleData[] = [
  {
    index: "01",
    short: "Linux Kernel Sandbox Runtime Defense",
    title: "Kernel-Level Runtime Defense Engine",
    engineer: "Umar Ahmed",
    role: "Lead Systems & Security Engineer",
    problem:
      "Threat actors obfuscate malicious code inside trusted packages that bypass static CI/CD scanners and execute payload exfiltrations directly in memory at runtime.",
    solution:
      "Deploys safe eBPF probes directly into the Linux kernel space to intercept unauthorized system calls (execve, openat, connect) and block payloads using Temporal Provenance Graphs.",
    cta: "Launch eBPF Sandbox Demo",
    accent: "#4E635E",
    icon: IconKernel,
    interactiveType: "ebpf",
  },
  {
    index: "02",
    short: "Enterprise AI Onboarding & People Ops",
    title: "Enterprise AI Onboarding & Vector RAG Agent",
    engineer: "Syed Sirajuddin Zain",
    role: "Lead AI & Developer Experience Architect",
    problem:
      "New engineers take up to 4.2 months to become productive due to fragmented codebases, while engineering teams suffer silent burnout with zero early warning indicators.",
    solution:
      "Combines local RAG vector search over internal repositories with privacy-preserving sentiment analysis to provide instant line-level code citations and proactive retention metrics.",
    cta: "Launch RAG Onboarding Agent",
    accent: "#A6B49E",
    icon: IconPulseSignal,
    interactiveType: "rag",
  },
  {
    index: "03",
    short: "Autonomous AI Chartered Accountant",
    title: "Autonomous AI Chartered Accountant & Trade Audit",
    engineer: "Syed Hammad Hussain",
    role: "Lead Financial Intelligence & Graph Engineer",
    problem:
      "Standard LLMs hallucinate floating-point arithmetic causing costly reconciliation errors, while manual accounting fails to uncover multi-hop shell company vendor fraud.",
    solution:
      "Uses a Neuro-Symbolic architecture separating neural document perception from deterministic Python decimal math, combined with a multi-hop Graph Database for instant fraud detection.",
    cta: "Launch Financial Audit Engine",
    accent: "#818C78",
    icon: IconNeuroSymbolic,
    interactiveType: "audit",
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
    <section id="modules" ref={sectionRef} className="relative bg-abyssal">
      <div className="modules-head mx-auto max-w-[110rem] px-6 pb-16 pt-24 md:px-10 md:pt-32">
        <p className="label-story text-siren-song">THE MICRO-PLATFORM SUITE</p>
        <h2 className="display-chapter mt-4 max-w-3xl text-villa-nova">
          THREE ENGINES.
          <br />
          INDEPENDENTLY LETHAL.
        </h2>
        <p className="body-editorial mt-5 max-w-xl text-foreground-muted">
          Not a fragmented bundle of SaaS plugins — three purpose-built sovereign engines, each solving a critical enterprise operational risk on a unified foundation.
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
