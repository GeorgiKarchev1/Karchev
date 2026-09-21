import { ArrowUpRight, ArrowRight, Phone } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_HREF, PILOT_PRICE_EUR, bookingPath } from '@/lib/contact-info'

const copy = {
  bg: {
    first: 'От интерес', second: 'до нов клиент.',
    intro: 'Свързваме офертата, сайта и продажбите Ви в работещ процес. Откриваме къде губите клиенти и правим нужните промени.',
    cta: 'Нека поговорим', callNote: 'Безплатен разговор · до 30 минути',
    duration: '2 седмици работа', payment: 'Еднократно, предварително', availability: 'За първите 3 клиента',
    guarantee: 'След двете седмици продължаваме безплатно до постигане на договорените цели.',
    terms: 'Уговаряме целите писмено преди плащане.', details: 'Какво включва', offerLabel: 'Цена и условия',
  },
  en: {
    first: 'From interest', second: 'to new customers.',
    intro: 'We connect your offer, website and sales into a working process. Find where you lose customers, then make the changes that matter.',
    cta: 'Let’s talk', callNote: 'Free first call · up to 30 minutes',
    duration: '2 weeks of work', payment: 'One-off fee, paid upfront', availability: 'For the first 3 clients',
    guarantee: 'After two weeks, we keep working for free until the agreed goals are achieved.',
    terms: 'We agree the goals in writing before payment.', details: 'What’s included', offerLabel: 'Price and terms',
  },
}

/** Ordinary text with visible overflow keeps Bulgarian letterforms intact. */
export default function GrowthHero({ bg = true }: { bg?: boolean }) {
  const c = copy[bg ? 'bg' : 'en']
  return (
    <section className={`kx-hero${bg ? '' : ' kx-hero-en'}`} aria-labelledby="hero-title" id="demo">
      <div className="studio-wrap kx-hero-inner">
        <h1 id="hero-title" className="kx-hero-title">
          <span className="kx-title-start">{c.first}<ArrowUpRight aria-hidden="true" strokeWidth={1.25} /></span>
          {' '}<span className="kx-title-end">{c.second}</span>
        </h1>
        <div className="kx-hero-conversation">
          <p className="kx-hero-intro">{c.intro}</p>
          <div className="kx-hero-actions">
            <div className="kx-hero-action-row">
              <a className="kx-hero-action" href={bookingPath(bg)}>{c.cta}<ArrowUpRight size={21} aria-hidden="true" /></a>
              <a className="kx-hero-phone" href={PHONE_HREF}><Phone size={17} aria-hidden="true" />{PHONE_DISPLAY}</a>
            </div>
            <p className="kx-hero-call-note">{c.callNote}</p>
          </div>
        </div>
        <aside className="kx-hero-offer" aria-label={c.offerLabel}>
          <div className="kx-hero-price">
            <p className="kx-hero-amount">{PILOT_PRICE_EUR}<span> €</span></p>
            <div><p className="kx-hero-duration">{c.duration}</p><p className="kx-hero-payment">{c.payment}</p></div>
            <p className="kx-hero-availability">{c.availability}</p>
          </div>
          <div className="kx-hero-promise"><p>{c.guarantee}</p><small>{c.terms}</small></div>
          <a className="kx-hero-details" href={`${bg ? '/bg' : '/en'}#pricing`}>{c.details}<ArrowRight size={19} aria-hidden="true" /></a>
        </aside>
      </div>
    </section>
  )
}
