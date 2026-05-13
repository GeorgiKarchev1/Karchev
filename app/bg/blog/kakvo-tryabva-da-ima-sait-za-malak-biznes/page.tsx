import ArticlePage from '@/components/seo/ArticlePage'
import { localizedArticles } from '@/lib/editorial-content'

export const metadata = localizedArticles.bgSmallBusinessWebsiteNeeds.metadata

export default function BulgarianSmallBusinessWebsiteNeedsArticle() {
  return <ArticlePage {...localizedArticles.bgSmallBusinessWebsiteNeeds} />
}
