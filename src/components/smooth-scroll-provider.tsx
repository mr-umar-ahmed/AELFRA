"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

/**
 * Returns the live Lenis instance (or null before mount / during SSR).
 * Read this inside event handlers, not render — it's a ref, not state,
 * so it won't trigger a re-render when the instance becomes available.
 */
export function useLenis() {
  return useContext(LenisContext)?.current ?? null;
}

/**
 * Global smooth-scroll driver. Wraps the whole app so any section can pin,
 * scrub, or programmatically scrollTo against one synchronized timeline.
 * Lenis owns the physical scroll; GSAP's ticker drives Lenis' RAF loop so
 * every ScrollTrigger stays perfectly in step with it.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafCallback = useRef<(time: number) => void>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const instance = new Lenis({
      duration: reduced ? 0 : 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduced,
      syncTouch: false,
      touchMultiplier: 1.15,
      wheelMultiplier: 1,
    });

    lenisRef.current = instance;
    instance.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      instance.raf(time * 1000);
    };
    rafCallback.current = onTick;
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (rafCallback.current) gsap.ticker.remove(rafCallback.current);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
