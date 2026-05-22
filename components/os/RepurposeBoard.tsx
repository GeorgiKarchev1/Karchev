'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Check, Copy, Loader2, Recycle, Sparkles } from 'lucide-react'
import { useOS } from '@/context/OSContext'
import type { RepurposeVariant } from '@/lib/os/types'

export default function RepurposeBoard() {
  const params = useSearchParams()
  const { profile, hydrated } = useOS()
  const initialSource = params.get('source') ?? ''

  const [source, setSource] = useState(initialSource)
  const [variants, setVariants] = useState<RepurposeVariant[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  useEffect(() => {
    if (initialSource && hydrated) {
      handleGenerate(initialSource)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated])

  const handleGenerate = async (override?: string) => {
    const value = (override ?? source).trim()
    if (value.length < 3) {
      setError('Add at least a sentence to repurpose.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/os/repurpose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: value, profile }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Something went wrong')
      setVariants(data.variants)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 1500)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="space-y-6 px-6 py-8 md:px-10 md:py-10">
      <div className="glass-card bg-[#f1f0ea] p-5 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#534b52]">
              Source
            </p>
            <h2 className="mt-1 text-xl font-bold text-[#2d232e]">
              What are we repurposing?
            </h2>
          </div>
          <button
            onClick={() => handleGenerate()}
            disabled={loading}
            className="btn-primary disabled:opacity-60"
            type="button"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {variants.length ? 'Regenerate variants' : 'Generate variants'}
          </button>
        </div>
        <textarea
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="os-input mt-4 min-h-[160px]"
          placeholder="Paste an idea, a hook, a paragraph from a podcast, or a transcript snippet. We'll expand it into platform-ready variants."
        />
        {error ? (
          <p className="mt-3 text-sm font-semibold text-red-700">{error}</p>
        ) : null}
        {!profile ? (
          <p className="mt-3 text-xs text-[#534b52]">
            Tip: finish onboarding so variants pull in your audience, tone, and brand voice.
          </p>
        ) : null}
      </div>

      {variants.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {variants.map((variant) => {
            const key = variant.platform
            const copied = copiedKey === key
            return (
              <div key={key} className="glass-card flex flex-col bg-[#f1f0ea] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#534b52]">
                      {variant.format}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-[#2d232e]">
                      {variant.label}
                    </h3>
                  </div>
                  <button
                    onClick={() => copy(key, variant.copy)}
                    className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#2d232e] bg-[#f7f4ea] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#2d232e] transition hover:bg-[#ddd7c8]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="mt-4 flex-1 whitespace-pre-wrap break-words rounded-xl border-2 border-[#2d232e]/20 bg-[#f7f4ea] p-3 font-sans text-sm leading-6 text-[#2d232e]">
                  {variant.copy}
                </pre>
                <p className="mt-3 text-xs leading-5 text-[#534b52]">
                  <span className="font-bold uppercase tracking-wider text-[#2d232e]">
                    Notes:
                  </span>{' '}
                  {variant.notes}
                </p>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="glass-card flex flex-col items-start gap-3 bg-[#ddd7c8] p-6">
          <div className="rounded-2xl border-2 border-[#2d232e] bg-[#534b52] p-2 text-[#f1f0ea] shadow-[3px_3px_0px_#2d232e]">
            <Recycle className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-bold text-[#2d232e]">
            Drop a source above and we'll generate 5 platform variants.
          </h3>
          <p className="text-sm leading-6 text-[#534b52]">
            Each variant follows a different formula — LinkedIn long-form, IG caption,
            X thread, email blurb, short-video script.
          </p>
        </div>
      )}
    </div>
  )
}
