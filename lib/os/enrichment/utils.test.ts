import { describe, expect, it } from 'vitest'
import {
  buildContextFromEnrichment,
  normalizeBusinessUrl,
  sourceTypeFromUrl,
} from './utils'

describe('normalizeBusinessUrl', () => {
  it('adds https to bare domains', () => {
    expect(normalizeBusinessUrl('karchx.com')).toBe('https://karchx.com')
  })

  it('trims spaces and preserves explicit https urls', () => {
    expect(normalizeBusinessUrl('  https://www.instagram.com/karchx/  ')).toBe(
      'https://www.instagram.com/karchx/'
    )
  })

  it('rejects non-http protocols', () => {
    expect(() => normalizeBusinessUrl('javascript:alert(1)')).toThrow(
      'Only http and https URLs are supported'
    )
  })
})

describe('sourceTypeFromUrl', () => {
  it('detects instagram urls', () => {
    expect(sourceTypeFromUrl('https://instagram.com/karchx')).toBe('instagram')
  })

  it('detects facebook urls', () => {
    expect(sourceTypeFromUrl('https://www.facebook.com/karchx')).toBe('facebook')
  })

  it('defaults regular domains to website', () => {
    expect(sourceTypeFromUrl('https://openclawhardware.dev')).toBe('website')
  })
})

describe('buildContextFromEnrichment', () => {
  it('combines website, social profile, and posts into LLM-ready context', () => {
    const context = buildContextFromEnrichment({
      sourceType: 'instagram',
      url: 'https://instagram.com/test-business',
      websitePages: [
        {
          url: 'https://test.com/about',
          title: 'About Test',
          content: 'We build premium drone training for survey teams.',
        },
      ],
      socialProfile: {
        platform: 'instagram',
        name: 'Test Business',
        bio: 'Drone training for survey teams. Book a demo.',
        website: 'https://test.com',
        followers: 1200,
      },
      recentPosts: [
        {
          text: '3 mistakes survey teams make before their first drone deployment.',
          url: 'https://instagram.com/p/abc',
        },
      ],
    })

    expect(context).toContain('Source type: instagram')
    expect(context).toContain('Drone training for survey teams')
    expect(context).toContain('3 mistakes survey teams')
    expect(context).toContain('https://test.com/about')
  })
})
