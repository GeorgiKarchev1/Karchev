import CaseStudyPage from '@/components/seo/CaseStudyPage'
import { caseStudies } from '@/lib/editorial-content'

export const metadata = caseStudies.enYordan.metadata

export default function EnglishYordanCaseStudy() {
  return <CaseStudyPage {...caseStudies.enYordan} />
}
