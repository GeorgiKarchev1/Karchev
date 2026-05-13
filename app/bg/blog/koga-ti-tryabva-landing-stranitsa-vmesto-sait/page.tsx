import ArticlePage from '@/components/seo/ArticlePage'
import { localizedArticles } from '@/lib/editorial-content'

export const metadata = localizedArticles.bgLandingPageInsteadOfWebsite.metadata

export default function BulgarianLandingPageInsteadOfWebsiteArticle() {
  return <ArticlePage {...localizedArticles.bgLandingPageInsteadOfWebsite} />
}
