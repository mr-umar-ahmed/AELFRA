"use client";

import { useRef } from "react";
import { useScene } from "@/lib/use-scene";
import { FluidLink } from "./fluid-link";

const TEAM = [
  { name: "Umar Ahmed", role: "Kernel Layer — Lead Security Engineer", accent: "#4E635E", colorName: "OCEAN DEEP (#4E635E)" },
  { name: "Syed Sirajuddin Zain", role: "People Layer — Lead AI Architect", accent: "#A6B49E", colorName: "SIREN SONG (#A6B49E)" },
  { name: "Syed Hammad Hussain", role: "Ledger Layer — Lead Financial Engineer", accent: "#818C78", colorName: "BIG RIVER (#818C78)" },
];

interface FooterSectionProps {
  onOpenAccessModal?: () => void;
}

export function FooterSection({ onOpenAccessModal }: FooterSectionProps) {
  const footerRef = useRef<HTMLDivElement>(null);

  useScene(footerRef, ({ gsap, reduced }) => {
    gsap.from(".footer-member", {
      opacity: 0,
      y: 36,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: { trigger: footerRef.current, start: "top 75%" },
    });

    if (reduced) {
      gsap.set(".footer-marquee-dup", { display: "none" });
      gsap.set(".footer-marquee-track", { justifyContent: "center" });
      return;
    }

    gsap.to(".footer-marquee-track", {
      xPercent: -50,
      duration: 38,
      ease: "none",
      repeat: -1,
    });
  });

  return (
    <footer id="footer" ref={footerRef} className="relative overflow-hidden border-t border-line bg-abyssal pt-24 md:pt-36">
      <div
        className="bloom absolute right-0 top-0 h-[28rem] w-[28rem] translate-x-1/3 -translate-y-1/3 bg-ocean-deep/20"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[110rem] px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between pb-12 border-b border-line gap-6">
          <div>
            <p className="label-story text-siren-song">THE ARCHITECTS &amp; FOUNDATION</p>
            <h2 className="display-chapter text-villa-nova mt-2">
              BUILDING THE UNBREAKABLE.
            </h2>
          </div>

          <button
            onClick={onOpenAccessModal}
            className="rounded-full bg-villa-nova text-abyssal px-6 py-3 font-sans text-xs font-bold tracking-wider hover:bg-white transition-colors uppercase shadow-[0_0_20px_rgba(226,224,200,0.3)]"
          >
            REQUEST ENTERPRISE DEMO
          </button>
        </div>

        <div className="mt-14 grid gap-14 md:grid-cols-3 md:gap-8">
          {TEAM.map((m) => (
            <div key={m.name} className="footer-member ocean-glass p-8 rounded-2xl border border-line">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 rounded-full border border-white/20"
                  style={{ background: m.accent }}
                />
                <span className="font-mono text-[10px] text-siren-song">{m.colorName}</span>
              </div>
              <h3 className="display-title mt-4 text-villa-nova">{m.name}</h3>
              <p className="label-story mt-1 text-[0.68rem] text-siren-song">
                {m.role}
              </p>
              <div className="mt-7 flex flex-col gap-4">
                <FluidLink href="https://github.com/mr-umar-ahmed/AELFRA.git">GitHub Repository</FluidLink>
                <FluidLink href="#">Systems Architecture Doc</FluidLink>
                <FluidLink href="#">eBPF Provenance Spec</FluidLink>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee wordmark */}
      <div className="relative mt-24 select-none overflow-hidden py-6 md:mt-32 border-t border-b border-line/40">
        <div className="footer-marquee-track flex w-max whitespace-nowrap">
          <span className="display-hero px-6 text-villa-nova/10">
            AELFRA&nbsp;&nbsp;·&nbsp;&nbsp;OCEAN DEEP&nbsp;&nbsp;·&nbsp;&nbsp;VILLA NOVA&nbsp;&nbsp;·&nbsp;&nbsp;SIREN SONG&nbsp;&nbsp;·&nbsp;&nbsp;BIG RIVER&nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
          <span className="footer-marquee-dup display-hero px-6 text-villa-nova/10" aria-hidden>
            AELFRA&nbsp;&nbsp;·&nbsp;&nbsp;OCEAN DEEP&nbsp;&nbsp;·&nbsp;&nbsp;VILLA NOVA&nbsp;&nbsp;·&nbsp;&nbsp;SIREN SONG&nbsp;&nbsp;·&nbsp;&nbsp;BIG RIVER&nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
        </div>
      </div>

      <div className="relative px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-[110rem] flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <p className="label-story text-[0.62rem] text-foreground-dim">
            © 2026 AELFRA SYSTEMS — SOVEREIGN INTELLIGENCE SUITE
          </p>
          <p className="label-story text-[0.62rem] text-foreground-dim">
            DESIGNED WITH OCEAN DEEP PALETTE (#4E635E, #E2E0C8, #A6B49E, #818C78)
          </p>
        </div>
      </div>
    </footer>
  );
}
