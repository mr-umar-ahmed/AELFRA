"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [hoverText, setHoverText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive element with custom data attribute
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest("[data-cursor]") as HTMLElement | null;
      if (interactiveEl) {
        setIsHovered(true);
        setHoverText(interactiveEl.getAttribute("data-cursor") || "");
      } else if (target?.closest("button, a, input, [role='button']")) {
        setIsHovered(true);
        setHoverText("");
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    function render() {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Primary Dot */}
      <div
        className="fixed h-2 w-2 rounded-full bg-villa-nova shadow-[0_0_10px_#E2E0C8] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />

      {/* Trailing Ring & Text Label */}
      <div
        className={`fixed flex items-center justify-center rounded-full border border-siren-song/60 bg-ocean-deep/20 backdrop-blur-xs -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isHovered
            ? "h-16 w-16 scale-110 border-villa-nova bg-ocean-deep/40"
            : "h-10 w-10 opacity-60"
        }`}
        style={{ left: `${trailingPos.x}px`, top: `${trailingPos.y}px` }}
      >
        {hoverText && (
          <span className="font-mono text-[9px] font-bold text-villa-nova uppercase tracking-wider text-center px-1">
            {hoverText}
          </span>
        )}
      </div>
    </div>
  );
}
