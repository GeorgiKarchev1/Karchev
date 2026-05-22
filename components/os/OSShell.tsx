import Link from 'next/link'
import { ArrowRight, LayoutDashboard, PenSquare, Settings, Sparkles } from 'lucide-react'

const navItems = [
  { href: '/os', label: 'Overview', icon: Sparkles },
  { href: '/os/onboarding', label: 'Onboarding', icon: PenSquare },
  { href: '/os/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/os/settings', label: 'Settings', icon: Settings },
]

export default function OSShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f1f0ea] text-[#2d232e]">
      <div className="container-wide py-6 md:py-8">
        <div className="glass-card overflow-hidden bg-[#e8e3d3]">
          <div className="border-b-2 border-[#2d232e] bg-[#f1f0ea]/80 px-5 py-4 md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <Link href="/bg" className="inline-flex items-center gap-2 text-sm font-semibold text-[#534b52] hover:text-[#2d232e]">
                  ← Back to KarchX
                </Link>
                <div className="mt-3 flex items-center gap-3">
                  <div className="rounded-2xl border-2 border-[#2d232e] bg-[#534b52] px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#f1f0ea] shadow-[3px_3px_0px_#2d232e]">
                    KarchX Content OS
                  </div>
                  <div className="hidden h-4 w-px bg-[#2d232e]/40 md:block" />
                  <p className="hidden text-sm text-[#534b52] md:block">AI content system for businesses without a content team</p>
                </div>
              </div>
              <Link href="/os/onboarding" className="btn-primary text-base md:text-sm">
                Build this week’s content
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[250px_1fr]">
            <aside className="border-b-2 border-[#2d232e] bg-[#ddd7c8] p-5 lg:border-b-0 lg:border-r-2">
              <nav className="space-y-2">
                {navItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 rounded-2xl border-2 border-transparent px-4 py-3 text-sm font-semibold text-[#2d232e] transition hover:border-[#2d232e] hover:bg-[#f1f0ea]"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                ))}
              </nav>
            </aside>

            <main className="bg-[#f7f4ea] p-5 md:p-8">
              <div className="mb-8 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>
                <p className="mt-3 text-base leading-7 text-[#534b52] md:text-lg">{description}</p>
              </div>
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
