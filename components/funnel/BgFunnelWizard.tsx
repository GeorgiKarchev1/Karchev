'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react'
import { calculateBgEstimate, BgAnswers, EstimateResult } from '@/lib/pricing'

interface LeadData {
  name: string
  email: string
  phone: string
  consent: boolean
}

const QUESTION_STEPS = 4

const stepVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.16 } },
}

async function submitLead(answers: BgAnswers, lead: LeadData, result: EstimateResult): Promise<void> {
  console.log('[Funnel BG] Lead submitted:', { answers, lead, result })
}

function ProgressBar({ step }: { step: number }) {
  const pct = Math.round((step / QUESTION_STEPS) * 100)
  return (
    <div className="w-full h-1 bg-[#2d232e]/10 rounded-full overflow-hidden">
      <motion.div className="h-full bg-[#534b52] rounded-full" initial={{ width: 0 }}
        animate={{ width: `${pct}%` }} transition={{ duration: 0.35, ease: 'easeOut' }} />
    </div>
  )
}

function OptionCard({ title, description, selected, onClick }: {
  title: string; description?: string; selected: boolean; onClick: () => void
}) {
  return (
    <button type="button" onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-150 active:scale-[0.98] ${
        selected ? 'bg-[#2d232e] border-[#2d232e]' : 'bg-white/70 border-[#2d232e]/15 hover:border-[#2d232e]/50 hover:bg-[#e0ddcf]'
      }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className={`font-bold text-sm leading-snug ${selected ? 'text-[#e0ddcf]' : 'text-[#2d232e]'}`}>{title}</p>
          {description && <p className={`text-xs mt-1 leading-relaxed ${selected ? 'text-[#e0ddcf]/65' : 'text-[#2d232e]/55'}`}>{description}</p>}
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
      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-150 active:scale-[0.98] flex items-center gap-3 ${
        checked ? 'bg-[#2d232e] border-[#2d232e]' : 'bg-white/70 border-[#2d232e]/15 hover:border-[#2d232e]/50 hover:bg-[#e0ddcf]'
      }`}>
      <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all ${checked ? 'bg-[#534b52] border-[#534b52]' : 'border-[#2d232e]/30'}`}>
        {checked && <Check className="w-3 h-3 text-[#e0ddcf]" strokeWidth={3} />}
      </div>
      <span className={`font-semibold text-sm leading-snug ${checked ? 'text-[#e0ddcf]' : 'text-[#2d232e]'}`}>{title}</span>
    </button>
  )
}

function NavButtons({ onBack, onNext, nextLabel = 'Напред', nextDisabled = false }: {
  onBack?: () => void; onNext: () => void; nextLabel?: string; nextDisabled?: boolean
}) {
  return (
    <div className="flex items-center gap-3 mt-6">
      {onBack && (
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

function Step1({ answers, set, onNext }: any) {
  const options = [
    { value: 'landing_page',  title: 'Landing page',   description: 'Една страница за конкретна услуга или кампания.' },
    { value: 'ecommerce',     title: 'Онлайн магазин', description: 'Продукти, количка, плащания и поръчки.' },
    { value: 'unsure',        title: 'Не съм сигурен', description: 'Ще ти помогнем да разбереш кое има смисъл.' },
  ]
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-2">Въпрос 1 от 4</p>
      <h2 className="text-xl font-black text-[#2d232e] mb-4 leading-snug">Какъв сайт ти трябва?</h2>
      <div className="flex flex-col gap-2.5">
        {options.map(o => (
          <OptionCard key={o.value} {...o} selected={answers.siteType === o.value}
            onClick={() => set('siteType', o.value)} />
        ))}
      </div>
      <NavButtons onNext={onNext} nextDisabled={!answers.siteType} />
    </div>
  )
}

function Step2({ answers, set, onNext, onBack }: any) {
  const options = [
    { value: 'one_page',   title: '1 страница',    description: 'Landing page или една основна услуга.' },
    { value: 'three_five', title: '3–5 страници',  description: 'Начало, Услуги, Контакт и др.' },
    { value: 'five_ten',   title: '5–10 страници', description: 'Повече услуги или по-сериозна структура.' },
    { value: 'unsure',     title: 'Не знам',       description: 'Ще изчислим ориентировъчно.' },
  ]
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-2">Въпрос 2 от 4</p>
      <h2 className="text-xl font-black text-[#2d232e] mb-4 leading-snug">Колко страници ще са нужни?</h2>
      <div className="flex flex-col gap-2.5">
        {options.map(o => (
          <OptionCard key={o.value} {...o} selected={answers.pages === o.value}
            onClick={() => set('pages', o.value)} />
        ))}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!answers.pages} />
    </div>
  )
}

function Step3({ answers, set, onNext, onBack }: any) {
  const features = answers.features ?? []
  const toggle = (value: string) => {
    if (value === 'none') { set('features', features.includes('none') ? [] : ['none']); return }
    const without = features.filter((f: string) => f !== 'none')
    set('features', without.includes(value) ? without.filter((f: string) => f !== value) : [...without, value])
  }
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
      <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-2">Въпрос 3 от 4</p>
      <h2 className="text-xl font-black text-[#2d232e] mb-1 leading-snug">Какви функции ти трябват?</h2>
      <p className="text-xs text-[#2d232e]/50 mb-4 font-medium">Може да избереш повече от едно.</p>
      <div className="grid grid-cols-1 gap-2">
        {options.map(o => (
          <CheckboxCard key={o.value} title={o.title} checked={features.includes(o.value)} onToggle={() => toggle(o.value)} />
        ))}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={features.length === 0} />
    </div>
  )
}

