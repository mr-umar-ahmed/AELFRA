import { IconArrowUpRight } from "@/components/icons";

/**
 * CSS-only "fluid" hover: the label rolls up and is replaced by a
 * gradient-clipped duplicate — cheap, GPU-friendly, no extra WebGL context.
 */
export function FluidLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <a
      href={href}
      className="group relative inline-flex w-fit items-center gap-2 font-mono text-sm text-muted-hi"
    >
      <span className="relative block overflow-hidden leading-tight">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute left-0 top-full block bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
        >
          {children}
        </span>
      </span>
      <IconArrowUpRight className="h-3 w-3 -translate-x-1 text-cyan opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
    </a>
  );
}
