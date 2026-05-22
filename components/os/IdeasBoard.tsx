'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  Circle,
  Clock,
  Loader2,
  Plus,
  RefreshCw,
  Recycle,
  Trash2,
} from 'lucide-react'
import { useOS } from '@/context/OSContext'
import EmptyState from '@/components/os/EmptyState'
import type { ContentIdea } from '@/lib/os/types'

type StatusFilter = 'all' | ContentIdea['status']

const statusOrder: ContentIdea['status'][] = ['draft', 'queued', 'shipped']

const statusMeta: Record<
  ContentIdea['status'],
  { label: string; icon: typeof Circle; classes: string }
> = {
  draft: {
    label: 'Draft',
    icon: Circle,
    classes: 'border-[#534b52] bg-[#f7f4ea] text-[#534b52]',
  },
  queued: {
    label: 'Queued',
    icon: Clock,
    classes: 'border-[#2d232e] bg-[#ddd7c8] text-[#2d232e]',
  },
  shipped: {
    label: 'Shipped',
    icon: CheckCircle2,
    classes: 'border-[#2d232e] bg-[#534b52] text-[#f1f0ea]',
  },
}

export default function IdeasBoard() {
  const { bootstrap, profile, updateIdeas, regenerate } = useOS()
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [pillarFilter, setPillarFilter] = useState<string>('all')
  const [regenerating, setRegenerating] = useState(false)

  if (!profile) {
    return (
      <EmptyState
        title="Add your business context first"
        description="We map every idea to a pillar, your audience, and a hook angle. Onboard to unlock this view."
      />
    )
  }

  if (!bootstrap) {
    return (
      <EmptyState
        title="Generate your idea bank"
        description="Run the generator to fill this with ready-to-post ideas pulled from your business context."
        ctaLabel="Generate now"
      />
    )
  }

  const filtered = bootstrap.ideas.filter((idea) => {
    if (filter !== 'all' && idea.status !== filter) return false
    if (pillarFilter !== 'all' && idea.pillarId !== pillarFilter) return false
    return true
  })

  const cycleStatus = (idea: ContentIdea) => {
    const i = statusOrder.indexOf(idea.status)
    const next = statusOrder[(i + 1) % statusOrder.length]
    updateIdeas(
      bootstrap.ideas.map((item) =>
        item.id === idea.id ? { ...item, status: next } : item
      )
    )
  }

  const updateField = (id: string, field: keyof ContentIdea, value: string) => {
    updateIdeas(
      bootstrap.ideas.map((idea) =>
        idea.id === id ? { ...idea, [field]: value } : idea
      )
    )
  }

  const removeIdea = (id: string) => {
    updateIdeas(bootstrap.ideas.filter((idea) => idea.id !== id))
  }

  const addIdea = () => {
    updateIdeas([
      ...bootstrap.ideas,
      {
        id: `idea-${Date.now()}`,
        pillarId: bootstrap.pillars[0]?.id ?? 'pillar-1',
        title: 'New content idea',
        hook: 'Drop the hook here.',
        format: 'LinkedIn post',
        angle: 'Education',
        status: 'draft',
      },
    ])
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
        <FilterRow
          filter={filter}
          setFilter={setFilter}
          pillars={bootstrap.pillars}
          pillarFilter={pillarFilter}
          setPillarFilter={setPillarFilter}
          counts={countByStatus(bootstrap.ideas)}
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={addIdea}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#2d232e] bg-[#f7f4ea] px-4 py-2 text-sm font-bold text-[#2d232e] transition hover:bg-[#e0ddcf]"
          >
            <Plus className="h-4 w-4" />
            Add idea
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
        {filtered.length === 0 ? (
          <div className="glass-card col-span-full bg-[#f1f0ea] p-6 text-sm text-[#534b52]">
            No ideas match this filter. Adjust the filter or add a new one.
          </div>
        ) : null}
        {filtered.map((idea) => {
          const pillar = bootstrap.pillars.find((p) => p.id === idea.pillarId)
          const status = statusMeta[idea.status]
          const StatusIcon = status.icon
          return (
            <div key={idea.id} className="glass-card flex flex-col gap-3 bg-[#f1f0ea] p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border-2 border-[#2d232e] bg-[#ddd7c8] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2d232e]">
                    {pillar?.title ?? 'No pillar'}
                  </span>
                  <span className="rounded-full border border-[#534b52] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#534b52]">
                    {idea.angle}
                  </span>
                </div>
                <button
                  onClick={() => removeIdea(idea.id)}
                  className="rounded-full border-2 border-[#2d232e] bg-[#f7f4ea] p-1.5 text-[#534b52] transition hover:bg-[#ddd7c8] hover:text-[#2d232e]"
                  title="Remove"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <input
                value={idea.title}
                onChange={(e) => updateField(idea.id, 'title', e.target.value)}
                className="w-full rounded-xl border-2 border-transparent bg-transparent px-1 py-1 text-lg font-bold text-[#2d232e] outline-none transition focus:border-[#2d232e] focus:bg-[#f7f4ea]"
              />

              <textarea
                value={idea.hook}
                onChange={(e) => updateField(idea.id, 'hook', e.target.value)}
                className="min-h-[72px] w-full rounded-xl border-2 border-transparent bg-transparent px-1 py-1 text-sm leading-6 text-[#534b52] outline-none transition focus:border-[#2d232e] focus:bg-[#f7f4ea]"
              />

              <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-dashed border-[#2d232e]/30 pt-3">
                <input
                  value={idea.format}
                  onChange={(e) => updateField(idea.id, 'format', e.target.value)}
                  className="rounded-lg border-2 border-[#2d232e] bg-[#f7f4ea] px-2 py-1 text-xs font-semibold text-[#2d232e] outline-none"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => cycleStatus(idea)}
                    className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition ${status.classes}`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </button>
                  <Link
                    href={{
                      pathname: '/os/repurpose',
                      query: { source: `${idea.title}\n\n${idea.hook}` },
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#2d232e] bg-[#f7f4ea] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#2d232e] transition hover:bg-[#ddd7c8]"
                  >
                    <Recycle className="h-3 w-3" />
                    Repurpose
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function countByStatus(ideas: ContentIdea[]) {
  return ideas.reduce(
    (acc, idea) => {
      acc[idea.status] = (acc[idea.status] ?? 0) + 1
      acc.all += 1
      return acc
    },
    { all: 0, draft: 0, queued: 0, shipped: 0 } as Record<StatusFilter, number>
  )
}

function FilterRow({
  filter,
  setFilter,
  pillars,
  pillarFilter,
  setPillarFilter,
  counts,
}: {
  filter: StatusFilter
  setFilter: (s: StatusFilter) => void
  pillars: { id: string; title: string }[]
  pillarFilter: string
  setPillarFilter: (id: string) => void
  counts: Record<StatusFilter, number>
}) {
  const filters: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'draft', label: 'Draft' },
    { value: 'queued', label: 'Queued' },
    { value: 'shipped', label: 'Shipped' },
  ]
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap gap-1.5">
        {filters.map(({ value, label }) => {
          const active = filter === value
          return (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-xs font-bold transition ${
                active
                  ? 'border-[#2d232e] bg-[#534b52] text-[#f1f0ea] shadow-[2px_2px_0px_#2d232e]'
                  : 'border-[#2d232e] bg-[#f7f4ea] text-[#2d232e]'
              }`}
            >
              {label}
              <span className="text-[10px] opacity-70">{counts[value]}</span>
            </button>
          )
        })}
      </div>
      <select
        value={pillarFilter}
        onChange={(e) => setPillarFilter(e.target.value)}
        className="rounded-full border-2 border-[#2d232e] bg-[#f7f4ea] px-3 py-1 text-xs font-bold text-[#2d232e]"
      >
        <option value="all">All pillars</option>
        {pillars.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title}
          </option>
        ))}
      </select>
    </div>
  )
}
