import PageHeader from '@/components/os/PageHeader'
import OverviewBoard from '@/components/os/OverviewBoard'

export default function OSHomePage() {
  return (
    <>
      <PageHeader
        eyebrow="KarchX Content OS"
        title="Know what to post. Create it faster. Stay consistent."
        description="Business-aware content workflow for founders, service businesses, and lean teams that need clarity, speed, and consistency without a content team."
      />
      <OverviewBoard />
    </>
  )
}
