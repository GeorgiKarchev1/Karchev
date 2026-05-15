import ArticlePage from '@/components/seo/ArticlePage'
import { localizedArticles } from '@/lib/editorial-content'

export const metadata = localizedArticles.bgAiContentPipeline.metadata

export default function BulgarianAiContentPipelineArticle() {
  return <ArticlePage {...localizedArticles.bgAiContentPipeline} />
}
