'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Plus } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import { useLanguage } from '@/context/LanguageContext'
import { useAgentMotion } from '@/lib/agent-motion'

import Link from 'next/link'
import { GUIDE_URL, PILOT_PRICE_EUR, bookingPath } from '@/lib/contact-info'
import GrowthHero from '@/components/site/GrowthHero'
import { growthContent as content } from '@/lib/growth-content'

/** `hero` lets the variant preview routes swap the top of the page while the
 *  rest of the homepage stays identical, so the comparison is honest. */
export default function MarketingHome({ hero }: { hero?: ReactNode } = {}) {
  const { language } = useLanguage()
  const bg = language === 'BG'
  const c = content[bg ? 'bg' : 'en']
  const booking = bookingPath(bg)
  const scope = useAgentMotion(language)

  return (
    <div className="agent-site" ref={scope}>
      <a href="#main-content" className="studio-skip">{bg ? 'Към съдържанието' : 'Skip to content'}</a>
      <Navbar />
      <main id="main-content">
        {hero ?? <GrowthHero bg={bg} />}

        <section className="agent-principles" id="solutions" aria-labelledby="solutions-title">
          <div className="studio-wrap"><div className="agent-section-heading"><h2 id="solutions-title">{c.differenceTitle}<br /><span>{c.differenceSecond}</span></h2><p>{c.differenceIntro}</p></div>
            <div className="agent-principles-list">{c.principles.map((principle) => <article key={principle.title}><h3>{principle.title}</h3><p>{principle.text}</p></article>)}</div>
          </div>
        </section>

        <section className="growth-offer studio-wrap" id="pricing" aria-labelledby="pricing-title">
          <div className="agent-section-heading"><h2 id="pricing-title">{c.offerTitle}<br /><span>{c.offerSecond}</span></h2><p>{c.offerIntro}</p></div>
          <div className="growth-offer-body">
            <div className="growth-offer-price"><p className="growth-price">{PILOT_PRICE_EUR}<span> €</span></p><p>{c.priceLabel}</p><p>{c.offerTiming}</p><p>{c.offerPayment}</p><a href={booking} className="agent-hero-button">{c.offerCta}<ArrowUpRight size={20} aria-hidden="true" /></a></div>
            <div><h3>{bg ? 'Какво получаваш' : 'What you get'}</h3><ul className="growth-scope">{c.scope.map(item => <li key={item}>{item}</li>)}</ul></div>
          </div>
          <div className="growth-offer-guarantee"><h3>{bg ? 'Не спираме на втората седмица.' : 'Our work does not stop at week two.'}</h3><p>{c.offerWhy}</p></div>
        </section>

        <section className="growth-guide" id="guide" aria-labelledby="guide-title"><div className="studio-wrap growth-guide-inner">
          <div><h2 id="guide-title">{c.guideTitle}<br /><span>{c.guideSecond}</span></h2><p>{c.guideIntro}</p><div className="growth-guide-actions"><Link href="/bg/checklist" className="agent-hero-button">{c.guideRead}<ArrowUpRight size={20} aria-hidden="true" /></Link><a href={GUIDE_URL} download className="agent-link">{c.guideDownload}<ArrowUpRight size={20} aria-hidden="true" /></a></div><p className="growth-guide-note">{c.guideNote}</p></div>
          <div className="growth-guide-preview"><p className="growth-guide-number" aria-hidden="true">12</p><h3>{bg ? 'проверки по пътя до клиента' : 'checks on the path to a customer'}</h3><ul>{c.guideBullets.map(item => <li key={item}>{item}</li>)}</ul></div>
        </div></section>

        <section className="agent-about" id="about" aria-labelledby="about-title">
          <div className="agent-about-inner studio-wrap">
            <h2 id="about-title">{c.aboutTitle}<br /><span>{c.aboutSecond}</span></h2>
            <figure className="agent-about-person">
              <div className="agent-about-photo">
                <Image src="/img/azseriozen_optimized_1000.jpg" alt={bg ? 'Портрет на Георги Кърчев' : 'Portrait of Georgi Karchev'} fill sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1150px) calc(100vw - 72px), 1040px" />
              </div>
              <figcaption className="agent-about-note">
                <p>{c.aboutText}</p>
                <div className="agent-founder"><strong>{c.role}</strong><span>{c.roleDetail}</span></div>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="agent-faq studio-wrap" id="faq" aria-labelledby="faq-title"><h2 id="faq-title">{c.faqTitle}</h2><div className="agent-faq-list">{c.faqs.map(faq => <details key={faq.q}><summary>{faq.q}<Plus size={21} aria-hidden="true" /></summary><p>{faq.a}</p></details>)}</div></section>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
