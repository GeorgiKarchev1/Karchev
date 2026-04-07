'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function OfferStack() {
  const { t } = useLanguage()

  const testimonials = [
    { quote: t('testimonials.t1.quote'), name: t('testimonials.t1.name'), role: t('testimonials.t1.role'), initials: 'ИП' },
    { quote: t('testimonials.t2.quote'), name: t('testimonials.t2.name'), role: t('testimonials.t2.role'), initials: 'МН' },
    { quote: t('testimonials.t3.quote'), name: t('testimonials.t3.name'), role: t('testimonials.t3.role'), initials: 'СД' },
  ]

  const stats = [
    { number: t('testimonials.stat1'), label: t('testimonials.statLabel1') },
    { number: t('testimonials.stat2'), label: t('testimonials.statLabel2') },
    { number: t('testimonials.stat3'), label: t('testimonials.statLabel3') },
    { number: t('testimonials.stat4'), label: t('testimonials.statLabel4') },
  ]

  return (
    <section className="py-20 md:py-32 bg-[#2d232e] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#534b52]/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-wide mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[#e0ddcf]">{t('testimonials.title')}</h2>
          <p className="text-[#2d232e] text-xl font-light">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Testimonials */}
          <div className="flex flex-col gap-5">
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30, rotateY: -6 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                whileHover={{ x: 6, rotateY: 2, scale: 1.01 }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                viewport={{ once: true }}
                style={{ transformPerspective: 800 }}
                className="p-8 rounded-2xl bg-[#2d232e] border border-[#2d232e] hover:border-[#534b52]/30 transition-all duration-300 cursor-default"
              >
                <Quote className="w-7 h-7 text-[#534b52]/40 mb-4" />
                <p className="text-[#2d232e] leading-relaxed mb-6 text-base">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#534b52]/10 border border-[#534b52]/20 flex items-center justify-center text-sm font-bold text-[#534b52]">
                    {item.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-[#e0ddcf] text-sm">{item.name}</div>
                    <div className="text-[#2d232e] text-xs">{item.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25, rotateX: 8 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  whileHover={{ y: -6, rotateX: -4, scale: 1.03 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  style={{ transformPerspective: 700 }}
                  className="p-8 rounded-2xl bg-[#2d232e] border border-[#2d232e] hover:border-[#534b52]/30 transition-all text-center group cursor-default"
                >
                  <div className="text-5xl font-bold text-[#e0ddcf] mb-2 group-hover:text-[#534b52] transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-[#2d232e] text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="p-7 rounded-2xl bg-[#2d232e] border border-[#2d232e] relative overflow-hidden">
              <div className="absolute top-0 w-full h-[1px] bg-[#534b52]/30" />
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#534b52] animate-pulse" />
                <span className="text-xs font-mono text-[#534b52] uppercase tracking-wide">Прием на клиенти: Отворен</span>
              </div>
              <p className="text-[#2d232e] text-sm leading-relaxed">
                Работим с ограничен брой клиенти едновременно, за да гарантираме качество. Ако искаш да работим заедно — свържи се сега.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
