"use client";

import React from "react";
import { LogoKarchxIcon } from "../icons";
import { useLoop } from "./use-loop";

// Steps taken from the KARCHX 12-check guide: offer, website, inquiry handling.
const steps = [
  { title: "Checking the first sentence of your offer", done: "Offer is clear" },
  { title: "Testing the main button on mobile", done: "Button works" },
  { title: "Giving every inquiry an owner", done: "Owners assigned" },
];

/** Looping "KARCHX working..." list: each step works (progress bar), then completes; the last holds, then it restarts. */
export function ApprovalDemo({ active }: { active: boolean }) {
  // 2 beats per step (low / high progress), then a hold with everything done.
  const stage = useLoop([1500, 1500, 1500, 1500, 1500, 1500, 2600], active);

  return (
    <div className="bg-[#f9f8f5]/95 backdrop-blur-xl border border-[#070503]/10 rounded-2xl p-5 shadow-2xl max-w-sm w-full mx-auto overflow-hidden">
      <div className="flex items-center gap-2 mb-3 text-[#070503]">
        <LogoKarchxIcon className={`w-4 h-4 ${active ? "" : ""}`} />
        <span className="text-xs font-semibold tracking-wide">KARCHX working...</span>
      </div>

      <div className="space-y-2 text-xs min-h-[150px]">
        {steps.map((s, k) => {
          const done = stage > 2 * k + 1;
          const working = !done && stage >= 2 * k;
          const high = stage === 2 * k + 1;
          return (
            <div
              key={s.title}
              className={`p-2.5 rounded-xl border transition-all duration-500 ${
                done
                  ? "bg-green-500/10 border-green-500/20"
                  : working
                    ? "bg-[#070503]/5 border-[#070503]/5"
                    : "bg-[#070503]/5 border-[#070503]/5 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {done ? (
                    <span className="w-4 h-4 shrink-0 rounded-full bg-green-600 text-white flex items-center justify-center text-[10px] animate-in zoom-in duration-300">✓</span>
                  ) : working ? (
                    <span className="w-4 h-4 shrink-0 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
                  ) : (
                    <span className="w-4 h-4 shrink-0 rounded-full border border-[#070503]/30" />
                  )}
                  <span className="font-medium truncate">{done ? s.done : s.title}</span>
                </div>
                {working && (
                  <span className="text-[10px] font-mono text-[#070503]/60 shrink-0">{high ? "10 / 12" : "4 / 12"}</span>
                )}
                {!done && !working && <span className="text-[10px] font-medium text-[#070503]/60 shrink-0">Up next</span>}
              </div>
              {working && (
                <div className="mt-2 h-1 rounded-full bg-[#070503]/10 overflow-hidden">
                  <div
                    className="h-full bg-[#f06800] rounded-full transition-[width] ease-linear"
                    style={{ width: high ? "82%" : "35%", transitionDuration: "1.4s" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