function Step4({ answers, set, onNext, onBack }: any) {
  const options = [
    { value: 'under_300', title: 'До 300€' },
    { value: '300_800',   title: '300–800€' },
    { value: '800_1500',  title: '800–1500€' },
    { value: '1500_plus', title: '1500€+' },
    { value: 'unsure',    title: 'Не съм сигурен' },
  ]
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-2">Въпрос 4 от 4</p>
      <h2 className="text-xl font-black text-[#2d232e] mb-1 leading-snug">Какъв бюджет си отделил?</h2>
      <p className="text-xs text-[#2d232e]/50 mb-4 font-medium">Помага ни да ти покажем вариант, който има смисъл.</p>
      <div className="grid grid-cols-2 gap-2.5">
        {options.map(o => (
          <OptionCard key={o.value} title={o.title} selected={answers.budget === o.value} onClick={() => set('budget', o.value)} />
        ))}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Напред" nextDisabled={!answers.budget} />
    </div>
  )
}

function StepLead({ lead, setLead, onBack, onNext, error }: {
  lead: LeadData; setLead: any; onBack: () => void; onNext: () => void; error: string
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-2">Последна стъпка</p>
      <h2 className="text-xl font-black text-[#2d232e] mb-1 leading-snug">Накъде да изпратим резултата?</h2>
      <p className="text-xs text-[#2d232e]/55 mb-5 leading-relaxed">
        Ще получиш ориентировъчна цена веднага след попълването.
      </p>
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
            Съгласен/съгласна съм да получа резултата и последваща комуникация.
          </span>
        </label>
        {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Виж резултата" />
    </div>
  )
}

// ─── Result ────────────────────────────────────────────────────────────────────

const FEATURE_LABELS: Record<string, string> = {
  booking:      'Резервации / записване на час',
  payments:     'Онлайн плащания',
  blog:         'Блог / статии',
  seo_basic:    'SEO основи',
  multilingual: 'Многоезичност',
  contact_form: 'Форма за запитване',
}

function ResultScreen({ result, answers, onReset }: {
  result: EstimateResult; answers: BgAnswers; onReset: () => void
}) {
  const selectedFeatures = (answers.features ?? []).filter(f => f !== 'none' && FEATURE_LABELS[f])

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="text-center mb-5">
        <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-2">Ориентировъчна цена</p>
        <div className="text-4xl font-black text-[#2d232e] tracking-tight mb-1">
          {result.minPrice}€ – {result.maxPrice}€
        </div>
        <p className="text-xs text-[#2d232e]/50 font-medium">Честен ориентир — не финална оферта.</p>
      </div>

      {result.warnings.includes('budget_too_low') && (
        <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
          ⚠️ Бюджетът може да е по-нисък от нужното. Ще го обсъдим директно.
        </div>
      )}

      <div className="bg-white/80 rounded-2xl border border-[#2d232e]/10 p-4 mb-3">
        <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-1">Препоръчан вариант</p>
        <p className="font-black text-[#2d232e] text-base mb-1">{result.recommendedType}</p>
        <p className="text-xs text-[#2d232e]/65 leading-relaxed">{result.explanation}</p>
      </div>

      {selectedFeatures.length > 0 && (
        <div className="bg-white/80 rounded-2xl border border-[#2d232e]/10 p-4 mb-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[#534b52] mb-2">Включени функции:</p>
          <ul className="space-y-1.5">
            {selectedFeatures.map(f => (
              <li key={f} className="flex items-center gap-2 text-xs text-[#2d232e]/75">
                <div className="w-1.5 h-1.5 rounded-full bg-[#534b52] flex-shrink-0" />{FEATURE_LABELS[f]}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-[#2d232e] rounded-2xl p-5 text-center">
        <h3 className="text-base font-black text-[#e0ddcf] mb-1">Искаш точна цена?</h3>
        <p className="text-xs text-[#e0ddcf]/60 leading-relaxed mb-4">
          Запази безплатен 30-минутен разговор — ще ти кажем директно какво ти трябва.
        </p>
        <a href="https://cal.com/georgi-karchev-3r9puz/30min" target="_blank" rel="noopener noreferrer"
          className="block w-full py-3 rounded-full bg-[#e0ddcf] text-[#2d232e] font-black text-sm hover:bg-white transition-colors mb-2">
          Запази безплатен разговор →
        </a>
        <button onClick={onReset}
          className="block w-full py-2.5 rounded-full border border-[#e0ddcf]/20 text-[#e0ddcf]/60 font-semibold text-xs hover:border-[#e0ddcf]/50 hover:text-[#e0ddcf] transition-all">
          Започни отново
        </button>
      </div>
    </motion.div>
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function BgFunnelWizard({ onClose }: { onClose?: () => void }) {
  const [step, setStep]           = useState(1)
  const [answers, setAnswers]     = useState<BgAnswers>({})
  const [lead, setLead]           = useState<LeadData>({ name: '', email: '', phone: '', consent: false })
  const [leadError, setLeadError] = useState('')
  const [result, setResult]       = useState<EstimateResult | null>(null)

  const set = (key: keyof BgAnswers, value: any) => setAnswers(prev => ({ ...prev, [key]: value }))
  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => s - 1)

  const handleLeadNext = () => {
    if (!lead.name.trim())                                        { setLeadError('Моля въведи своето име.'); return }
    if (!lead.email.includes('@') || !lead.email.includes('.'))   { setLeadError('Въведи валиден имейл адрес.'); return }
    if (!lead.consent)                                            { setLeadError('Трябва да се съгласиш, за да продължиш.'); return }
    setLeadError('')
    const est = calculateBgEstimate(answers)
    submitLead(answers, lead, est)
    setResult(est)
  }

  const handleReset = () => {
    setStep(1)
    setAnswers({})
    setResult(null)
    setLead({ name: '', email: '', phone: '', consent: false })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#2d232e]/8 flex-shrink-0">
        <span className="font-black text-base tracking-tight text-[#2d232e]">KARCHX</span>
        {onClose && (
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#2d232e]/8 transition-colors text-[#2d232e]/50 hover:text-[#2d232e]">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {!result && (
        <div className="px-6 pt-4 flex-shrink-0">
          <ProgressBar step={Math.min(step, QUESTION_STEPS)} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-6 py-5">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div key="result" variants={stepVariants} initial="initial" animate="animate" exit="exit">
              <ResultScreen result={result} answers={answers} onReset={handleReset} />
            </motion.div>
          ) : (
            <motion.div key={step} variants={stepVariants} initial="initial" animate="animate" exit="exit">
              {step === 1 && <Step1 answers={answers} set={set} onNext={next} />}
              {step === 2 && <Step2 answers={answers} set={set} onNext={next} onBack={back} />}
              {step === 3 && <Step3 answers={answers} set={set} onNext={next} onBack={back} />}
              {step === 4 && <Step4 answers={answers} set={set} onNext={next} onBack={back} />}
              {step === 5 && <StepLead lead={lead} setLead={setLead} onBack={back} onNext={handleLeadNext} error={leadError} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
