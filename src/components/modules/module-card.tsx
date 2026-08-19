import type { ComponentType, SVGProps } from "react";
import { IconArrowUpRight } from "@/components/icons";

export type ModuleData = {
  index: string;
  short: string;
  title: string;
  engineer: string;
  problem: string;
  solution: string;
  cta: string;
  accent: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export function ModuleCard({
  data,
  order,
  total,
}: {
  data: ModuleData;
  order: number;
  total: number;
}) {
  const Icon = data.icon;

  return (
    <div className="module-spacer relative" style={{ height: "170vh" }}>
      <div
        className="module-card-inner sticky flex items-center justify-center px-4 sm:px-6 md:px-10"
        style={{ top: `${4 + order * 1.4}vh`, height: "84vh", zIndex: order + 1 }}
      >
        <div
          className="relative flex h-full w-full max-w-[100rem] flex-col justify-between overflow-hidden rounded-[28px] p-7 sm:p-10 md:p-14"
          style={{
            background:
              "linear-gradient(160deg, rgba(19,28,49,0.92) 0%, rgba(6,9,18,0.94) 55%, rgba(0,0,0,0.96) 100%)",
            boxShadow: `0 40px 120px -24px rgba(0,0,0,0.9), 0 0 0 1px ${data.accent}33, 0 0 90px -24px ${data.accent}66`,
          }}
        >
          <span
            aria-hidden
            className="font-sans pointer-events-none absolute -right-6 -top-16 select-none text-[16rem] font-black leading-none opacity-[0.04] sm:text-[22rem] md:-top-24 md:text-[28rem]"
          >
            {data.index}
          </span>

          <div className="module-reveal relative flex items-start justify-between gap-6">
            <div>
              <p className="label-mono" style={{ color: data.accent }}>
                Module {data.index} — {data.short}
              </p>
              <h3 className="display-md mt-5 max-w-2xl text-foreground">
                {data.title}
              </h3>
            </div>
            <Icon
              className="hidden h-12 w-12 shrink-0 opacity-80 md:block lg:h-16 lg:w-16"
              style={{ color: data.accent }}
            />
          </div>

          <div className="relative grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="module-reveal md:col-span-3">
              <p className="label-mono text-muted-hi">Lead Engineer</p>
              <p className="mt-2 text-lg font-medium text-foreground">
                {data.engineer}
              </p>
            </div>
            <div className="module-reveal md:col-span-4">
              <p className="label-mono" style={{ color: data.accent }}>
                The Problem
              </p>
              <p className="body-sm mt-2">{data.problem}</p>
            </div>
            <div className="module-reveal md:col-span-5">
              <p className="label-mono" style={{ color: data.accent }}>
                The Solution
              </p>
              <p className="body-sm mt-2">{data.solution}</p>
            </div>
          </div>

          <div className="module-reveal relative flex flex-wrap items-center justify-between gap-5">
            <span className="label-mono text-[0.62rem] text-muted">
              {String(order + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="group flex items-center gap-2.5 rounded-md border px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] transition-all duration-300"
              style={{
                borderColor: `${data.accent}55`,
                color: data.accent,
                background: `${data.accent}14`,
              }}
            >
              {data.cta}
              <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
