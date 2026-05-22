'use client'

import { useState } from 'react'
import { Loader2, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { useOS } from '@/context/OSContext'
import EmptyState from '@/components/os/EmptyState'
import type { ContentPillar } from '@/lib/os/types'

export default function PillarsBoard() {
  const { bootstrap, profile, updatePillars, regenerate } = useOS()
  const [regenerating, setRegenerating] = useState(false)

  if (!profile) {
    return (
      <EmptyState
        title="Add your business context first"
        description="We build pillars from your offer, audience, and pains. Finish onboarding to unlock this view."
      />
    )
  }

  if (!bootstrap) {
    return (
      <EmptyState
        title="Generate your first OS bootstrap"
        description="Your profile is saved. Run the generator to build pillars, ideas, hooks and a weekly plan."
        ctaLabel="Generate now"
      />
    )
  }

  const updateField = (id: string, field: keyof ContentPillar, value: string | number) => {
    const next = bootstrap.pillars.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    )
    updatePillars(next)
  }

  const addPillar = () => {
    const id = `pillar-${Date.now()}`
    updatePillars([
      ...bootstrap.pillars,
      {
        id,
        title: 'New pillar',
        description: 'Describe what this lane is about.',
        weight: 20,
      },
    ])
  }

  const removePillar = (id: string) => {
    updatePillars(bootstrap.pillars.filter((p) => p.id !== id))
  }

  const handleRegenerate = async () => {
    setRegenerating(true)
    try {
      await regenerate()
    } finally {
      setRegenerating(false)
    }
  }

  return (
    <div className="space-y-6 px-6 py-8 md:px-10 md:py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#534b52]">
          {bootstrap.pillars.length} pillars in your system. Edit titles or descriptions inline.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={addPillar}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#2d232e] bg-[#f7f4ea] px-4 py-2 text-sm font-bold text-[#2d232e] transition hover:bg-[#e0ddcf]"
          >
            <Plus className="h-4 w-4" />
            Add pillar
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
            Regenerate
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {bootstrap.pillars.map((pillar, i) => (
          <div
            key={pillar.id}
            className="glass-card flex flex-col gap-3 bg-[#f1f0ea] p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-full border-2 border-[#2d232e] bg-[#534b52] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f1f0ea] shadow-[2px_2px_0px_#2d232e]">
                Pillar {i + 1}
              </span>
              <button
                onClick={() => removePillar(pillar.id)}
                className="rounded-full border-2 border-[#2d232e] bg-[#f7f4ea] p-1.5 text-[#534b52] transition hover:bg-[#ddd7c8] hover:text-[#2d232e]"
                title="Remove pillar"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <input
              value={pillar.title}
              onChange={(e) => updateField(pillar.id, 'title', e.target.value)}
              className="w-full rounded-xl border-2 border-transparent bg-transparent px-2 py-1 text-xl font-bold text-[#2d232e] outline-none transition focus:border-[#2d232e] focus:bg-[#f7f4ea]"
            />
            <textarea
              value={pillar.description}
              onChange={(e) => updateField(pillar.id, 'description', e.target.value)}
              className="min-h-[88px] w-full rounded-xl border-2 border-transparent bg-transparent px-2 py-1 text-sm leading-6 text-[#534b52] outline-none transition focus:border-[#2d232e] focus:bg-[#f7f4ea]"
            />
            <div className="flex items-center gap-3 text-xs font-semibold text-[#534b52]">
              <span>Weight</span>
              <input
                type="range"
                min={5}
                max={50}
                value={pillar.weight}
                onChange={(e) =>
                  updateField(pillar.id, 'weight', Number(e.target.value))
                }
                className="flex-1 accent-[#2d232e]"
              />
              <span className="font-bold text-[#2d232e]">{pillar.weight}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
