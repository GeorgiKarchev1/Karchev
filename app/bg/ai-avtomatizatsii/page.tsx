import ServiceLandingPage from '@/components/seo/ServiceLandingPage'
import { servicePages } from '@/lib/seo-content'

export const metadata = servicePages.bgAiAutomation.metadata

export default function BulgarianAiAutomationPage() {
  return <ServiceLandingPage {...servicePages.bgAiAutomation} />
}
