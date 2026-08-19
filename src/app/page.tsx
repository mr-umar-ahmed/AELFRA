"use client";

import { useState } from "react";
import { NavBar } from "@/components/nav-bar";
import { HeroSection } from "@/components/hero/hero-section";
import { CrisisSection } from "@/components/crisis/crisis-section";
import { ModulesSection } from "@/components/modules/modules-section";
import { ConvergenceSection } from "@/components/convergence/convergence-section";
import { FooterSection } from "@/components/footer/footer-section";
import { AccessModal } from "@/components/access-modal";
import { TerminalModal } from "@/components/terminal-modal";
import { CustomCursor } from "@/components/cursor";

export default function Home() {
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isTerminalModalOpen, setIsTerminalModalOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <NavBar
        onOpenAccessModal={() => setIsAccessModalOpen(true)}
        onOpenTerminalModal={() => setIsTerminalModalOpen(true)}
      />
      <main className="relative bg-abyssal">
        <HeroSection />
        <CrisisSection />
        <ModulesSection />
        <ConvergenceSection />
        <FooterSection onOpenAccessModal={() => setIsAccessModalOpen(true)} />
      </main>
      <AccessModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
      />
      <TerminalModal
        isOpen={isTerminalModalOpen}
        onClose={() => setIsTerminalModalOpen(false)}
      />
    </>
  );
}
