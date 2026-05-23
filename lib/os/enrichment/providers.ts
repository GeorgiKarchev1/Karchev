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
  const category = Array.isArray(categories) ? categories[0] : categories

  return {
    platform: 'facebook',
    name: item.title || item.name,
    category,
    about: item.intro || item.about || item.description,
    website: item.website || item.websites?.[0],
    followers: numberOrUndefined(item.followers ?? item.followersCount),
    likes: numberOrUndefined(item.likes ?? item.likesCount),
    phone: item.phone,
    address: item.address,
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

  return { websitePages: mapFirecrawlDocuments([data.data]) }
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
      usernames: [url],
      resultsLimit: analyzeRecentPosts ? 20 : 1,
    },
    fetcher,
  })
  const first = Array.isArray(data) ? data[0] : data
  if (!first) throw new Error('Instagram import returned no profile data')
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
}): Promise<Pick<RawEnrichmentInput, 'socialProfile' | 'recentPosts'>> {
  const pageData = await runApifyActor({
    actor: APIFY_ACTORS.facebookPages,
    token,
    input: { startUrls: [{ url }], maxPages: 1 },
    fetcher,
  })
  const first = Array.isArray(pageData) ? pageData[0] : pageData
  if (!first) throw new Error('Facebook import returned no page data')

  let recentPosts: SocialPostContent[] = []
  if (analyzeRecentPosts) {
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
  }

  return {
    socialProfile: mapApifyFacebookPage(first),
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

function numberOrUndefined(value: unknown) {
  const number = typeof value === 'string' ? Number(value) : value
  return typeof number === 'number' && Number.isFinite(number) ? number : undefined
}
