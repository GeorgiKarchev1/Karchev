import ServiceLandingPage from '@/components/seo/ServiceLandingPage'
import { servicePages } from '@/lib/seo-content'

export const metadata = servicePages.enAiIntegration.metadata

export default function EnglishAiIntegrationPage() {
  return <ServiceLandingPage {...servicePages.enAiIntegration} />
}
