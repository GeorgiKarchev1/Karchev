'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { PHONE_DISPLAY, PHONE_HREF, bookingPath } from '@/lib/contact-info'
import { getPolicyPath, getRouteLocale } from '@/lib/site'

export default function Footer() {
  const { t, language } = useLanguage()
  const pathname = usePathname()
  const locale = getRouteLocale(pathname || '/') || (language === 'EN' ? 'en' : 'bg')
  const bg = locale === 'bg'
  return (
    <footer className="studio-footer">
      <div className="studio-wrap">
        <div className="studio-footer-top">
          <div className="studio-footer-about"><Link href={'/' + locale} className="studio-footer-logo" aria-label="KARCHX"><Image src="/img/logokarch.png" alt="KARCHX" width={135} height={45} /></Link><p>{bg ? 'Системите зад растежа на Вашия бизнес.' : 'The systems behind your business growth.'}</p></div>
          <div><h2>{bg ? 'За бизнеса Ви' : 'For your business'}</h2><Link href={'/' + locale + '#solutions'}>{bg ? 'Как работим заедно' : 'Working together'}</Link><Link href={'/' + locale + '#pricing'}>{bg ? 'Цена' : 'Price'}</Link><a href={bookingPath(bg)}>{bg ? 'Да поговорим' : 'Let’s talk'}</a></div>
          <div><h2>{t('footer.resourcesTitle')}</h2><Link href="/bg/checklist">{bg ? 'Безплатен чеклист' : 'Free Bulgarian checklist'}</Link><Link href={'/' + locale + '#faq'}>{bg ? 'Често задавани въпроси' : 'Common questions'}</Link><Link href={'/' + locale + '/blog'}>{t('footer.blogLink')}</Link></div>
          <div><h2>{t('footer.connectTitle')}</h2><a href={PHONE_HREF}>{PHONE_DISPLAY}<ArrowUpRight size={15} aria-hidden="true" /></a><a href="mailto:georgikarchev5@gmail.com">georgikarchev5@gmail.com<ArrowUpRight size={15} aria-hidden="true" /></a><a href="https://www.linkedin.com/in/georgi-karchev-415901244/" target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={15} aria-hidden="true" /></a><p>{bg ? 'България · Онлайн и на място' : 'Bulgaria · Remote and on-site'}</p></div>
        </div>
        <div className="studio-footer-bottom"><p>{t('footer.rights')}</p><div><Link href={getPolicyPath(locale, 'privacy')}>{t('footer.privacy')}</Link><Link href={getPolicyPath(locale, 'terms')}>{t('footer.terms')}</Link><Link href={getPolicyPath(locale, 'cookies')}>{bg ? 'Бисквитки' : 'Cookies'}</Link></div><a href="#" className="studio-back-top" aria-label={bg ? 'Към началото на страницата' : 'Back to top'}><ArrowUp size={19} aria-hidden="true" /></a></div>
      </div>
    </footer>
  )
}
