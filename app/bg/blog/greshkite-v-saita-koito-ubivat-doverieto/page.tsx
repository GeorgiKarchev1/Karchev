import ArticlePage from '@/components/seo/ArticlePage'
import { localizedArticles } from '@/lib/editorial-content'

export const metadata = localizedArticles.bgWebsiteTrustMistakes.metadata

export default function BulgarianWebsiteTrustMistakesArticle() {
  return <ArticlePage {...localizedArticles.bgWebsiteTrustMistakes} />
}
