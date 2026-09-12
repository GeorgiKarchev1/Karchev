'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { getPolicyPath, getRouteLocale } from '@/lib/site'

const COOKIE_KEY = 'karchev_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const { language } = useLanguage()
  const pathname = usePathname()

  // This banner lives in the root layout, outside the per-locale subtrees, so
  // the context language here is the cookie/geo guess rather than the one the
  // page is actually written in. Prefer the locale in the URL when there is
  // one, so an English page never gets a Bulgarian consent notice.
  const routeLocale = getRouteLocale(pathname ?? '')
  const bg = routeLocale ? routeLocale === 'bg' : language === 'BG'

  useEffect(() => {
    try { setVisible(!localStorage.getItem(COOKIE_KEY)) } catch { setVisible(true) }
  }, [])

  function choose(value: 'accepted' | 'declined') {
    try { localStorage.setItem(COOKIE_KEY, value) } catch { /* Dismiss for this visit if storage is unavailable. */ }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside className="studio-cookie" aria-label={bg ? 'Настройки за бисквитки' : 'Cookie preferences'}>
      <div><h2>{bg ? 'Бисквитки на този сайт' : 'Cookies on this site'}</h2><button className="studio-cookie-close" onClick={() => choose('declined')} aria-label={bg ? 'Затвори' : 'Close'}><X size={18} aria-hidden="true" /></button></div>
      <p>{bg ? 'Използвам задължителни и аналитични бисквитки, за да подобря сайта.' : 'I use essential and analytics cookies to improve the website.'} <Link href={getPolicyPath(bg ? 'bg' : 'en', 'cookies')}>{bg ? 'Научи повече' : 'Learn more'}</Link></p>
      <div className="studio-cookie-actions"><button onClick={() => choose('accepted')}>{bg ? 'Приемам' : 'Accept'}</button><button onClick={() => choose('declined')}>{bg ? 'Отказвам' : 'Decline'}</button></div>
    </aside>
  )
}
