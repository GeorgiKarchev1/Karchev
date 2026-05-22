import type { ReactNode } from 'react'

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 border-b-2 border-[#2d232e] bg-[#f1f0ea] px-6 py-6 md:flex-row md:items-end md:justify-between md:px-10">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#534b52]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#2d232e] md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-base leading-7 text-[#534b52]">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  )
}
