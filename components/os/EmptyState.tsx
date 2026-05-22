import Link from 'next/link'
import { ArrowRight, Lock } from 'lucide-react'

export default function EmptyState({
  title,
  description,
  ctaLabel = 'Open onboarding',
  ctaHref = '/os/onboarding',
}: {
  title: string
  description: string
  ctaLabel?: string
  ctaHref?: string
}) {
  return (
    <div className="px-6 py-10 md:px-10">
      <div className="glass-card flex flex-col items-start gap-4 bg-[#f1f0ea] p-8">
        <div className="rounded-2xl border-2 border-[#2d232e] bg-[#ddd7c8] p-3 shadow-[3px_3px_0px_#2d232e]">
          <Lock className="h-5 w-5 text-[#2d232e]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#2d232e]">{title}</h2>
          <p className="mt-2 max-w-xl text-base leading-7 text-[#534b52]">{description}</p>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 rounded-full border-2 border-[#2d232e] bg-[#534b52] px-6 py-3 font-bold text-[#f1f0ea] shadow-[4px_4px_0px_#2d232e] transition hover:bg-[#2d232e]"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
