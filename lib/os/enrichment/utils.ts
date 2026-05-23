import type { ContentGoal } from '@/lib/os/types'

export type EnrichmentSourceType = 'website' | 'instagram' | 'facebook' | 'manual'

export interface WebsitePageContent {
  url: string
  title?: string
  content: string
}

export interface SocialProfileContent {
  platform: 'instagram' | 'facebook'
  name?: string
  username?: string
  bio?: string
  about?: string
  category?: string
  website?: string
  links?: string[]
  followers?: number
  likes?: number
  phone?: string
  address?: string
}

export interface SocialPostContent {
  text: string
  url?: string
  timestamp?: string
  likes?: number
  comments?: number
}

export interface RawEnrichmentInput {
  sourceType: EnrichmentSourceType
  url: string
  websitePages?: WebsitePageContent[]
  socialProfile?: SocialProfileContent
  linkedProfiles?: SocialProfileContent[]
  recentPosts?: SocialPostContent[]
  manualText?: string
}

export interface BusinessProfileConfidence {
  businessName: number
  offer: number
  audience: number
  pains: number
  tone: number
}

export interface BusinessProfileSource {
  field: string
  sourceType: EnrichmentSourceType
  url: string
  quote?: string
}

export interface EnrichedBusinessProfile {
  businessName: string
  businessType: string
  whatYouSell: string
  targetAudience: string
  customerPains: string
  faqs: string
  tone: string
  goals: ContentGoal[]
}

export interface EnrichmentResult {
  profile: EnrichedBusinessProfile
  confidence: BusinessProfileConfidence
  missingInfo: string[]
  suggestedQuestions: string[]
  sources: BusinessProfileSource[]
  rawContext: string
}

export function normalizeBusinessUrl(input: string) {
  const trimmed = input.trim()
  const withProtocol = /^[a-z][a-z0-9+.-]*:/i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`

  let url: URL
  try {
    url = new URL(withProtocol)
  } catch {
    throw new Error('Enter a valid business URL')
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Only http and https URLs are supported')
  }

  const normalized = url.toString()
  const originalHadTrailingSlash = /\/$/.test(trimmed)
  if (!originalHadTrailingSlash && url.pathname === '/' && !url.search && !url.hash) {
    return normalized.slice(0, -1)
  }

  return normalized
}

export function sourceTypeFromUrl(input: string): Exclude<EnrichmentSourceType, 'manual'> {
  const url = new URL(normalizeBusinessUrl(input))
  const host = url.hostname.replace(/^www\./, '').toLowerCase()

  if (host === 'instagram.com' || host.endsWith('.instagram.com')) return 'instagram'
  if (
    host === 'facebook.com' ||
    host === 'fb.com' ||
    host === 'm.facebook.com' ||
    host.endsWith('.facebook.com')
  ) {
    return 'facebook'
  }

  return 'website'
}

export function buildContextFromEnrichment(input: RawEnrichmentInput) {
  const sections: string[] = [
    `Source type: ${input.sourceType}`,
    `Source URL: ${input.url}`,
  ]

  if (input.socialProfile) {
    sections.push(formatSocialProfileSection('Social profile:', input.socialProfile))
  }

  if (input.linkedProfiles?.length) {
    sections.push(
      [
        'Linked social profiles:',
        ...input.linkedProfiles.map((profile, index) =>
          formatSocialProfileSection(`Linked profile ${index + 1}:`, profile)
        ),
      ].join('\n\n')
    )
  }

  if (input.websitePages?.length) {
    sections.push(
      [
        'Website pages:',
        ...input.websitePages.map((page, index) =>
          [`Page ${index + 1}: ${page.title || 'Untitled'}`, `URL: ${page.url}`, page.content]
            .filter(Boolean)
            .join('\n')
        ),
      ].join('\n\n')
    )
  }

  if (input.recentPosts?.length) {
    sections.push(
      [
        'Recent social posts:',
        ...input.recentPosts.map((post, index) =>
          [`Post ${index + 1}:`, post.url ? `URL: ${post.url}` : '', post.text]
            .filter(Boolean)
            .join('\n')
        ),
      ].join('\n\n')
    )
  }

  if (input.manualText?.trim()) {
    sections.push(`Manual context:\n${input.manualText.trim()}`)
  }

  return sections.join('\n\n---\n\n')
}

function formatSocialProfileSection(title: string, profile: SocialProfileContent) {
  return [
    title,
    `Platform: ${profile.platform}`,
    profile.name ? `Name: ${profile.name}` : '',
    profile.username ? `Username: ${profile.username}` : '',
    profile.category ? `Category: ${profile.category}` : '',
    profile.bio ? `Bio: ${profile.bio}` : '',
    profile.about ? `About: ${profile.about}` : '',
    profile.website ? `Website: ${profile.website}` : '',
    profile.links?.length ? `Links: ${profile.links.join(', ')}` : '',
    typeof profile.followers === 'number' ? `Followers: ${profile.followers}` : '',
    typeof profile.likes === 'number' ? `Likes: ${profile.likes}` : '',
    profile.phone ? `Phone: ${profile.phone}` : '',
    profile.address ? `Address: ${profile.address}` : '',
  ]
    .filter(Boolean)
    .join('\n')
}
