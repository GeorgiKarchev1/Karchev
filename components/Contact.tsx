'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact-info'
import { ArrowUpRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import { getPolicyPath } from '@/lib/site'
import { useLanguage } from '@/context/LanguageContext'

type FormState = {
  name: string
  email: string
  phone: string
  service: string
  preferredTime: string
  message: string
  /** Honeypot — hidden from people, so anything here means a bot. */
  website: string
}

type FieldErrors = Partial<Record<'name' | 'email', string>>

const EMPTY: FormState = { name: '', email: '', phone: '', service: '', preferredTime: '', message: '', website: '' }

// Deliberately permissive: the server validates properly, this only catches
// obvious typos before the visitor waits on a round trip.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const { t, language } = useLanguage()
  const bg = language === 'BG'
  const [form, setForm] = useState<FormState>(EMPTY)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const sending = useRef(false)
  const [error, setError] = useState('')

  const copy = {
    name: { label: t('contact.labelName'), placeholder: t('contact.placeholderName') },
    email: { label: t('contact.labelEmail'), placeholder: t('contact.placeholderEmail') },
    phone: { label: t('contact.labelPhone'), placeholder: t('contact.placeholderPhone') },
    service: {
      label: bg ? 'Къде искате подобрение? (по избор)' : 'Where would you like to improve? (optional)',
      placeholder: bg ? 'Например: повече продажби от запитванията' : 'For example: turning enquiries into sales',
    },
    message: {
      label: bg ? 'Разкажете ми за бизнеса си (по избор)' : 'Tell me about your business (optional)',
      placeholder: bg
        ? 'Какво продавате? Колко души сте? Къде срещате трудности?'
        : 'What do you sell? How big is your team? Where are you getting stuck?',
    },
  }

  function validate(state: FormState): FieldErrors {
    const errors: FieldErrors = {}
    if (!state.name.trim()) errors.name = bg ? 'Моля, въведете име.' : 'Please enter your name.'
    if (!state.email.trim()) errors.email = bg ? 'Моля, въведете имейл.' : 'Please enter your email.'
    else if (!EMAIL_RE.test(state.email.trim()))
      errors.email = bg ? 'Този имейл изглежда невалиден.' : 'That email looks invalid.'
    return errors
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    const next = { ...form, [name]: value }
    setForm(next)
    // Clear a field's error as soon as it becomes valid; don't add new ones mid-typing.
    if (fieldErrors[name as keyof FieldErrors]) setFieldErrors(validate(next))
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name } = event.target
    setTouched(prev => ({ ...prev, [name]: true }))
    setFieldErrors(validate(form))
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (sending.current) return

    const errors = validate(form)
    setFieldErrors(errors)
    setTouched({ name: true, email: true })
    if (Object.keys(errors).length > 0) {
      document.getElementById(errors.name ? 'contact-name' : 'contact-email')?.focus()
      return
    }

    sending.current = true
    setLoading(true)
    setError('')
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15000)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang: language }),
      })
      // The previous endpoint answered 200 with {"success":"false"} on failure,
      // so every send looked successful and the enquiry was silently dropped.
      // Trust the payload, not just the status code.
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error === 'rate_limited' ? 'rate_limited' : 'failed')
      }
      setSent(true)
      setForm(EMPTY)
    } catch (err) {
      const rateLimited = err instanceof Error && err.message === 'rate_limited'
      setError(
        rateLimited
          ? bg
            ? 'Твърде много опити. Опитайте отново след минута.'
            : 'Too many attempts. Please try again in a minute.'
          : bg
            ? 'Не успяхме да потвърдим изпращането. Данните Ви са запазени във формата.'
            : 'We could not confirm delivery. Your details are still in the form.'
      )
    } finally {
      clearTimeout(timeout)
      sending.current = false
      setLoading(false)
    }
  }

  const showError = (field: keyof FieldErrors) => touched[field] && fieldErrors[field]

  return (
    <section className="studio-contact" id="contact" aria-labelledby="contact-title">
      <div className="studio-wrap studio-contact-grid">
        <div className="studio-contact-intro">
          <h2 id="contact-title">
            {bg ? 'Разкажете ми' : 'Tell me'}
            <br />
            <span>{bg ? 'за бизнеса си.' : 'about your business.'}</span>
          </h2>
          <p>
            {bg
              ? 'Разкажете ми за бизнеса си и какво искате да подобрите. В първия разговор ще уточним проблема и дали има смисъл да работим заедно.'
              : 'Tell me about your business and what you want to improve. In our first call, we’ll clarify the problem and whether working together makes sense.'}
          </p>
          <a href={PHONE_HREF} className="growth-contact-phone">{PHONE_DISPLAY}</a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="growth-contact-email">{CONTACT_EMAIL}</a>
          <p className="studio-contact-note">{bg ? 'Понеделник–петък, 10:00–18:00 · Българско време. Ако не успея да вдигна, ще върна обаждане.' : 'Monday–Friday, 10:00–18:00 · Sofia time. If I miss your call, I will call back.'}</p>
          <ul>{(bg ? ['Безплатен първи разговор до 30 минути', 'Личен отговор от Георги Кърчев', 'Без ангажимент за покупка'] : ['Free first call, up to 30 minutes', 'A personal reply from Georgi Karchev', 'No purchase obligation']).map(item => <li key={item}>{item}</li>)}</ul>
        </div>

        <div className="studio-contact-form">
          <noscript><style>{'.growth-native-form { display: none; }'}</style><p>{bg ? 'За формата е нужен JavaScript. Можете да се обадите или да пишете на имейла по-горе.' : 'This form needs JavaScript. Please use the phone or email above.'}</p></noscript>
          {sent ? (
            <div className="studio-success" role="status">
              <CheckCircle size={40} aria-hidden="true" />
              <h3>{bg ? 'Благодаря за запитването!' : 'Thank you for your enquiry!'}</h3>
              <p>{bg ? 'Ще Ви отговоря лично до края на следващия работен ден. Ако сте посочили удобно време, ще го уточним по телефон или имейл — часът още не е потвърден.' : 'I will reply personally by the end of the next working day. If you suggested a call time, we will confirm it by phone or email; it is not booked yet.'}</p>
              <button type="button" onClick={() => setSent(false)}>
                {bg ? 'Изпратете още едно съобщение' : 'Send another message'}
              </button>
            </div>
          ) : (
            <form className="growth-native-form" onSubmit={handleSubmit} aria-busy={loading} noValidate>
              <h3 className="growth-form-heading">{bg ? 'Заявете разговор или задайте въпрос' : 'Request a call or ask a question'}</h3>
              <p className="growth-form-intro">{bg ? 'Оставете контакт и няколко думи за бизнеса си. Ще отговоря лично до края на следващия работен ден.' : 'Leave your details and a few words about your business. I will reply by the end of the next working day.'}</p>
              <div className="studio-field-row">
                <div className="studio-field">
                  <label htmlFor="contact-name">
                    {copy.name.label}
                    <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={copy.name.placeholder}
                    maxLength={200}
                    required
                    aria-invalid={showError('name') ? 'true' : undefined}
                    aria-describedby={showError('name') ? 'contact-name-error' : undefined}
                  />
                  {showError('name') && (
                    <p className="studio-field-error" id="contact-name-error">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div className="studio-field">
                  <label htmlFor="contact-phone">{copy.phone.label}</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={copy.phone.placeholder}
                    maxLength={50}
                  />
                </div>
              </div>

              <div className="studio-field">
                <label htmlFor="contact-email">
                  {copy.email.label}
                  <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={copy.email.placeholder}
                  maxLength={200}
                  required
                  aria-invalid={showError('email') ? 'true' : undefined}
                  aria-describedby={showError('email') ? 'contact-email-error' : undefined}
                />
                {showError('email') && (
                  <p className="studio-field-error" id="contact-email-error">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div className="studio-field">
                <label htmlFor="contact-service">{copy.service.label}</label>
                <input
                  id="contact-service"
                  name="service"
                  type="text"
                  autoComplete="off"
                  value={form.service}
                  onChange={handleChange}
                  placeholder={copy.service.placeholder}
                  maxLength={500}
                />
              </div>

              <div className="studio-field">
                <label htmlFor="contact-message">{copy.message.label}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={copy.message.placeholder}
                  maxLength={5000}
                />
              </div>

              <div className="studio-field">
                <label htmlFor="contact-preferredTime">{bg ? 'Удобно време за разговор (по избор)' : 'Preferred call time (optional)'}</label>
                <input id="contact-preferredTime" name="preferredTime" type="text" value={form.preferredTime} onChange={handleChange} maxLength={200} placeholder={bg ? 'Например: вторник след 14:00' : 'For example: Tuesday after 14:00'} aria-describedby="contact-time-note" />
                <p className="studio-form-note" id="contact-time-note">{bg ? 'Понеделник–петък, 10:00–18:00, българско време. Ще потвърдим часа лично.' : 'Monday–Friday, 10:00–18:00, Sofia time. We will confirm the time personally.'}</p>
              </div>

              <div className="studio-hp" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <p className="studio-form-error" role="alert">
                  <AlertCircle size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span>
                    {error}{' '}
                    {bg ? 'Обадете се на ' : 'Call '}
                    <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>{bg ? ' или пишете на ' : ' or email '}<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                  </span>
                </p>
              )}

              <button type="submit" className="studio-submit" disabled={loading}>
                {loading ? (bg ? 'Изпращане…' : 'Sending…') : (bg ? 'Изпратете запитване' : 'Send enquiry')}
                {loading ? (
                  <Loader2 size={20} className="studio-spinner" aria-hidden="true" />
                ) : (
                  <ArrowUpRight size={21} aria-hidden="true" />
                )}
              </button>

              <p className="studio-form-note">
                {bg
                  ? 'Полетата с * са задължителни. Данните Ви се използват само за да Ви отговоря.'
                  : 'Fields marked * are required. Your details are only used to reply to you.'}{' '}<Link href={getPolicyPath(bg ? 'bg' : 'en', 'privacy')}>{bg ? 'Поверителност' : 'Privacy'}</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
