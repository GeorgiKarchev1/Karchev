'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { calculateBgEstimate, BgAnswers, EstimateResult } from '@/lib/pricing'

// ─── Types ─────────────────────────────────────────────────────────────────────

interface LeadData {
  name: string
  email: string
  phone: string
  consent: boolean
}

// ─── Flow ──────────────────────────────────────────────────────────────────────
// step 0  → Intro
// step 1  → Lead capture (email first)
// step 2–9 → Questions 1–8
// showResult → Result screen

const QUESTION_STEPS = 8  // steps 2–9
const stepVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8,  transition: { duration: 0.18 } },
}

// ─── Submit placeholder ────────────────────────────────────────────────────────

async function submitLead(answers: BgAnswers, lead: LeadData, result: EstimateResult): Promise<void> {
  // TODO: integrate with Resend / EmailJS / your backend
  console.log('[Funnel BG] Lead submitted:', { answers, lead, result })
}

// ─── Shared UI ─────────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  const pct = Math.round(((step - 1) / QUESTION_STEPS) * 100)
  return (
    <div className="w-full h-1 bg-[#2d232e]/10 rounded-full overflow-hidden">
      <motion.div className="h-full bg-[#534b52] rounded-full" initial={{ width: 0 }}
        animate={{ width: `${pct}%` }} transition={{ duration: 0.4, ease: 'easeOut' }} />
    </div>
  )
}

function OptionCard({ title, description, selected, onClick }: {
  title: string; description?: string; selected: boolean; onClick: () => void
}) {
  return (
    <button type="button" onClick={onClick}
      className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-150 active:scale-[0.98] ${
        selected ? 'bg-[#2d232e] border-[#2d232e]' : 'bg-white/70 border-[#2d232e]/15 hover:border-[#2d232e]/50 hover:bg-[#e0ddcf]'
      }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className={`font-bold text-base leading-snug ${selected ? 'text-[#e0ddcf]' : 'text-[#2d232e]'}`}>{title}</p>
          {description && <p className={`text-sm mt-1 leading-relaxed ${selected ? 'text-[#e0ddcf]/65' : 'text-[#2d232e]/55'}`}>{description}</p>}
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${selected ? 'bg-[#534b52] border-[#534b52]' : 'border-[#2d232e]/25'}`}>
          {selected && <div className="w-2 h-2 rounded-full bg-[#e0ddcf]" />}
        </div>
      </div>
    </button>
  )
}

function CheckboxCard({ title, checked, onToggle }: { title: string; checked: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle}
      className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-150 active:scale-[0.98] flex items-center gap-3 ${
        checked ? 'bg-[#2d232e] border-[#2d232e]' : 'bg-white/70 border-[#2d232e]/15 hover:border-[#2d232e]/50 hover:bg-[#e0ddcf]'
      }`}>
      <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all ${checked ? 'bg-[#534b52] border-[#534b52]' : 'border-[#2d232e]/30'}`}>
        {checked && <Check className="w-3 h-3 text-[#e0ddcf]" strokeWidth={3} />}
      </div>
      <span className={`font-semibold text-sm leading-snug ${checked ? 'text-[#e0ddcf]' : 'text-[#2d232e]'}`}>{title}</span>
    </button>
  )
}

function NavButtons({ onBack, onNext, nextLabel = 'Напред', nextDisabled = false, showBack = true }: {
  onBack?: () => void; onNext: () => void; nextLabel?: string; nextDisabled?: boolean; showBack?: boolean
}) {
  return (
    <div className="flex items-center gap-3 mt-8">
      {showBack && onBack && (
        <button type="button" onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-3 rounded-full border-2 border-[#2d232e]/20 text-[#2d232e]/60 text-sm font-semibold hover:border-[#2d232e]/50 hover:text-[#2d232e] transition-all">
          <ArrowLeft className="w-4 h-4" /> Назад
        </button>
      )}
      <button type="button" onClick={onNext} disabled={nextDisabled}
        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-all ${
          nextDisabled ? 'bg-[#2d232e]/10 text-[#2d232e]/30 cursor-not-allowed' : 'bg-[#2d232e] text-[#e0ddcf] hover:bg-[#534b52] active:scale-[0.98]'
        }`}>
        {nextLabel} {!nextDisabled && <ArrowRight className="w-4 h-4" />}
      </button>
    </div>
  )
}

