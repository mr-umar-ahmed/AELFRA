"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import { IconArrowUpRight } from "@/components/icons";

export type ModuleData = {
  index: string;
  short: string;
  title: string;
  engineer: string;
  role: string;
  problem: string;
  solution: string;
  cta: string;
  accent: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  interactiveType: "ebpf" | "rag" | "audit";
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
  const [activeTab, setActiveTab] = useState<number>(0);
  const [interactiveInput, setInteractiveInput] = useState<string>("");

  return (
    <div className="module-spacer relative" style={{ height: "185vh" }}>
      <div
        className="module-card-inner sticky flex items-center justify-center px-4 sm:px-6 md:px-10"
        style={{ top: `${5 + order * 1.5}vh`, minHeight: "86vh", zIndex: order + 1 }}
      >
        <div
          className="relative flex h-full w-full max-w-[100rem] flex-col justify-between overflow-hidden rounded-[28px] p-7 sm:p-10 md:p-12 ocean-glass-hi border border-line-hi"
          style={{
            boxShadow: `0 40px 120px -24px rgba(0,0,0,0.95), 0 0 50px -15px ${data.accent}44`,
          }}
        >
          {/* Watermark Index Number */}
          <span
            aria-hidden
            className="font-sans pointer-events-none absolute -right-6 -top-16 select-none text-[16rem] font-black leading-none text-villa-nova opacity-[0.03] sm:text-[22rem] md:-top-24 md:text-[26rem]"
          >
            {data.index}
          </span>

          {/* Module Header */}
          <div className="module-reveal relative flex items-start justify-between gap-6 border-b border-line pb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="villa-tag text-[0.65rem]">
                  CHAPTER // {data.index}
                </span>
                <span className="font-mono text-xs text-siren-song uppercase tracking-wider">
                  {data.short}
                </span>
              </div>
              <h3 className="display-chapter mt-3 max-w-3xl text-villa-nova">
                {data.title}
              </h3>
            </div>
            <div className="hidden sm:flex items-center justify-center p-4 rounded-2xl bg-abyssal/60 border border-line">
              <Icon className="h-10 w-10 text-villa-nova" />
            </div>
          </div>

          {/* Module Content & Interactive Demo Grid */}
          <div className="relative my-6 grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left Narrative Column */}
            <div className="flex flex-col justify-between gap-6 lg:col-span-5">
              {/* Lead Engineer Badge */}
              <div className="ocean-glass p-5 rounded-2xl border border-line flex items-center justify-between">
                <div>
                  <p className="label-story text-siren-song">LEAD ARCHITECT</p>
                  <p className="mt-1 text-lg font-bold text-villa-nova">{data.engineer}</p>
                  <p className="font-mono text-xs text-foreground-dim">{data.role}</p>
                </div>
                <span className="h-3 w-3 rounded-full bg-villa-nova shadow-[0_0_10px_#E2E0C8] animate-pulse" />
              </div>

              {/* Problem / Solution Split */}
              <div className="space-y-4">
                <div className="rounded-xl bg-abyssal/40 p-4 border border-line">
                  <p className="label-story text-siren-song">THE PROBLEM</p>
                  <p className="body-editorial mt-1 text-sm text-foreground-muted">{data.problem}</p>
                </div>
                <div className="rounded-xl bg-ocean-deep/20 p-4 border border-line-ocean">
                  <p className="label-story text-villa-nova">THE SOVEREIGN SOLUTION</p>
                  <p className="body-editorial mt-1 text-sm text-foreground-muted">{data.solution}</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Simulation Widget */}
            <div className="lg:col-span-7 ocean-glass rounded-2xl p-6 border border-line-hi flex flex-col justify-between">
              {data.interactiveType === "ebpf" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <span className="font-mono text-xs text-siren-song font-semibold tracking-wider">
                      LIVE eBPF SYSCALL TELEMETRY // LINUX KERNEL
                    </span>
                    <span className="font-mono text-[10px] text-villa-nova bg-ocean-deep px-2 py-0.5 rounded-full">
                      PROBE ACTIVE
                    </span>
                  </div>

                  <div className="font-mono text-xs space-y-2 bg-abyssal/80 p-4 rounded-xl border border-line text-foreground-muted">
                    <div className="flex items-center justify-between text-siren-song border-b border-line/40 pb-2">
                      <span>TIMESTAMP</span>
                      <span>SYSCALL</span>
                      <span>PROCESS</span>
                      <span>ACTION</span>
                    </div>
                    <div className={`flex justify-between items-center transition-all ${activeTab === 0 ? 'text-villa-nova bg-ocean-deep/30 px-2 py-1 rounded' : ''}`}>
                      <span>18:54:02.102</span>
                      <span className="text-siren-song">execve("/bin/curl")</span>
                      <span>node_app (pid 4092)</span>
                      <span className="text-villa-nova font-bold">PERMITTED</span>
                    </div>
                    <div className={`flex justify-between items-center transition-all ${activeTab === 1 ? 'text-villa-nova bg-ocean-deep/30 px-2 py-1 rounded' : ''}`}>
                      <span>18:54:02.448</span>
                      <span className="text-siren-song">openat("/etc/shadow")</span>
                      <span>malicious_npm</span>
                      <span className="text-red-400 font-bold bg-red-950/60 px-1.5 py-0.5 rounded">BLOCKED [eBPF]</span>
                    </div>
                    <div className={`flex justify-between items-center transition-all ${activeTab === 2 ? 'text-villa-nova bg-ocean-deep/30 px-2 py-1 rounded' : ''}`}>
                      <span>18:54:02.990</span>
                      <span className="text-siren-song">connect("192.168.1.1")</span>
                      <span>internal_service</span>
                      <span className="text-villa-nova font-bold">VERIFIED</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {["Simulate Normal Call", "Simulate Payload Exploit", "View Provenance Graph"].map((btn, i) => (
                      <button
                        key={btn}
                        onClick={() => setActiveTab(i)}
                        className={`font-mono text-[11px] px-3 py-1.5 rounded-lg border transition-all ${
                          activeTab === i
                            ? "bg-villa-nova text-abyssal border-villa-nova font-bold"
                            : "bg-abyssal/60 text-siren-song border-line hover:border-siren-song"
                        }`}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {data.interactiveType === "rag" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <span className="font-mono text-xs text-siren-song font-semibold tracking-wider">
                      VECTOR RAG CITATION ENGINE // LOCAL REPOSITORY SEARCH
                    </span>
                    <span className="font-mono text-[10px] text-villa-nova bg-ocean-deep px-2 py-0.5 rounded-full">
                      98.8% MATCH
                    </span>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Ask onboarding question e.g. 'How is billing retry logic handled?'..."
                      value={interactiveInput}
                      onChange={(e) => setInteractiveInput(e.target.value)}
                      className="w-full bg-abyssal/80 border border-line px-4 py-2 rounded-xl text-xs font-mono text-villa-nova focus:outline-none focus:border-siren-song"
                    />

                    <div className="bg-abyssal/80 p-4 rounded-xl border border-line space-y-2">
                      <div className="flex items-center justify-between font-mono text-[11px] text-siren-song">
                        <span>EXACT CITATION SOURCE</span>
                        <span className="text-villa-nova font-bold">src/lib/billing/retry.ts:88</span>
                      </div>
                      <p className="font-mono text-xs text-foreground-muted italic bg-abyssal p-2.5 rounded border border-line">
                        "Exponential backoff with jitter is applied up to max_retries = 5 before triggering deadlock fallback alert."
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-mono text-foreground-dim">
                        <span>Verified by Local Embedding Index</span>
                        <span className="text-villa-nova">Zero Cloud Data Exfiltration</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {data.interactiveType === "audit" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <span className="font-mono text-xs text-siren-song font-semibold tracking-wider">
                      NEURO-SYMBOLIC AUDIT MATRIX // DETERMINISTIC RECONCILIATION
                    </span>
                    <span className="font-mono text-[10px] text-villa-nova bg-ocean-deep px-2 py-0.5 rounded-full">
                      PRECISION 100%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="bg-red-950/20 border border-red-900/40 p-3.5 rounded-xl">
                      <p className="text-red-400 font-bold text-[10px] uppercase">RAW LLM OCR (Standard)</p>
                      <p className="mt-1 text-foreground-muted">Invoice #9041: $14,290.00</p>
                      <p className="mt-1 text-red-400 text-[11px]">⚠️ Floating point rounding error: $14,290.0019</p>
                    </div>

                    <div className="bg-ocean-deep/30 border border-siren-song/40 p-3.5 rounded-xl">
                      <p className="text-villa-nova font-bold text-[10px] uppercase">NEURO-SYMBOLIC (Aelfra)</p>
                      <p className="mt-1 text-villa-nova">Exact Decimal: $14,290.00</p>
                      <p className="mt-1 text-siren-song text-[11px]">✓ Multi-hop graph vendor match verified</p>
                    </div>
                  </div>

                  <div className="bg-abyssal/80 p-3 rounded-xl border border-line font-mono text-[11px] flex justify-between items-center text-siren-song">
                    <span>MULTI-HOP VENDOR GRAPH</span>
                    <span className="text-villa-nova font-bold">0 SUSPICIOUS SHELL NODES DETECTED</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Module Footer CTA */}
          <div className="module-reveal relative flex flex-wrap items-center justify-between gap-5 border-t border-line pt-6">
            <span className="label-story text-[0.68rem] text-siren-song">
              CHAPTER {data.index} OF {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="group flex items-center gap-2.5 rounded-full bg-villa-nova text-abyssal px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(226,224,200,0.3)]"
            >
              {data.cta}
              <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
