import { ArrowUpRight } from 'lucide-react'
import { bookingPath } from '@/lib/contact-info'
import { heroCopy } from './hero-copy'
import s from './HeroV4.module.css'

/** V4 — A single centred reading path that ends on the offer. The price panel
 *  closes it: the price and the term read as one line, and the continuation
 *  follows as the next step rather than as fine print. */
export default function HeroV4({ bg = true }: { bg?: boolean }) {
  const c = heroCopy[bg ? 'bg' : 'en']
  const v = c.v4

  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={s.wrap}>
        <div className={s.column}>
          <h1 id="hero-title" className={s.title}>
            {v.headline.map(line => <span key={line}>{line}</span>)}
          </h1>

          <p className={s.sub}>{v.sub}</p>

          <a className={s.cta} href={bookingPath(bg)}>
            {v.cta}
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
          <p className={s.note}>{v.callNote}</p>

          <div className={s.offer}>
            <p className={s.price}>
              <span className={s.amount}>{v.amount}<span> €</span></span>
              <span className={s.terms}>{v.terms}</span>
            </p>
            <p className={s.continuation}>{v.continuation}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
