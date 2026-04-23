'use client'

import Link from 'next/link'
import { ArrowUpRight, Instagram, Linkedin } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t-2 border-[#2d232e] bg-[#f1f0ea]">
      <div className="container-wide mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold font-heading text-[#2d232e] mb-4">KARCHEV</div>
            <p className="text-[#2d232e] text-sm leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#2d232e] flex items-center justify-center text-[#2d232e] hover:bg-[#534b52] hover:text-[#e0ddcf] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/georgi-karchev-415901244/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#2d232e] flex items-center justify-center text-[#2d232e] hover:bg-[#534b52] hover:text-[#e0ddcf] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#2d232e] flex items-center justify-center text-[#2d232e] hover:bg-[#534b52] hover:text-[#e0ddcf] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91.04.18 1.45.92 2.81 2.05 3.73 1.14.93 2.64 1.45 4.14 1.47v4.06c-1.34-.05-2.67-.37-3.87-1-1.12-.6-2.11-1.42-2.88-2.39v9.42c0 2.22-1.01 4.31-2.73 5.67-1.74 1.34-4.04 1.95-6.2 1.63-2.14-.3-4.06-1.45-5.32-3.15-1.28-1.73-1.84-3.92-1.47-6.04.37-2.12 1.57-4 3.32-5.2 1.76-1.18 3.93-1.61 6.01-1.18V10.8c-.89-.25-1.83-.34-2.76-.23-.84.09-1.64.44-2.3.96-.64.51-1.11 1.21-1.33 2.01-.22.79-.18 1.63.12 2.39.29.75.83 1.39 1.51 1.8.69.41 1.5.61 2.29.58.8-.02 1.57-.27 2.22-.72.64-.44 1.13-1.07 1.39-1.83.18-.54.26-1.11.23-1.68V.02h3.91Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#2d232e] mb-5">
              {t('footer.servicesTitle')}
            </div>
            <ul className="space-y-3">
              {['service1', 'service2', 'service3'].map((key) => (
                <li key={key}>
                  <Link href="#solutions" className="text-[#2d232e] text-sm hover:text-[#534b52] transition-colors font-medium">
                    {t(`footer.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#2d232e] mb-5">
              {t('footer.portfolioTitle')}
            </div>
            <ul className="space-y-3">
              {[
                { name: 'GBGamingHub',       url: 'https://www.gbgaminghub.com/' },
                { name: 'The Agency Course',  url: 'https://theagencycourse.bg/' },
                { name: 'Editing.bg',         url: 'https://editing.bg/' },
                { name: 'InPlayGear',         url: 'https://inplaygear.com/' },
                { name: 'Готов за час',       url: 'https://gotovzachas.com/' },
                { name: 'AI Marketing',       url: 'https://aimarketing.bg/' },
              ].map((site) => (
                <li key={site.name}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2d232e] text-sm hover:text-[#534b52] transition-colors inline-flex items-center gap-1 group font-medium"
                  >
                    {site.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#2d232e] mb-5">
              {t('footer.connectTitle')}
            </div>
            <Link
              href="https://cal.com/georgi-karchev-3r9puz/30min"
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-[#2d232e] text-sm text-[#2d232e] font-bold hover:bg-[#534b52] hover:text-[#e0ddcf] transition-colors mb-6 shadow-[2px_2px_0px_#2d232e] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[1px_1px_0px_#2d232e]"
            >
              {t('navbar.bookMeeting')}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t-2 border-[#2d232e] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm font-medium text-[#2d232e]">{t('footer.rights')}</div>
          <div className="flex gap-6 text-sm font-medium text-[#2d232e]">
            <Link href="#" className="hover:text-[#534b52] transition-colors">{t('footer.privacy')}</Link>
            <Link href="#" className="hover:text-[#534b52] transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
