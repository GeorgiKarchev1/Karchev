import ServiceLandingPage from '@/components/seo/ServiceLandingPage'
import { servicePages } from '@/lib/seo-content'

export const metadata = servicePages.bgLandingPages.metadata

export default function BulgarianLandingPagesPage() {
  return <ServiceLandingPage {...servicePages.bgLandingPages} />
}
