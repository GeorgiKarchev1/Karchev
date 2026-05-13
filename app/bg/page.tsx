import type { Metadata } from 'next'
import MarketingHome from '@/components/site/MarketingHome'
import { localizedAlternates } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Изработка на сайтове, съдържание и AI автоматизации',
  description: 'Karchev прави бързи сайтове, landing страници, съдържание и AI автоматизации за бизнеси в България.',
  alternates: localizedAlternates('/bg', '/en', 'bg'),
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    alternateLocale: ['en_US'],
    url: 'https://www.karchx.com/bg',
    title: 'Karchev | Изработка на сайтове, съдържание и AI автоматизации',
    description: 'Бързи сайтове, landing страници, съдържание и AI автоматизации за бизнеси в България.',
    siteName: 'Karchev',
    images: [
      {
        url: '/img/og-image.png',
        width: 1536,
        height: 1024,
        alt: 'Karchev',
      },
    ],
  },
}

export default function BulgarianHomePage() {
  return <MarketingHome />
}
