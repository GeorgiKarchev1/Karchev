'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Check,
  Copy,
  Loader2,
  Plus,
  RefreshCw,
  Recycle,
  Trash2,
} from 'lucide-react'
import { useOS } from '@/context/OSContext'
import EmptyState from '@/components/os/EmptyState'
import type { HookTemplate } from '@/lib/os/types'

const categories: { value: HookTemplate['category']; label: string }[] = [
  { value: 'pain', label: 'Pain' },
  { value: 'curiosity', label: 'Curiosity' },
  { value: 'authority', label: 'Authority' },
  { value: 'contrarian', label: 'Contrarian' },
  { value: 'story', label: 'Story' },
  { value: 'list', label: 'List' },
]

const categoryStyles: Record<HookTemplate['category'], string> = {
  pain: 'bg-[#f1d6c4] text-[#5b3a24]',
  curiosity: 'bg-[#e8e3d3] text-[#534b52]',
  authority: 'bg-[#ddd7c8] text-[#2d232e]',
  contrarian: 'bg-[#534b52] text-[#f1f0ea]',
  story: 'bg-[#f7e9c6] text-[#5b4a1a]',
  list: 'bg-[#cfe0d2] text-[#284332]',
}

export default function HooksBoard() {
  const { profile, bootstrap, updateHooks, regenerate } = useOS()
  const [filter, setFilter] = useState<HookTemplate['category'] | 'all'>('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [regenerating, setRegenerating] = useState(false)

  if (!profile) {
    return (
      <EmptyState
        title="Add your business context first"
        description="Hooks are tailored to your audience and pain points. Finish onboarding to unlock the library."
      />
    )
  }

  if (!bootstrap) {
    return (
      <EmptyState
        title="Generate your hook library"
        description="Run the generator to fill this with 8+ reusable hook templates tied to your business."
        ctaLabel="Generate now"
      />
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
    <div className="space-y-6 px-6 py-8 md:px-10 md:py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          <FilterButton
            label={`All (${bootstrap.hooks.length})`}
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          {categories.map((cat) => {
            const count = bootstrap.hooks.filter((h) => h.category === cat.value).length
            return (
              <FilterButton
                key={cat.value}
                label={`${cat.label} (${count})`}
                active={filter === cat.value}
                onClick={() => setFilter(cat.value)}
              />
            )
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={addHook}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#2d232e] bg-[#f7f4ea] px-4 py-2 text-sm font-bold text-[#2d232e] transition hover:bg-[#e0ddcf]"
          >
            <Plus className="h-4 w-4" />
            Add hook
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
            No hooks in this category. Add one or regenerate the library.
          </div>
        ) : null}
        {filtered.map((hook) => {
          const copied = copiedId === hook.id
          return (
            <div
              key={hook.id}
              className="glass-card flex flex-col gap-3 bg-[#f1f0ea] p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`rounded-full border-2 border-[#2d232e] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-[2px_2px_0px_#2d232e] ${categoryStyles[hook.category]}`}
                >
                  {hook.category}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => copyHook(hook)}
                    className="rounded-full border-2 border-[#2d232e] bg-[#f7f4ea] p-1.5 text-[#2d232e] transition hover:bg-[#ddd7c8]"
                    title="Copy hook"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => removeHook(hook.id)}
                    className="rounded-full border-2 border-[#2d232e] bg-[#f7f4ea] p-1.5 text-[#534b52] transition hover:bg-[#ddd7c8] hover:text-[#2d232e]"
                    title="Remove hook"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <textarea
                value={hook.template}
                onChange={(e) => updateField(hook.id, 'template', e.target.value)}
                className="min-h-[72px] w-full rounded-xl border-2 border-transparent bg-transparent px-1 py-1 text-base font-semibold leading-6 text-[#2d232e] outline-none transition focus:border-[#2d232e] focus:bg-[#f7f4ea]"
              />
              <div className="rounded-xl border-2 border-dashed border-[#2d232e]/30 bg-[#f7f4ea] px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#534b52]">
                  Example
                </p>
                <textarea
                  value={hook.example}
                  onChange={(e) => updateField(hook.id, 'example', e.target.value)}
                  className="mt-1 min-h-[60px] w-full bg-transparent text-sm italic leading-6 text-[#534b52] outline-none"
                />
              </div>
              <Link
                href={{
                  pathname: '/os/repurpose',
                  query: { source: hook.template },
                }}
                className="inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-[#2d232e] bg-[#f7f4ea] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#2d232e] transition hover:bg-[#ddd7c8]"
              >
                <Recycle className="h-3 w-3" />
                Build a post
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-xs font-bold transition ${
        active
          ? 'border-[#2d232e] bg-[#534b52] text-[#f1f0ea] shadow-[2px_2px_0px_#2d232e]'
          : 'border-[#2d232e] bg-[#f7f4ea] text-[#2d232e]'
      }`}
    >
      {label}
    </button>
  )
}
