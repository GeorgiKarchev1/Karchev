import { NextResponse } from 'next/server'
import { z } from 'zod'
import { buildRepurposeVariants } from '@/lib/os/mock'
import type { BusinessProfileInput } from '@/lib/os/types'

const goalSchema = z.enum(['leads', 'trust', 'awareness', 'education'])

const profileSchema = z
  .object({
    businessName: z.string().optional().default(''),
    businessType: z.string().optional().default(''),
    whatYouSell: z.string().optional().default(''),
    targetAudience: z.string().optional().default(''),
    customerPains: z.string().optional().default(''),
    faqs: z.string().optional().default(''),
    tone: z.string().optional().default(''),
    goals: z.array(goalSchema).optional().default([]),
  })
  .nullable()
  .optional()

const repurposeSchema = z.object({
  source: z.string().min(3),
  profile: profileSchema,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { source, profile } = repurposeSchema.parse(body)
    const variants = buildRepurposeVariants(
      source,
      (profile as BusinessProfileInput) ?? null
    )
    return NextResponse.json({ variants })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Invalid request',
      },
      { status: 400 }
    )
  }
}
