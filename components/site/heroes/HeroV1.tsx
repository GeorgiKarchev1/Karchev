import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { bookingPath } from '@/lib/contact-info'
import { heroCopy } from './hero-copy'
import s from './HeroV1.module.css'

/** V1 — Split editorial: oversized heading on the left axis, a narrow decision
 *  column on the right, and the offer as an evenly divided band beneath. */
export default function HeroV1({ bg = true }: { bg?: boolean }) {
  const c = heroCopy[bg ? 'bg' : 'en']
  const v = c.v1

  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={s.wrap}>
        <div className={s.lede}>
          <h1 id="hero-title" className={s.title}>
            {v.headline.map(line => <span key={line}>{line}</span>)}
          </h1>
          <div className={s.aside}>
            <p className={s.sub}>{v.sub}</p>
            <div className={s.actions}>
              <a className={s.cta} href={bookingPath(bg)}>
                {v.cta}
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
              <p className={s.note}>{v.callNote}</p>
            </div>
          </div>
        </div>

        <div className={s.strip}>
          <div>
            <p className={s.amount}>{c.price}<em> €</em></p>
            <p className={s.duration}>{c.duration}</p>
            <p className={s.small}>{c.payment}</p>
          </div>
          <p className={s.proof}>{v.proof}</p>
          <div className={s.colEnd}>
            <span className={s.badge}>{c.availability}</span>
            <a className={s.details} href={`${bg ? '/bg' : '/en'}#pricing`}>
              {c.detailsLink}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
