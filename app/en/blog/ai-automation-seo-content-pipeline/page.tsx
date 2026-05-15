import ArticlePage from '@/components/seo/ArticlePage'
import { localizedArticles } from '@/lib/editorial-content'

export const metadata = localizedArticles.enAiContentPipeline.metadata

export default function EnglishAiContentPipelineArticle() {
  return <ArticlePage {...localizedArticles.enAiContentPipeline} />
}
