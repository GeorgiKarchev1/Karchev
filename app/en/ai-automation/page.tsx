import ServiceLandingPage from '@/components/seo/ServiceLandingPage'
import { servicePages } from '@/lib/seo-content'

export const metadata = servicePages.enAiAutomation.metadata

export default function EnglishAiAutomationPage() {
  return <ServiceLandingPage {...servicePages.enAiAutomation} />
}
