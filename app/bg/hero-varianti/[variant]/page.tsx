import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

export const metadata: Metadata = { title: 'KARCHX', robots: { index: false, follow: false }, alternates: { canonical: null } }
export const dynamicParams = false
export function generateStaticParams() { return ['1', '2', '3', '4', '5'].map(variant => ({ variant })) }

// Superseded concepts keep their URLs useful, without presenting rejected work.
export default function HeroVariantPage({ params }: { params: { variant: string } }) {
  if (!['1', '2', '3', '4', '5'].includes(params.variant)) notFound()
  redirect('/bg')
}
