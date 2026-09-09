import type { Metadata } from 'next'
import MarketingHome from '@/components/site/MarketingHome'
import { localizedAlternates } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Вашият персонализиран AI агент',
  description: 'Един AI агент, създаден специално за Вас. Вашите задачи, инструменти и правила, с индивидуален подход от първия разговор до настройката.',
  keywords: ['AI интеграция за бизнес', 'AI автоматизация', 'внедряване на AI', 'AI агенти за бизнес', 'автоматизация на процеси'],
  alternates: localizedAlternates('/bg', '/en', 'bg'),
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    alternateLocale: ['en_US'],
    url: 'https://www.karchx.com/bg',
    title: 'KARCHX | Вашият персонализиран AI агент',
    description: 'Един AI агент, създаден специално за Вас. Вашите задачи, инструменти и правила, с индивидуален подход от първия разговор до настройката.',
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

export default function BulgarianHomePage() {
  return <MarketingHome />
}
