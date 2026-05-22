import OSShell from '@/components/os/OSShell'
import SectionCard from '@/components/os/SectionCard'

const stats = [
  { label: 'Pillars ready', value: '4', note: 'Core content lanes for the week' },
  { label: 'Weekly ideas', value: '12', note: 'Fast execution queue' },
  { label: 'Repurpose targets', value: '5', note: 'LinkedIn, IG, X, email, short video' },
]

const workflow = [
  '1. Finish onboarding and save business context',
  '2. Generate pillars + idea bank',
  '3. Add hooks and platform rewrites',
  '4. Attach transcript/video support',
  '5. Ship content from one clean weekly workflow',
]

export default function OSDashboardPage() {
  return (
    <OSShell
      title="OS dashboard"
      description="This is the control layer for KarchX Content OS. Right now we’re locking the structure, visual system, and generator flow before deeper backend automation."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card bg-[#534b52] p-5 text-[#f1f0ea]">
            <p className="text-sm font-semibold text-[#ddd7c8]">{stat.label}</p>
            <p className="mt-3 text-5xl font-bold">{stat.value}</p>
            <p className="mt-2 text-sm text-[#ddd7c8]">{stat.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Current build order" eyebrow="Execution">
          <ul className="space-y-3 text-sm leading-6">
            {workflow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Backend status" eyebrow="Supabase ready">
          <div className="space-y-4 text-sm leading-6">
            <p>
              Supabase is the right move here: auth, database, storage, and row-level security in one place. We’ll wire the live credentials next.
            </p>
            <p>
              Until then, the generator flow can still run in preview mode so UI and product flow keep moving without blocking on infra.
            </p>
          </div>
        </SectionCard>
      </div>
    </OSShell>
  )
}
