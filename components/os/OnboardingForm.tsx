'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Globe2, Instagram, Loader2, Search, Sparkles } from 'lucide-react'
import { useOS } from '@/context/OSContext'
import type {
  BusinessProfileInput,
  ContentGoal,
  OSBootstrapResult,
} from '@/lib/os/types'
import type { EnrichmentResult, EnrichmentSourceType } from '@/lib/os/enrichment/utils'

const goals: { value: ContentGoal; label: string }[] = [
  { value: 'leads', label: 'Leads' },
  { value: 'trust', label: 'Trust' },
  { value: 'awareness', label: 'Awareness' },
  { value: 'education', label: 'Education' },
]

const importSources: {
  value: Exclude<EnrichmentSourceType, 'manual'>
  label: string
  description: string
  placeholder: string
  icon: typeof Globe2
}[] = [
  {
    value: 'website',
    label: 'Website',
    description: 'Best quality for offers, services, proof, FAQs, and positioning.',
    placeholder: 'https://yourbusiness.com',
    icon: Globe2,
  },
  {
    value: 'instagram',
    label: 'Instagram',
    description: 'Great for bio, tone, social proof, and recent content patterns.',
    placeholder: 'https://instagram.com/yourbusiness',
    icon: Instagram,
  },
  {
    value: 'facebook',
    label: 'Facebook',
    description: 'Good for local businesses, page details, reviews context, and posts.',
    placeholder: 'https://facebook.com/yourbusiness',
    icon: Search,
  },
]

const emptyForm: BusinessProfileInput = {
  businessName: '',
  businessType: '',
  whatYouSell: '',
  targetAudience: '',
  customerPains: '',
  faqs: '',
  tone: 'Sharp, practical, trustworthy',
  goals: ['leads', 'trust'],
}

