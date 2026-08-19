import { NavBar } from "@/components/nav-bar";
import { HeroSection } from "@/components/hero/hero-section";
import { CrisisSection } from "@/components/crisis/crisis-section";
import { ModulesSection } from "@/components/modules/modules-section";
import { ConvergenceSection } from "@/components/convergence/convergence-section";
import { FooterSection } from "@/components/footer/footer-section";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="relative bg-obsidian">
        <HeroSection />
        <CrisisSection />
        <ModulesSection />
        <ConvergenceSection />
        <FooterSection />
      </main>
    </>
  );
}
