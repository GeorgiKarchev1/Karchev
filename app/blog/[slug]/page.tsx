import { redirect } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export default function LegacyDynamicBlogPost({ params }: Props) {
  redirect(`/bg/blog/${params.slug}`)
}
