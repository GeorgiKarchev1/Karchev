import type { Metadata } from 'next'
import EnFunnelWizard from '@/components/funnel/EnFunnelWizard'

export const metadata: Metadata = {
  title: 'What Will Your Website Cost? — Free Estimate | Karchev',
  description: 'Answer 8 quick questions and get an honest website price estimate. No "it depends", no pressure, no sales pitch.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.karchx.com/estimate' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.karchx.com/estimate',
    title: 'What Will Your Website Cost? — Free Estimate | Karchev',
    description: 'Answer 8 quick questions and get an honest website price estimate. No "it depends", no pressure.',
    siteName: 'Karchev',
  },
}

export default function EstimatePage() {
  return <EnFunnelWizard />
}
