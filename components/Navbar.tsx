'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedSwitchPath, getRouteLocale } from '@/lib/site'

export default function Navbar() {
  const { t, language } = useLanguage()
  const pathname = usePathname() || '/'
  const locale = getRouteLocale(pathname) || (language === 'EN' ? 'en' : 'bg')
  const home = '/' + locale
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const nav = useRef<HTMLElement>(null)
  const items = [
    { href: home + '#demo', label: language === 'EN' ? 'Your agent' : 'Вашият агент' },
    { href: home + '#solutions', label: language === 'EN' ? 'Personalisation' : 'Персонализация' },
    { href: home + '#how-it-works', label: t('navbar.about') },
    { href: home + '/blog', label: t('navbar.blog') },
  ]

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    // rAF-throttled so the scroll handler never lands in the frame budget.
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80)
        frame = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    const outside = (event: PointerEvent) => {
      if (!nav.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', outside)
    return () => {
      document.removeEventListener('keydown', close)
      document.removeEventListener('pointerdown', outside)
    }
  }, [open])

  return (
    <nav ref={nav} className={scrolled ? 'studio-nav is-scrolled' : 'studio-nav'} aria-label={language === 'EN' ? 'Main navigation' : 'Основна навигация'}>
      <div className="studio-wrap studio-nav-inner">
        <Link href={home} className="studio-brand" aria-label="KARCHX">
          <img src="/img/logokarch.png" alt="KARCHX" width="1500" height="500" />
        </Link>
        <div className="studio-desktop-links">
          {items.map(item => <Link key={item.href} href={item.href} className="studio-nav-link">{item.label}</Link>)}
        </div>
        <div className="studio-nav-actions">
          <a className="studio-language" href={getLocalizedSwitchPath(pathname, locale === 'en' ? 'bg' : 'en')} hrefLang={locale === 'en' ? 'bg' : 'en'} aria-label={locale === 'en' ? 'Превключи на български' : 'Switch to English'}>
            <span className={locale === 'en' ? 'active' : ''}>EN</span><span aria-hidden="true">/</span><span className={locale === 'bg' ? 'active' : ''}>BG</span>
          </a>
          <a href="https://cal.com/georgi-karchev-3r9puz/30min" target="_blank" rel="noopener noreferrer" className="studio-nav-book">
            {language === 'EN' ? "Let's talk" : 'Да поговорим'}<ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <button ref={toggle} className="studio-menu-toggle" aria-expanded={open} aria-controls="studio-mobile-menu" aria-label={language === 'EN' ? (open ? 'Close menu' : 'Open menu') : (open ? 'Затвори менюто' : 'Отвори менюто')} onClick={() => setOpen(!open)}>
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      {open && <div id="studio-mobile-menu" className="studio-mobile-menu">
        {items.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={22} aria-hidden="true" /></Link>)}
        <a href="https://cal.com/georgi-karchev-3r9puz/30min" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>{t('navbar.bookMeeting')}<ArrowUpRight size={22} aria-hidden="true" /></a>
      </div>}
    </nav>
  )
}
