import { Suspense } from 'react'
import PageHeader from '@/components/os/PageHeader'
import RepurposeBoard from '@/components/os/RepurposeBoard'

export default function RepurposePage() {
  return (
    <>
      <PageHeader
        eyebrow="Module 5"
        title="Repurposing workflow"
        description="Drop in one input — an idea, a paragraph, a transcript snippet. We expand it into LinkedIn, Instagram, X, email and a 30s video script."
      />
      <Suspense fallback={null}>
        <RepurposeBoard />
      </Suspense>
    </>
  )
}
