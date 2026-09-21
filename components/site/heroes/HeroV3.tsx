'use client'

import { useId } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { heroCopy } from './hero-copy'
import s from './HeroV3.module.css'

/** Writes through React's own value setter so the controlled contact textarea
 *  actually registers the change; a plain `.value =` would be overwritten on
 *  the next render. */
function fillContactMessage(text: string) {
  const el = document.getElementById('contact-message') as HTMLTextAreaElement | null
  if (!el) return false
  try {
    const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')?.set
    if (!setter) return false
    setter.call(el, el.value ? `${el.value}\n${text}` : text)
    el.dispatchEvent(new Event('input', { bubbles: true }))
    return true
  } catch {
    return false
  }
}

/** V3 — Input-first. The field replaces the hero image: the visitor starts the
 *  diagnostic instead of reading about it. The price stays visible below, so
 *  nothing is hidden, but it is not the first thing read. */
export default function HeroV3({ bg = true }: { bg?: boolean }) {
  const c = heroCopy[bg ? 'bg' : 'en']
  const v = c.v3
  const fieldId = useId()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const site = String(data.get('site') ?? '').trim()
    const contact = document.getElementById('contact')
    if (site) fillContactMessage(`${v.fieldLabel}: ${site}`)
    contact?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    document.getElementById('contact-name')?.focus({ preventScroll: true })
  }

  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={s.wrap}>
        <div className={s.lede}>
          <h1 id="hero-title" className={s.title}>
            {v.headline.map(line => <span key={line}>{line}</span>)}
          </h1>
          <p className={s.sub}>{v.sub}</p>
        </div>

        <form className={s.form} onSubmit={handleSubmit} action={bg ? '/bg#contact' : '/en#contact'}>
          <label className={s.label} htmlFor={fieldId}>{v.fieldLabel}</label>
          <div className={s.row}>
            <input
              className={s.input}
              id={fieldId}
              name="site"
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder={v.fieldPlaceholder}
            />
            <button className={s.cta} type="submit">
              {v.cta}
              <ArrowUpRight size={20} aria-hidden="true" />
            </button>
          </div>
          <p className={s.note}>{v.callNote}</p>
        </form>

        <div className={s.foot}>
          <p className={s.proof}>{v.proof}</p>
          <p className={s.priceLine}>{v.priceLine}</p>
        </div>
      </div>
    </section>
  )
}
