'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import EmptyState from '@/components/os/EmptyState'
import PageHeader from '@/components/os/PageHeader'
import {
  GlyphCheck,
  GlyphCopy,
  GlyphPlus,
  GlyphRefresh,
  GlyphRepurpose,
  GlyphTrash,
} from '@/components/os/icons'
import { OSButton, OSCard, OSIconButton, OSLabel } from '@/components/os/ui'
import { useOS } from '@/context/OSContext'
import { MODULE_BY_KEY } from '@/lib/os/modules'
import type { HookTemplate } from '@/lib/os/types'

const HOOKS_MODULE = MODULE_BY_KEY.hooks

/**
 * The board owns its header so the toolbar can live in PageHeader's `actions`
 * slot; the eyebrow is left to PageHeader, which derives it from the route.
 */
const HEADER = {
  title: 'Hook library',
  description:
    'Reusable opening lines mapped to your business. Copy any hook, customize it, or send it to repurposing as a starting point.',
}

const categories: { value: HookTemplate['category']; label: string }[] = [
  { value: 'pain', label: 'Pain' },
  { value: 'curiosity', label: 'Curiosity' },
  { value: 'authority', label: 'Authority' },
  { value: 'contrarian', label: 'Contrarian' },
  { value: 'story', label: 'Story' },
  { value: 'list', label: 'List' },
]

/**
 * One hue per category, never used raw: each is mixed far into white for the
 * plate and far into the ink token for the label. Six categories therefore read
 * as one tinted family at a glance, and only separate on closer reading.
 */
const categoryHue: Record<HookTemplate['category'], string> = {
  pain: '#e2574c',
  curiosity: '#7a6bf0',
  authority: '#3f87e8',
  contrarian: '#e2903a',
  story: '#d45f9e',
  list: '#2fa36b',
}

const categoryStyle = (category: HookTemplate['category']): CSSProperties => ({
  background: `color-mix(in srgb, ${categoryHue[category]} 14%, white)`,
  color: `color-mix(in srgb, ${categoryHue[category]} 55%, var(--os-ink))`,
})

/**
 * Inline editors are invisible until aimed at: a card should read as content,
 * not as a form, until the user actually wants to change something.
 */
const inlineEditorClass =
  'w-full rounded-[var(--os-r-tile)] border border-transparent bg-transparent px-2 py-1.5 outline-none transition-colors duration-[var(--os-fast)] hover:border-[var(--os-line)] focus:border-[var(--os-accent-a)] focus:bg-white'

const pillLinkClass =
  'inline-flex w-fit items-center gap-1.5 rounded-[var(--os-r-pill)] border border-[var(--os-line)] px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--os-muted)] transition-all duration-[var(--os-fast)] ease-[var(--os-ease)] hover:-translate-y-px hover:border-[var(--os-line-strong)] hover:text-[var(--os-ink)]'

