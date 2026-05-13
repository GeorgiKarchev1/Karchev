import ArticlePage from '@/components/seo/ArticlePage'
import { localizedArticles } from '@/lib/editorial-content'

export const metadata = localizedArticles.bgAiAutomationTimeSavings.metadata

export default function BulgarianAiAutomationTimeSavingsArticle() {
  return <ArticlePage {...localizedArticles.bgAiAutomationTimeSavings} />
}
