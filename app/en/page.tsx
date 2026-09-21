import type { Metadata } from 'next'
import MarketingHome from '@/components/site/MarketingHome'
import { BASE_URL, localizedAlternates } from '@/lib/site'

const title = 'Growth Systems for Your Business'
const description = 'A clearer offer, a better website journey and organised enquiry handling. Two weeks of work for €250 upfront. We continue free until the agreed goals are achieved. Free first call with Georgi Karchev.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['growth systems', 'growth consulting', 'sales process improvement', 'growth sprint', 'KARCHX Growth Systems'],
  alternates: localizedAlternates('/bg', '/en', 'en'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['bg_BG'],
    url: `${BASE_URL}/en`,
    title: `KARCHX | ${title}`,
    description,
    siteName: 'KARCHX',
    images: [{ url: '/img/og-image.png', width: 1536, height: 1024, alt: 'KARCHX Growth Systems' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `KARCHX | ${title}`,
    description,
    images: ['/img/og-image.png'],
  },
}

export default function EnglishHomePage() {
  return <MarketingHome />
}
