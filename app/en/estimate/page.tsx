import type { Metadata } from 'next'
import EnFunnelWizard from '@/components/funnel/EnFunnelWizard'
import { localizedAlternates } from '@/lib/site'

export const metadata: Metadata = {
  title: 'What Will Your Website Cost? — Free Estimate',
  description: 'Answer 8 quick questions and get an honest website price estimate for a business site, landing page, or online store.',
  robots: { index: true, follow: true },
  alternates: localizedAlternates('/bg/estimate', '/en/estimate', 'en'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['bg_BG'],
    url: 'https://www.karchx.com/en/estimate',
    title: 'What Will Your Website Cost? — Free Estimate | Karchev',
    description: 'Answer 8 quick questions and get an honest website price estimate.',
    siteName: 'Karchev',
  },
}

export default function EnglishEstimatePage() {
  return <EnFunnelWizard />
}
