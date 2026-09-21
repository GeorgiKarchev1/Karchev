'use client'

import { useState } from 'react'
import type { ComponentType, CSSProperties } from 'react'
import Link from 'next/link'
import EmptyState from '@/components/os/EmptyState'
import PageHeader from '@/components/os/PageHeader'
import {
  GlyphCheckRing,
  GlyphClock,
  GlyphDot,
  GlyphPlus,
  GlyphRefresh,
  GlyphRepurpose,
  GlyphTrash,
} from '@/components/os/icons'
import {
  OSButton,
  OSCard,
  OSChip,
  OSIconButton,
  fieldClass,
} from '@/components/os/ui'
import { useOS } from '@/context/OSContext'
import { MODULE_BY_KEY } from '@/lib/os/modules'
import type { ContentIdea } from '@/lib/os/types'

type StatusFilter = 'all' | ContentIdea['status']

const IDEAS_MODULE = MODULE_BY_KEY.ideas

/**
 * The board owns its header so the toolbar can live in PageHeader's `actions`
 * slot; the eyebrow is left to PageHeader, which derives it from the route.
 */
const HEADER = {
  title: 'Weekly ideas',
  description:
    'Ready-to-post ideas pulled from your pillars. Filter, edit, or send any one of them to repurposing.',
}

const statusOrder: ContentIdea['status'][] = ['draft', 'queued', 'shipped']

interface StatusMeta {
  label: string
  icon: ComponentType<{ className?: string }>
  /** Inline because the tint is computed from a hue, not from a utility class. */
  style: CSSProperties
}

/**
 * Status colour is semantic (parked / waiting / done), but every hue is mixed
 * into white before it is used, so the three states stay in the same soft
 * family as the accent plates instead of reading as three warning badges.
 */
const statusMeta: Record<ContentIdea['status'], StatusMeta> = {
  draft: {
    label: 'Draft',
    icon: GlyphDot,
    style: {
      background: 'var(--os-surface-sunk)',
      color: 'var(--os-muted)',
    },
  },
  queued: {
    label: 'Queued',
    icon: GlyphClock,
    style: {
      background: 'color-mix(in srgb, #e8a13a 12%, white)',
      color: 'color-mix(in srgb, #e8a13a 55%, var(--os-ink))',
    },
  },
  shipped: {
    label: 'Shipped',
    icon: GlyphCheckRing,
    style: {
      background: 'color-mix(in srgb, #2fa36b 12%, white)',
      color: 'color-mix(in srgb, #2fa36b 55%, var(--os-ink))',
    },
  },
}

/**
 * Inline editors are invisible until aimed at: a card should read as content,
 * not as a form, until the user actually wants to change something.
 */
const inlineEditorClass =
  'w-full rounded-[var(--os-r-tile)] border border-transparent bg-transparent px-2 py-1.5 outline-none transition-colors duration-[var(--os-fast)] hover:border-[var(--os-line)] focus:border-[var(--os-accent-a)] focus:bg-white'

/** Footer-sized field; `fieldClass` carries `w-full`, which the row cannot use. */
const compactFieldClass =
  'min-w-0 max-w-[150px] rounded-[var(--os-r-chip)] border border-[var(--os-line)] bg-white px-2.5 py-1.5 text-[12px] font-semibold text-[var(--os-ink)] outline-none transition-colors duration-[var(--os-fast)] hover:border-[var(--os-line-strong)] focus:border-[var(--os-accent-a)]'

const pillLinkClass =
  'inline-flex items-center gap-1.5 rounded-[var(--os-r-pill)] border border-[var(--os-line)] px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--os-muted)] transition-all duration-[var(--os-fast)] ease-[var(--os-ease)] hover:-translate-y-px hover:border-[var(--os-line-strong)] hover:text-[var(--os-ink)]'

