import PageHeader from '@/components/os/PageHeader'
import IdeasBoard from '@/components/os/IdeasBoard'

export default function IdeasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Module 3"
        title="Weekly ideas"
        description="Ready-to-post ideas pulled from your pillars. Filter, edit, or send any one of them to repurposing."
      />
      <IdeasBoard />
    </>
  )
}