function QLabel({ n }: { n: number }) {
  return <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-3">Въпрос {n}</p>
}

// ─── Main Wizard ───────────────────────────────────────────────────────────────

export default function BgFunnelWizard() {
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState<BgAnswers>({})
  const [lead, setLead]       = useState<LeadData>({ name: '', email: '', phone: '', consent: false })
  const [leadError, setLeadError] = useState('')
  const [result, setResult]   = useState<EstimateResult | null>(null)

  const set = (key: keyof BgAnswers, value: any) => setAnswers(prev => ({ ...prev, [key]: value }))

  const toggleFeature = (value: string) => {
    const current = answers.features ?? []
    if (value === 'none') { set('features', current.includes('none') ? [] : ['none']); return }
    const without = current.filter(f => f !== 'none')
    set('features', without.includes(value) ? without.filter(f => f !== value) : [...without, value])
  }

  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => s - 1)

  const handleLeadNext = () => {
    if (!lead.name.trim())                              { setLeadError('Моля въведи своето име.'); return }
    if (!lead.email.includes('@') || !lead.email.includes('.')) { setLeadError('Въведи валиден имейл адрес.'); return }
    if (!lead.consent)                                  { setLeadError('Трябва да се съгласиш, за да продължиш.'); return }
    setLeadError('')
    next()
  }

  const handleFinish = () => {
    const est = calculateBgEstimate(answers)
    submitLead(answers, lead, est) // fire and forget
    setResult(est)
  }

  if (result) {
    return <BgResultScreen result={result} answers={answers} lead={lead} onReset={() => { setStep(0); setAnswers({}); setResult(null) }} />
  }

  return (
    <div className="min-h-screen bg-[#f1f0ea] flex flex-col">
      <header className="flex items-center justify-between px-5 py-4 border-b border-[#2d232e]/8">
        <Link href="/" className="font-black text-lg tracking-tight text-[#2d232e]">KARCHX</Link>
        <Link href="/" className="text-xs text-[#2d232e]/50 hover:text-[#2d232e] transition-colors font-medium">← Обратно към сайта</Link>
      </header>

      {/* Progress bar — shown only for question steps (2–9) */}
      {step >= 2 && (
        <div className="px-5 pt-4">
          <div className="max-w-lg mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2d232e]/35 mb-2">
              Въпрос {step - 1} от {QUESTION_STEPS}
            </p>
            <ProgressBar step={step - 1} />
          </div>
        </div>
      )}

      <div className="flex-1 flex items-start justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div key={step} variants={stepVariants} initial="initial" animate="animate" exit="exit">
              {step === 0 && <StepIntro onStart={next} />}
              {step === 1 && <StepLead lead={lead} setLead={setLead} onBack={back} onNext={handleLeadNext} error={leadError} />}
              {step === 2 && <Step1 answers={answers} set={set} onNext={next} onBack={back} />}
              {step === 3 && <Step2 answers={answers} set={set} onNext={next} onBack={back} />}
              {step === 4 && <Step3 answers={answers} set={set} onNext={next} onBack={back} />}
              {step === 5 && <Step4 answers={answers} set={set} onNext={next} onBack={back} />}
              {step === 6 && <Step5 answers={answers} set={set} onNext={next} onBack={back} />}
              {step === 7 && <Step6 answers={answers} toggleFeature={toggleFeature} onNext={next} onBack={back} />}
              {step === 8 && <Step7 answers={answers} set={set} onNext={next} onBack={back} />}
              {step === 9 && <Step8 answers={answers} set={set} onNext={handleFinish} onBack={back} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ─── Intro ─────────────────────────────────────────────────────────────────────

function StepIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#534b52]/30 text-[#534b52] text-xs font-bold uppercase tracking-widest mb-8">
        Безплатен калкулатор
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-[#2d232e] leading-tight tracking-tight mb-4">
        Колко ще струва<br />сайтът ти?
      </h1>
      <p className="text-[#2d232e]/65 text-base md:text-lg leading-relaxed max-w-md mx-auto mb-10">
        Отговори на няколко кратки въпроса и ще получиш честен ориентировъчен диапазон — без "зависи", без излишни разговори.
      </p>
      <button onClick={onStart}
        className="inline-flex items-center gap-2 px-8 py-4 bg-[#2d232e] text-[#e0ddcf] rounded-full font-bold text-base hover:bg-[#534b52] transition-all active:scale-[0.97]">
        Започни <ArrowRight className="w-5 h-5" />
      </button>
      <p className="text-xs text-[#2d232e]/35 mt-5 font-medium">~2 минути · 8 въпроса</p>
    </div>
  )
}

// ─── Step 1: Lead capture (moved FIRST) ───────────────────────────────────────

function StepLead({ lead, setLead, onBack, onNext, error }: {
  lead: LeadData; setLead: any; onBack: () => void; onNext: () => void; error: string
}) {
  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-3">Преди да започнем</p>
        <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-2 leading-snug">
          Накъде да изпратим резултата?
        </h2>
        <p className="text-sm text-[#2d232e]/55 leading-relaxed">
          Ще получиш ориентировъчна цена и кратка препоръка веднага след като отговориш на въпросите.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <input type="text" placeholder="Твоето име" value={lead.name}
          onChange={e => setLead((p: LeadData) => ({ ...p, name: e.target.value }))}
          className="w-full px-4 py-3.5 rounded-xl border-2 border-[#2d232e]/15 bg-white text-[#2d232e] placeholder-[#2d232e]/35 text-sm focus:outline-none focus:border-[#534b52] transition-colors" />
        <input type="email" placeholder="email@example.com" value={lead.email}
          onChange={e => setLead((p: LeadData) => ({ ...p, email: e.target.value }))}
          className="w-full px-4 py-3.5 rounded-xl border-2 border-[#2d232e]/15 bg-white text-[#2d232e] placeholder-[#2d232e]/35 text-sm focus:outline-none focus:border-[#534b52] transition-colors" />
        <input type="tel" placeholder="Телефон — по желание" value={lead.phone}
          onChange={e => setLead((p: LeadData) => ({ ...p, phone: e.target.value }))}
          className="w-full px-4 py-3.5 rounded-xl border-2 border-[#2d232e]/15 bg-white text-[#2d232e] placeholder-[#2d232e]/35 text-sm focus:outline-none focus:border-[#534b52] transition-colors" />

        <label className="flex items-start gap-3 cursor-pointer mt-1">
          <button type="button" onClick={() => setLead((p: LeadData) => ({ ...p, consent: !p.consent }))}
            className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${lead.consent ? 'bg-[#534b52] border-[#534b52]' : 'border-[#2d232e]/30 bg-white'}`}>
            {lead.consent && <Check className="w-3 h-3 text-[#e0ddcf]" strokeWidth={3} />}
          </button>
          <span className="text-xs text-[#2d232e]/55 leading-relaxed">
            Съгласен/съгласна съм да получа резултата и последваща комуникация по запитването.
          </span>
        </label>

        {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
      </div>

      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Към въпросите" />
    </div>
  )
}

// ─── Questions (now steps 2–9) ─────────────────────────────────────────────────

function Step1({ answers, set, onNext, onBack }: any) {
  const options = [
    { value: 'business_site', title: 'Представителен сайт', description: 'За бизнес, услуги, ресторант, салон, адвокат, счетоводител и др.' },
    { value: 'landing_page',  title: 'Landing page',        description: 'Една страница за конкретна услуга, кампания или оферта.' },
    { value: 'ecommerce',     title: 'Онлайн магазин',      description: 'Продукти, количка, плащания и управление на поръчки.' },
    { value: 'unsure',        title: 'Не съм сигурен',      description: 'Ще ти помогнем да разбереш кое има смисъл.' },
  ]
  return (
    <div>
      <QLabel n={1} />
      <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-6 leading-snug">Какъв сайт ти трябва?</h2>
      <div className="flex flex-col gap-3">
        {options.map(o => <OptionCard key={o.value} {...o} selected={answers.siteType === o.value} onClick={() => set('siteType', o.value)} />)}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!answers.siteType} />
    </div>
  )
}

function Step2({ answers, set, onNext, onBack }: any) {
  const options = [
    { value: 'services',      title: 'Услуги' },
    { value: 'restaurant',    title: 'Ресторант / заведение' },
    { value: 'beauty_health', title: 'Козметика / салон / здраве' },
    { value: 'professional',  title: 'Адвокат / счетоводител / консултант' },
    { value: 'online_store',  title: 'Онлайн магазин' },
    { value: 'other',         title: 'Друго' },
  ]
  return (
    <div>
      <QLabel n={2} />
      <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-6 leading-snug">За какъв бизнес става дума?</h2>
      <div className="grid grid-cols-2 gap-2.5">
        {options.map(o => <OptionCard key={o.value} title={o.title} selected={answers.businessType === o.value} onClick={() => set('businessType', o.value)} />)}
      </div>
      {answers.businessType === 'other' && (
        <input type="text" placeholder="Напиши с 1-2 думи какъв е бизнесът" value={answers.businessTypeOther ?? ''}
          onChange={e => set('businessTypeOther', e.target.value)}
          className="mt-3 w-full px-4 py-3 rounded-xl border-2 border-[#2d232e]/20 bg-white text-[#2d232e] placeholder-[#2d232e]/35 text-sm focus:outline-none focus:border-[#534b52]" />
      )}
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!answers.businessType} />
    </div>
  )
}

function Step3({ answers, set, onNext, onBack }: any) {
  const options = [
    { value: 'no_site',      title: 'Не, започвам от нулата' },
    { value: 'redesign',     title: 'Да, но искам нов' },
    { value: 'improvements', title: 'Да, но само искам подобрения' },
    { value: 'unsure',       title: 'Не съм сигурен какво ми трябва' },
  ]
  return (
    <div>
      <QLabel n={3} />
      <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-6 leading-snug">Имаш ли вече сайт?</h2>
      <div className="flex flex-col gap-3">
        {options.map(o => <OptionCard key={o.value} title={o.title} selected={answers.existingSite === o.value} onClick={() => set('existingSite', o.value)} />)}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!answers.existingSite} />
    </div>
  )
}

function Step4({ answers, set, onNext, onBack }: any) {
  const options = [
    { value: 'one_page',   title: '1 страница',    description: 'Подходящо за landing page или една основна услуга.' },
    { value: 'three_five', title: '3–5 страници',  description: 'Начало, За нас, Услуги, Контакт и др.' },
    { value: 'five_ten',   title: '5–10 страници', description: 'Повече услуги, подстраници или по-сериозна структура.' },
    { value: 'unsure',     title: 'Не знам',       description: 'Ще изчислим ориентировъчно.' },
  ]
  return (
    <div>
      <QLabel n={4} />
      <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-6 leading-snug">Колко страници приблизително ще са нужни?</h2>
      <div className="flex flex-col gap-3">
        {options.map(o => <OptionCard key={o.value} {...o} selected={answers.pages === o.value} onClick={() => set('pages', o.value)} />)}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!answers.pages} />
    </div>
  )
}

function Step5({ answers, set, onNext, onBack }: any) {
  const options = [
    { value: 'content_ready',   title: 'Да — имам текстове и снимки' },
    { value: 'partial_content', title: 'Частично', description: 'Имам нещо, но не всичко.' },
    { value: 'no_content',      title: 'Не',       description: 'Ще ми трябва помощ с текстове/структура.' },
    { value: 'unsure',          title: 'Не знам какво точно трябва' },
  ]
  return (
    <div>
      <QLabel n={5} />
      <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-6 leading-snug">Имаш ли готово съдържание?</h2>
      <div className="flex flex-col gap-3">
        {options.map(o => <OptionCard key={o.value} {...o} selected={answers.content === o.value} onClick={() => set('content', o.value)} />)}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!answers.content} />
    </div>
  )
}

function Step6({ answers, toggleFeature, onNext, onBack }: any) {
  const features = answers.features ?? []
  const options = [
    { value: 'contact_form', title: 'Форма за запитване' },
    { value: 'booking',      title: 'Резервации / записване на час' },
    { value: 'payments',     title: 'Онлайн плащания' },
    { value: 'blog',         title: 'Блог / статии' },
    { value: 'seo_basic',    title: 'SEO основи' },
    { value: 'multilingual', title: 'Многоезичност' },
    { value: 'none',         title: 'Нищо специално' },
  ]
  return (
    <div>
      <QLabel n={6} />
      <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-2 leading-snug">Какви функции ще ти трябват?</h2>
      <p className="text-sm text-[#2d232e]/50 mb-6 font-medium">Може да избереш повече от едно.</p>
      <div className="grid grid-cols-1 gap-2.5">
        {options.map(o => <CheckboxCard key={o.value} title={o.title} checked={features.includes(o.value)} onToggle={() => toggleFeature(o.value)} />)}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={features.length === 0} />
    </div>
  )
}

function Step7({ answers, set, onNext, onBack }: any) {
  const options = [
    { value: 'urgent',   title: 'До 2 седмици' },
    { value: 'normal',   title: 'До 1 месец' },
    { value: 'flexible', title: 'Няма спешност' },
  ]
  return (
    <div>
      <QLabel n={7} />
      <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-6 leading-snug">Колко бързо ти трябва сайтът?</h2>
      <div className="flex flex-col gap-3">
        {options.map(o => <OptionCard key={o.value} title={o.title} selected={answers.timeline === o.value} onClick={() => set('timeline', o.value)} />)}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!answers.timeline} />
    </div>
  )
}

function Step8({ answers, set, onNext, onBack }: any) {
  const options = [
    { value: 'under_300', title: 'До 300€' },
    { value: '300_800',   title: '300–800€' },
    { value: '800_1500',  title: '800–1500€' },
    { value: '1500_plus', title: '1500€+' },
    { value: 'unsure',    title: 'Не съм сигурен' },
  ]
  return (
    <div>
      <QLabel n={8} />
      <h2 className="text-2xl md:text-3xl font-black text-[#2d232e] mb-2 leading-snug">Какъв бюджет си отделил?</h2>
      <p className="text-sm text-[#2d232e]/50 mb-6 font-medium leading-relaxed">
        Това ни помага да ти покажем вариант, който има смисъл — не най-скъпия.
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {options.map(o => <OptionCard key={o.value} title={o.title} selected={answers.budget === o.value} onClick={() => set('budget', o.value)} />)}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Виж резултата" nextDisabled={!answers.budget} />
    </div>
  )
}

// ─── Result Screen ─────────────────────────────────────────────────────────────

const FEATURE_LABELS: Record<string, string> = {
  booking: 'Резервации / записване на час',
  payments: 'Онлайн плащания',
  blog: 'Блог / статии',
  seo_basic: 'SEO основи',
  multilingual: 'Многоезичност',
  contact_form: 'Форма за запитване',
}

function BgResultScreen({ result, answers, lead, onReset }: {
  result: EstimateResult; answers: BgAnswers; lead: LeadData; onReset: () => void
}) {
  const selectedFeatures = (answers.features ?? []).filter(f => f !== 'none' && FEATURE_LABELS[f])

  return (
    <div className="min-h-screen bg-[#f1f0ea] flex flex-col">
      <header className="flex items-center justify-between px-5 py-4 border-b border-[#2d232e]/8">
        <Link href="/" className="font-black text-lg tracking-tight text-[#2d232e]">KARCHX</Link>
        <button onClick={onReset} className="text-xs text-[#2d232e]/50 hover:text-[#2d232e] transition-colors font-medium">← Започни отново</button>
      </header>

      <div className="flex-1 px-4 py-10 max-w-lg mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-3">Ориентировъчна цена за твоя сайт</p>
            <div className="text-5xl md:text-6xl font-black text-[#2d232e] tracking-tight mb-2">
              {result.minPrice}€ – {result.maxPrice}€
            </div>
            <p className="text-sm text-[#2d232e]/50 font-medium">
              Това не е финална оферта, а честен ориентир според отговорите ти.
            </p>
          </div>

          {result.warnings.includes('budget_too_low') && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium">
              ⚠️ Възможно е бюджетът да е по-нисък от това, което проектът реално изисква. Ще го обсъдим директно.
            </div>
          )}
          {result.warnings.includes('ecommerce_budget_mismatch') && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium">
              ⚠️ Онлайн магазин почти сигурно няма да е реалистичен в бюджет до 300€. Ще намерим решение заедно.
            </div>
          )}

          <div className="bg-white/80 rounded-2xl border border-[#2d232e]/10 p-5 mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-1">Най-подходящ вариант за теб</p>
            <p className="font-black text-[#2d232e] text-lg mb-2">{result.recommendedType}</p>
            <p className="text-sm text-[#2d232e]/65 leading-relaxed">{result.explanation}</p>
          </div>

          <div className="bg-white/80 rounded-2xl border border-[#2d232e]/10 p-5 mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-3">Какво обикновено влиза в тази цена?</p>
            <ul className="space-y-2">
              {['Структура на сайта', 'Дизайн по мярка', 'Разработка', 'Мобилна версия', 'Базова SEO структура', 'Форма за запитвания', 'Пускане онлайн'].map(item => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-[#2d232e]/75">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#534b52] flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
            {selectedFeatures.length > 0 && (
              <div className="border-t border-[#2d232e]/8 mt-4 pt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-3">Допълнителни неща, които влияят на цената:</p>
                <ul className="space-y-2">
                  {selectedFeatures.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-[#2d232e]/75">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2d232e]/40 flex-shrink-0" />{FEATURE_LABELS[f]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="bg-[#2d232e] rounded-2xl p-6 md:p-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#e0ddcf]/40 mb-2">Искаш ли точна цена?</p>
            <h3 className="text-xl font-black text-[#e0ddcf] mb-2 leading-snug">Запази безплатен 30-минутен разговор.</h3>
            <p className="text-sm text-[#e0ddcf]/60 leading-relaxed mb-6">
              Ще ти кажем директно какво ти трябва, какво не ти трябва и колко реално би струвало.
            </p>
            <a href="https://cal.com/georgi-karchev-3r9puz/30min" target="_blank" rel="noopener noreferrer"
              className="block w-full py-3.5 rounded-full bg-[#e0ddcf] text-[#2d232e] font-black text-sm hover:bg-white transition-colors mb-3">
              Запази безплатен разговор →
            </a>
            <button onClick={() => alert(`Резултатът ще бъде изпратен на ${lead.email}`)}
              className="block w-full py-3 rounded-full border border-[#e0ddcf]/20 text-[#e0ddcf]/60 font-semibold text-sm hover:border-[#e0ddcf]/50 hover:text-[#e0ddcf] transition-all">
              Изпрати ми резултата по имейл
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
