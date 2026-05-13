import CaseStudyPage from '@/components/seo/CaseStudyPage'
import { caseStudies } from '@/lib/editorial-content'

export const metadata = caseStudies.bgYordan.metadata

export default function BulgarianYordanCaseStudy() {
  return <CaseStudyPage {...caseStudies.bgYordan} />
}
