import ArticlePage from '@/components/seo/ArticlePage'
import { localizedArticles } from '@/lib/editorial-content'

export const metadata = localizedArticles.enWebsiteTrustMistakes.metadata

export default function EnglishWebsiteTrustMistakesArticle() {
  return <ArticlePage {...localizedArticles.enWebsiteTrustMistakes} />
}
