import { NextResponse } from 'next/server'
import { z } from 'zod'
import {
  buildContextFromEnrichment,
  normalizeBusinessUrl,
  sourceTypeFromUrl,
  type EnrichmentSourceType,
  type RawEnrichmentInput,
} from '@/lib/os/enrichment/utils'
import {
  fetchFacebookEnrichment,
  fetchInstagramEnrichment,
  fetchWebsiteEnrichment,
} from '@/lib/os/enrichment/providers'
import { extractBusinessProfileFromContext } from '@/lib/os/enrichment/extract'

const enrichSchema = z.object({
  sourceType: z.enum(['website', 'instagram', 'facebook']).optional(),
  url: z.string().min(3),
  analyzeRecentPosts: z.boolean().optional().default(true),
  manualText: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const input = enrichSchema.parse(body)
    const url = normalizeBusinessUrl(input.url)
    const sourceType = (input.sourceType || sourceTypeFromUrl(url)) as Exclude<
      EnrichmentSourceType,
      'manual'
    >

    const raw: RawEnrichmentInput = {
      sourceType,
      url,
      manualText: input.manualText,
    }

    if (sourceType === 'website') {
      const apiKey = process.env.FIRECRAWL_API_KEY
      if (!apiKey) {
        throw new Error('FIRECRAWL_API_KEY is not configured')
      }
      Object.assign(raw, await fetchWebsiteEnrichment({ url, apiKey }))
    }

    if (sourceType === 'instagram') {
      const token = process.env.APIFY_TOKEN
      if (!token) {
        throw new Error('APIFY_TOKEN is not configured')
      }
      Object.assign(
        raw,
        await fetchInstagramEnrichment({
          url,
          token,
          analyzeRecentPosts: input.analyzeRecentPosts,
        })
      )
    }

    if (sourceType === 'facebook') {
      const token = process.env.APIFY_TOKEN
      if (!token) {
        throw new Error('APIFY_TOKEN is not configured')
      }
      Object.assign(
        raw,
        await fetchFacebookEnrichment({
          url,
          token,
          analyzeRecentPosts: input.analyzeRecentPosts,
        })
      )
    }

    const rawContext = buildContextFromEnrichment(raw)
    const anthropicKey = process.env.ANTHROPIC_API_KEY
    if (!anthropicKey) {
      throw new Error('ANTHROPIC_API_KEY is not configured')
    }

    const result = await extractBusinessProfileFromContext({
      rawContext,
      apiKey: anthropicKey,
    })

    return NextResponse.json({
      ...result,
      sourceType,
      url,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to enrich business profile' },
      { status: 400 }
    )
  }
}
