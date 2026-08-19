"use client";

import { useState, useRef, useEffect } from "react";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type LogEntry = {
  type: "input" | "output" | "error" | "system";
  text: string;
};

const INITIAL_LOGS: LogEntry[] = [
  { type: "system", text: "AELFRA SOVEREIGN OS CLI v2.4.0 (x86_64-kernel-ebpf)" },
  { type: "system", text: "Type 'help' to view available sovereign system commands." },
];

export function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  if (!isOpen) return null;

  function handleCommandSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newLogs: LogEntry[] = [...logs, { type: "input", text: `aelfra@sovereign-vpc:~$ ${cmd}` }];
    const parts = cmd.toLowerCase().split(" ");
    const mainCmd = parts[0];

    switch (mainCmd) {
      case "help":
      case "?":
        newLogs.push({
          type: "output",
          text: `
AVAILABLE SOVEREIGN COMMANDS:
  status        - View eBPF probes, RAG vector index, and audit ledger health.
  ebpf          - Run live eBPF kernel syscall probe simulation (execve, openat).
  rag [query]   - Search internal repository vectors & return line citations.
  audit         - Run neuro-symbolic deterministic decimal reconciliation.
  architects    - Print lead system architect roster (Umar, Zain, Hammad).
  theme         - Print Ocean Deep color palette specification.
  clear         - Clear terminal screen buffer.
  exit          - Close interactive terminal.
          `.trim(),
        });
        break;

      case "status":
        newLogs.push({
          type: "output",
          text: `
[SYSTEM TELEMETRY STATUS]
  ▸ LINUX KERNEL PROBES   : ACTIVE (eBPF 6.8 ring-buffer linked)
  ▸ VECTOR RAG INDEX      : ONLINE (14,920 code chunk embeddings)
  ▸ AUDIT GRAPH MATRIX    : VERIFIED (100% deterministic precision)
  ▸ DEPLOYMENT TARGET     : LOCAL PRIVATE VPC (Zero Cloud Exfiltration)
          `.trim(),
        });
        break;

      case "ebpf":
        newLogs.push({
          type: "output",
          text: `
[eBPF SYSCALL MONITOR RUNNING]
  [18:54:02.102] PROBE #1: execve("/bin/curl") -> PID 4092 -> PERMITTED
  [18:54:02.448] PROBE #2: openat("/etc/shadow") -> PID 8192 (npm_payload) -> [BLOCKED BY eBPF]
  [18:54:02.990] PROBE #3: connect("192.168.1.1") -> PID 4092 -> VERIFIED
  Result: 1 malicious memory exfiltration attack intercepted at kernel boundary.
          `.trim(),
        });
        break;

      case "rag":
        const query = parts.slice(1).join(" ") || "billing retry logic";
        newLogs.push({
          type: "output",
          text: `
[LOCAL RAG VECTOR SEARCH] Query: "${query}"
  ▸ CITATION #1 : src/lib/billing/retry.ts:88 (Match: 98.4%)
    Snippet: "Exponential backoff with jitter applied up to max_retries = 5."
  ▸ CITATION #2 : src/components/modules/module-card.tsx:24 (Match: 94.1%)
    Snippet: "Local RAG citation explorer showing line-level code verification."
  Verification: 0 cloud API calls made. Data stayed 100% inside perimeter.
          `.trim(),
        });
        break;

      case "audit":
        newLogs.push({
          type: "output",
          text: `
[NEURO-SYMBOLIC AUDIT RECONCILIATION]
  ▸ Invoice #9041 Subtotal : $12,990.00
  ▸ Tax (10%)              : $1,299.00
  ▸ Expected Total         : $14,289.00
  ▸ Raw LLM OCR output     : $14,289.0019 (⚠️ Floating Point Hallucination)
  ▸ Neuro-Symbolic Output  : $14,289.00 (✓ Deterministic Python Decimal Math)
  ▸ Graph Vendor Match     : Passed (0 shell company nodes)
          `.trim(),
        });
        break;

      case "architects":
        newLogs.push({
          type: "output",
          text: `
[AELFRA LEAD ARCHITECTS ROSTER]
  1. Umar Ahmed           - Lead Systems & Kernel Security Engineer (Module 01)
  2. Syed Sirajuddin Zain - Lead AI & Developer Experience Architect (Module 02)
  3. Syed Hammad Hussain  - Lead Financial Intelligence & Graph Engineer (Module 03)
          `.trim(),
        });
        break;

      case "theme":
        newLogs.push({
          type: "output",
          text: `
[OCEAN DEEP COLOR PALETTE SWATCHES]
  ■ OCEAN DEEP : #4E635E (RGB 78, 99, 94)   - Muted Ocean Deep Teal Accent
  ■ VILLA NOVA : #E2E0C8 (RGB 226, 224, 200)- Warm Sand Linen High-Craft Text
  ■ SIREN SONG : #A6B49E (RGB 168, 180, 158)- Soft Mint Foam Border Tone
  ■ BIG RIVER  : #818C78 (RGB 129, 140, 120)- Earthy Moss Slate Surface
          `.trim(),
        });
        break;

      case "clear":
        setLogs([]);
        setInputVal("");
        return;

      case "exit":
        onClose();
        setInputVal("");
        return;

      default:
        newLogs.push({
          type: "error",
          text: `Command not recognized: '${mainCmd}'. Type 'help' for available commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-abyssal/90 backdrop-blur-md">
      <div className="ocean-glass-hi relative w-full max-w-3xl rounded-2xl border border-line-hi shadow-2xl overflow-hidden flex flex-col h-[520px]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-abyssal/90 px-4 py-3 border-b border-line">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 font-mono text-xs text-siren-song font-semibold">
              aelfra-cli — sovereign-vpc (x86_64)
            </span>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-xs text-siren-song hover:text-villa-nova px-2"
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2 bg-abyssal/95 text-villa-nova">
          {logs.map((log, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap leading-relaxed ${
                log.type === "input"
                  ? "text-siren-song font-bold"
                  : log.type === "error"
                  ? "text-red-400"
                  : log.type === "system"
                  ? "text-foreground-dim italic"
                  : "text-villa-nova"
              }`}
            >
              {log.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <form onSubmit={handleCommandSubmit} className="flex items-center bg-abyssal/90 px-4 py-3 border-t border-line">
          <span className="font-mono text-xs text-siren-song font-bold mr-2">
            aelfra@sovereign-vpc:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="type 'help', 'status', 'ebpf', 'rag', 'audit'..."
            className="flex-1 bg-transparent border-none text-xs font-mono text-villa-nova focus:outline-none"
          />
        </form>
      </div>
    </div>
  );
}
