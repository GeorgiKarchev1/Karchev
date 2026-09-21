import { ArrowUpRight } from 'lucide-react'
import { bookingPath } from '@/lib/contact-info'
import { heroCopy } from './hero-copy'
import s from './HeroV2.module.css'

/** V2 — Centred stack over a real artefact. The proof signal is the named
 *  checklist the engagement actually runs, not a manufactured statistic. */
export default function HeroV2({ bg = true }: { bg?: boolean }) {
  const c = heroCopy[bg ? 'bg' : 'en']
  const v = c.v2

  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={s.wrap}>
        <div className={s.lede}>
          <h1 id="hero-title" className={s.title}>
            {v.headline.map(line => <span key={line}>{line}</span>)}
          </h1>
          <p className={s.sub}>{v.sub}</p>
          <a className={s.cta} href={bookingPath(bg)}>
            {v.cta}
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
          <p className={s.note}>{v.callNote}</p>
        </div>

        <div className={s.card}>
          <div>
            <p className={s.count}>{v.checksCount}</p>
            <p className={s.countLabel}>{v.checksLabel}</p>
          </div>
          <div>
            <h2 className={s.cardTitle}>{v.artifactTitle}</h2>
            <ul className={s.checks}>
              {v.checks.map(check => <li key={check}>{check}</li>)}
            </ul>
            <p className={s.proof}>{v.proof}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
