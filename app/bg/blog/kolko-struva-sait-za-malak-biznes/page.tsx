import ArticlePage from '@/components/seo/ArticlePage'
import { localizedArticles } from '@/lib/editorial-content'

export const metadata = localizedArticles.bgWebsiteCost.metadata

export default function BulgarianWebsiteCostArticle() {
  return <ArticlePage {...localizedArticles.bgWebsiteCost} />
}
