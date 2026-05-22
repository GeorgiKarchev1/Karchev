import { z } from 'zod'
import { buildMockOSBootstrap } from '@/lib/os/mock'
import type { BusinessProfileInput, OSBootstrapResult } from '@/lib/os/types'

export const businessProfileSchema = z.object({
  businessName: z.string().min(2),
  businessType: z.string().min(2),
  whatYouSell: z.string().min(10),
  targetAudience: z.string().min(10),
  customerPains: z.string().min(10),
  faqs: z.string().min(10),
  tone: z.string().min(2),
  goals: z.array(z.enum(['leads', 'trust', 'awareness', 'education'])).min(1),
})

export async function generateOSBootstrap(input: BusinessProfileInput): Promise<OSBootstrapResult> {
  const parsed = businessProfileSchema.parse(input)
  return buildMockOSBootstrap(parsed)
}
