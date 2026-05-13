import CaseStudyPage from '@/components/seo/CaseStudyPage'
import { caseStudies } from '@/lib/editorial-content'

export const metadata = caseStudies.bgEditing.metadata

export default function BulgarianEditingCaseStudy() {
  return <CaseStudyPage {...caseStudies.bgEditing} />
}
