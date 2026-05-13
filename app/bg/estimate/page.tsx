import type { Metadata } from 'next'
import BgFunnelWizard from '@/components/funnel/BgFunnelWizard'
import { localizedAlternates } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Колко ще струва сайтът ти? — Безплатна оценка',
  description: 'Отговори на 8 кратки въпроса и получи честна ориентировъчна цена за сайт, landing page или онлайн магазин.',
  robots: { index: true, follow: true },
  alternates: localizedAlternates('/bg/estimate', '/en/estimate', 'bg'),
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    alternateLocale: ['en_US'],
    url: 'https://www.karchx.com/bg/estimate',
    title: 'Колко ще струва сайтът ти? — Безплатна оценка | Karchev',
    description: 'Честна ориентировъчна цена за сайт, landing page или онлайн магазин след 8 кратки въпроса.',
    siteName: 'Karchev',
  },
}

export default function BulgarianEstimatePage() {
  return <BgFunnelWizard />
}
