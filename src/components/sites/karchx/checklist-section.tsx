"use client";

import React from "react";
import { useRevealOnce } from "@/hooks/use-scroll";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M6 18 18 6M8.5 6H18v9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

const POINTS = [
  "What is getting in your way and what you want to achieve.",
  "A sensible first step based on what you have and your priorities.",
  "Whether I can help and what we need to clarify for a proposal.",
];

/** "What will we clarify in 30 minutes?" — two-column band: pitch + button on the left, "30 minutes" on the right. */
export function ChecklistSection() {
  const { ref, shown } = useRevealOnce<HTMLElement>(0.2);

  return (
    <section ref={ref} id="checklist" className="scroll-mt-24 mx-3 md:mx-5 rounded-[40px] md:rounded-[72px] overflow-hidden bg-[#F3F0E9] font-sans text-[#141414]">
      <div
        className={`mx-auto grid max-w-[1180px] gap-12 px-6 py-16 transition-all duration-1000 ease-out md:grid-cols-[1.25fr_1fr] md:gap-0 md:py-20 ${
          shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Left */}
        <div className="md:pr-12">
          <h2 className="font-serif-marist text-[clamp(2.2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-tight md:whitespace-nowrap">
            What will we clarify
            <br />
            <span className="text-[#141414]/60">in 30 minutes?</span>
          </h2>

          <p className="mt-7 max-w-[34rem] text-[15px] leading-[1.9] tracking-[-0.01em] text-[#141414]/65">
            We start with your specific task. You tell me what you want to improve, and I help outline a possible approach.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <button
              type="button"
              onClick={() => document.getElementById("get-in-touch")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="inline-flex items-center gap-4 rounded-lg bg-[#141414] px-[13px] py-[14px] text-[15px] font-medium tracking-[-0.01em] text-white transition-colors hover:bg-black"
            >
              Request a free call
              <Arrow className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="mt-7 max-w-[34rem] text-[15px] leading-[1.6] tracking-[-0.01em] text-[#141414]/55">The call is free, with no obligation to buy. Detailed audits, training and implementation are agreed separately.</p>
        </div>

        {/* Right */}
        <div className="md:border-l md:border-[#141414]/20 md:pl-12">
          <div className="text-[clamp(6rem,13vw,10rem)] font-normal leading-[0.9] tracking-[-0.06em]">30</div>
          <p className="mt-6 max-w-[17rem] text-[22px] leading-[1.4] tracking-[-0.03em]">
            minutes, starting with your specific task
          </p>
          <ul className="mt-9 max-w-[24.5rem] border-t border-[#141414]/20 text-[14px] tracking-[-0.01em]">
            {POINTS.map((t) => (
              <li key={t} className="border-b border-[#141414]/20 py-[14px] last:border-b-0">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-[24.5rem] text-[13px] leading-[1.6] tracking-[-0.01em] text-[#141414]/55">
            A short description is enough. If available, bring a website link or an example of the task. You do not need a technical brief.
          </p>
        </div>
      </div>
    </section>
  );
}
