"use client";

import { useRef } from "react";
import { useScene } from "@/lib/use-scene";
import { FluidLink } from "./fluid-link";

const TEAM = [
  { name: "Umar Ahmed", role: "Kernel Layer — Lead Engineer", accent: "#06B6D4" },
  { name: "Syed Sirajuddin Zain", role: "People Layer — Lead Engineer", accent: "#9333EA" },
  { name: "Syed Hammad Hussain", role: "Ledger Layer — Lead Engineer", accent: "#7C5CDB" },
];

export function FooterSection() {
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
    <footer id="footer" ref={footerRef} className="relative overflow-hidden border-t border-line bg-obsidian pt-28 md:pt-36">
      <div
        className="bloom absolute right-0 top-0 h-[28rem] w-[28rem] translate-x-1/3 -translate-y-1/3 bg-cyan/[0.1]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[110rem] px-6 md:px-10">
        <p className="label-mono text-cyan">The Engineering Team</p>

        <div className="mt-10 grid gap-14 md:grid-cols-3 md:gap-8">
          {TEAM.map((m) => (
            <div key={m.name} className="footer-member">
              <span
                className="inline-block h-1.5 w-1.5 rounded-[2px]"
                style={{ background: m.accent, boxShadow: `0 0 10px ${m.accent}` }}
              />
              <h3 className="display-sm mt-4 text-foreground">{m.name}</h3>
              <p className="label-mono mt-2 text-[0.62rem]" style={{ color: m.accent }}>
                {m.role}
              </p>
              <div className="mt-7 flex flex-col gap-4">
                <FluidLink href="#">Portfolio</FluidLink>
                <FluidLink href="#">LinkedIn Profile</FluidLink>
                <FluidLink href="#">GitHub Profile</FluidLink>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Massive muted wordmark — slow infinite marquee */}
      <div className="relative mt-28 select-none overflow-hidden py-6 md:mt-36">
        <div className="footer-marquee-track flex w-max whitespace-nowrap">
          <span className="display-xl px-6 text-foreground/[0.055]">
            AELFRA&nbsp;&nbsp;·&nbsp;&nbsp;AELFRA&nbsp;&nbsp;·&nbsp;&nbsp;AELFRA&nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
          <span className="footer-marquee-dup display-xl px-6 text-foreground/[0.055]" aria-hidden>
            AELFRA&nbsp;&nbsp;·&nbsp;&nbsp;AELFRA&nbsp;&nbsp;·&nbsp;&nbsp;AELFRA&nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
        </div>
      </div>

      <div className="relative border-t border-line px-6 py-6 md:px-10">
        <div className="mx-auto flex max-w-[110rem] flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <p className="label-mono text-[0.6rem] text-muted">
            © 2026 Aelfra Systems — Final Year Engineering Project
          </p>
          <p className="label-mono text-[0.6rem] text-muted">
            Powered by a Unified Single Sign-On (SSO) &amp; WebSocket Architecture
          </p>
        </div>
      </div>
    </footer>
  );
}