export default function IdeasBoard() {
  const { bootstrap, profile, updateIdeas, regenerate } = useOS()
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [pillarFilter, setPillarFilter] = useState<string>('all')
  const [regenerating, setRegenerating] = useState(false)

  if (!profile) {
    return (
      <>
        <PageHeader {...HEADER} />
        <EmptyState
          title="Add your business context first"
          description="We map every idea to a pillar, your audience, and a hook angle. Onboard to unlock this view."
        />
      </>
    )
  }

  if (!bootstrap) {
    return (
      <>
        <PageHeader {...HEADER} />
        <EmptyState
          title="Generate your idea bank"
          description="Run the generator to fill this with ready-to-post ideas pulled from your business context."
          ctaLabel="Generate now"
        />
      </>
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
    <>
      <PageHeader
        {...HEADER}
        actions={
          <>
            <OSButton
              type="button"
              onClick={addIdea}
              icon={<GlyphPlus className="h-4 w-4" />}
            >
              Add idea
            </OSButton>
            <OSButton
              type="button"
              tone="accent"
              onClick={handleRegenerate}
              busy={regenerating}
              icon={<GlyphRefresh className="h-4 w-4" />}
            >
              Regenerate
            </OSButton>
          </>
        }
      />

      <div className="space-y-4 px-6 pb-10 md:px-10">
        <FilterRow
          filter={filter}
          setFilter={setFilter}
          pillars={bootstrap.pillars}
          pillarFilter={pillarFilter}
          setPillarFilter={setPillarFilter}
          counts={countByStatus(bootstrap.ideas)}
        />

        <div className="os-stagger grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.length === 0 ? (
            <p className="col-span-full rounded-[var(--os-r-pane)] border border-dashed border-[var(--os-line-strong)] bg-white/60 px-5 py-8 text-center text-[13px] leading-6 text-[var(--os-muted)]">
              No ideas match this filter. Adjust the filter or add a new one.
            </p>
          ) : null}

          {filtered.map((idea) => {
            const pillar = bootstrap.pillars.find((p) => p.id === idea.pillarId)
            const status = statusMeta[idea.status]
            const StatusIcon = status.icon
            return (
              <OSCard
                key={idea.id}
                interactive
                accentA={IDEAS_MODULE.accentA}
                accentB={IDEAS_MODULE.accentB}
                className="flex flex-col gap-2.5 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                    <OSChip tone="accent">{pillar?.title ?? 'No pillar'}</OSChip>
                    <OSChip>{idea.angle}</OSChip>
                  </div>
                  <OSIconButton
                    label="Remove idea"
                    danger
                    type="button"
                    onClick={() => removeIdea(idea.id)}
                    className="-mr-1.5 -mt-1.5 shrink-0"
                  >
                    <GlyphTrash className="h-4 w-4" />
                  </OSIconButton>
                </div>

                <input
                  value={idea.title}
                  onChange={(e) => updateField(idea.id, 'title', e.target.value)}
                  aria-label="Idea title"
                  className={`${inlineEditorClass} font-heading text-[15px] font-semibold leading-6 tracking-[-0.01em] text-[var(--os-ink)]`}
                />

                <textarea
                  value={idea.hook}
                  onChange={(e) => updateField(idea.id, 'hook', e.target.value)}
                  aria-label="Idea hook"
                  className={`${inlineEditorClass} min-h-[72px] text-[13px] leading-6 text-[var(--os-muted)]`}
                />

                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-[var(--os-line)] pt-3">
                  <input
                    value={idea.format}
                    onChange={(e) =>
                      updateField(idea.id, 'format', e.target.value)
                    }
                    aria-label="Idea format"
                    className={compactFieldClass}
                  />
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => cycleStatus(idea)}
                      aria-label={`Status: ${status.label}`}
                      title="Click to change status"
                      style={status.style}
                      className="inline-flex items-center gap-1.5 rounded-[var(--os-r-pill)] px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition-transform duration-[var(--os-fast)] ease-[var(--os-ease)] hover:-translate-y-px"
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {status.label}
                    </button>
                    <Link
                      href={{
                        pathname: '/os/repurpose',
                        query: { source: `${idea.title}\n\n${idea.hook}` },
                      }}
                      className={pillLinkClass}
                    >
                      <GlyphRepurpose className="h-3.5 w-3.5" />
                      Repurpose
                    </Link>
                  </div>
                </div>
              </OSCard>
            )
          })}
        </div>
      </div>
    </>
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
    <div className="os-settle os-pane flex flex-wrap items-center justify-between gap-3 p-2">
      <div
        role="group"
        aria-label="Filter ideas by status"
        className="flex flex-wrap items-center gap-1"
      >
        {filters.map(({ value, label }) => {
          const active = filter === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={active}
              className={`inline-flex min-h-[34px] items-center gap-1.5 rounded-[var(--os-r-pill)] px-3 text-[12px] font-semibold transition-all duration-[var(--os-fast)] ease-[var(--os-ease)] ${
                active
                  ? 'os-accent-fill text-white shadow-[var(--os-shadow-rest)]'
                  : 'text-[var(--os-muted)] hover:bg-[var(--os-surface-sunk)] hover:text-[var(--os-ink)]'
              }`}
            >
              {label}
              <span
                className={`text-[11px] tabular-nums ${
                  active ? 'text-white/70' : 'text-[var(--os-faint)]'
                }`}
              >
                {counts[value]}
              </span>
            </button>
          )
        })}
      </div>

      <select
        value={pillarFilter}
        onChange={(e) => setPillarFilter(e.target.value)}
        aria-label="Filter ideas by pillar"
        className={`${fieldClass} max-w-[220px] py-2 text-[13px] font-semibold`}
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
