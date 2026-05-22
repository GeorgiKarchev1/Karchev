import Link from 'next/link'
import OSShell from '@/components/os/OSShell'
import SectionCard from '@/components/os/SectionCard'

const featureCards = [
  {
    title: 'Business-aware onboarding',
    body: 'Start with your offer, audience, pains, FAQs, and goals so the output actually sounds like your business.',
  },
  {
    title: 'Weekly content engine',
    body: 'Turn business context into pillars, ideas, hooks, rewrites, and a weekly publishing plan.',
  },
  {
    title: 'Repurposing workflow',
    body: 'One source input becomes platform-ready content instead of a dead note sitting in Notion.',
  },
]

export default function OSHomePage() {
  return (
    <OSShell
      title="Know what to post. Create it faster. Stay consistent."
      description="KarchX Content OS is the business-aware content workflow for founders, service businesses, and lean teams that need clarity, speed, and consistency without a content team."
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="What we’re building now" eyebrow="Beta focus">
          <div className="space-y-4 text-base leading-7">
            <p>
              Everything lives under <span className="font-semibold text-[#2d232e]">/os</span> and matches the existing KarchX design language — same colors, same typography, same premium gritty edge.
            </p>
            <ul className="grid gap-3 md:grid-cols-2">
              <li>• onboarding</li>
              <li>• pillars</li>
              <li>• weekly ideas</li>
              <li>• hooks</li>
              <li>• repurposing</li>
              <li>• weekly plan</li>
              <li>• brand voice</li>
              <li>• transcript/subtitles later</li>
            </ul>
          </div>
        </SectionCard>

        <div className="glass-card relative overflow-hidden bg-[#534b52] p-6 text-[#f1f0ea]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(241,240,234,0.16),transparent_38%)]" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ddd7c8]">Start here</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Generate your first content operating system layer.</h2>
            <p className="mt-4 text-sm leading-6 text-[#ddd7c8]">
              We’ll use your business context to build pillars, ideas, hooks, and a weekly posting structure.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/os/onboarding" className="rounded-full border-2 border-[#2d232e] bg-[#f1f0ea] px-6 py-3 font-bold text-[#2d232e] shadow-[4px_4px_0px_#2d232e] transition hover:bg-[#e0ddcf]">
                Open onboarding
              </Link>
              <Link href="/os/dashboard" className="rounded-full border-2 border-[#f1f0ea] px-6 py-3 font-bold text-[#f1f0ea] transition hover:bg-[#f1f0ea] hover:text-[#2d232e]">
                View dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {featureCards.map((card) => (
          <SectionCard key={card.title} title={card.title}>
            <p className="text-sm leading-6">{card.body}</p>
          </SectionCard>
        ))}
      </div>
    </OSShell>
  )
}
