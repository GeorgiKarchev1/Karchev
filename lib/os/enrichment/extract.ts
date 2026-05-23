import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import type { EnrichmentResult } from './utils'

const goalSchema = z.enum(['leads', 'trust', 'awareness', 'education'])

export const enrichmentResultSchema = z.object({
  profile: z.object({
    businessName: z.string().default(''),
    businessType: z.string().default(''),
    whatYouSell: z.string().default(''),
    targetAudience: z.string().default(''),
    customerPains: z.string().default(''),
    faqs: z.string().default(''),
    tone: z.string().default('Direct, practical, trustworthy'),
    goals: z.array(goalSchema).min(1).default(['leads', 'trust']),
  }),
  confidence: z.object({
    businessName: z.number().min(0).max(1),
    offer: z.number().min(0).max(1),
    audience: z.number().min(0).max(1),
    pains: z.number().min(0).max(1),
    tone: z.number().min(0).max(1),
  }),
  missingInfo: z.array(z.string()).default([]),
  suggestedQuestions: z.array(z.string()).default([]),
  sources: z
    .array(
      z.object({
        field: z.string(),
        sourceType: z.enum(['website', 'instagram', 'facebook', 'manual']),
        url: z.string(),
        quote: z.string().optional(),
      })
    )
    .default([]),
})

export function buildBusinessProfilePrompt(rawContext: string) {
  return `You are KarchX Content OS. Extract a business profile from imported website/social context.

Return ONLY valid JSON. No markdown, no backticks, no prose.

JSON shape:
{
  "profile": {
    "businessName": "",
    "businessType": "",
    "whatYouSell": "",
    "targetAudience": "",
    "customerPains": "",
    "faqs": "",
    "tone": "",
    "goals": ["leads" | "trust" | "awareness" | "education"]
  },
  "confidence": {
    "businessName": 0-1,
    "offer": 0-1,
    "audience": 0-1,
    "pains": 0-1,
    "tone": 0-1
  },
  "missingInfo": ["short missing-info labels"],
  "suggestedQuestions": ["questions to ask user before generating content OS"],
  "sources": [{ "field": "profile field", "sourceType": "website|instagram|facebook|manual", "url": "source URL", "quote": "short evidence quote" }]
}

Rules:
- Be useful, not vague. If the offer is implied, infer it but lower confidence.
- Do not invent specific prices, locations, results, or guarantees.
- Convert scattered social bio/post text into a clear business profile.
- Keep profile fields concise but specific enough to generate content pillars.
- Goals should reflect the business context; default to ["leads", "trust"] if unclear.
- Suggested questions should fill real gaps, not ask what is already obvious.

Imported context:
${rawContext}`
}

export function parseEnrichmentModelJson(raw: string): EnrichmentResult {
  const cleaned = raw.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '')
  const parsed = safeJsonParse(cleaned) ?? safeJsonParse(cleaned.match(/\{[\s\S]*\}/)?.[0] || '')

  if (!parsed) {
    throw new Error('Failed to parse enrichment AI response')
  }

  const result = enrichmentResultSchema.parse(parsed)
  return {
    ...result,
    rawContext: '',
  }
}

export async function extractBusinessProfileFromContext({
  rawContext,
  apiKey,
  model = process.env.OS_ENRICHMENT_MODEL || 'claude-haiku-4-5-20251001',
}: {
  rawContext: string
  apiKey: string
  model?: string
}): Promise<EnrichmentResult> {
  const client = new Anthropic({ apiKey })
  const message = await client.messages.create({
    model,
    max_tokens: 4096,
    temperature: 0.2,
    messages: [{ role: 'user', content: buildBusinessProfilePrompt(rawContext) }],
  })

  const block = message.content.find((part) => part.type === 'text')
  const text = block && 'text' in block ? block.text : ''
  const result = parseEnrichmentModelJson(text)
  return { ...result, rawContext }
}

function safeJsonParse(value: string) {
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}
