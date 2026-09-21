'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useOS } from '@/context/OSContext'
import { MODULE_BY_KEY } from '@/lib/os/modules'
import type {
  BusinessProfileInput,
  ContentGoal,
  OSBootstrapResult,
} from '@/lib/os/types'
import { GlyphArrowRight, GlyphCheck, GlyphSpark } from './icons'
import { OSButton, OSField, OSSectionLabel, fieldClass } from './ui'

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

/** The fields the generator actually leans on, used for the readiness meter. */
const SUBSTANTIVE_FIELDS: (keyof BusinessProfileInput)[] = [
  'businessName',
  'businessType',
  'whatYouSell',
  'targetAudience',
  'customerPains',
  'faqs',
]

export default function OnboardingForm() {
  const router = useRouter()
  const { profile, bootstrap, setProfile, setBootstrap, hydrated } = useOS()

  const [form, setForm] = useState<BusinessProfileInput>(emptyForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (profile) setForm(profile)
  }, [profile])

  const selectedGoalSet = useMemo(() => new Set(form.goals), [form.goals])

  // The more context the generator gets, the less generic its output — so the
  // form shows how complete that context is rather than leaving it invisible.
  const filledCount = useMemo(
    () => SUBSTANTIVE_FIELDS.filter((key) => String(form[key]).trim().length > 0).length,
    [form],
  )
  const completeness = Math.round((filledCount / SUBSTANTIVE_FIELDS.length) * 100)

  const updateField = (
    field: keyof BusinessProfileInput,
    value: string | ContentGoal[],
  ) => {
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
    ? 'Generating…'
    : bootstrap
      ? 'Regenerate the OS'
      : 'Generate the OS'

  return (
    <div className="os-settle grid gap-4 px-6 md:px-10 xl:grid-cols-[1.25fr_0.75fr]">
      <form onSubmit={handleSubmit} className="os-pane p-5 md:p-7">
        <div className="grid gap-4 md:grid-cols-2">
          <OSField label="Business name">
            <input
              value={form.businessName}
              onChange={(e) => updateField('businessName', e.target.value)}
              className={fieldClass}
              placeholder="KarchX"
            />
          </OSField>
          <OSField label="Business type">
            <input
              value={form.businessType}
              onChange={(e) => updateField('businessType', e.target.value)}
              className={fieldClass}
              placeholder="Agency / SaaS / Service business"
            />
          </OSField>
        </div>

        <div className="mt-4 grid gap-4">
          <OSField label="What do you sell?">
            <textarea
              value={form.whatYouSell}
              onChange={(e) => updateField('whatYouSell', e.target.value)}
              className={`${fieldClass} min-h-[96px] resize-y`}
              placeholder="Describe your offer clearly. What outcome do clients walk away with?"
            />
          </OSField>
          <OSField label="Target audience">
            <textarea
              value={form.targetAudience}
              onChange={(e) => updateField('targetAudience', e.target.value)}
              className={`${fieldClass} min-h-[96px] resize-y`}
              placeholder="Who are you trying to reach? Role, stage, size, context."
            />
          </OSField>
          <OSField
            label="Top customer pains"
            hint="The generator mines these for hooks, so specifics beat adjectives."
          >
            <textarea
              value={form.customerPains}
              onChange={(e) => updateField('customerPains', e.target.value)}
              className={`${fieldClass} min-h-[110px] resize-y`}
              placeholder="What pains, problems, or objections come up the most in calls and DMs?"
            />
          </OSField>
          <OSField label="FAQs / common questions">
            <textarea
              value={form.faqs}
              onChange={(e) => updateField('faqs', e.target.value)}
              className={`${fieldClass} min-h-[110px] resize-y`}
              placeholder="Paste real questions you hear in DMs, calls, or sales chats."
            />
          </OSField>
          <OSField label="Brand voice">
            <input
              value={form.tone}
              onChange={(e) => updateField('tone', e.target.value)}
              className={fieldClass}
              placeholder="Direct, premium, practical"
            />
          </OSField>
        </div>

        <fieldset className="mt-6">
          <legend className="mb-3">
            <OSSectionLabel>Goals</OSSectionLabel>
          </legend>
          <div className="flex flex-wrap gap-2">
            {goals.map((goal) => {
              const active = selectedGoalSet.has(goal.value)
              return (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => toggleGoal(goal.value)}
                  aria-pressed={active}
                  className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-[var(--os-r-pill)] px-3.5 text-[13px] font-semibold transition-all duration-[var(--os-fast)] ease-[var(--os-ease)] ${
                    active
                      ? 'os-accent-fill text-white shadow-[var(--os-shadow-rest)]'
                      : 'border border-[var(--os-line)] bg-white text-[var(--os-muted)] hover:border-[var(--os-line-strong)] hover:text-[var(--os-ink)]'
                  }`}
                >
                  {active ? <GlyphCheck className="h-3.5 w-3.5" /> : null}
                  {goal.label}
                </button>
              )
            })}
          </div>
        </fieldset>

        {error ? (
          <p
            role="alert"
            className="mt-4 rounded-[var(--os-r-tile)] border border-[#f0d4d0] bg-[#fdf5f4] px-3 py-2.5 text-[13px] font-medium text-[#c0392b]"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--os-line)] pt-5">
          <OSButton
            type="submit"
            tone="accent"
            busy={loading}
            icon={<GlyphSpark className="h-4 w-4" />}
          >
            {buttonLabel}
          </OSButton>
          <p className="text-[13px] leading-5 text-[var(--os-muted)]">
            {hydrated && profile
              ? 'Regenerating replaces your pillars, ideas, hooks and plan.'
              : 'Context first — pillars, ideas, hooks and the week follow from it.'}
          </p>
        </div>
      </form>

      <div className="flex flex-col gap-4">
        <section className="os-pane p-5 md:p-6">
          <OSSectionLabel>Context strength</OSSectionLabel>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading text-[26px] font-semibold tabular-nums text-[var(--os-ink)]">
              {completeness}%
            </span>
            <span className="text-[13px] text-[var(--os-muted)]">
              {filledCount} of {SUBSTANTIVE_FIELDS.length} filled
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--os-surface-sunk)]">
            <div
              className="os-accent-edge h-full rounded-full transition-[width] duration-[var(--os-base)] ease-[var(--os-ease)]"
              style={{ width: `${completeness}%` }}
            />
          </div>
          <p className="mt-3 text-[13px] leading-5 text-[var(--os-muted)]">
            Thin answers produce generic pillars. Sentences you would actually say
            to a client work best.
          </p>
        </section>

        <section className="os-pane p-5 md:p-6">
          <OSSectionLabel>What this sets up</OSSectionLabel>
          <ul className="mt-4 space-y-2.5">
            {[
              MODULE_BY_KEY.pillars,
              MODULE_BY_KEY.ideas,
              MODULE_BY_KEY.hooks,
              MODULE_BY_KEY.plan,
              MODULE_BY_KEY.repurpose,
            ].map((module) => (
              <li key={module.key} className="flex gap-2.5">
                <span
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: module.accentA }}
                  aria-hidden="true"
                />
                <span className="text-[13px] leading-5 text-[var(--os-muted)]">
                  <span className="font-semibold text-[var(--os-ink)]">
                    {module.label}
                  </span>{' '}
                  — {module.blurb}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {bootstrap ? (
          <section className="os-pane p-5 md:p-6">
            <OSSectionLabel>Current pillars</OSSectionLabel>
            <ul className="mt-4 space-y-3">
              {bootstrap.pillars.slice(0, 3).map((pillar) => (
                <li key={pillar.id} className="text-[13px] leading-5">
                  <span className="font-semibold text-[var(--os-ink)]">
                    {pillar.title}
                  </span>
                  <span className="text-[var(--os-muted)]"> — {pillar.description}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/os/pillars"
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--os-accent-a)] transition-transform duration-[var(--os-fast)] hover:translate-x-0.5"
            >
              Open pillars
              <GlyphArrowRight className="h-3.5 w-3.5" />
            </Link>
          </section>
        ) : null}
      </div>
    </div>
  )
}
