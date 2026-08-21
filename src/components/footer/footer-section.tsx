"use client";

import { useRef } from "react";
import { useScene } from "@/lib/use-scene";
import { FluidLink } from "./fluid-link";
import { IconGithub, IconLinkedin, IconGlobe, IconMail, IconExternalLink } from "@/components/icons";

const TEAM = [
  {
    name: "Umar Ahmed",
    role: "Kernel Layer // Lead Systems & Security Engineer",
    module: "Aelfra Aegis (Linux Kernel Sandbox)",
    accent: "#4E635E",
    colorName: "OCEAN DEEP (#4E635E)",
    links: [
      {
        label: "LinkedIn Profile",
        href: "https://www.linkedin.com/in/umar-ahmed-93658b272?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        icon: IconLinkedin,
      },
      {
        label: "Personal Portfolio",
        href: "https://umar-s-portfolio-ten.vercel.app/",
        icon: IconGlobe,
      },
      {
        label: "GitHub (@mr-umar-ahmed)",
        href: "https://github.com/mr-umar-ahmed",
        icon: IconGithub,
      },
    ],
  },
  {
    name: "Syed Sirajuddin Zain",
    role: "People Layer // Lead AI Architect",
    module: "Enterprise AI Onboarding & Vector RAG",
    accent: "#A6B49E",
    colorName: "SIREN SONG (#A6B49E)",
    links: [
      {
        label: "LinkedIn Profile",
        href: "https://www.linkedin.com/in/syed-sirajuddin-zain-1b582a366",
        icon: IconLinkedin,
      },
      {
        label: "Personal Portfolio",
        href: "https://zainportfoliooo.netlify.app",
        icon: IconGlobe,
      },
      {
        label: "GitHub (@syedsirajuddinzain)",
        href: "https://github.com/syedsirajuddinzain",
        icon: IconGithub,
      },
    ],
  },
  {
    name: "Syed Hammad Hussain",
    role: "Ledger Layer // Lead Financial Intelligence Engineer",
    module: "Autonomous AI Chartered Accountant & Audit",
    accent: "#818C78",
    colorName: "BIG RIVER (#818C78)",
    links: [
      {
        label: "LinkedIn Profile",
        href: "https://www.linkedin.com/in/syed-hammad-hussain-012607393/",
        icon: IconLinkedin,
      },
      {
        label: "GitHub (@Mr-Hammad-codes)",
        href: "https://github.com/Mr-Hammad-codes",
        icon: IconGithub,
      },
      {
        label: "Email: syedhammadhussain416@gmail.com",
        href: "mailto:syedhammadhussain416@gmail.com",
        icon: IconMail,
      },
    ],
  },
  {
    name: "AELFRA PLATFORM",
    role: "Sovereign Intelligence Architecture",
    module: "Open Source Repository",
    accent: "#E2E0C8",
    colorName: "VILLA NOVA (#E2E0C8)",
    links: [
      {
        label: "GitHub Repository",
        href: "https://github.com/mr-umar-ahmed/AELFRA",
        icon: IconGithub,
      },
      {
        label: "Launch Aelfra Aegis",
        href: "https://aelfra-aegis.vercel.app/",
        icon: IconExternalLink,
      },
    ],
  },
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
      stagger: 0.12,
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
    <footer id="footer" ref={footerRef} className="relative overflow-hidden border-t border-line bg-abyssal pt-8 md:pt-12">
      <div
        className="bloom absolute right-0 top-0 h-[30rem] w-[30rem] translate-x-1/3 -translate-y-1/3 bg-ocean-deep/20"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[110rem] px-6 md:px-10">
        {/* Simple Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between pb-6 border-b border-line gap-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-villa-nova shadow-[0_0_8px_#E2E0C8] animate-pulse" />
            <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-villa-nova">
              LEAD ARCHITECTS
            </h2>
          </div>
          
          <a
            href="https://github.com/mr-umar-ahmed/AELFRA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-siren-song/40 bg-ocean-deep/30 px-5 py-2 font-mono text-xs font-bold text-villa-nova hover:bg-ocean-deep hover:border-villa-nova transition-all shadow-[0_0_20px_rgba(78,99,94,0.3)]"
          >
            <IconGithub className="h-4 w-4 text-villa-nova" />
            AELFRA REPOSITORY
          </a>
        </div>

        {/* 4 Cards (3 Architects + 1 Repo) */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="footer-member cyber-card p-6 md:p-8 rounded-2xl border border-line-hi relative overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle top glow bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-70"
                style={{ background: m.accent }}
              />

              <div>
                <div className="flex items-center justify-between border-b border-line/60 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="inline-block h-3.5 w-3.5 rounded-full border border-white/20 shadow-[0_0_8px_rgba(226,224,200,0.2)]"
                      style={{ background: m.accent }}
                    />
                    <span className="font-mono text-[10px] text-siren-song">{m.colorName}</span>
                  </div>
                  <span className="villa-tag text-[0.6rem]">CORE LEAD</span>
                </div>

                <h3 className="display-title mt-5 text-villa-nova">{m.name}</h3>
                <p className="font-mono text-xs text-villa-nova/90 mt-1.5 font-semibold">
                  {m.role}
                </p>
                <p className="label-story text-[0.65rem] text-siren-song/80 mt-1">
                  {m.module}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-line/60 flex flex-col gap-3.5">
                {m.links.map((link) => (
                  <FluidLink key={link.label} href={link.href} icon={link.icon}>
                    {link.label}
                  </FluidLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee wordmark */}
      <div className="relative mt-20 select-none overflow-hidden py-6 md:mt-28 border-t border-b border-line/40">
        <div className="footer-marquee-track flex w-max whitespace-nowrap">
          <span className="display-hero px-6 text-villa-nova/10">
            AELFRA&nbsp;&nbsp;·&nbsp;&nbsp;AELFRA AEGIS&nbsp;&nbsp;·&nbsp;&nbsp;OCEAN DEEP&nbsp;&nbsp;·&nbsp;&nbsp;VILLA NOVA&nbsp;&nbsp;·&nbsp;&nbsp;SIREN SONG&nbsp;&nbsp;·&nbsp;&nbsp;BIG RIVER&nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
          <span className="footer-marquee-dup display-hero px-6 text-villa-nova/10" aria-hidden>
            AELFRA&nbsp;&nbsp;·&nbsp;&nbsp;AELFRA AEGIS&nbsp;&nbsp;·&nbsp;&nbsp;OCEAN DEEP&nbsp;&nbsp;·&nbsp;&nbsp;VILLA NOVA&nbsp;&nbsp;·&nbsp;&nbsp;SIREN SONG&nbsp;&nbsp;·&nbsp;&nbsp;BIG RIVER&nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* Bottom Copyright and Palette Reference */}
      <div className="relative px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-[110rem] flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <p className="label-story text-[0.62rem] text-foreground-dim">
            © 2026 AELFRA SYSTEMS — SOVEREIGN INTELLIGENCE PLATFORM
          </p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-foreground-dim">PALETTE:</span>
            <span className="h-2 w-2 rounded-full bg-[#4E635E]" title="Ocean Deep" />
            <span className="h-2 w-2 rounded-full bg-[#E2E0C8]" title="Villa Nova" />
            <span className="h-2 w-2 rounded-full bg-[#A6B49E]" title="Siren Song" />
            <span className="h-2 w-2 rounded-full bg-[#818C78]" title="Big River" />
          </div>
          <p className="label-story text-[0.62rem] text-foreground-dim">
            UMAR AHMED · SYED SIRAJUDDIN ZAIN · SYED HAMMAD HUSSAIN
          </p>
        </div>
      </div>
    </footer>
  );
}