export default function OnboardingForm() {
  const router = useRouter()
  const {
    profile,
    bootstrap,
    setProfile,
    setBootstrap,
    hydrated,
  } = useOS()

  const [form, setForm] = useState<BusinessProfileInput>(emptyForm)
  const [loading, setLoading] = useState(false)
  const [importing, setImporting] = useState(false)
  const [sourceType, setSourceType] = useState<Exclude<EnrichmentSourceType, 'manual'>>('website')
  const [sourceUrl, setSourceUrl] = useState('')
  const [analyzeRecentPosts, setAnalyzeRecentPosts] = useState(true)
  const [importResult, setImportResult] = useState<EnrichmentResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (profile) setForm(profile)
  }, [profile])

  const selectedGoalSet = useMemo(() => new Set(form.goals), [form.goals])

  const updateField = (field: keyof BusinessProfileInput, value: string | ContentGoal[]) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const toggleGoal = (goal: ContentGoal) => {
    const next = selectedGoalSet.has(goal)
      ? form.goals.filter((item) => item !== goal)
      : [...form.goals, goal]
    updateField('goals', next.length ? next : [goal])
  }

  const handleImport = async () => {
    setImporting(true)
    setError(null)
    setImportResult(null)

    try {
      const response = await fetch('/api/os/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceType,
          url: sourceUrl,
          analyzeRecentPosts,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Import failed')
      }

      const enrichment = data as EnrichmentResult
      setForm(enrichment.profile)
      setImportResult(enrichment)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Import failed. Paste the business details manually and try again.'
      )
    } finally {
      setImporting(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/os/bootstrap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }
      setProfile(form)
      setBootstrap(data as OSBootstrapResult)
      router.push('/os/pillars')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const buttonLabel = loading
    ? 'Generating OS…'
    : bootstrap
      ? 'Regenerate content OS'
      : 'Generate content OS'

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <form
        onSubmit={handleSubmit}
        className="glass-card bg-[#f1f0ea] p-5 md:p-7"
      >
        <div className="mb-6 rounded-2xl border-2 border-[#2d232e] bg-[#f7f4ea] p-4 shadow-[4px_4px_0px_#2d232e]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#534b52]">
                Quality import
              </p>
              <h3 className="mt-1 text-xl font-black text-[#2d232e]">
                Start from website, Instagram, or Facebook
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[#534b52]">
                KarchX imports public business context, analyzes it with AI, then lets you review and edit everything before generating the Content OS.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {importSources.map((source) => {
              const active = sourceType === source.value
              const Icon = source.icon
              return (
                <button
                  key={source.value}
                  type="button"
                  onClick={() => setSourceType(source.value)}
                  className={`rounded-2xl border-2 p-4 text-left transition ${
                    active
                      ? 'border-[#2d232e] bg-[#ddd7c8] shadow-[3px_3px_0px_#2d232e]'
                      : 'border-[#2d232e]/30 bg-[#f1f0ea] hover:border-[#2d232e]'
                  }`}
                >
                  <div className="flex items-center gap-2 font-black text-[#2d232e]">
                    <Icon className="h-4 w-4" />
                    {source.label}
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[#534b52]">
                    {source.description}
                  </p>
                </button>
              )
            })}
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto]">
            <input
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              className="os-input"
              placeholder={importSources.find((source) => source.value === sourceType)?.placeholder}
            />
            <button
              type="button"
              onClick={handleImport}
              disabled={importing || !sourceUrl.trim()}
              className="btn-primary disabled:opacity-60"
            >
              {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              {importing ? 'Importing…' : 'Import profile'}
            </button>
          </div>

          {sourceType !== 'website' ? (
            <label className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#534b52]">
              <input
                type="checkbox"
                checked={analyzeRecentPosts}
                onChange={(e) => setAnalyzeRecentPosts(e.target.checked)}
                className="h-4 w-4 accent-[#534b52]"
              />
              Analyze recent posts for tone and content patterns
            </label>
          ) : null}

          {importResult ? (
            <div className="mt-4 rounded-2xl border-2 border-[#2d232e]/20 bg-white/40 p-4">
              <p className="text-sm font-black text-[#2d232e]">
                Import ready — review the fields below before generating.
              </p>
              <div className="mt-3 grid gap-2 text-xs text-[#534b52] md:grid-cols-5">
                {Object.entries(importResult.confidence).map(([key, value]) => (
                  <div key={key} className="rounded-xl bg-[#f1f0ea] px-3 py-2">
                    <span className="block font-bold uppercase tracking-wider">{key}</span>
                    <span>{Math.round(value * 100)}% confidence</span>
                  </div>
                ))}
              </div>
              {importResult.missingInfo.length ? (
                <div className="mt-3 text-sm leading-6 text-[#534b52]">
                  <span className="font-bold text-[#2d232e]">Missing:</span>{' '}
                  {importResult.missingInfo.join(', ')}
                </div>
              ) : null}
              {importResult.suggestedQuestions.length ? (
                <ul className="mt-2 space-y-1 text-sm leading-6 text-[#534b52]">
                  {importResult.suggestedQuestions.slice(0, 3).map((question) => (
                    <li key={question}>• {question}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Business name">
            <input
              value={form.businessName}
              onChange={(e) => updateField('businessName', e.target.value)}
              className="os-input"
              placeholder="KarchX"
            />
          </Field>
          <Field label="Business type">
            <input
              value={form.businessType}
              onChange={(e) => updateField('businessType', e.target.value)}
              className="os-input"
              placeholder="Agency / SaaS / Service business"
            />
          </Field>
        </div>

        <div className="mt-4 grid gap-4">
          <Field label="What do you sell?">
            <textarea
              value={form.whatYouSell}
              onChange={(e) => updateField('whatYouSell', e.target.value)}
              className="os-input min-h-[96px]"
              placeholder="Describe your offer clearly. What outcome do clients walk away with?"
            />
          </Field>
          <Field label="Target audience">
            <textarea
              value={form.targetAudience}
              onChange={(e) => updateField('targetAudience', e.target.value)}
              className="os-input min-h-[96px]"
              placeholder="Who are you trying to reach? Role, stage, size, context."
            />
          </Field>
          <Field label="Top customer pains">
            <textarea
              value={form.customerPains}
              onChange={(e) => updateField('customerPains', e.target.value)}
              className="os-input min-h-[110px]"
              placeholder="What pains, problems, or objections come up the most in calls and DMs?"
            />
          </Field>
          <Field label="FAQs / common questions">
            <textarea
              value={form.faqs}
              onChange={(e) => updateField('faqs', e.target.value)}
              className="os-input min-h-[110px]"
              placeholder="Paste real questions you hear in DMs, calls, or sales chats."
            />
          </Field>
          <Field label="Brand voice">
            <input
              value={form.tone}
              onChange={(e) => updateField('tone', e.target.value)}
              className="os-input"
              placeholder="Direct, premium, practical"
            />
          </Field>
        </div>

        <div className="mt-5">
          <p className="mb-3 text-sm font-semibold text-[#2d232e]">Goals</p>
          <div className="flex flex-wrap gap-3">
            {goals.map((goal) => {
              const active = selectedGoalSet.has(goal.value)
              return (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => toggleGoal(goal.value)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? 'border-[#2d232e] bg-[#534b52] text-[#f1f0ea] shadow-[3px_3px_0px_#2d232e]'
                      : 'border-[#2d232e] bg-[#f7f4ea] text-[#2d232e]'
                  }`}
                >
                  {goal.label}
                </button>
              )
            })}
          </div>
        </div>

        {error ? (
          <p className="mt-4 text-sm font-semibold text-red-700">{error}</p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            disabled={loading}
            className="btn-primary disabled:opacity-60"
            type="submit"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {buttonLabel}
          </button>
          <p className="text-sm text-[#534b52]">
            {hydrated && profile
              ? 'Edits will regenerate your pillars, ideas, hooks, and plan.'
              : 'Step 1: business context → pillars → ideas → hooks → plan.'}
          </p>
        </div>
      </form>

      <div className="space-y-6">
        <div className="glass-card bg-[#ddd7c8] p-5 md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#534b52]">
            What this sets up
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[#2d232e]">
            <li>• Content pillars locked to your offer + audience</li>
            <li>• A weekly idea bank with hook, format, angle</li>
            <li>• A reusable hook library mapped to your business</li>
            <li>• A Mon–Fri plan you can publish from immediately</li>
            <li>• A repurposing flow to turn one input into 5 platforms</li>
          </ul>
        </div>

        {bootstrap ? (
          <div className="glass-card bg-[#f1f0ea] p-5 md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#534b52]">
              Current OS preview
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#2d232e]">
              {bootstrap.pillars.slice(0, 3).map((pillar) => (
                <li key={pillar.id}>
                  <span className="font-semibold">{pillar.title}:</span>{' '}
                  <span className="text-[#534b52]">{pillar.description}</span>
                </li>
              ))}
            </ul>
            <a
              href="/os/pillars"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2d232e] underline-offset-4 hover:underline"
            >
              Open pillars
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#2d232e]">{label}</span>
      {children}
    </label>
  )
}
