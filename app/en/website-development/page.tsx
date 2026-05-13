import ServiceLandingPage from '@/components/seo/ServiceLandingPage'
import { servicePages } from '@/lib/seo-content'

export const metadata = servicePages.enWebsiteDevelopment.metadata

export default function EnglishWebsiteDevelopmentPage() {
  return <ServiceLandingPage {...servicePages.enWebsiteDevelopment} />
}
