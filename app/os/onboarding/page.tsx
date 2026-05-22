import OSShell from '@/components/os/OSShell'
import OnboardingForm from '@/components/os/OnboardingForm'

export default function OSOnboardingPage() {
  return (
    <OSShell
      title="Build your content operating system foundation"
      description="Tell KarchX what you sell, who you serve, what people struggle with, and what outcomes matter. We’ll turn that into a usable content system."
    >
      <OnboardingForm />
    </OSShell>
  )
}
