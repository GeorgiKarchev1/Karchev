'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { calculateEnEstimate, EnAnswers, EstimateResult } from '@/lib/pricing'

// ─── Types ─────────────────────────────────────────────────────────────────────

interface LeadData {
  name: string
  email: string
  company: string
  phone: string
  consent: boolean
}

// ─── Shared UI ─────────────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100)
  return (
    <div className="w-full h-1 bg-[#2d232e]/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-[#534b52] rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </div>
  )
}

function OptionCard({ title, description, selected, onClick }: {
  title: string; description?: string; selected: boolean; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-150 active:scale-[0.98] ${
        selected ? 'bg-[#2d232e] border-[#2d232e]' : 'bg-white/70 border-[#2d232e]/15 hover:border-[#2d232e]/50 hover:bg-[#e0ddcf]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className={`font-bold text-base leading-snug ${selected ? 'text-[#e0ddcf]' : 'text-[#2d232e]'}`}>{title}</p>
          {description && (
            <p className={`text-sm mt-1 leading-relaxed ${selected ? 'text-[#e0ddcf]/65' : 'text-[#2d232e]/55'}`}>{description}</p>
          )}
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
          selected ? 'bg-[#534b52] border-[#534b52]' : 'border-[#2d232e]/25'
        }`}>
          {selected && <div className="w-2 h-2 rounded-full bg-[#e0ddcf]" />}
        </div>
      </div>
    </button>
  )
}

function CheckboxCard({ title, checked, onToggle }: { title: string; checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-150 active:scale-[0.98] flex items-center gap-3 ${
        checked ? 'bg-[#2d232e] border-[#2d232e]' : 'bg-white/70 border-[#2d232e]/15 hover:border-[#2d232e]/50 hover:bg-[#e0ddcf]'
      }`}
    >
      <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all ${
        checked ? 'bg-[#534b52] border-[#534b52]' : 'border-[#2d232e]/30'
      }`}>
        {checked && <Check className="w-3 h-3 text-[#e0ddcf]" strokeWidth={3} />}
      </div>
      <span className={`font-semibold text-sm leading-snug ${checked ? 'text-[#e0ddcf]' : 'text-[#2d232e]'}`}>{title}</span>
    </button>
  )
}

function NavButtons({ onBack, onNext, nextLabel = 'Next', nextDisabled = false, showBack = true }: {
  onBack?: () => void; onNext: () => void; nextLabel?: string; nextDisabled?: boolean; showBack?: boolean
}) {
  return (
    <div className="flex items-center gap-3 mt-8">
      {showBack && onBack && (
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 px-4 py-3 rounded-full border-2 border-[#2d232e]/20 text-[#2d232e]/60 text-sm font-semibold hover:border-[#2d232e]/50 hover:text-[#2d232e] transition-all">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-all ${
          nextDisabled ? 'bg-[#2d232e]/10 text-[#2d232e]/30 cursor-not-allowed' : 'bg-[#2d232e] text-[#e0ddcf] hover:bg-[#534b52] active:scale-[0.98]'
        }`}
      >
        {nextLabel}
        {!nextDisabled && <ArrowRight className="w-4 h-4" />}
      </button>
    </div>
  )
}

function QLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-3">{children}</p>
}

const stepVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
}

const QUESTION_STEPS = 8

async function submitLead(answers: EnAnswers, lead: LeadData, result: EstimateResult): Promise<void> {
  // TODO: integrate with Resend / EmailJS / your backend
  console.log('[Funnel EN] Lead submitted:', { answers, lead, result })
}

// ─── Main Wizard ───────────────────────────────────────────────────────────────

