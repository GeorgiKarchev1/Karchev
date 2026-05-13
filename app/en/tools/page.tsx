import ToolsResourcePage from '@/components/seo/ToolsResourcePage'
import { toolsPages } from '@/lib/tools-content'

export const metadata = toolsPages.enTools.metadata

export default function EnglishToolsPage() {
  return <ToolsResourcePage {...toolsPages.enTools} />
}
