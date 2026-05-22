'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader2, Sparkles } from 'lucide-react'
import { useOS } from '@/context/OSContext'
import type {
  BusinessProfileInput,
  ContentGoal,
  OSBootstrapResult,
} from '@/lib/os/types'

const goals: { value: ContentGoal; label: string }[] = [
  { value: 'leads', label: 'Leads' },
  { value: 'trust', label: 'Trust' },
  { value: 'awareness', label: 'Awareness' },
  { value: 'education', label: 'Education' },
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