export default function EnFunnelWizard() {
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState<EnAnswers>({})
  const [lead, setLead]       = useState<LeadData>({ name: '', email: '', company: '', phone: '', consent: false })
  const [leadError, setLeadError] = useState('')
  const [result, setResult]   = useState<EstimateResult | null>(null)

  const set = (key: keyof EnAnswers, value: any) => setAnswers(prev => ({ ...prev, [key]: value }))

  const toggleFeature = (value: string) => {
    const current = answers.features ?? []
    if (value === 'none') { set('features', current.includes('none') ? [] : ['none']); return }
    const without = current.filter(f => f !== 'none')
    set('features', without.includes(value) ? without.filter(f => f !== value) : [...without, value])
  }

  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => s - 1)

  const handleLeadNext = () => {
    if (!lead.name.trim())                              { setLeadError('Please enter your name.'); return }
    if (!lead.email.includes('@') || !lead.email.includes('.')) { setLeadError('Please enter a valid email address.'); return }
    if (!lead.consent)                                  { setLeadError('Please check the consent box to continue.'); return }
    setLeadError('')
    next()
  }

  const handleFinish = () => {
    const est = calculateEnEstimate(answers)
    submitLead(answers, lead, est)
    setResult(est)
  }

  if (result) {
    return <EnResultScreen result={result} answers={answers} lead={lead} onReset={() => { setStep(0); setAnswers({}); setResult(null) }} />
  }

  return (
    <div className="min-h-screen bg-[#f1f0ea] flex flex-col">
      <header className="flex items-center justify-between px-5 py-4 border-b border-[#2d232e]/8">
        <Link href="/" className="font-black text-lg tracking-tight text-[#2d232e]">KARCHX</Link>
        <Link href="/" className="text-xs text-[#2d232e]/50 hover:text-[#2d232e] transition-colors font-medium">← Back to site</Link>
      </header>

      {step >= 2 && (
        <div className="px-5 pt-4">
          <div className="max-w-lg mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2d232e]/35 mb-2">
              Question {step - 1} of {QUESTION_STEPS}
            </p>
            <ProgressBar step={step - 1} total={QUESTION_STEPS} />
          </div>
        </div>
      )}

      <div className="flex-1 flex items-start justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div key={step} variants={stepVariants} initial="initial" animate="animate" exit="exit">
              {step === 0 && <EnIntro onStart={next} />}
              {step === 1 && <EnStepLead lead={lead} setLead={setLead} onBack={back} onNext={handleLeadNext} error={leadError} />}
              {step === 2 && <EnStep1 answers={answers} set={set} onNext={next} onBack={back} />}
              {step === 3 && <EnStep2 answers={answers} set={set} onNext={next} onBack={back} />}
              {step === 4 && <EnStep3 answers={answers} set={set} onNext={next} onBack={back} />}
              {step === 5 && <EnStep4 answers={answers} set={set} onNext={next} onBack={back} />}
              {step === 6 && <EnStep5 answers={answers} set={set} onNext={next} onBack={back} />}
              {step === 7 && <EnStep6 answers={answers} toggleFeature={toggleFeature} onNext={next} onBack={back} />}
              {step === 8 && <EnStep7 answers={answers} set={set} onNext={next} onBack={back} />}
              {step === 9 && <EnStep8 answers={answers} set={set} onNext={handleFinish} onBack={back} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ─── Intro ─────────────────────────────────────────────────────────────────────

function EnIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#534b52]/30 text-[#534b52] text-xs font-bold uppercase tracking-widest mb-8">
        Free Website Calculator
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-[#2d232e] leading-tight tracking-tight mb-4">
        What will your<br />website cost?
      </h1>
      <p className="text-[#2d232e]/65 text-base md:text-lg leading-relaxed max-w-md mx-auto mb-10">
        Answer a few quick questions and get an honest price estimate — no "it depends", no pressure, no sales pitch.
      </p>
      <button onClick={onStart} className="inline-flex items-center gap-2 px-8 py-4 bg-[#2d232e] text-[#e0ddcf] rounded-full font-bold text-base hover:bg-[#534b52] transition-all active:scale-[0.97]">
        Get Started <ArrowRight className="w-5 h-5" />
      </button>
      <p className="text-xs text-[#2d232e]/35 mt-5 font-medium">~2 minutes · 8 questions</p>
    </div>
  )
}

// ─── Steps ─────────────────────────────────────────────────────────────────────

function EnStep1({ answers, set, onNext, onBack }: any) {
  const options = [
    { value: 'business_site', title: 'Business website',    description: 'Services, hospitality, consultancy, professional firm, etc.' },
    { value: 'landing_page',  title: 'Landing page',        description: 'One focused page for a specific offer, service, or campaign.' },
    { value: 'ecommerce',     title: 'Online store',        description: 'Products, cart, payments, and order management.' },
    { value: 'unsure',        title: "I'm not sure yet",    description: "We'll help you figure out what makes sense." },
  ]
  return (
    <div>
      <QLabel>Question 1</QLabel>
      <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-6 leading-snug">What kind of website do you need?</h2>
      <div className="flex flex-col gap-3">
        {options.map(o => <OptionCard key={o.value} {...o} selected={answers.siteType === o.value} onClick={() => set('siteType', o.value)} />)}
      </div>
      <NavButtons showBack={false} onBack={onBack} onNext={onNext} nextDisabled={!answers.siteType} />
    </div>
  )
}

function EnStep2({ answers, set, onNext, onBack }: any) {
  const options = [
    { value: 'professional',     title: 'Professional services' },
    { value: 'health_beauty',    title: 'Health & wellness / Beauty' },
    { value: 'food',             title: 'Food & hospitality' },
    { value: 'ecommerce_retail', title: 'E-commerce / Retail' },
    { value: 'tech_startup',     title: 'Tech / SaaS / Startup' },
    { value: 'other',            title: 'Other' },
  ]
  return (
    <div>
      <QLabel>Question 2</QLabel>
      <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-6 leading-snug">What industry are you in?</h2>
      <div className="grid grid-cols-2 gap-2.5">
        {options.map(o => <OptionCard key={o.value} title={o.title} selected={answers.industry === o.value} onClick={() => set('industry', o.value)} />)}
      </div>
      {answers.industry === 'other' && (
        <input type="text" placeholder="Describe your business in 1-2 words" value={answers.industryOther ?? ''} onChange={e => set('industryOther', e.target.value)}
          className="mt-3 w-full px-4 py-3 rounded-xl border-2 border-[#2d232e]/20 bg-white text-[#2d232e] placeholder-[#2d232e]/35 text-sm focus:outline-none focus:border-[#534b52]" />
      )}
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!answers.industry} />
    </div>
  )
}

