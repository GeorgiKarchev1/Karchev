export default function SectionCard({
  title,
  eyebrow,
  children,
}: {
  title: string
  eyebrow?: string
  children: React.ReactNode
}) {
  return (
    <section className="glass-card bg-[#f1f0ea] p-5 md:p-6">
      {eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#534b52]">{eyebrow}</p> : null}
      <h2 className="text-2xl font-bold tracking-tight text-[#2d232e]">{title}</h2>
      <div className="mt-4 text-[#534b52]">{children}</div>
    </section>
  )
}
