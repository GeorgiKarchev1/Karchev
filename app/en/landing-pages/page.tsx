import ServiceLandingPage from '@/components/seo/ServiceLandingPage'
import { servicePages } from '@/lib/seo-content'

export const metadata = servicePages.enLandingPages.metadata

export default function EnglishLandingPagesPage() {
  return <ServiceLandingPage {...servicePages.enLandingPages} />
}
