import type { Metadata } from 'next'
import MarketingHome from '@/components/site/MarketingHome'
import { BASE_URL, localizedAlternates } from '@/lib/site'

const title = 'По-ясна оферта и подреден процес за запитвания'
const description = 'Оферта, сайт и проследяване на запитванията за работещи бизнеси. 250 € за две седмици работа. Продължаваме без допълнителна такса до постигане на договорените цели. Безплатен първи разговор с Георги Кърчев.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['системи за растеж', 'маркетинг и продажби', 'оптимизация на продажбения процес', 'growth consulting България', 'KARCHX Growth Systems'],
  alternates: localizedAlternates('/bg', '/en', 'bg'),
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    alternateLocale: ['en_US'],
    url: `${BASE_URL}/bg`,
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

export default function BulgarianHomePage() {
  return <MarketingHome />
}
