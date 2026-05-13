import ArticlePage from '@/components/seo/ArticlePage'
import { localizedArticles } from '@/lib/editorial-content'

export const metadata = localizedArticles.enAiAutomationTimeSavings.metadata

export default function EnglishAiAutomationTimeSavingsArticle() {
  return <ArticlePage {...localizedArticles.enAiAutomationTimeSavings} />
}