function EnStep3({ answers, set, onNext, onBack }: any) {
  const options = [
    { value: 'no_site',      title: 'Starting from scratch' },
    { value: 'redesign',     title: 'Yes, but I want a full redesign' },
    { value: 'improvements', title: 'Yes, just some improvements' },
    { value: 'unsure',       title: "Not sure what I need" },
  ]
  return (
    <div>
      <QLabel>Question 3</QLabel>
      <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-6 leading-snug">Do you have an existing website?</h2>
      <div className="flex flex-col gap-3">
        {options.map(o => <OptionCard key={o.value} title={o.title} selected={answers.existingSite === o.value} onClick={() => set('existingSite', o.value)} />)}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!answers.existingSite} />
    </div>
  )
}

function EnStep4({ answers, set, onNext, onBack }: any) {
  const options = [
    { value: 'one_page',   title: '1 page',       description: 'Great for landing pages or a single core service.' },
    { value: 'three_five', title: '3–5 pages',    description: 'Home, About, Services, Contact and more.' },
    { value: 'five_ten',   title: '5–10 pages',   description: 'More services, subpages, or a more complex structure.' },
    { value: 'unsure',     title: "I'm not sure", description: "We'll estimate based on your answers." },
  ]
  return (
    <div>
      <QLabel>Question 4</QLabel>
      <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-6 leading-snug">How many pages do you need?</h2>
      <div className="flex flex-col gap-3">
        {options.map(o => <OptionCard key={o.value} {...o} selected={answers.pages === o.value} onClick={() => set('pages', o.value)} />)}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!answers.pages} />
    </div>
  )
}

function EnStep5({ answers, set, onNext, onBack }: any) {
  const options = [
    { value: 'content_ready',   title: 'Yes — text, images, branding ready' },
    { value: 'partial_content', title: 'Partially', description: 'Some assets ready, others not.' },
    { value: 'no_content',      title: 'No', description: "I'll need help with copy and structure." },
    { value: 'unsure',          title: "Not sure what's needed" },
  ]
  return (
    <div>
      <QLabel>Question 5</QLabel>
      <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-6 leading-snug">Do you have content ready?</h2>
      <div className="flex flex-col gap-3">
        {options.map(o => <OptionCard key={o.value} {...o} selected={answers.content === o.value} onClick={() => set('content', o.value)} />)}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!answers.content} />
    </div>
  )
}

function EnStep6({ answers, toggleFeature, onNext, onBack }: any) {
  const features = answers.features ?? []
  const options = [
    { value: 'contact_form',    title: 'Contact form' },
    { value: 'booking',         title: 'Booking / Appointments' },
    { value: 'payments',        title: 'Online payments' },
    { value: 'blog',            title: 'Blog / Articles' },
    { value: 'seo_basic',       title: 'SEO basics' },
    { value: 'multilingual',    title: 'Multilingual' },
    { value: 'crm_integration', title: 'CRM / Integrations' },
    { value: 'none',            title: 'Nothing special' },
  ]
  return (
    <div>
      <QLabel>Question 6</QLabel>
      <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-2 leading-snug">What features do you need?</h2>
      <p className="text-sm text-[#2d232e]/50 mb-6 font-medium">Select all that apply.</p>
      <div className="grid grid-cols-1 gap-2.5">
        {options.map(o => <CheckboxCard key={o.value} title={o.title} checked={features.includes(o.value)} onToggle={() => toggleFeature(o.value)} />)}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={features.length === 0} />
    </div>
  )
}

