import Anthropic from '@anthropic-ai/sdk'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { z } from 'zod'
import type { EnrichmentResult } from './utils'

const execFileAsync = promisify(execFile)

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
  const cleaned = extractJsonFromOpenClawOutput(
    raw.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '')
  )
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

export type OSAIProvider = 'anthropic' | 'openclaw'

export async function extractBusinessProfileFromContext({
  rawContext,
  apiKey,
  provider = (process.env.OS_AI_PROVIDER as OSAIProvider | undefined) || 'anthropic',
  model = process.env.OS_ENRICHMENT_MODEL ||
    (provider === 'openclaw' ? 'openai-codex/gpt-5.5' : 'claude-haiku-4-5-20251001'),
}: {
  rawContext: string
  apiKey?: string
  provider?: OSAIProvider
  model?: string
}): Promise<EnrichmentResult> {
  const prompt = buildBusinessProfilePrompt(rawContext)
  const text =
    provider === 'openclaw'
      ? await runOpenClawModel(prompt, model)
      : await runAnthropicModel({ prompt, model, apiKey })

  const result = parseEnrichmentModelJson(text)
  return { ...result, rawContext }
}

export function extractJsonFromOpenClawOutput(raw: string) {
  const trimmed = raw.trim()
  const firstBrace = trimmed.indexOf('{')
  const lastBrace = trimmed.lastIndexOf('}')
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return trimmed
  }
  return trimmed.slice(firstBrace, lastBrace + 1)
}

async function runAnthropicModel({
  prompt,
  model,
  apiKey,
}: {
  prompt: string
  model: string
  apiKey?: string
}) {
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not configured')

  const client = new Anthropic({ apiKey })
  const message = await client.messages.create({
    model,
    max_tokens: 4096,
    temperature: 0.2,
    messages: [{ role: 'user', content: prompt }],
  })

  const block = message.content.find((part) => part.type === 'text')
  return block && 'text' in block ? block.text : ''
}

async function runOpenClawModel(prompt: string, model: string) {
  try {
    const { stdout, stderr } = await execFileAsync(
      'openclaw',
      ['infer', 'model', 'run', '--prompt', prompt, '--model', model],
      {
        timeout: 120_000,
        maxBuffer: 1024 * 1024 * 5,
      }
    )
    return [stdout, stderr].filter(Boolean).join('\n')
  } catch (error) {
    const maybe = error as { stdout?: string; stderr?: string; message?: string }
    const output = [maybe.stdout, maybe.stderr].filter(Boolean).join('\n').trim()
    if (output) return output
    throw new Error('OpenClaw dev model call failed')
  }
}

function safeJsonParse(value: string) {
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}
