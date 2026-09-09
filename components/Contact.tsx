'use client'

import { useState } from 'react'
import { ArrowUpRight, CheckCircle, Loader2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

type FormState = { name: string; email: string; phone: string; service: string; message: string }

export default function Contact() {
  const { t, language } = useLanguage()
  const bg = language === 'BG'
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(previous => ({ ...previous, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (loading) return
    setLoading(true)
    setError('')
    try {
      const response = await fetch('https://formsubmit.co/ajax/georgikarchev5@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, phone: form.phone || 'Not provided', service: form.service || 'Not specified' }),
      })
      if (!response.ok) throw new Error('Submission failed')
      setSent(true)
    } catch {
      setError(bg ? 'Съобщението не беше изпратено. Опитайте отново или ни пишете на georgikarchev5@gmail.com.' : 'Your message could not be sent. Please try again or email georgikarchev5@gmail.com.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="studio-contact" id="contact" aria-labelledby="contact-title">
      <div className="studio-wrap studio-contact-grid">
        <div className="studio-contact-intro">
          <h2 id="contact-title">{bg ? 'Да изградим' : 'Let’s build'}<br /><span>{bg ? 'Вашия агент.' : 'your agent.'}</span></h2>
          <p>{bg ? 'Разкажете ми за задачите и начина Ви на работа. Ще обсъдим как да изградим агент, който е полезен точно за Вас.' : 'Tell me about your tasks and how you work. We’ll discuss how to build an agent that is useful specifically for you.'}</p>
          <a href="https://cal.com/georgi-karchev-3r9puz/30min" target="_blank" rel="noopener noreferrer" className="studio-button">{t('contact.bookCta')}<ArrowUpRight size={20} aria-hidden="true" /></a>
          <p className="studio-contact-note">{t('contact.bookNote')}</p>
          <ul>{[1, 2, 3].map(n => <li key={n}>{t('contact.perk' + n)}</li>)}</ul>
        </div>
        <div className="studio-contact-form">
          {sent ? <div className="studio-success" role="status"><CheckCircle size={40} aria-hidden="true" /><h3>{t('contact.successTitle')}</h3><p>{t('contact.successDesc')}</p></div> :
            <form onSubmit={handleSubmit} aria-busy={loading}>
              <p className="studio-form-heading">{t('contact.orSendForm')}</p>
              {(['name', 'email', 'phone', 'service'] as const).map(name => {
                const key = name.charAt(0).toUpperCase() + name.slice(1)
                return <div className="studio-field" key={name}>
                  <label htmlFor={'contact-' + name}>{name === 'service' ? (bg ? 'Какво искате да поеме агентът? (по избор)' : 'What would you like your agent to handle? (optional)') : t('contact.label' + key)}</label>
                  <input id={'contact-' + name} name={name} type={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text'} autoComplete={name === 'phone' ? 'tel' : name === 'service' ? 'off' : name} value={form[name]} onChange={handleChange} required={name === 'name' || name === 'email'} placeholder={name === 'service' ? (bg ? 'Например: обработка на запитвания' : 'For example: handling enquiries') : t('contact.placeholder' + key)} maxLength={name === 'service' ? 500 : 200} />
                </div>
              })}
              <div className="studio-field"><label htmlFor="contact-message">{bg ? 'Разкажете ми как работите (по избор)' : 'Tell me how you work (optional)'}</label><textarea id="contact-message" name="message" rows={3} value={form.message} onChange={handleChange} placeholder={bg ? 'Какви инструменти използвате? Кои задачи Ви отнемат време?' : 'Which tools do you use? Which tasks take up your time?'} maxLength={5000} /></div>
              {error && <p className="studio-form-error" role="alert">{error}</p>}
              <button type="submit" className="studio-submit" disabled={loading}>{loading ? (bg ? 'Изпращане…' : 'Sending…') : t('contact.submitBtn')}{loading ? <Loader2 size={20} className="studio-spinner" aria-hidden="true" /> : <ArrowUpRight size={21} aria-hidden="true" />}</button>
            </form>
          }
        </div>
      </div>
    </section>
  )
}