function EnStep7({ answers, set, onNext, onBack }: any) {
  const options = [
    { value: 'urgent',   title: 'Within 2 weeks' },
    { value: 'normal',   title: 'Within a month' },
    { value: 'flexible', title: 'No rush' },
  ]
  return (
    <div>
      <QLabel>Question 7</QLabel>
      <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-6 leading-snug">How soon do you need it?</h2>
      <div className="flex flex-col gap-3">
        {options.map(o => <OptionCard key={o.value} title={o.title} selected={answers.timeline === o.value} onClick={() => set('timeline', o.value)} />)}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!answers.timeline} />
    </div>
  )
}

function EnStep8({ answers, set, onNext, onBack }: any) {
  const options = [
    { value: 'under_500',  title: 'Under €500' },
    { value: '500_1500',   title: '€500 – €1,500' },
    { value: '1500_3000',  title: '€1,500 – €3,000' },
    { value: '3000_plus',  title: '€3,000+' },
    { value: 'unsure',     title: 'Not sure yet' },
  ]
  return (
    <div>
      <QLabel>Question 8</QLabel>
      <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-2 leading-snug">What's your budget range?</h2>
      <p className="text-sm text-[#2d232e]/50 mb-6 font-medium leading-relaxed">
        This helps us show you the option that makes sense — not the most expensive one.
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {options.map(o => <OptionCard key={o.value} title={o.title} selected={answers.budget === o.value} onClick={() => set('budget', o.value)} />)}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextLabel="See My Estimate" nextDisabled={!answers.budget} />
    </div>
  )
}

