"use client";

import { useState } from "react";

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessModal({ isOpen, onClose }: AccessModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    modules: [] as string[],
  });

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-abyssal/90 backdrop-blur-md">
      <div className="ocean-glass-hi relative w-full max-w-lg rounded-3xl p-8 border border-line-hi shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 font-mono text-xs text-siren-song hover:text-villa-nova p-2"
        >
          ✕ CLOSE
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="villa-tag text-[0.65rem]">ENTERPRISE ONBOARDING</span>
              <h3 className="display-title mt-2 text-villa-nova">Request Sovereign Access</h3>
              <p className="body-editorial mt-1 text-xs text-foreground-muted">
                Deploy Aelfra's Kernel Defense, AI Onboarding, and Financial Audit suite inside your private VPC.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="label-story text-[0.65rem] text-siren-song">FULL NAME</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Alex Vance"
                  className="w-full mt-1 bg-abyssal/90 border border-line px-4 py-2.5 rounded-xl text-xs font-mono text-villa-nova focus:outline-none focus:border-siren-song"
                />
              </div>

              <div>
                <label className="label-story text-[0.65rem] text-siren-song">WORK EMAIL</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@enterprise.com"
                  className="w-full mt-1 bg-abyssal/90 border border-line px-4 py-2.5 rounded-xl text-xs font-mono text-villa-nova focus:outline-none focus:border-siren-song"
                />
              </div>

              <div>
                <label className="label-story text-[0.65rem] text-siren-song">ORGANIZATION / DEPLOYMENT TARGET</label>
                <input
                  type="text"
                  required
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  placeholder="Sovereign Defense Systems Inc."
                  className="w-full mt-1 bg-abyssal/90 border border-line px-4 py-2.5 rounded-xl text-xs font-mono text-villa-nova focus:outline-none focus:border-siren-song"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-villa-nova text-abyssal py-3 font-sans text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(226,224,200,0.3)]"
            >
              SUBMIT DEPLOYMENT REQUEST
            </button>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ocean-deep/40 border border-siren-song/50 text-villa-nova font-bold text-xl">
              ✓
            </div>
            <h3 className="display-title text-villa-nova">Request Received</h3>
            <p className="body-editorial text-xs text-foreground-muted max-w-sm mx-auto">
              Thank you, <span className="text-villa-nova font-bold">{formData.name}</span>. Our lead architects (Umar Ahmed, Syed Sirajuddin Zain, Syed Hammad Hussain) have dispatched a sovereign deployment token to <span className="text-villa-nova">{formData.email}</span>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="rounded-full bg-ocean-deep px-6 py-2 text-xs font-mono text-villa-nova hover:bg-siren-song hover:text-abyssal transition-colors"
            >
              RETURN TO PLATFORM
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