export default function HooksBoard() {
  const { profile, bootstrap, updateHooks, regenerate } = useOS()
  const [filter, setFilter] = useState<HookTemplate['category'] | 'all'>('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [regenerating, setRegenerating] = useState(false)

  if (!profile) {
    return (
      <>
        <PageHeader {...HEADER} />
        <EmptyState
          title="Add your business context first"
          description="Hooks are tailored to your audience and pain points. Finish onboarding to unlock the library."
        />
      </>
    )
  }

  if (!bootstrap) {
    return (
      <>
        <PageHeader {...HEADER} />
        <EmptyState
          title="Generate your hook library"
          description="Run the generator to fill this with 8+ reusable hook templates tied to your business."
          ctaLabel="Generate now"
        />
      </>
    )
  }

  const filtered =
    filter === 'all'
      ? bootstrap.hooks
      : bootstrap.hooks.filter((h) => h.category === filter)

  const copyHook = async (hook: HookTemplate) => {
    try {
      await navigator.clipboard.writeText(hook.template)
      setCopiedId(hook.id)
      setTimeout(() => setCopiedId(null), 1500)
    } catch {
      /* ignore — clipboard may be blocked */
    }
  }

  const updateField = (id: string, field: keyof HookTemplate, value: string) => {
    updateHooks(
      bootstrap.hooks.map((hook) =>
        hook.id === id ? { ...hook, [field]: value } : hook
      )
    )
  }

  const removeHook = (id: string) => {
    updateHooks(bootstrap.hooks.filter((hook) => hook.id !== id))
  }

  const addHook = () => {
    updateHooks([
      ...bootstrap.hooks,
      {
        id: `hook-${Date.now()}`,
        category: 'curiosity',
        template: 'Drop a new hook template here.',
        example: 'Add a concrete example.',
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
              onClick={addHook}
              icon={<GlyphPlus className="h-4 w-4" />}
            >
              Add hook
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
        <div
          role="group"
          aria-label="Filter hooks by category"
          className="os-settle os-pane flex flex-wrap items-center gap-1 p-2"
        >
          <FilterButton
            label="All"
            count={bootstrap.hooks.length}
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          {categories.map((cat) => {
            const count = bootstrap.hooks.filter(
              (h) => h.category === cat.value
            ).length
            return (
              <FilterButton
                key={cat.value}
                label={cat.label}
                count={count}
                active={filter === cat.value}
                onClick={() => setFilter(cat.value)}
              />
            )
          })}
        </div>

        <div className="os-stagger grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.length === 0 ? (
            <p className="col-span-full rounded-[var(--os-r-pane)] border border-dashed border-[var(--os-line-strong)] bg-white/60 px-5 py-8 text-center text-[13px] leading-6 text-[var(--os-muted)]">
              No hooks in this category. Add one or regenerate the library.
            </p>
          ) : null}

          {filtered.map((hook) => {
            const copied = copiedId === hook.id
            return (
              <OSCard
                key={hook.id}
                interactive
                accentA={HOOKS_MODULE.accentA}
                accentB={HOOKS_MODULE.accentB}
                className="flex flex-col gap-3 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    style={categoryStyle(hook.category)}
                    className="inline-flex items-center rounded-[var(--os-r-pill)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]"
                  >
                    {hook.category}
                  </span>

                  <div className="-mr-1.5 -mt-1.5 flex shrink-0 items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => copyHook(hook)}
                      aria-label={copied ? 'Hook copied' : 'Copy hook'}
                      title="Copy hook"
                      className="grid min-h-[44px] place-items-center rounded-[var(--os-r-chip)] px-2.5 text-[12px] font-semibold text-[var(--os-muted)] transition-colors duration-[var(--os-fast)] hover:bg-[var(--os-surface-sunk)] hover:text-[var(--os-ink)]"
                    >
                      {/*
                        Both faces stay mounted in the same grid cell: the button
                        keeps the width of the wider label, so confirming a copy
                        cross-fades in place instead of resizing the card header.
                      */}
                      <span
                        aria-hidden="true"
                        className={`col-start-1 row-start-1 inline-flex items-center gap-1.5 transition-opacity duration-[var(--os-fast)] ease-[var(--os-ease)] ${
                          copied ? 'opacity-0' : 'opacity-100'
                        }`}
                      >
                        <GlyphCopy className="h-4 w-4" />
                        Copy
                      </span>
                      <span
                        aria-hidden="true"
                        className={`col-start-1 row-start-1 inline-flex items-center gap-1.5 transition-opacity duration-[var(--os-fast)] ease-[var(--os-ease)] ${
                          copied ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <GlyphCheck className="h-4 w-4" />
                        Copied
                      </span>
                    </button>

                    <OSIconButton
                      label="Remove hook"
                      danger
                      type="button"
                      onClick={() => removeHook(hook.id)}
                    >
                      <GlyphTrash className="h-4 w-4" />
                    </OSIconButton>
                  </div>
                </div>

                <textarea
                  value={hook.template}
                  onChange={(e) =>
                    updateField(hook.id, 'template', e.target.value)
                  }
                  aria-label="Hook template"
                  className={`${inlineEditorClass} min-h-[72px] text-[14px] font-semibold leading-6 text-[var(--os-ink)]`}
                />

                <div className="rounded-[var(--os-r-tile)] border border-dashed border-[var(--os-line-strong)] bg-[var(--os-surface-sunk)] p-3">
                  <OSLabel>Example</OSLabel>
                  <textarea
                    value={hook.example}
                    onChange={(e) =>
                      updateField(hook.id, 'example', e.target.value)
                    }
                    aria-label="Hook example"
                    className="mt-1.5 min-h-[60px] w-full bg-transparent text-[13px] italic leading-6 text-[var(--os-muted)] outline-none"
                  />
                </div>

                <Link
                  href={{
                    pathname: '/os/repurpose',
                    query: { source: hook.template },
                  }}
                  className={`${pillLinkClass} mt-auto`}
                >
                  <GlyphRepurpose className="h-3.5 w-3.5" />
                  Build a post
                </Link>
              </OSCard>
            )
          })}
        </div>
      </div>
    </>
  )
}

function FilterButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
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
        {count}
      </span>
    </button>
  )
}
