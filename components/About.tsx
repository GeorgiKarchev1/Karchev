'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

const About = () => {
  const { t } = useLanguage()

  // Framer motion variants for clean text staggers
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section id="about" className="section-padding bg-[#f1f0ea] relative overflow-hidden">
      {/* Clean minimal background - no cringe blobs, just a subtle neo-brutalism grid point texture */}
      <div className="absolute inset-0 bg-[#f1f0ea] [background-size:40px_40px] opacity-[0.3] bg-[radial-gradient(#2d232e_1px,transparent_1px)] z-0 pointer-events-none" />

      <div className="container-wide mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
        
          {/* Header */}
          <div className="text-center mb-20">
            <motion.h2
              className="text-4xl md:text-6xl font-black text-[#2d232e] mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {t('about.title')}{' '}
              <span className="text-[#534b52] uppercase">{t('about.titleHighlight')}</span>
            </motion.h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
              viewport={{ once: true }}
              className="w-24 h-[3px] bg-[#2d232e] mx-auto origin-left" 
            />
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left: Text */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.h3 variants={itemVariants} className="text-2xl md:text-4xl font-black text-[#2d232e] leading-tight">
                  {t('about.heading')}
                </motion.h3>
                <div className="h-px w-12 bg-[#534b52]/30" />
                <motion.p variants={itemVariants} className="text-lg text-[#2d232e]/80 leading-relaxed font-medium">
                  {t('about.p1')}
                </motion.p>
                <motion.p variants={itemVariants} className="text-lg text-[#2d232e]/80 leading-relaxed font-medium">
                  {t('about.p2')}
                </motion.p>
                <motion.p variants={itemVariants} className="text-lg text-[#2d232e]/80 leading-relaxed font-medium">
                  {t('about.p3')}
                </motion.p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t-2 border-[#2d232e]/10">
                {[
                  { number: '10x', label: t('about.stats.efficiency') },
                  { number: 'Auto', label: t('about.stats.workflows') },
                  { number: '100%', label: t('about.stats.commitment') },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="text-3xl md:text-5xl font-black text-[#2d232e] mb-2 group-hover:text-[#534b52] transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-xs md:text-sm text-[#2d232e]/70 font-bold uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Photo */}
            <motion.div
              className="relative h-[500px] md:h-[650px] w-full max-w-[500px] mx-auto lg:ml-auto mt-12 lg:mt-0"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                whileHover={{ rotate: -1, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full group"
              >
                {/* Sharp architectural shadow/border behind the image */}
                <div className="absolute inset-0 bg-[#2d232e] translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 rounded-2xl transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6" />

                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#2d232e] z-10">

                  {/* Premium subtle overlay glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d232e]/40 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <Image
                    src="/img/azseriozen_optimized_1000.jpg"
                    alt="Georgi Karchev"
                    fill
                    className="object-cover object-top transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority
                  />

                  {/* Founder Badge (Classy minimal overlay, anchoring the bottom left) */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="absolute bottom-6 left-6 right-8 md:right-auto bg-[#f1f0ea]/95 backdrop-blur-md border-2 border-[#2d232e] p-4 rounded-xl shadow-[4px_4px_0px_#2d232e] z-20 flex items-center gap-4 group-hover:shadow-[6px_6px_0px_#2d232e] group-hover:-translate-y-1 group-hover:-translate-x-1 transition-all duration-300"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2d232e] text-[#f1f0ea]">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                       </svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#534b52] uppercase tracking-wider">{t('about.founder', { defaultValue: 'Founder' })}</div>
                      <div className="text-base font-black text-[#2d232e]">Georgi Karchev</div>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default About