function EnStepLead({ lead, setLead, onBack, onNext, error }: {
  lead: LeadData; setLead: any; onBack: () => void; onNext: () => void; error: string
}) {
  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-3">Before we begin</p>
        <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-2 leading-snug">
          Where should we send the estimate?
        </h2>
        <p className="text-sm text-[#2d232e]/55 leading-relaxed">
          You'll get your price range and a short recommendation right after answering the questions.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <input type="text" placeholder="Your name" value={lead.name} onChange={e => setLead((p: LeadData) => ({ ...p, name: e.target.value }))}
          className="w-full px-4 py-3.5 rounded-xl border-2 border-[#2d232e]/15 bg-white text-[#2d232e] placeholder-[#2d232e]/35 text-sm focus:outline-none focus:border-[#534b52] transition-colors" />
        <input type="email" placeholder="email@example.com" value={lead.email} onChange={e => setLead((p: LeadData) => ({ ...p, email: e.target.value }))}
          className="w-full px-4 py-3.5 rounded-xl border-2 border-[#2d232e]/15 bg-white text-[#2d232e] placeholder-[#2d232e]/35 text-sm focus:outline-none focus:border-[#534b52] transition-colors" />
        <input type="text" placeholder="Company / Website (optional)" value={lead.company} onChange={e => setLead((p: LeadData) => ({ ...p, company: e.target.value }))}
          className="w-full px-4 py-3.5 rounded-xl border-2 border-[#2d232e]/15 bg-white text-[#2d232e] placeholder-[#2d232e]/35 text-sm focus:outline-none focus:border-[#534b52] transition-colors" />
        <input type="tel" placeholder="Phone (optional)" value={lead.phone} onChange={e => setLead((p: LeadData) => ({ ...p, phone: e.target.value }))}
          className="w-full px-4 py-3.5 rounded-xl border-2 border-[#2d232e]/15 bg-white text-[#2d232e] placeholder-[#2d232e]/35 text-sm focus:outline-none focus:border-[#534b52] transition-colors" />
        <label className="flex items-start gap-3 cursor-pointer mt-1">
          <button type="button" onClick={() => setLead((p: LeadData) => ({ ...p, consent: !p.consent }))}
            className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${lead.consent ? 'bg-[#534b52] border-[#534b52]' : 'border-[#2d232e]/30 bg-white'}`}>
            {lead.consent && <Check className="w-3 h-3 text-[#e0ddcf]" strokeWidth={3} />}
          </button>
          <span className="text-xs text-[#2d232e]/55 leading-relaxed">
            I agree to receive the estimate result and follow-up communication regarding this enquiry.
          </span>
        </label>
        {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Start the questions" />
    </div>
  )
}

// ─── Result Screen ─────────────────────────────────────────────────────────────

const EN_FEATURE_LABELS: Record<string, string> = {
  booking: 'Booking / Appointments',
  payments: 'Online payments',
  blog: 'Blog / Articles',
  seo_basic: 'SEO basics',
  multilingual: 'Multilingual',
  contact_form: 'Contact form',
  crm_integration: 'CRM / Integrations',
}

function EnResultScreen({ result, answers, lead, onReset }: {
  result: EstimateResult; answers: EnAnswers; lead: LeadData; onReset: () => void
}) {
  const selectedFeatures = (answers.features ?? []).filter(f => f !== 'none' && EN_FEATURE_LABELS[f])

  return (
    <div className="min-h-screen bg-[#f1f0ea] flex flex-col">
      <header className="flex items-center justify-between px-5 py-4 border-b border-[#2d232e]/8">
        <Link href="/" className="font-black text-lg tracking-tight text-[#2d232e]">KARCHX</Link>
        <button onClick={onReset} className="text-xs text-[#2d232e]/50 hover:text-[#2d232e] transition-colors font-medium">← Start over</button>
      </header>

      <div className="flex-1 px-4 py-10 max-w-lg mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-3">Your estimated website investment</p>
            <div className="text-5xl md:text-6xl font-black text-[#2d232e] tracking-tight mb-2">
              €{result.minPrice} – €{result.maxPrice}
            </div>
            <p className="text-sm text-[#2d232e]/50 font-medium">
              This is an honest estimate based on your answers — not a final quote.
            </p>
          </div>

          {result.warnings.includes('budget_too_low') && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium">
              ⚠️ Your budget may be lower than what this project realistically requires. We'll talk through the options honestly.
            </div>
          )}
          {result.warnings.includes('ecommerce_budget_mismatch') && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium">
              ⚠️ An e-commerce store is unlikely to be realistic under €500. We'll find the right approach together.
            </div>
          )}

          <div className="bg-white/80 rounded-2xl border border-[#2d232e]/10 p-5 mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-1">Best fit for you</p>
            <p className="font-black text-[#2d232e] text-lg mb-2">{result.recommendedType}</p>
            <p className="text-sm text-[#2d232e]/65 leading-relaxed">{result.explanation}</p>
          </div>

          <div className="bg-white/80 rounded-2xl border border-[#2d232e]/10 p-5 mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-3">What's typically included?</p>
            <ul className="space-y-2">
              {['Site structure', 'Custom design', 'Development', 'Mobile version', 'Basic SEO structure', 'Contact form', 'Launch'].map(item => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-[#2d232e]/75">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#534b52] flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
            {selectedFeatures.length > 0 && (
              <div className="border-t border-[#2d232e]/8 mt-4 pt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-3">Additional features affecting the price:</p>
                <ul className="space-y-2">
                  {selectedFeatures.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-[#2d232e]/75">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2d232e]/40 flex-shrink-0" />{EN_FEATURE_LABELS[f]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="bg-[#2d232e] rounded-2xl p-6 md:p-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#e0ddcf]/40 mb-2">Want an exact quote?</p>
            <h3 className="text-xl font-black text-[#e0ddcf] mb-2 leading-snug">Book a free 30-minute call.</h3>
            <p className="text-sm text-[#e0ddcf]/60 leading-relaxed mb-6">
              We'll tell you exactly what you need, what you don't, and what it would realistically cost.
            </p>
            <a href="https://cal.com/georgi-karchev-3r9puz/30min" target="_blank" rel="noopener noreferrer"
              className="block w-full py-3.5 rounded-full bg-[#e0ddcf] text-[#2d232e] font-black text-sm hover:bg-white transition-colors mb-3">
              Book a Free Call →
            </a>
            <button onClick={() => alert(`Your estimate will be sent to ${lead.email}`)}
              className="block w-full py-3 rounded-full border border-[#e0ddcf]/20 text-[#e0ddcf]/60 font-semibold text-sm hover:border-[#e0ddcf]/50 hover:text-[#e0ddcf] transition-all">
              Email me the estimate
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
