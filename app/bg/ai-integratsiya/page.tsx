import ServiceLandingPage from '@/components/seo/ServiceLandingPage'
import { servicePages } from '@/lib/seo-content'

export const metadata = servicePages.bgAiIntegration.metadata

export default function BulgarianAiIntegrationPage() {
  return <ServiceLandingPage {...servicePages.bgAiIntegration} />
}
