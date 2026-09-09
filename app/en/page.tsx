import type { Metadata } from 'next'
import MarketingHome from '@/components/site/MarketingHome'
import { localizedAlternates } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Your Personalised AI Agent',
  description: 'One AI agent built specifically for you. Your tasks, tools and rules, with a personal approach from the first conversation to setup.',
  keywords: ['ai integration for business', 'ai automation', 'ai implementation', 'custom ai agents', 'business process automation'],
  alternates: localizedAlternates('/bg', '/en', 'en'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['bg_BG'],
    url: 'https://www.karchx.com/en',
    title: 'KARCHX | Your Personalised AI Agent',
    description: 'One AI agent built specifically for you. Your tasks, tools and rules, with a personal approach from the first conversation to setup.',
    siteName: 'KARCHX',
    images: [
      {
        url: '/img/og-image.png',
        width: 1536,
        height: 1024,
        alt: 'KARCHX',
      },
    ],
  },
}

export default function EnglishHomePage() {
  return <MarketingHome />
}
