import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HERO_VARIANT_KEYS, HERO_VARIANT_NOTES } from './variants'
import s from './HeroVariantIndex.module.css'

/** A local-only gallery. Not linked from the site and not indexed. */
export default function HeroVariantIndex({ bg }: { bg: boolean }) {
  const base = bg ? '/bg/hero-varianti' : '/en/hero-variants'
  const other = bg ? '/en/hero-variants' : '/bg/hero-varianti'

  return (
    <main className={s.page}>
      <div className={s.wrap}>
        <h1 className={s.title}>{bg ? 'Пет hero варианта' : 'Five hero variants'}</h1>
        <p className={s.lede}>
          {bg
            ? 'Всеки вариант е различен архетип, не пребоядисана същата подредба. Всеки се показва над непроменената начална страница, за да се вижда дали се връзва с това, което следва.'
            : 'Each variant is a different archetype, not the same layout restyled. Each one sits above the unchanged homepage, so you can see whether it connects to what follows.'}
        </p>
        <ol className={s.list}>
          {HERO_VARIANT_KEYS.map(key => (
            <li key={key}>
              <Link className={s.item} href={`${base}/${key}`}>
                <span className={s.number}>{key}</span>
                <span className={s.note}>{HERO_VARIANT_NOTES[key][bg ? 'bg' : 'en']}</span>
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
        <Link className={s.switch} href={other}>
          {bg ? 'Виж на английски' : 'View in Bulgarian'}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </main>
  )
}
