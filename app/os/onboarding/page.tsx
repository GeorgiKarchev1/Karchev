import PageHeader from '@/components/os/PageHeader'
import OnboardingForm from '@/components/os/OnboardingForm'

export default function OSOnboardingPage() {
  return (
    <>
      <PageHeader
        title="Build your content OS foundation"
        description="Tell KarchX what you sell, who you serve, what people struggle with, and what outcomes matter. We turn that into pillars, ideas, hooks, and a weekly plan."
      />
      <OnboardingForm />
    </>
  )
}
