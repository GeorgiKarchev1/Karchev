import ArticlePage from '@/components/seo/ArticlePage'
import { localizedArticles } from '@/lib/editorial-content'

export const metadata = localizedArticles.enLandingPageInsteadOfWebsite.metadata

export default function EnglishLandingPageInsteadOfWebsiteArticle() {
  return <ArticlePage {...localizedArticles.enLandingPageInsteadOfWebsite} />
}
