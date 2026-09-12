'use client'

import { useState } from 'react'
import { ArrowUpRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

type FormState = {
  name: string
  email: string
  phone: string
  service: string
  message: string
  /** Honeypot — hidden from people, so anything here means a bot. */
  website: string
}

type FieldErrors = Partial<Record<'name' | 'email', string>>

const EMPTY: FormState = { name: '', email: '', phone: '', service: '', message: '', website: '' }

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
  const [error, setError] = useState('')

  const copy = {
    name: { label: t('contact.labelName'), placeholder: t('contact.placeholderName') },
    email: { label: t('contact.labelEmail'), placeholder: t('contact.placeholderEmail') },
    phone: { label: t('contact.labelPhone'), placeholder: t('contact.placeholderPhone') },
    service: {
      label: bg ? 'Какво искате да поеме агентът? (по избор)' : 'What should your agent handle? (optional)',
      placeholder: bg ? 'Например: обработка на запитвания' : 'For example: handling enquiries',
    },
    message: {
      label: bg ? 'Разкажете ми как работите (по избор)' : 'Tell me how you work (optional)',
      placeholder: bg
        ? 'Какви инструменти използвате? Кои задачи Ви отнемат време?'
        : 'Which tools do you use? Which tasks take up your time?',
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
    if (loading) return

    const errors = validate(form)
    setFieldErrors(errors)
    setTouched({ name: true, email: true })
    if (Object.keys(errors).length > 0) return

    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
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
            ? 'Съобщението не беше изпратено.'
            : 'Your message could not be sent.'
      )
    } finally {
      setLoading(false)
    }
  }

  const showError = (field: keyof FieldErrors) => touched[field] && fieldErrors[field]

  return (
    <section className="studio-contact" id="contact" aria-labelledby="contact-title">
      <div className="studio-wrap studio-contact-grid">
        <div className="studio-contact-intro">
          <h2 id="contact-title">
            {bg ? 'Да изградим' : 'Let’s build'}
            <br />
            <span>{bg ? 'Вашия агент.' : 'your agent.'}</span>
          </h2>
          <p>
            {bg
              ? 'Разкажете ми за задачите и начина Ви на работа. Ще обсъдим как да изградим агент, който е полезен точно за Вас.'
              : 'Tell me about your tasks and how you work. We’ll discuss how to build an agent that is useful specifically for you.'}
          </p>
          <a
            href="https://cal.com/georgi-karchev-3r9puz/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="studio-button"
          >
            {t('contact.bookCta')}
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
          <p className="studio-contact-note">{t('contact.bookNote')}</p>
          <ul>
            {[1, 2, 3].map(n => (
              <li key={n}>{t('contact.perk' + n)}</li>
            ))}
          </ul>
        </div>

        <div className="studio-contact-form">
          {sent ? (
            <div className="studio-success" role="status">
              <CheckCircle size={40} aria-hidden="true" />
              <h3>{t('contact.successTitle')}</h3>
              <p>{t('contact.successDesc')}</p>
              <button type="button" onClick={() => setSent(false)}>
                {bg ? 'Изпратете още едно съобщение' : 'Send another message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} aria-busy={loading} noValidate>
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
                    {bg ? 'Пишете ми на ' : 'Email me at '}
                    <a href="mailto:georgikarchev5@gmail.com">georgikarchev5@gmail.com</a>.
                  </span>
                </p>
              )}

              <button type="submit" className="studio-submit" disabled={loading}>
                {loading ? (bg ? 'Изпращане…' : 'Sending…') : t('contact.submitBtn')}
                {loading ? (
                  <Loader2 size={20} className="studio-spinner" aria-hidden="true" />
                ) : (
                  <ArrowUpRight size={21} aria-hidden="true" />
                )}
              </button>

              <p className="studio-form-note">
                {bg
                  ? 'Полетата с * са задължителни. Данните Ви се използват само за да Ви отговоря.'
                  : 'Fields marked * are required. Your details are only used to reply to you.'}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
