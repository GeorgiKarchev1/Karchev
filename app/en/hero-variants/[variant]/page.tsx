import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HeroVariantPreview, { HERO_VARIANT_KEYS, isHeroVariant } from '@/components/site/heroes/variants'

export const metadata: Metadata = {
  title: 'Hero variant',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
}
export const dynamicParams = false
export function generateStaticParams() {
  return HERO_VARIANT_KEYS.map(variant => ({ variant }))
}

export default function HeroVariantPage({ params }: { params: { variant: string } }) {
  if (!isHeroVariant(params.variant)) notFound()
  return <HeroVariantPreview variant={params.variant} bg={false} />
}
