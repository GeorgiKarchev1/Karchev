"use client";

import React, { useState } from "react";
import { ChevronIcon } from "./icons";

const faqs = [
  {
    question: "Is the call free?",
    answer:
      "Yes. It is up to 30 minutes by phone, with no obligation to buy. We clarify your task and whether working together makes sense. Detailed audits, training and implementation are separate paid work.",
  },
  {
    question: "What should I prepare?",
    answer:
      "A few sentences about what you want to improve. If you have a website, content or a particular workflow, you can describe it. You do not need to understand AI or coding.",
  },
  {
    question: "Can I start with one small task?",
    answer:
      "Yes. I work with independent professionals and businesses. We can start with one specific task in the chosen area. We agree on the scope beforehand.",
  },
  {
    question: "When will I know the price?",
    answer:
      "Once we have clarified the task and gathered the necessary information, I prepare a specific proposal. Before paid work begins, you know the scope, price, expected timeline and any external tool costs.",
  },
  {
    question: "Does submitting the form book a time?",
    answer:
      "Not automatically. I will contact you to confirm a convenient time. If you leave only an email address, I will email you first to arrange the call.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="free-call" className="scroll-mt-24 mx-3 md:mx-5 rounded-[40px] md:rounded-[72px] bg-[#F3F0E9]">
    <div className="py-20 md:py-32 max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-serif-marist text-4xl sm:text-5xl md:text-6xl text-[#070503] font-normal tracking-tight">
          Before you request a call.
        </h2>
      </div>

      <div className="divide-y divide-[#070503]/10 border-y border-[#070503]/10">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={faq.question} className="py-4 transition-colors">
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left gap-4 focus:outline-none group"
                aria-expanded={isOpen}
              >
                <span className="font-serif-marist text-base sm:text-lg md:text-[20px] text-[#070503] font-normal group-hover:text-[#1d6bff] transition-colors">
                  {faq.question}
                </span>
                <span className="text-[#070503]/40 group-hover:text-[#070503] shrink-0">
                  <ChevronIcon className="w-5 h-5" expanded={isOpen} />
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                aria-hidden={!isOpen}
              >
                <div className="overflow-hidden">
                  <div className="mt-4 pr-12 text-[#070503]/70 text-sm sm:text-base leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </section>
  );
}
