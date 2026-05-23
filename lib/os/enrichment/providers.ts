import type {
  RawEnrichmentInput,
  SocialPostContent,
  SocialProfileContent,
  WebsitePageContent,
} from './utils'

const FIRECRAWL_SCRAPE_URL = 'https://api.firecrawl.dev/v2/scrape'
const APIFY_RUN_SYNC_URL = 'https://api.apify.com/v2/acts'

const APIFY_ACTORS = {
  instagramProfile: 'apify~instagram-profile-scraper',
  facebookPages: 'apify~facebook-pages-scraper',
  facebookPosts: 'apify~facebook-posts-scraper',
}

type FetchLike = typeof fetch

interface FirecrawlDocument {
  markdown?: string
  text?: string
  metadata?: {
    sourceURL?: string
    url?: string
    title?: string
  }
}

export function mapFirecrawlDocuments(docs: FirecrawlDocument[]): WebsitePageContent[] {
  return docs
    .map((doc) => ({
      url: doc.metadata?.sourceURL || doc.metadata?.url || '',
      title: doc.metadata?.title,
      content: doc.markdown || doc.text || '',
    }))
    .filter((page) => page.url && page.content)
}

export function mapApifyInstagramProfile(item: Record<string, any>): {
  profile: SocialProfileContent
  posts: SocialPostContent[]
} {
  const profile: SocialProfileContent = {
    platform: 'instagram',
    name: item.fullName || item.name,
    username: item.username,
    bio: item.biography || item.bio,
    website: item.externalUrl || item.website,
    followers: numberOrUndefined(item.followersCount ?? item.followers),
  }

  const rawPosts = item.latestPosts || item.latestIgtvVideos || item.posts || []
  const posts = Array.isArray(rawPosts)
    ? rawPosts
        .map((post) => ({
          text: post.caption || post.text || post.description || '',
          url: post.url || post.shortCode ? post.url || `https://www.instagram.com/p/${post.shortCode}/` : undefined,
          likes: numberOrUndefined(post.likesCount ?? post.likes),
          comments: numberOrUndefined(post.commentsCount ?? post.comments),
          timestamp: post.timestamp || post.takenAtTimestamp,
        }))
        .filter((post) => post.text)
    : []

  return { profile, posts }
}

export function mapApifyFacebookPage(item: Record<string, any>): SocialProfileContent {
  const categories = item.categories || item.category
  const category = Array.isArray(categories)
    ? categories.find((value) => value && value !== 'Profile') || categories[0]
    : categories
  const links = uniqueStrings([
    item.website,
    ...(Array.isArray(item.websites) ? item.websites : []),
    item.alternativeSocialMedia,
    item.additionalProperties?.alternativeSocialMedia,
  ])
  const about = uniqueStrings([
    item.intro,
    item.about,
    item.description,
    ...(Array.isArray(item.info) ? item.info : []),
    item.WORK,
    item.work,
    item.additionalProperties?.WORK,
    item.additionalProperties?.work,
  ]).join('\n')
  const address = uniqueStrings([
    item.address,
    item.current_city,
    item.CURRENT_CITY,
    item.hometown,
    item.HOMETOWN,
    item.additionalProperties?.current_city,
    item.additionalProperties?.CURRENT_CITY,
    item.additionalProperties?.hometown,
    item.additionalProperties?.HOMETOWN,
  ]).join('; ')

  return {
    platform: 'facebook',
    name: item.title || item.name,
    category,
    about: about || undefined,
    website: links[0],
    links: links.length ? links : undefined,
    followers: numberOrUndefined(item.followers ?? item.followersCount),
    likes: numberOrUndefined(item.likes ?? item.likesCount),
    phone: item.phone,
    address: address || undefined,
  }
}

export function mapApifyFacebookPost(item: Record<string, any>): SocialPostContent | null {
  const text = item.text || item.message || item.caption || item.postText || ''
  if (!text) return null

  return {
    text,
    url: item.url || item.postUrl,
    timestamp: item.time || item.timestamp || item.date,
    likes: numberOrUndefined(item.likes ?? item.reactionsCount),
    comments: numberOrUndefined(item.comments ?? item.commentsCount),
  }
}

export async function fetchWebsiteEnrichment({
  url,
  apiKey,
  fetcher = fetch,
}: {
  url: string
  apiKey: string
  limit?: number
  fetcher?: FetchLike
}): Promise<Pick<RawEnrichmentInput, 'websitePages'>> {
  const response = await fetcher(FIRECRAWL_SCRAPE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      formats: ['markdown'],
      onlyMainContent: true,
      timeout: 60000,
    }),
  })

  const data = await response.json()
  if (!response.ok || !data?.success) {
    throw new Error(data?.error || 'Firecrawl website import failed')
  }

  const document = data.data as FirecrawlDocument | undefined
  const documentWithUrl = document
    ? {
        ...document,
        metadata: {
          ...document.metadata,
          sourceURL: document.metadata?.sourceURL || document.metadata?.url || url,
        },
      }
    : document

  return { websitePages: documentWithUrl ? mapFirecrawlDocuments([documentWithUrl]) : [] }
}

