import { ArrowUpRight } from 'lucide-react'
import { bookingPath } from '@/lib/contact-info'
import { heroCopy } from './hero-copy'
import s from './HeroV5.module.css'

/** V5 — Two states of the same enquiry. The contrast carries the argument, so
 *  the copy above it can stay short. */
export default function HeroV5({ bg = true }: { bg?: boolean }) {
  const c = heroCopy[bg ? 'bg' : 'en']
  const v = c.v5

  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={s.wrap}>
        <h1 id="hero-title" className={s.title}>
          {v.headline.map(line => <span key={line}>{line}</span>)}
        </h1>
        <p className={s.sub}>{v.sub}</p>

        <div className={s.pair}>
          <div className={s.card}>
            <p className={s.cardLabel}>{v.beforeLabel}</p>
            <ul>{v.before.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className={s.bridge}>
            <span className={s.bridgeLine} aria-hidden="true" />
            <span className={s.bridgeText}>{v.bridge}</span>
            <span className={s.bridgeLine} aria-hidden="true" />
          </div>
          <div className={`${s.card} ${s.cardAfter}`}>
            <p className={s.cardLabel}>{v.afterLabel}</p>
            <ul>{v.after.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>

        <div className={s.foot}>
          <div className={s.actions}>
            <a className={s.cta} href={bookingPath(bg)}>
              {v.cta}
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <p className={s.note}>{v.callNote}</p>
          </div>
          <p className={s.proof}>{v.proof}</p>
        </div>
      </div>
    </section>
  )
}
