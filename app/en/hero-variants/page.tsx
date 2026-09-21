import type { Metadata } from 'next'
import HeroVariantIndex from '@/components/site/heroes/HeroVariantIndex'

export const metadata: Metadata = {
  title: 'Hero variants',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
}

export default function HeroVariantsIndexPage() {
  return <HeroVariantIndex bg={false} />
}
