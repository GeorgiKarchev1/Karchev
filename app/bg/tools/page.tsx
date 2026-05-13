import ToolsResourcePage from '@/components/seo/ToolsResourcePage'
import { toolsPages } from '@/lib/tools-content'

export const metadata = toolsPages.bgTools.metadata

export default function BulgarianToolsPage() {
  return <ToolsResourcePage {...toolsPages.bgTools} />
}
