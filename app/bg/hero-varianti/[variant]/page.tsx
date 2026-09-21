import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import GrowthHero, { HERO_VARIANTS } from '@/components/site/GrowthHero'

export const metadata: Metadata = { title: 'Варианти на началната секция', robots: { index: false, follow: false }, alternates: { canonical: null } }
export const dynamicParams = false
export function generateStaticParams() { return HERO_VARIANTS.map((_, i) => ({ variant: String(i + 1) })) }
const names = ['Ясна оферта', 'В центъра', 'Силен контраст', 'Пътят до клиента', 'Лично партньорство']

export default function HeroVariantPage({ params }: { params: { variant: string } }) {
  const index = Number(params.variant) - 1
  if (!Number.isInteger(index) || !HERO_VARIANTS[index]) notFound()
  return <div className="agent-site kx-preview-site"><a href="#main-content" className="studio-skip">Към варианта</a><Navbar />
    <div className="kx-preview-bar"><div className="studio-wrap"><p>Пет варианта за KARCHX</p><nav aria-label="Варианти на началната секция">{names.map((name, i) => <Link key={name} href={`/bg/hero-varianti/${i + 1}`} aria-current={i === index ? 'page' : undefined}><span>{i + 1}</span>{name}</Link>)}</nav></div></div>
    <main id="main-content"><GrowthHero variant={HERO_VARIANTS[index]} preview /></main>
    <div className="kx-preview-footer studio-wrap"><p>{index === 0 ? 'Този вариант е публикуван на началната страница.' : 'Алтернативна композиция със същата оферта и условия.'}</p><Link href="/bg">Към целия сайт<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></Link></div>
  </div>
}
