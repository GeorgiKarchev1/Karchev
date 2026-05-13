import CaseStudyPage from '@/components/seo/CaseStudyPage'
import { caseStudies } from '@/lib/editorial-content'

export const metadata = caseStudies.enEditing.metadata

export default function EnglishEditingCaseStudy() {
  return <CaseStudyPage {...caseStudies.enEditing} />
}
