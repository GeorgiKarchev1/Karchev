'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

const COOKIE_KEY = 'karchev_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY)
    if (!stored) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(COOKIE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] md:left-auto md:right-6 md:bottom-6 md:max-w-sm">
      <div className="rounded-2xl shadow-2xl p-5 border border-[#534b52] text-[#e0ddcf]" style={{ backgroundColor: 'rgb(45, 35, 46)', backdropFilter: 'none', WebkitBackdropFilter: 'none' }}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <p className="text-sm font-semibold leading-snug">Използваме бисквитки 🍪</p>
          <button
            onClick={decline}
            className="text-[#e0ddcf]/60 hover:text-[#e0ddcf] transition-colors shrink-0 mt-0.5"
            aria-label="Затвори"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-[#e0ddcf]/70 leading-relaxed mb-4">
          Използваме задължителни и аналитични бисквитки, за да подобрим сайта.{' '}
          <Link href="/politiki/biskvitki" className="underline hover:text-[#e0ddcf] transition-colors">
            Научи повече
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            onClick={accept}
            className="flex-1 bg-[#e0ddcf] text-[#2d232e] text-xs font-bold py-2 px-4 rounded-full hover:bg-white transition-colors"
          >
            Приемам
          </button>
          <button
            onClick={decline}
            className="flex-1 border border-[#534b52] text-[#e0ddcf]/80 text-xs font-medium py-2 px-4 rounded-full hover:border-[#e0ddcf]/40 hover:text-[#e0ddcf] transition-colors"
          >
            Отказвам
          </button>
        </div>
      </div>
    </div>
  )
}
