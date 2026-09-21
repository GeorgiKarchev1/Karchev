import { Suspense } from 'react'
import PageHeader from '@/components/os/PageHeader'
import RepurposeBoard from '@/components/os/RepurposeBoard'

export default function RepurposePage() {
  return (
    <>
      {/*
        The header stays outside <Suspense>. RepurposeBoard reads useSearchParams
        and so must be suspended, and anything inside the boundary is dropped
        from the prerendered HTML — which would take the page's only h1 with it.
      */}
      <PageHeader
        title="Repurposing workflow"
        description="Drop in one input — an idea, a paragraph, a transcript snippet. We expand it into LinkedIn, Instagram, X, email and a 30s video script."
      />
      <Suspense fallback={null}>
        <RepurposeBoard />
      </Suspense>
    </>
  )
}
