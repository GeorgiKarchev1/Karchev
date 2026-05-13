import ArticlePage from '@/components/seo/ArticlePage'
import { localizedArticles } from '@/lib/editorial-content'

export const metadata = localizedArticles.enSmallBusinessWebsiteNeeds.metadata

export default function EnglishSmallBusinessWebsiteNeedsArticle() {
  return <ArticlePage {...localizedArticles.enSmallBusinessWebsiteNeeds} />
}
