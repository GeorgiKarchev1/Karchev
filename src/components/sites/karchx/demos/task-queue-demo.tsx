"use client";

import React from "react";
import { LogoKarchxIcon } from "../icons";
import { useLoop } from "./use-loop";

const tasks = [
  { title: "Post 3 MetLife claims", working: "Posting claims...", done: "Claims posted" },
  { title: "Reconcile payment batch", working: "Reviewing payments...", done: "Payments matched" },
  { title: "Check underpayment on claim", working: "Checking claim...", done: "Flagged for review" },
  { title: "Pull EOBs from Dentrix portal", working: "Pulling EOBs...", done: "7 EOBs pulled" },
  { title: "File 21 secondaries", working: "Filing secondaries...", done: "21 filed" },
];

/** Looping "KARCHX working..." task queue: rows complete, the queue advances and refills. */
export function TaskQueueDemo({ active }: { active: boolean }) {
  const stage = useLoop(Array(tasks.length * 2).fill(1500), active); // 2 beats per task: working, just-done
  const cur = Math.floor(stage / 2);
  const justDone = stage % 2 === 1;
  // rows: previous (done), current, next two (cycling through the list)
  const idx = (n: number) => (n + tasks.length * 4) % tasks.length;
  const rows = [
    { key: cur - 1, t: tasks[idx(cur - 1)], state: "done" as const },
    { key: cur, t: tasks[idx(cur)], state: justDone ? ("done" as const) : ("working" as const) },
    { key: cur + 1, t: tasks[idx(cur + 1)], state: "next" as const },
    { key: cur + 2, t: tasks[idx(cur + 2)], state: "next" as const },
  ].slice(1, 4); // show current + next two; previous slides out

  return (
    <div className="bg-[#f9f8f5]/95 backdrop-blur-xl border border-[#070503]/10 rounded-2xl p-5 shadow-2xl max-w-sm w-full mx-auto transition-[height] duration-500">
      <div className="flex items-center gap-2 mb-4 text-[#070503]">
        <LogoKarchxIcon className={`w-4 h-4 ${active ? "" : ""}`} />
        <span className="text-xs font-semibold tracking-wide">KARCHX working...</span>
      </div>

      <div className="space-y-2 text-xs min-h-[148px]">
        {rows.map((r) => (
          <div
            key={r.key}
            className={`flex items-center justify-between p-2.5 rounded-xl border transition-all duration-500 animate-in fade-in slide-in-from-bottom-2 ${
              r.state === "done"
                ? "bg-green-500/10 border-green-500/20"
                : r.state === "working"
                  ? "bg-orange-500/10 border-orange-500/20"
                  : "bg-[#070503]/5 border-[#070503]/5 opacity-70"
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              {r.state === "done" ? (
                <span className="w-4 h-4 shrink-0 rounded-full bg-green-600 text-white flex items-center justify-center text-[10px] animate-in zoom-in duration-300">✓</span>
              ) : r.state === "working" ? (
                <span className="w-4 h-4 shrink-0 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
              ) : (
                <span className="w-4 h-4 shrink-0 rounded-full border border-[#070503]/30" />
              )}
              <span className="font-medium text-[#070503] truncate">{r.t.title}</span>
            </div>
            <span
              className={`text-[10px] font-medium shrink-0 ml-2 ${
                r.state === "done" ? "text-green-700" : r.state === "working" ? "text-orange-700" : "text-[#070503]/60"
              }`}
            >
              {r.state === "done" ? r.t.done : r.state === "working" ? r.t.working : "Up next"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
