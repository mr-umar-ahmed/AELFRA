"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "./gsap";

type SceneCtx = {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  reduced: boolean;
};

/**
 * Scopes a GSAP context (and its ScrollTriggers) to `ref`'s subtree and
 * reverts everything automatically on unmount. `setup` runs once on mount;
 * it may return its own cleanup which runs before the context reverts.
 */
export function useScene(
  ref: RefObject<HTMLElement | null>,
  setup: (ctx: SceneCtx) => void | (() => void),
) {
  useEffect(() => {
    if (!ref.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cleanup: void | (() => void);

    const ctx = gsap.context(() => {
      cleanup = setup({ gsap, ScrollTrigger, reduced });
    }, ref);

    return () => {
      if (typeof cleanup === "function") cleanup();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
