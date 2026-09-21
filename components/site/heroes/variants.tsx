import MarketingHome from '@/components/site/MarketingHome'
import HeroV1 from './HeroV1'
import HeroV2 from './HeroV2'
import HeroV3 from './HeroV3'
import HeroV4 from './HeroV4'
import HeroV5 from './HeroV5'

export const HERO_VARIANT_KEYS = ['1', '2', '3', '4', '5'] as const
export type HeroVariantKey = (typeof HERO_VARIANT_KEYS)[number]

const HEROES: Record<HeroVariantKey, (props: { bg?: boolean }) => JSX.Element> = {
  '1': HeroV1,
  '2': HeroV2,
  '3': HeroV3,
  '4': HeroV4,
  '5': HeroV5,
}

export const HERO_VARIANT_NOTES: Record<HeroVariantKey, { bg: string; en: string }> = {
  '1': { bg: 'Разделен редакционен — заглавие отляво, решението отдясно, офертата в три равни колони.', en: 'Split editorial — heading left, the decision right, the offer in three equal columns.' },
  '2': { bg: 'Центриран + артефакт — едно обещание над картата с 12-те проверки.', en: 'Centred stack over an artefact — one promise above the card of 12 checks.' },
  '3': { bg: 'Диагностика с поле — hero-ът е първата стъпка, цената стои отдолу.', en: 'Input first — the hero is the first step; the price sits below it.' },
  '4': { bg: 'Монументална типография — 72px изречение, един бутон, един ред доказателство.', en: 'Monumental type — a 72px statement, one action, one proof line.' },
  '5': { bg: 'Преди / след — едно и също запитване, обработено по два начина.', en: 'Before and after — the same enquiry, handled two ways.' },
}

export function isHeroVariant(value: string): value is HeroVariantKey {
  return (HERO_VARIANT_KEYS as readonly string[]).includes(value)
}

/** Renders one variant above the unchanged homepage, so each option is judged
 *  against the sections that actually follow it. */
export default function HeroVariantPreview({ variant, bg }: { variant: HeroVariantKey; bg: boolean }) {
  const Hero = HEROES[variant]
  return <MarketingHome hero={<Hero bg={bg} />} />
}
