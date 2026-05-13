import type { Metadata } from 'next'
import MarketingHome from '@/components/site/MarketingHome'
import { localizedAlternates } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Conversion Websites, Content Systems and AI Automation',
  description: 'Karchev builds conversion-focused websites, landing pages, content systems, and AI automations for service businesses and founders.',
  alternates: localizedAlternates('/bg', '/en', 'en'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['bg_BG'],
    url: 'https://www.karchx.com/en',
    title: 'Karchev | Conversion Websites, Content Systems and AI Automation',
    description: 'Conversion-focused websites, landing pages, content systems, and AI automations for service businesses and founders.',
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
