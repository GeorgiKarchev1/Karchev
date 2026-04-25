'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

type FormState = {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const SERVICES_BG = ['Уеб разработка', 'Контент производство', 'И двете', 'Не съм сигурен']
const SERVICES_EN = ['Web Development', 'Content Production', 'Both', "I'm not sure"]

const BUDGETS_BG = ['До 250 €', '250 – 750 €', '750 – 1500 €', '1500+ €']
const BUDGETS_EN = ['Under €250', '€250 – €750', '€750 – €1500', '€1500+']

export default function Contact() {
  const { t, language } = useLanguage()
  const isBG = language === 'BG'

  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', service: '', message: '',
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('https://formsubmit.co/ajax/georgikarchev5@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          service: form.service || 'Not specified',
          message: form.message,
        })
      })

      if (response.ok) {
        setSent(true)
      } else {
        alert('An error occurred. Please try again later.')
      }
    } catch (error) {
      alert('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls =
    'w-full bg-white border border-[#2d232e]/15 rounded-xl px-4 py-3 text-[#2d232e] placeholder-[#2d232e]/50 text-sm focus:outline-none focus:border-[#534b52] transition-colors duration-200'

  return (
    <section id="contact" className="py-20 md:py-32 bg-[#f1f0ea] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#534b52]/6 blur-[130px] rounded-full pointer-events-none" />

      <div className="container-wide mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">

          {/* Left — heading */}
          <div className="lg:sticky lg:top-32">
            <div className="text-sm font-mono text-[#534b52] mb-4 tracking-widest uppercase">
              {t('contact.eyeBrow')}
            </div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-[#2d232e] leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              {t('contact.title')}{' '}
              <span className="text-[#534b52]">{t('contact.titleHighlight')}</span>
            </motion.h2>
            <p className="text-[#2d232e] text-lg leading-relaxed mb-8">
              {t('contact.desc')}
            </p>

            <div className="space-y-4">
              {[
                { label: t('contact.perk1') },
                { label: t('contact.perk2') },
                { label: t('contact.perk3') },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-[#2d232e]"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#534b52] shrink-0" />
                  {p.label}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                <CheckCircle className="w-14 h-14 text-[#534b52]" />
                <h3 className="text-2xl font-bold text-[#2d232e]">{t('contact.successTitle')}</h3>
                <p className="text-[#2d232e]/70">{t('contact.successDesc')}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/70 border border-[#2d232e]/10 rounded-2xl p-8 space-y-5"
              >
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#2d232e] font-mono mb-2 uppercase tracking-wider">
                      {t('contact.labelName')}
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder={t('contact.placeholderName')}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#2d232e] font-mono mb-2 uppercase tracking-wider">
                      {t('contact.labelEmail')}
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder={t('contact.placeholderEmail')}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs text-[#2d232e] font-mono mb-2 uppercase tracking-wider">
                    {t('contact.labelPhone')}
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={t('contact.placeholderPhone')}
                    className={inputCls}
                  />
                </div>

                {/* Service Input */}
                <div>
                  <label className="block text-xs text-[#2d232e] font-mono mb-2 uppercase tracking-wider">
                    {t('contact.labelService')}
                  </label>
                  <input
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    placeholder={t('contact.placeholderMessage')} // reusing placeholder or you can just leave it blank
                    className={inputCls}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs text-[#2d232e] font-mono mb-2 uppercase tracking-wider">
                    {t('contact.labelMessage')}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t('contact.placeholderMessage')}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="inline-block w-5 h-5 border-2 border-[#e0ddcf]/40 border-t-[#e0ddcf] rounded-full animate-spin" />
                  ) : (
                    <>
                      {t('contact.submitBtn')}
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
