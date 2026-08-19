"use client";

import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";

interface NavBarProps {
  onOpenAccessModal?: () => void;
  onOpenTerminalModal?: () => void;
}

export function NavBar({ onOpenAccessModal, onOpenTerminalModal }: NavBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [activeChapter, setActiveChapter] = useState("01 PROLOGUE");

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (barRef.current) {
          barRef.current.style.width = `${self.progress * 100}%`;
        }

        const p = self.progress;
        if (p < 0.15) setActiveChapter("01 PROLOGUE");
        else if (p < 0.35) setActiveChapter("02 CRISIS");
        else if (p < 0.55) setActiveChapter("03 KERNEL DEFENSE");
        else if (p < 0.72) setActiveChapter("04 ONBOARDING AI");
        else if (p < 0.88) setActiveChapter("05 AUTONOMOUS AUDIT");
        else setActiveChapter("06 CONVERGENCE");
      },
    });

    return () => st.kill();
  }, []);

  return (
    <>
      {/* Top Hairline Progress Bar */}
      <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-abyssal-surface/50 backdrop-blur-xs">
        <div
          ref={barRef}
          className="h-full w-0 bg-gradient-to-r from-ocean-deep via-siren-song to-villa-nova transition-all duration-75 shadow-[0_0_12px_#4E635E]"
        />
      </div>

      {/* Floating Header Dock */}
      <header className="fixed inset-x-0 top-4 z-40 px-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between ocean-glass rounded-full px-4 py-2.5 shadow-2xl transition-all border border-line-hi">
          
          {/* Logo & Status */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-ocean-deep/30 border border-siren-song/30">
              <span className="h-2 w-2 rounded-full bg-villa-nova shadow-[0_0_8px_#E2E0C8] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-sm font-bold tracking-wider text-villa-nova uppercase">
                AELFRA
              </span>
              <span className="font-mono text-[9px] tracking-widest text-siren-song/80 uppercase">
                SOVEREIGN INTELLIGENCE
              </span>
            </div>
          </div>

          {/* Active Story HUD (Desktop) */}
          <div className="hidden md:flex items-center gap-2 rounded-full bg-abyssal/60 border border-line px-4 py-1.5">
            <span className="font-mono text-[10px] text-siren-song tracking-widest uppercase">
              CHAPTER //
            </span>
            <span className="font-mono text-xs font-semibold text-villa-nova tracking-wider min-w-[140px] text-center">
              {activeChapter}
            </span>
          </div>

          {/* Theme Palette Swatches & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Color Palette Indicators */}
            <div className="hidden lg:flex items-center gap-1 bg-abyssal/40 px-2.5 py-1 rounded-full border border-line">
              <span title="Ocean Deep (#4E635E)" className="h-3 w-3 rounded-full bg-[#4E635E] border border-white/10" />
              <span title="Villa Nova (#E2E0C8)" className="h-3 w-3 rounded-full bg-[#E2E0C8] border border-white/10" />
              <span title="Siren Song (#A6B49E)" className="h-3 w-3 rounded-full bg-[#A6B49E] border border-white/10" />
              <span title="Big River (#818C78)" className="h-3 w-3 rounded-full bg-[#818C78] border border-white/10" />
            </div>

            {/* Terminal CLI Launcher */}
            <button
              onClick={onOpenTerminalModal}
              data-cursor="CLI"
              className="flex items-center gap-1.5 rounded-full bg-abyssal-surface-hi/60 border border-line px-3 py-1.5 text-xs text-siren-song hover:text-villa-nova hover:border-siren-song transition-all"
              title="Launch Sovereign CLI Terminal"
            >
              <span className="font-mono text-[11px] font-bold text-villa-nova">&gt;_</span>
              <span className="font-mono text-[10px] uppercase tracking-wider hidden sm:inline">
                CLI
              </span>
            </button>

            {/* Audio Toggle Simulation */}
            <button
              onClick={() => setIsPlayingSound(!isPlayingSound)}
              className="flex items-center gap-1.5 rounded-full bg-abyssal-surface-hi/60 border border-line px-3 py-1.5 text-xs text-foreground-muted hover:text-villa-nova hover:border-siren-song transition-all"
              title="Toggle Story Soundscape"
            >
              <div className="flex items-end gap-[2px] h-3">
                <span className={`w-[2px] bg-siren-song transition-all ${isPlayingSound ? 'h-3 animate-pulse' : 'h-1.5'}`} />
                <span className={`w-[2px] bg-villa-nova transition-all ${isPlayingSound ? 'h-2 animate-bounce' : 'h-2'}`} />
                <span className={`w-[2px] bg-ocean-deep transition-all ${isPlayingSound ? 'h-3 animate-pulse' : 'h-1'}`} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider hidden lg:inline">
                {isPlayingSound ? "AUDIO ON" : "AUDIO MUTED"}
              </span>
            </button>

            {/* Access Modal CTA */}
            <button
              onClick={onOpenAccessModal}
              data-cursor="ACCESS"
              className="rounded-full bg-villa-nova text-abyssal px-4 py-1.5 font-sans text-xs font-bold tracking-wider hover:bg-white transition-colors uppercase shadow-[0_0_15px_rgba(226,224,200,0.3)]"
            >
              REQUEST ACCESS
            </button>
          </div>

        </div>
      </header>
    </>
  );
}
