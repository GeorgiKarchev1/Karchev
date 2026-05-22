import PageHeader from '@/components/os/PageHeader'
import PlanBoard from '@/components/os/PlanBoard'

export default function PlanPage() {
  return (
    <>
      <PageHeader
        eyebrow="Module 6"
        title="Weekly plan"
        description="A real publishing rhythm — Monday to Friday locked, no guesswork. Edit any cell, swap an idea, or regenerate the whole week."
      />
      <PlanBoard />
    </>
  )
}
