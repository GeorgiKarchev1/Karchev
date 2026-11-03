"use client";

import React from "react";
import { useLoop, useTyped } from "./use-loop";

const CODE = `inquiries = load("inquiries.csv")
for item in inquiries:
    if item.owner is None:
        assign(item, "Georgi")
    schedule_followup(item)
print(summary(inquiries))`;

const OUTPUT = [
  "12 inquiries loaded",
  "3 without an owner, now assigned",
  "5 follow-ups scheduled",
  "Done in 0.4s",
];

const TYPE_MS = Math.round((CODE.length / 42) * 1000) + 300;

const TOKEN = /("[^"]*"|\b(?:for|in|if|is|None)\b|\b[a-z_]+(?=\())/g;

function highlight(line: string) {
  const parts = line.split(TOKEN);
  return parts.map((p, i) => {
    if (!p) return null;
    let cls = "text-[#d6d3cd]";
    if (p.startsWith('"')) cls = "text-[#8fd694]";
    else if (/^(for|in|if|is|None)$/.test(p)) cls = "text-[#c792ea]";
    else if (/^[a-z_]+$/.test(p) && line.includes(p + "(")) cls = "text-[#7cb7ff]";
    return (
      <span key={i} className={cls}>
        {p}
      </span>
    );
  });
}

/** Looping terminal: code types out, runs, prints its output, then restarts. */
export function CodeRunDemo({ active }: { active: boolean }) {
  // stages: 0 typing, 1 pause, 2 running, 3 output appears, 4 hold
  const stage = useLoop([TYPE_MS, 500, 900, 2100, 2800], active);
  const typed = useTyped(CODE, active && stage === 0, 42);
  const shown = stage === 0 ? typed : CODE;
  const lines = shown.split("\n");

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e10]/95 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[10px] tracking-wide text-white/50">follow_up.py</span>
      </div>

      <div className="h-[262px] px-4 py-3 font-mono text-[11px] leading-[1.65]">
        <div className="whitespace-pre">
          {lines.map((l, i) => (
            <div key={i}>
              {highlight(l)}
              {stage === 0 && i === lines.length - 1 && (
                <span className="ml-px inline-block h-[13px] w-[6px] translate-y-[2px] animate-pulse bg-white/80" />
              )}
            </div>
          ))}
        </div>

        {stage >= 2 && (
          <div className="mt-3 border-t border-white/10 pt-3">
            <div className="flex items-center gap-2 text-white/60">
              <span className="text-[#8fd694]">$</span>
              <span>python follow_up.py</span>
              {stage === 2 && (
                <span className="ml-1 h-2.5 w-2.5 animate-spin rounded-full border border-white/70 border-t-transparent" />
              )}
            </div>
            {stage >= 3 && (
              <div className="mt-1.5 space-y-0.5">
                {OUTPUT.map((o, i) => (
                  <div
                    key={o}
                    className="animate-in fade-in slide-in-from-bottom-1 fill-mode-both text-[#d6d3cd]"
                    style={{ animationDelay: `${i * 380}ms`, animationDuration: "400ms" }}
                  >
                    <span className="mr-2 text-[#8fd694]">{i < OUTPUT.length - 1 ? "✓" : "→"}</span>
                    {o}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
