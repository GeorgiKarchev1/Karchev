'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Circle,
  Layers,
  Lightbulb,
  Megaphone,
  PenSquare,
  Recycle,
} from 'lucide-react'
import { useOS } from '@/context/OSContext'

export default function OverviewBoard() {
  const { profile, bootstrap, hasContent, regenerate } = useOS()

  const stats = useMemo(() => {
    return [
      {
        label: 'Pillars',
        value: bootstrap?.pillars.length ?? 0,
        href: '/os/pillars',
        icon: Layers,
      },
      {
        label: 'Weekly ideas',
        value: bootstrap?.ideas.length ?? 0,
        href: '/os/ideas',
        icon: Lightbulb,
      },
      {
        label: 'Hook templates',
        value: bootstrap?.hooks.length ?? 0,
        href: '/os/hooks',
        icon: Megaphone,
      },
      {
        label: 'Plan days',
        value: bootstrap?.weeklyPlan.length ?? 0,
        href: '/os/plan',
        icon: CalendarDays,
      },
    ]
  }, [bootstrap])

  const steps = [
    {
      title: 'Onboarding',
      description: 'Capture business context — offer, audience, pains, FAQs, tone, goals.',
      href: '/os/onboarding',
      icon: PenSquare,
      done: Boolean(profile),
    },
    {
      title: 'Pillars',
      description: 'Lock the 3–5 lanes everything else gets built around.',
      href: '/os/pillars',
      icon: Layers,
      done: hasContent,
    },
    {
      title: 'Weekly ideas',
      description: 'Ready-to-post ideas mapped to your pillars and audience.',
      href: '/os/ideas',
      icon: Lightbulb,
      done: hasContent,
    },
    {
      title: 'Hooks',
      description: 'Reusable hook library so you never start from a blank page.',
      href: '/os/hooks',
      icon: Megaphone,
      done: hasContent,
    },
    {
      title: 'Repurposing',
      description: 'One input → LinkedIn, Instagram, X thread, email, short video.',
      href: '/os/repurpose',
      icon: Recycle,
      done: false,
    },
    {
      title: 'Weekly plan',
      description: 'A real publishing rhythm. Mon–Fri locked, no guesswork.',
      href: '/os/plan',
      icon: CalendarDays,
      done: hasContent,
    },
  ]

  return (
    <div className="space-y-8 px-6 py-8 md:px-10 md:py-10">
      {!profile ? (
        <div className="glass-card flex flex-col gap-4 bg-[#534b52] p-6 text-[#f1f0ea] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ddd7c8]">
              Start here
            </p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              Build your business context first.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#ddd7c8]">
              We need your offer, audience, pains, FAQs, and goals to generate
              pillars, ideas, hooks and a weekly plan that actually sounds like you.
            </p>
          </div>
          <Link
            href="/os/onboarding"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#2d232e] bg-[#f1f0ea] px-6 py-3 font-bold text-[#2d232e] shadow-[4px_4px_0px_#2d232e] transition hover:bg-[#e0ddcf]"
          >
            Open onboarding
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : !hasContent ? (
        <div className="glass-card flex flex-col gap-4 bg-[#534b52] p-6 text-[#f1f0ea] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ddd7c8]">
              Profile saved
            </p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              Generate your first OS bootstrap.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#ddd7c8]">
              We'll turn your context into pillars, weekly ideas, hooks and a 5-day plan.
            </p>
          </div>
          <Link
            href="/os/onboarding"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#2d232e] bg-[#f1f0ea] px-6 py-3 font-bold text-[#2d232e] shadow-[4px_4px_0px_#2d232e] transition hover:bg-[#e0ddcf]"
          >
            Generate now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="glass-card flex flex-col gap-4 bg-[#f1f0ea] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#534b52]">
              System live
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#2d232e] md:text-3xl">
              Your content OS is ready.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#534b52]">
              Open any module to edit, regenerate, or repurpose. Everything is
              tied back to your business context.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/os/plan"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#2d232e] bg-[#534b52] px-6 py-3 font-bold text-[#f1f0ea] shadow-[4px_4px_0px_#2d232e] transition hover:bg-[#2d232e]"
            >
              View weekly plan
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => regenerate().catch(() => undefined)}
              className="rounded-full border-2 border-[#2d232e] bg-[#f7f4ea] px-6 py-3 text-sm font-bold text-[#2d232e] transition hover:bg-[#e0ddcf]"
            >
              Regenerate everything
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="glass-card group bg-[#f1f0ea] p-5 transition hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#534b52]">
                {stat.label}
              </p>
              <stat.icon className="h-4 w-4 text-[#534b52]" />
            </div>
            <p className="mt-3 text-5xl font-bold text-[#2d232e]">{stat.value}</p>
            <p className="mt-2 text-xs font-semibold text-[#534b52] transition group-hover:text-[#2d232e]">
              Open module →
            </p>
          </Link>
        ))}
      </div>

      <div>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#534b52]">
              The 6 modules
            </p>
            <h2 className="mt-1 text-2xl font-bold text-[#2d232e]">
              Your weekly content workflow
            </h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step) => (
            <Link
              key={step.title}
              href={step.href}
              className="glass-card group bg-[#f1f0ea] p-5 transition hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="rounded-xl border-2 border-[#2d232e] bg-[#534b52] p-2 text-[#f1f0ea] shadow-[3px_3px_0px_#2d232e]">
                  <step.icon className="h-4 w-4" />
                </div>
                {step.done ? (
                  <CheckCircle2 className="h-5 w-5 text-[#534b52]" />
                ) : (
                  <Circle className="h-5 w-5 text-[#534b52]/60" />
                )}
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#2d232e]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#534b52]">{step.description}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-[#2d232e] transition group-hover:text-[#534b52]">
                Open →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
