'use client'

import { useMemo, useState } from 'react'
import type { BusinessProfileInput, ContentGoal, OSBootstrapResult } from '@/lib/os/types'

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
  const [form, setForm] = useState<BusinessProfileInput>(emptyForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<OSBootstrapResult | null>(null)

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

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={handleSubmit} className="glass-card bg-[#f1f0ea] p-5 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Business name">
            <input value={form.businessName} onChange={(e) => updateField('businessName', e.target.value)} className="os-input" placeholder="KarchX" />
          </Field>
          <Field label="Business type">
            <input value={form.businessType} onChange={(e) => updateField('businessType', e.target.value)} className="os-input" placeholder="Agency / SaaS / Service business" />
          </Field>
        </div>

        <div className="mt-4 grid gap-4">
          <Field label="What do you sell?">
            <textarea value={form.whatYouSell} onChange={(e) => updateField('whatYouSell', e.target.value)} className="os-input min-h-[96px]" placeholder="Describe your offer clearly." />
          </Field>
          <Field label="Target audience">
            <textarea value={form.targetAudience} onChange={(e) => updateField('targetAudience', e.target.value)} className="os-input min-h-[96px]" placeholder="Who are you trying to reach?" />
          </Field>
          <Field label="Top customer pains">
            <textarea value={form.customerPains} onChange={(e) => updateField('customerPains', e.target.value)} className="os-input min-h-[110px]" placeholder="What pains, problems, or objections show up the most?" />
          </Field>
          <Field label="FAQs / common questions">
            <textarea value={form.faqs} onChange={(e) => updateField('faqs', e.target.value)} className="os-input min-h-[110px]" placeholder="Paste questions you hear in DMs, calls, or sales chats." />
          </Field>
          <Field label="Brand voice">
            <input value={form.tone} onChange={(e) => updateField('tone', e.target.value)} className="os-input" placeholder="Direct, premium, practical" />
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

        {error ? <p className="mt-4 text-sm font-semibold text-red-700">{error}</p> : null}

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button disabled={loading} className="btn-primary disabled:opacity-60">
            {loading ? 'Generating OS...' : 'Generate content OS'}
          </button>
          <p className="text-sm text-[#534b52]">This is the first layer: business context → pillars → ideas → weekly plan.</p>
        </div>
      </form>

      <div className="space-y-6">
        <div className="glass-card bg-[#ddd7c8] p-5 md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#534b52]">What this sets up</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[#2d232e]">
            <li>• Business-aware content pillars</li>
            <li>• Weekly ready-to-post ideas</li>
            <li>• Hook direction and content angles</li>
            <li>• A repeatable content workflow inside KarchX OS</li>
          </ul>
        </div>

        {result ? (
          <div className="glass-card bg-[#f1f0ea] p-5 md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#534b52]">Generated preview</p>
            <div className="mt-4 space-y-5">
              <div>
                <h3 className="text-lg font-bold">Pillars</h3>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-[#534b52]">
                  {result.pillars.slice(0, 3).map((pillar) => (
                    <li key={pillar.title}><span className="font-semibold text-[#2d232e]">{pillar.title}:</span> {pillar.description}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold">Ideas</h3>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-[#534b52]">
                  {result.ideas.slice(0, 3).map((idea) => (
                    <li key={idea.title}><span className="font-semibold text-[#2d232e]">{idea.title}</span> — {idea.hook}</li>
                  ))}
                </ul>
              </div>
            </div>
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
