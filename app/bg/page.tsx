import type { Metadata } from 'next'
import MarketingHome from '@/components/site/MarketingHome'
import { localizedAlternates } from '@/lib/site'

export const metadata: Metadata = {
  title: 'AI интеграция и автоматизация за бизнес | Karchev',
  description: 'Karchev вгражда AI в системите, които вече ползвате — автоматизира рутината и свързва инструментите ви. AI интеграция за бизнеси в България и ЕС, live за седмици.',
  keywords: ['AI интеграция за бизнес', 'AI автоматизация', 'внедряване на AI', 'AI агенти за бизнес', 'автоматизация на процеси'],
  alternates: localizedAlternates('/bg', '/en', 'bg'),
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    alternateLocale: ['en_US'],
    url: 'https://www.karchx.com/bg',
    title: 'Karchev | AI интеграция и автоматизация за бизнес',
    description: 'Вграждаме AI в системите, които вече ползвате — автоматизираме рутината и свързваме инструментите ви. Live за седмици, не месеци.',
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
