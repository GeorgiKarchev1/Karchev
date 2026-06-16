import type { Metadata } from 'next'
import MarketingHome from '@/components/site/MarketingHome'
import { localizedAlternates } from '@/lib/site'

export const metadata: Metadata = {
  title: 'AI Integration & Automation for Business | Karchev',
  description: 'Karchev builds AI into the systems you already run — automating the busywork and connecting your tools. AI integration for businesses in Bulgaria and the EU, live in weeks.',
  keywords: ['ai integration for business', 'ai automation', 'ai implementation', 'custom ai agents', 'business process automation'],
  alternates: localizedAlternates('/bg', '/en', 'en'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['bg_BG'],
    url: 'https://www.karchx.com/en',
    title: 'Karchev | AI Integration & Automation for Business',
    description: 'We build AI into the systems you already run — automating the busywork and connecting your tools. Live in weeks, not months.',
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

export default function EnglishHomePage() {
  return <MarketingHome />
}