export async function fetchInstagramEnrichment({
  url,
  token,
  analyzeRecentPosts = true,
  fetcher = fetch,
}: {
  url: string
  token: string
  analyzeRecentPosts?: boolean
  fetcher?: FetchLike
}): Promise<Pick<RawEnrichmentInput, 'socialProfile' | 'recentPosts'>> {
  const data = await runApifyActor({
    actor: APIFY_ACTORS.instagramProfile,
    token,
    input: {
      usernames: [normalizeInstagramUsername(url)],
      resultsLimit: analyzeRecentPosts ? 20 : 1,
    },
    fetcher,
  })
  const first = Array.isArray(data) ? data[0] : data
  assertApifyItemAvailable(first, 'Instagram import')
  const mapped = mapApifyInstagramProfile(first)
  return {
    socialProfile: mapped.profile,
    recentPosts: analyzeRecentPosts ? mapped.posts.slice(0, 20) : [],
  }
}

export async function fetchFacebookEnrichment({
  url,
  token,
  analyzeRecentPosts = false,
  fetcher = fetch,
}: {
  url: string
  token: string
  analyzeRecentPosts?: boolean
  fetcher?: FetchLike
}): Promise<Pick<RawEnrichmentInput, 'socialProfile' | 'linkedProfiles' | 'recentPosts'>> {
  const pageData = await runApifyActor({
    actor: APIFY_ACTORS.facebookPages,
    token,
    input: { startUrls: [{ url }], maxPages: 1 },
    fetcher,
  })
  const first = Array.isArray(pageData) ? pageData[0] : pageData
  assertApifyItemAvailable(first, 'Facebook import')

  let recentPosts: SocialPostContent[] = []
  if (analyzeRecentPosts) {
    try {
      const postsData = await runApifyActor({
        actor: APIFY_ACTORS.facebookPosts,
        token,
        input: { startUrls: [{ url }], resultsLimit: 20 },
        fetcher,
      })
      recentPosts = (Array.isArray(postsData) ? postsData : [])
        .map(mapApifyFacebookPost)
        .filter((post): post is SocialPostContent => Boolean(post))
        .slice(0, 20)
    } catch {
      // Keep the Facebook profile import useful even if the posts actor cannot access the feed.
    }
  }

  const socialProfile = mapApifyFacebookPage(first)
  const linkedProfiles: SocialProfileContent[] = []
  const instagramUrl = socialProfile.links?.find(isInstagramUrl)
  if (instagramUrl) {
    try {
      const instagram = await fetchInstagramEnrichment({
        url: instagramUrl,
        token,
        analyzeRecentPosts,
        fetcher,
      })
      if (instagram.socialProfile) linkedProfiles.push(instagram.socialProfile)
      if (instagram.recentPosts?.length) recentPosts = [...recentPosts, ...instagram.recentPosts].slice(0, 20)
    } catch {
      // Keep the Facebook import useful even if the linked Instagram profile is private or temporarily unavailable.
    }
  }

  return {
    socialProfile,
    linkedProfiles: linkedProfiles.length ? linkedProfiles : undefined,
    recentPosts,
  }
}

async function runApifyActor({
  actor,
  token,
  input,
  fetcher,
}: {
  actor: string
  token: string
  input: Record<string, unknown>
  fetcher: FetchLike
}) {
  const url = `${APIFY_RUN_SYNC_URL}/${actor}/run-sync-get-dataset-items?token=${encodeURIComponent(
    token
  )}&clean=true`
  const response = await fetcher(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data?.error?.message || data?.error || `Apify actor ${actor} failed`)
  }
  return data
}

function assertApifyItemAvailable(item: unknown, label: string): asserts item is Record<string, any> {
  if (!item || typeof item !== 'object') {
    throw new Error(`${label} returned no profile data`)
  }

  const record = item as Record<string, any>
  if (record.error) {
    const description = record.errorDescription || record.errorMessage || record.message || record.error
    throw new Error(`${label} failed: ${description}`)
  }
}

function normalizeInstagramUsername(value: string) {
  const trimmed = value.trim()
  try {
    const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
    const host = parsed.hostname.replace(/^www\./, '').toLowerCase()
    if (host === 'instagram.com' || host.endsWith('.instagram.com')) {
      return parsed.pathname.split('/').filter(Boolean)[0] || trimmed.replace(/^@/, '')
    }
  } catch {
    // Fall through to handle raw usernames.
  }

  return trimmed.replace(/^@/, '').split(/[/?#]/)[0]
}

function uniqueStrings(values: unknown[]) {
  const strings = values.filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
  return Array.from(new Set(strings.map((value) => value.trim())))
}

function isInstagramUrl(value: string) {
  try {
    const host = new URL(value).hostname.replace(/^www\./, '').toLowerCase()
    return host === 'instagram.com' || host.endsWith('.instagram.com')
  } catch {
    return false
  }
}

function numberOrUndefined(value: unknown) {
  const number = typeof value === 'string' ? Number(value) : value
  return typeof number === 'number' && Number.isFinite(number) ? number : undefined
}
