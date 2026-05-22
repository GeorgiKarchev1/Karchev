import PageHeader from '@/components/os/PageHeader'
import PillarsBoard from '@/components/os/PillarsBoard'

export default function PillarsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Module 2"
        title="Content pillars"
        description="The 3–5 lanes your content lives in. Everything downstream — ideas, hooks, weekly plan — flows from these."
      />
      <PillarsBoard />
    </>
  )
}
