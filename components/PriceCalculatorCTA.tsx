'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import FunnelModal from '@/components/FunnelModal'

export default function PriceCalculatorCTA() {
  const { language } = useLanguage()
  const isBG = language === 'BG'
  const [modalOpen, setModalOpen] = useState(false)

  const stats = isBG
    ? [{ value: '4', label: 'въпроса' }, { value: '~1', label: 'минута' }, { value: '0€', label: 'безплатно' }]
    : [{ value: '4', label: 'questions' }, { value: '~1', label: 'minute' }, { value: '0€', label: 'free' }]

  return (
    <>
      <section className="relative overflow-hidden bg-[#f1f0ea] px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-grid opacity-[0.07] pointer-events-none" />

        <div className="container-wide mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="mx-auto max-w-5xl"
          >
            <div
              className="relative overflow-hidden rounded-[2rem] border border-[#2d232e]/10 bg-[#faf9f5]"
              style={{ boxShadow: '0 24px 64px rgba(45,35,46,0.10), 0 1px 0 rgba(83,75,82,0.08)' }}
            >
              <div className="grid lg:grid-cols-2" style={{ minHeight: '480px' }}>

                {/* ── Left: text ──────────────────────────────────── */}
                <div className="flex flex-col justify-center px-8 py-12 md:px-12 md:py-14 lg:px-14 lg:py-16 relative z-10">

                  <h2 className="font-black text-[#2d232e] leading-[0.92] tracking-[-0.04em] mb-5"
                    style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.4rem)' }}>
                    {isBG ? <>Колко ще<br />ми струва?</> : <>How much<br />will it cost?</>}
                  </h2>

                  <p className="text-[#534b52]/80 leading-relaxed mb-10 max-w-[26rem]"
                    style={{ fontSize: 'clamp(1rem, 1.7vw, 1.1rem)' }}>
                    {isBG
                      ? 'Отговори на 4 кратки въпроса и ще получиш честен ориентировъчен диапазон — без "зависи", без излишни разговори.'
                      : 'Answer 4 quick questions and get an honest price estimate — no "it depends", no pressure.'}
                  </p>

                  <button
                    onClick={() => setModalOpen(true)}
                    className="group mb-8 inline-flex w-fit items-center gap-2.5 rounded-full bg-[#2d232e] px-7 py-3.5 text-[0.95rem] font-black text-[#f6f3ed] transition-all duration-200 hover:bg-[#534b52] active:scale-[0.97]"
                    style={{ boxShadow: '0 8px 24px rgba(45,35,46,0.22)' }}
                  >
                    {isBG ? 'Провери сега' : 'Get Your Estimate'}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  <div className="grid grid-cols-3 gap-3">
                    {stats.map((s) => (
                      <div key={s.label} className="flex flex-col items-center justify-center rounded-xl border border-[#2d232e]/10 bg-white/70 py-3.5 px-2 text-center">
                        <span className="text-xl font-black text-[#2d232e] leading-none mb-1">{s.value}</span>
                        <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-[#534b52]/65">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Right: illustration ─────── */}
                <div className="relative hidden lg:block overflow-hidden border-l border-[#2d232e]/8 bg-[#f0ece3]">
                  <img src="/mojebi.png" alt="" draggable={false} aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover object-center select-none scale-[1.08]" />
                </div>

                <div className="relative lg:hidden h-56 overflow-hidden border-t border-[#2d232e]/8 bg-[#f0ece3]">
                  <img src="/mojebi.png" alt="" draggable={false} aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover object-center select-none scale-[1.08]" />
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <FunnelModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
