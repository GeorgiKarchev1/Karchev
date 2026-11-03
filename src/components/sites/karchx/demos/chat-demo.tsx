"use client";

import React from "react";
import { LogoKarchxIcon } from "../icons";
import { useLoop, useTyped } from "./use-loop";

const QUESTION = "What’s the latest with the United Healthcare payments?";
const ANSWER = "Last week, KARCHX posted 876 claims and reconciled $106,768.05 in payments.";

/** Looping chat: question typed in the input bar -> sent -> thinking dots -> answer streams -> file chip. */
export function ChatDemo({ active }: { active: boolean }) {
  const stage = useLoop([2300, 1300, 3400, 2600], active);
  const typedQ = useTyped(QUESTION, active && stage === 0, 26);
  const typedA = useTyped(ANSWER, active && stage === 2, 26);
  const sent = stage >= 1;

  return (
    <div className="bg-[#f9f8f5]/95 backdrop-blur-xl border border-[#070503]/10 rounded-2xl p-5 shadow-2xl max-w-sm w-full mx-auto">
      <div className="space-y-3 mb-4 text-xs min-h-[150px]">
        {sent && (
          <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-400">
            <div className="bg-[#ddf3f9] text-[#0a2634] px-3.5 py-2 rounded-2xl rounded-tr-sm max-w-[85%]">{QUESTION}</div>
          </div>
        )}

        {sent && (
          <div className="flex gap-2.5 items-start animate-in fade-in duration-500">
            <div className="w-6 h-6 rounded-full bg-[#070503] text-white flex items-center justify-center shrink-0">
              <LogoKarchxIcon className={`w-3.5 h-3.5 ${stage === 1 ? "" : ""}`} />
            </div>
            <div className="flex-1 min-w-0">
              {stage === 1 ? (
                <div className="flex gap-1 pt-2" aria-label="KARCHX is thinking">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#070503]/40 animate-bounce" style={{ animationDelay: `${i * 140}ms` }} />
                  ))}
                </div>
              ) : (
                <div className="bg-[#ede8de] text-[#070503] px-3.5 py-2.5 rounded-2xl rounded-tl-sm text-xs leading-relaxed">
                  {typedA.split("$106,768.05").length > 1 ? (
                    <>
                      {typedA.split("$106,768.05")[0]}
                      <strong>$106,768.05</strong>
                      {typedA.split("$106,768.05")[1]}
                    </>
                  ) : (
                    <>
                      {typedA}
                      {stage === 2 && <span className="inline-block w-px h-3 bg-[#070503]/60 ml-0.5 align-middle animate-pulse" />}
                    </>
                  )}
                </div>
              )}
              {stage === 3 && (
                <div className="mt-2 inline-flex items-center gap-2 bg-[#f9f8f5] border border-[#070503]/10 rounded-lg px-2.5 py-1.5 text-[11px] animate-in fade-in slide-in-from-bottom-1 duration-500">
                  <span className="w-3 h-3 rounded-sm bg-[#f06800]/80" />
                  <span className="font-mono">UHC_week_summary.pdf</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#2c8fb8] text-white text-[8px] flex items-center justify-center">✓</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-[#070503]/10 pt-3 text-xs text-[#070503]/50">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold">+</span>
          <span className="text-[11px] truncate text-[#070503]/70">
            {stage === 0 ? (
              <>
                {typedQ}
                <span className="inline-block w-px h-3 bg-[#070503]/60 ml-px align-middle animate-pulse" />
              </>
            ) : (
              <span className="text-[#070503]/50">Ask anything...</span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span>🎙</span>
          <span className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] transition-all duration-300 ${stage === 0 && typedQ.length === QUESTION.length ? "bg-[#2c8fb8] scale-110" : "bg-[#070503]"}`}>↑</span>
        </div>
      </div>
    </div>
  );
}
