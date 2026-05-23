import { describe, expect, it } from 'vitest'
import { buildBusinessProfilePrompt, parseEnrichmentModelJson } from './extract'

describe('parseEnrichmentModelJson', () => {
  it('parses raw JSON into an enrichment result', () => {
    const result = parseEnrichmentModelJson(
      JSON.stringify({
        profile: {
          businessName: 'KarchX',
          businessType: 'Content OS',
          whatYouSell: 'AI content strategy system',
          targetAudience: 'Small business owners',
          customerPains: 'Inconsistent posting',
          faqs: 'How do I know what to post?',
          tone: 'Direct and practical',
          goals: ['leads', 'trust'],
        },
        confidence: {
          businessName: 0.9,
          offer: 0.8,
          audience: 0.7,
          pains: 0.6,
          tone: 0.8,
        },
        missingInfo: ['pricing'],
        suggestedQuestions: ['What is your best-selling offer?'],
        sources: [{ field: 'businessName', sourceType: 'website', url: 'https://karchx.com' }],
      })
    )

    expect(result.profile.businessName).toBe('KarchX')
    expect(result.profile.goals).toEqual(['leads', 'trust'])
    expect(result.confidence.offer).toBe(0.8)
  })

  it('extracts JSON when model wraps it in prose', () => {
    const result = parseEnrichmentModelJson('Here is the JSON:\n```json\n{"profile":{"businessName":"A","businessType":"B","whatYouSell":"C","targetAudience":"D","customerPains":"E","faqs":"F","tone":"G","goals":["awareness"]},"confidence":{"businessName":1,"offer":1,"audience":1,"pains":1,"tone":1},"missingInfo":[],"suggestedQuestions":[],"sources":[]}\n```')
    expect(result.profile.goals).toEqual(['awareness'])
  })
})

describe('buildBusinessProfilePrompt', () => {
  it('asks the model for strict JSON and includes provided context', () => {
    const prompt = buildBusinessProfilePrompt('Source type: website\nOffer: drone courses')
    expect(prompt).toContain('Return ONLY valid JSON')
    expect(prompt).toContain('drone courses')
    expect(prompt).toContain('confidence')
  })
})
