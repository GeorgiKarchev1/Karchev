import type { Metadata } from 'next'
import BgFunnelWizard from '@/components/funnel/BgFunnelWizard'

export const metadata: Metadata = {
  title: 'Колко ще струва сайтът ти? — Безплатен калкулатор | Karchev',
  description: 'Отговори на 8 кратки въпроса и получи честен ориентировъчен диапазон за цената на твоя сайт. Без "зависи", без скрити такси.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.karchx.com/funnel' },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    url: 'https://www.karchx.com/funnel',
    title: 'Колко ще струва сайтът ти? — Безплатен калкулатор',
    description: 'Отговори на 8 кратки въпроса и получи честен ориентировъчен диапазон. Без "зависи".',
    siteName: 'Karchev',
  },
}

export default function FunnelPage() {
  return <BgFunnelWizard />
}
