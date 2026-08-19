import type { SVGProps } from "react";

/**
 * Minimalist line-art icon set — 1.5px stroke, currentColor, no fill.
 * Deliberately geometric/technical rather than "friendly AI" iconography.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconShieldAlert(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16 3.5 27 8v8c0 8-5 13.5-11 16.5C10 29.5 5 24 5 16V8l11-4.5Z" />
      <path d="M16 12v6" />
      <circle cx="16" cy="22" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconAttritionDrop(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12 12 17 18 11 27 19" />
      <path d="M20 19h7v-7" />
    </svg>
  );
}

export function IconLedgerCrack(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="5" width="20" height="22" rx="1.5" />
      <path d="M10 11h5M10 15h4" />
      <path d="M17 20l3-4 2 3 4-6" />
    </svg>
  );
}

export function IconKernel(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="11" y="11" width="10" height="10" rx="1" />
      <path d="M16 3v6M16 23v6M3 16h6M23 16h6M7 7l4 4M25 7l-4 4M7 25l4-4M25 25l-4-4" />
    </svg>
  );
}

export function IconGraph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="9" r="3.2" />
      <circle cx="23" cy="9" r="3.2" />
      <circle cx="16" cy="24" r="3.2" />
      <path d="M11.8 10.8 13.5 21M20.2 10.8 18.5 21M12.2 9h7.6" />
    </svg>
  );
}

export function IconNeuroSymbolic(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16 4v5M16 23v5M4 16h5M23 16h5" />
      <path d="M8 8l3.5 3.5M24 8l-3.5 3.5M8 24l3.5-3.5M24 24l-3.5-3.5" />
      <circle cx="16" cy="16" r="5.2" />
    </svg>
  );
}

export function IconSSO(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="16" cy="16" r="10.5" />
      <circle cx="16" cy="16" r="3.2" />
      <path d="M16 5.5v5M16 21.5v5M5.5 16h5M21.5 16h5" />
    </svg>
  );
}

export function IconPulseSignal(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 17h5l2.5-8 4 16 2.5-11 2 3h5" />
    </svg>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 23 23 9M12 9h11v11" />
    </svg>
  );
}
