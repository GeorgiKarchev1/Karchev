import PageHeader from '@/components/os/PageHeader'
import HooksBoard from '@/components/os/HooksBoard'

export default function HooksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Module 4"
        title="Hook library"
        description="Reusable opening lines mapped to your business. Copy any hook, customize it, or send it to repurposing as a starting point."
      />
      <HooksBoard />
    </>
  )
}
