import OSShell from '@/components/os/OSShell'
import SectionCard from '@/components/os/SectionCard'

export default function OSSettingsPage() {
  return (
    <OSShell
      title="Settings"
      description="This will hold brand voice defaults, workspace settings, integrations, and transcript/video defaults."
    >
      <SectionCard title="Next up" eyebrow="Roadmap">
        <ul className="space-y-3 text-sm leading-6">
          <li>• connect Supabase auth</li>
          <li>• save onboarding to database</li>
          <li>• add brand voice memory</li>
          <li>• add transcript upload flow</li>
        </ul>
      </SectionCard>
    </OSShell>
  )
}
