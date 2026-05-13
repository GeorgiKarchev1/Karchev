import ServiceLandingPage from '@/components/seo/ServiceLandingPage'
import { servicePages } from '@/lib/seo-content'

export const metadata = servicePages.bgWebsiteDevelopment.metadata

export default function BulgarianWebsiteDevelopmentPage() {
  return <ServiceLandingPage {...servicePages.bgWebsiteDevelopment} />
}
