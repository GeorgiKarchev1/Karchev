import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getAllPosts } from '@/lib/posts'
import { absoluteUrl } from '@/lib/site'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const posts = await getAllPosts()
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return {}

  return {
    title: post.titleBG,
    description: post.excerptBG,
    alternates: {
      canonical: absoluteUrl(`/bg/blog/${post.slug}`),
    },
    openGraph: {
      type: 'article',
      locale: 'bg_BG',
      url: absoluteUrl(`/bg/blog/${post.slug}`),
      title: post.titleBG,
      description: post.excerptBG,
      images: [{ url: post.image }],
    },
  }
}

export default async function DynamicBulgarianBlogPost({ params }: Props) {
  const posts = await getAllPosts()
  const post = posts.find((p) => p.slug === params.slug)

  if (!post || !post.content) {
    notFound()
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.titleBG,
    description: post.excerptBG,
    image: absoluteUrl(post.image),
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    author: {
      '@type': 'Person',
      name: 'Georgi Karchev',
      url: absoluteUrl('/'),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Karchev',
      url: absoluteUrl('/'),
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/img/newfav.png'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/bg/blog/${post.slug}`),
    },
    inLanguage: 'bg',
  }

  return (
    <main className="min-h-screen bg-[#f1f0ea] text-[#2d232e] selection:bg-[#534b52]/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />

      <article className="pt-40 pb-24 px-6 md:px-8 max-w-3xl mx-auto">
        <a
          href="/bg/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#2d232e]/50 hover:text-[#2d232e] transition-colors mb-10"
        >
          Назад към блога
        </a>

        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-[#534b52] border border-[#534b52]/30 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-[#2d232e] leading-tight mb-4">
          {post.titleBG}
        </h1>
        <p className="text-lg text-[#2d232e]/60 leading-relaxed mb-6">{post.excerptBG}</p>

        <div className="flex items-center gap-3 text-sm text-[#2d232e]/40 font-medium mb-12 pb-8 border-b-2 border-[#2d232e]/10">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime} четене</span>
        </div>

        <div
          className="prose prose-lg max-w-none text-[#2d232e]/80 leading-relaxed
            prose-headings:font-black prose-headings:text-[#2d232e]
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:mb-5 prose-p:leading-relaxed
            prose-li:mb-1 prose-ul:mb-5 prose-ul:pl-6
            prose-strong:text-[#2d232e] prose-strong:font-bold"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <Footer />
    </main>
  )
}
