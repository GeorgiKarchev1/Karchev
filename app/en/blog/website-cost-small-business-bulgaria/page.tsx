import ArticlePage from '@/components/seo/ArticlePage'
import { localizedArticles } from '@/lib/editorial-content'

export const metadata = localizedArticles.enWebsiteCost.metadata

export default function EnglishWebsiteCostArticle() {
  return <ArticlePage {...localizedArticles.enWebsiteCost} />
}
