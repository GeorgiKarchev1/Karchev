'use client'

import { useState } from 'react'
import { Loader2, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { useOS } from '@/context/OSContext'
import EmptyState from '@/components/os/EmptyState'
import type { WeeklyPlanDay } from '@/lib/os/types'

const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function PlanBoard() {
  const { profile, bootstrap, updatePlan, regenerate } = useOS()
  const [regenerating, setRegenerating] = useState(false)

  if (!profile) {
    return (
      <EmptyState
        title="Add your business context first"
        description="Your weekly plan is built from your pillars and ideas. Onboard to unlock this view."
      />
    )
  }

  if (!bootstrap) {
    return (
      <EmptyState
        title="Generate your weekly plan"
        description="Run the generator to build a Mon–Fri publishing rhythm from your business context."
        ctaLabel="Generate now"
      />
    )
  }

  const updateField = (
    index: number,
    field: keyof WeeklyPlanDay,
    value: string
  ) => {
    const next = bootstrap.weeklyPlan.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    )
    updatePlan(next)
  }

  const addDay = () => {
    const used = bootstrap.weeklyPlan.map((d) => d.day)
    const day = dayOptions.find((d) => !used.includes(d)) ?? 'Saturday'
    updatePlan([
      ...bootstrap.weeklyPlan,
      {
        day,
        pillar: bootstrap.pillars[0]?.title ?? 'Pillar',
        ideaTitle: 'New post',
        format: 'LinkedIn post',
        hook: 'Drop the hook here.',
        cta: 'Reply or DM',
      },
    ])
  }

  const removeDay = (index: number) => {
    updatePlan(bootstrap.weeklyPlan.filter((_, i) => i !== index))
  }

  const handleRegenerate = async () => {
    setRegenerating(true)
    try {
      await regenerate()
    } finally {
      setRegenerating(false)
    }
  }

  const pillarOptions = bootstrap.pillars.map((p) => p.title)

  return (
    <div className="space-y-6 px-6 py-8 md:px-10 md:py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#534b52]">
          {bootstrap.weeklyPlan.length} days locked. Swap any cell, pick the pillar,
          rewrite the hook.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={addDay}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#2d232e] bg-[#f7f4ea] px-4 py-2 text-sm font-bold text-[#2d232e] transition hover:bg-[#e0ddcf]"
          >
            <Plus className="h-4 w-4" />
            Add day
          </button>
          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#2d232e] bg-[#534b52] px-4 py-2 text-sm font-bold text-[#f1f0ea] shadow-[3px_3px_0px_#2d232e] transition hover:bg-[#2d232e] disabled:opacity-60"
          >
            {regenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Regenerate plan
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {bootstrap.weeklyPlan.map((row, index) => (
          <div
            key={`${row.day}-${index}`}
            className="glass-card flex flex-col gap-3 bg-[#f1f0ea] p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <select
                value={row.day}
                onChange={(e) => updateField(index, 'day', e.target.value)}
                className="rounded-full border-2 border-[#2d232e] bg-[#534b52] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f1f0ea] shadow-[2px_2px_0px_#2d232e]"
              >
                {dayOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeDay(index)}
                className="rounded-full border-2 border-[#2d232e] bg-[#f7f4ea] p-1.5 text-[#534b52] transition hover:bg-[#ddd7c8] hover:text-[#2d232e]"
                title="Remove day"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>

            <Field label="Pillar">
              <select
                value={row.pillar}
                onChange={(e) => updateField(index, 'pillar', e.target.value)}
                className="w-full rounded-xl border-2 border-[#2d232e] bg-[#f7f4ea] px-2 py-1.5 text-sm font-semibold text-[#2d232e]"
              >
                {pillarOptions.length === 0 ? (
                  <option value={row.pillar}>{row.pillar}</option>
                ) : (
                  pillarOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))
                )}
              </select>
            </Field>

            <Field label="Idea">
              <input
                value={row.ideaTitle}
                onChange={(e) => updateField(index, 'ideaTitle', e.target.value)}
                className="w-full rounded-xl border-2 border-[#2d232e] bg-[#f7f4ea] px-2 py-1.5 text-sm font-semibold text-[#2d232e] outline-none"
              />
            </Field>

            <Field label="Hook">
              <textarea
                value={row.hook}
                onChange={(e) => updateField(index, 'hook', e.target.value)}
                className="min-h-[72px] w-full rounded-xl border-2 border-[#2d232e] bg-[#f7f4ea] px-2 py-1.5 text-xs leading-5 text-[#2d232e] outline-none"
              />
            </Field>

            <div className="grid grid-cols-2 gap-2">
              <Field label="Format">
                <input
                  value={row.format}
                  onChange={(e) => updateField(index, 'format', e.target.value)}
                  className="w-full rounded-xl border-2 border-[#2d232e] bg-[#f7f4ea] px-2 py-1.5 text-xs font-semibold text-[#2d232e] outline-none"
                />
              </Field>
              <Field label="CTA">
                <input
                  value={row.cta}
                  onChange={(e) => updateField(index, 'cta', e.target.value)}
                  className="w-full rounded-xl border-2 border-[#2d232e] bg-[#f7f4ea] px-2 py-1.5 text-xs font-semibold text-[#2d232e] outline-none"
                />
              </Field>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[#534b52]">
        {label}
      </span>
      {children}
    </label>
  )
}
