'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '@/context/LanguageContext'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-[#f1f0ea]/90 backdrop-blur-md border-b border-[#2d232e] py-4'
        : 'bg-transparent py-6'
    }`}>
      <div className="container-wide mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight font-heading text-[#2d232e] flex items-center gap-2">
          KARCHEV
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#solutions" className="text-sm font-medium text-[#2d232e] hover:text-[#2d232e] transition-colors">
            {t('navbar.services')}
          </Link>
          <Link href="#portfolio" className="text-sm font-medium text-[#2d232e] hover:text-[#2d232e] transition-colors">
            {t('navbar.portfolio')}
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-[#2d232e] hover:text-[#2d232e] transition-colors">
            {t('navbar.about')}
          </Link>

          <div className="w-px h-4 bg-[#2d232e]" />
          <LanguageSwitcher />

          <Link
            href="https://cal.com/georgi-karchev-3r9puz/30min"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#534b52] text-[#e0ddcf] text-sm font-semibold hover:bg-[#2d232e] transition-all duration-300 group"
          >
            {t('navbar.bookMeeting')}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <button
          className="md:hidden text-[#2d232e] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-[#f1f0ea] border-b border-[#2d232e] overflow-hidden md:hidden"
          >
            <div className="flex flex-col items-center p-6 gap-6">
              {[
                { href: '#solutions', label: t('navbar.services') },
                { href: '#portfolio', label: t('navbar.portfolio') },
                { href: '#how-it-works', label: t('navbar.about') },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xl font-bold text-[#2d232e] hover:text-[#534b52] transition-colors text-center w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="https://cal.com/georgi-karchev-3r9puz/30min"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 mt-2 rounded-full bg-[#534b52] text-[#f1f0ea] text-base font-bold border-2 border-[#2d232e] shadow-[4px_4px_0px_#2d232e] hover:bg-[#2d232e] transition-all duration-300 active:translate-y-[2px] active:translate-x-[2px] active:shadow-[1px_1px_0px_#2d232e] w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('navbar.bookMeeting')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
