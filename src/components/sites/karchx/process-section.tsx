"use client";

import React from "react";
import { FileText, Hammer, PackageCheck, Search } from "lucide-react";
import { useRevealOnce } from "@/hooks/use-scroll";

const STEPS = [
  {
    icon: Search,
    title: "I understand what you want to achieve",
    text: "You tell me how you work, what you have tried and where you lose time or opportunities. We identify the most useful improvement to start with.",
  },
  {
    icon: FileText,
    title: "You receive a specific proposal",
    text: "I set out the scope, stages, price and expected timeline. You know what you will receive, what I need from you and how we will check the work.",
  },
  {
    icon: Hammer,
    title: "I build it, and we review it together",
    text: "I carry out the agreed work, share progress and collect feedback. We check the finished solution using real tasks and content.",
  },
  {
    icon: PackageCheck,
    title: "You receive the finished work and guidance",
    text: "I hand over the agreed materials, setup and instructions. Where needed, I train you or your team and clarify the arrangements for ongoing support.",
  },
] as const;

/** Dashed elbow leaving the middle of a card's side edge and dropping into the next card (md and up only). */
function Elbow({ dir }: { dir: "right" | "left" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-1/2 hidden h-[calc(50%+48px)] w-[22.4%] border-t border-dashed border-[#070503]/35 dark:border-white/35 md:block ${
        dir === "right" ? "left-full rounded-tr-[20px] border-r" : "right-full rounded-tl-[20px] border-l"
      }`}
    >
      <span
        className={`absolute -bottom-px h-0 w-0 border-x-[4px] border-t-[6px] border-x-transparent border-t-[#070503]/45 dark:border-t-white/45 ${
          dir === "right" ? "-right-[4.5px]" : "-left-[4.5px]"
        }`}
      />
    </div>
  );
}

/** "A clear task. Practical delivery." — four step cards in a staircase (stacked on phones). */
export function ProcessSection() {
  const { ref, shown } = useRevealOnce<HTMLElement>(0.15);

  return (
    <section ref={ref} id="process" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h2
        className={`mb-10 text-center font-serif-marist text-4xl font-normal leading-[1.1] tracking-tight !text-[#070503] transition-all duration-1000 ease-out dark:!text-[#ffffff] sm:text-5xl md:mb-16 md:text-6xl ${
          shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        A clear task.
        <br />
        Practical delivery.
      </h2>

      <ol className="mx-auto flex max-w-[640px] flex-col md:max-w-none">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const right = i % 2 === 1;
          const dark = i % 2 === 1;
          return (
            <React.Fragment key={s.title}>
              <li
                className={`relative flex gap-3 rounded-[28px] border border-[#070503]/10 p-3 transition-all duration-700 ease-out sm:gap-4 sm:p-4 md:w-[58%] md:rounded-[32px] ${
                  right ? "md:ml-[42%]" : ""
                } ${dark ? "bg-white dark:bg-[#1c1c1c]" : "bg-[#F3F0E9]"} ${
                  shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${150 + i * 140}ms` }}
              >
                {i < STEPS.length - 1 && <Elbow dir={right ? "left" : "right"} />}
                <div
                  className={`flex w-11 shrink-0 items-center justify-center rounded-full py-4 max-md:my-4 text-[12px] font-medium tracking-[0.04em] text-white sm:w-12 sm:text-[13px] ${
                    "bg-[#070503]"
                  }`}
                >
                  <span className="flex rotate-180 items-center gap-1.5 [writing-mode:vertical-rl]">
                    <span>Step</span>
                    <span>{i + 1}</span>
                  </span>
                </div>
                <div className="min-w-0 py-1 pr-1 text-[#070503]">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#070503]/[0.06] dark:bg-white/10">
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <h3 className="font-serif-marist text-[20px] font-normal leading-[1.2] tracking-tight sm:text-[22px] md:text-[24px]">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.65] tracking-[-0.01em] text-[#070503]/65 dark:text-white/70 sm:text-[15px]">{s.text}</p>
                </div>
              </li>
              {i < STEPS.length - 1 && (
                <>
                  {/* phone: short dashed vertical link */}
                  <div aria-hidden className="ml-[34px] h-7 w-px border-l border-dashed border-[#070503]/35 dark:border-white/35 md:hidden" />
                  <div aria-hidden className="hidden h-12 md:block" />
                </>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </section>
  );
}
