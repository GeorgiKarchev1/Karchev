"use client";

import React from "react";
import { FileText, Globe, Megaphone, Settings, Workflow } from "lucide-react";
import { ResearchBentoGrid } from "@/components/ui/research-bento-grid";

const WORK_TYPES = [
  { name: "Website or page", icon: Globe },
  { name: "Offer and texts", icon: FileText },
  { name: "Advertising and content", icon: Megaphone },
  { name: "Automation", icon: Workflow },
  { name: "Internal process", icon: Settings },
] as const;

/** Replaces "How KARCHX works": heading + animated bento grid (work-type picker + cursors, price card swap, scope toggle). */
export function BentoSection() {
  return (
    <section id="prices" className="scroll-mt-24 py-16 md:py-24 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <h2 className="font-serif-marist text-4xl sm:text-5xl md:text-6xl !text-[#070503] dark:!text-[#ffffff] font-normal tracking-tight leading-[1.1]">
          Start with what you need.
        </h2>
      </div>
      <div className="rounded-[28px] md:rounded-[40px] overflow-hidden border border-[#070503]/10 shadow-xl">
        <ResearchBentoGrid
          className="h-auto min-[860px]:h-[700px] overflow-visible md:p-5"
          brands={WORK_TYPES}
          monthlyPrice={250}
          previousPrice={null}
          currency="EUR"
          locale="en-IE"
          invoiceLabels={["Written scope", "Paid in advance"]}
          userLabel="You"
          collaboratorLabel="Georgi"
          copy={{
            showcaseTitle: "After the first conversation.",
            showcaseDescription:
              "After our first conversation and gathering the necessary information, I prepare a proposal based on the task, resources and your priorities.",
            pricingTitle: "One-off work.",
            pricingDescription: (
              <>
                A clearly defined task with agreed delivery and handover.
                <br />
                <br />
                Before we start, we agree on the price, payment terms and any costs for external tools. You can begin with a single service.
              </>
            ),
            pauseTitle: "Ongoing work.",
            activeDescription: "Continued delivery, progress reviews and next priorities where the task calls for them.",
            pausedDescription: "Continued delivery, progress reviews and next priorities where the task calls for them.",
            pauseLabel: "Agree terms",
            resumeLabel: "Agreed ✓",
          }}
        />
      </div>
    </section>
  );
}
