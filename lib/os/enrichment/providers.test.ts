import { describe, expect, it } from 'vitest'
import {
  fetchFacebookEnrichment,
  fetchInstagramEnrichment,
  fetchWebsiteEnrichment,
  mapApifyFacebookPage,
  mapApifyInstagramProfile,
  mapFirecrawlDocuments,
} from './providers'
import { buildContextFromEnrichment } from './utils'

describe('mapFirecrawlDocuments', () => {
  it('maps Firecrawl crawl documents to website page content', () => {
    expect(
      mapFirecrawlDocuments([
        {
          markdown: '# About\nWe train drone survey teams.',
          metadata: {
            sourceURL: 'https://example.com/about',
            title: 'About Example',
          },
        },
      ])
    ).toEqual([
      {
        url: 'https://example.com/about',
        title: 'About Example',
        content: '# About\nWe train drone survey teams.',
      },
    ])
  })

  it('keeps website scrape content even when Firecrawl omits source metadata', async () => {
    const fetcher = async () =>
      new Response(
        JSON.stringify({
          success: true,
          data: {
            markdown: '# Nana\nHair color correction and balayage in Plovdiv.',
            metadata: { title: 'Nana Hair' },
          },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )

    await expect(
      fetchWebsiteEnrichment({
        url: 'https://example.com/nana',
        apiKey: 'test-key',
        fetcher: fetcher as typeof fetch,
      })
    ).resolves.toEqual({
      websitePages: [
        {
          url: 'https://example.com/nana',
          title: 'Nana Hair',
          content: '# Nana\nHair color correction and balayage in Plovdiv.',
        },
      ],
    })
  })
})

describe('mapApifyInstagramProfile', () => {
  it('normalizes common Instagram actor fields', () => {
    expect(
      mapApifyInstagramProfile({
        username: 'karchx',
        fullName: 'KarchX',
        biography: 'AI content OS for founders.',
        externalUrl: 'https://karchx.com',
        followersCount: 4200,
        latestPosts: [{ caption: 'Stop posting randomly.', url: 'https://instagram.com/p/1' }],
      })
    ).toEqual({
      profile: {
        platform: 'instagram',
        name: 'KarchX',
        username: 'karchx',
        bio: 'AI content OS for founders.',
        website: 'https://karchx.com',
        followers: 4200,
      },
      posts: [{ text: 'Stop posting randomly.', url: 'https://instagram.com/p/1' }],
    })
  })

  it('sends a username, not the whole Instagram URL, to Apify', async () => {
    let actorInput: Record<string, unknown> | undefined
    const fetcher = async (_url: string | URL | Request, init?: RequestInit) => {
      actorInput = JSON.parse(String(init?.body))
      return new Response(
        JSON.stringify([{ username: 'hair_by_.nana', fullName: 'Hair by Nana' }]),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      )
    }

    await fetchInstagramEnrichment({
      url: 'https://www.instagram.com/hair_by_.nana/?hl=en',
      token: 'test-token',
      fetcher: fetcher as typeof fetch,
    })

    expect(actorInput?.usernames).toEqual(['hair_by_.nana'])
  })
})

describe('mapApifyFacebookPage', () => {
  it('normalizes common Facebook page fields', () => {
    expect(
      mapApifyFacebookPage({
        title: 'KarchX',
        categories: ['Marketing agency'],
        intro: 'Done-for-you content strategy.',
        pageUrl: 'https://facebook.com/karchx',
        website: 'https://karchx.com',
        likes: 300,
        followers: 500,
        phone: '+359...',
        address: 'Plovdiv',
      })
    ).toEqual({
      platform: 'facebook',
      name: 'KarchX',
      category: 'Marketing agency',
      about: 'Done-for-you content strategy.',
      website: 'https://karchx.com',
      links: ['https://karchx.com'],
      followers: 500,
      likes: 300,
      phone: '+359...',
      address: 'Plovdiv',
    })
  })

  it('keeps Facebook profile location, work, info, and chained Instagram links', () => {
    expect(
      mapApifyFacebookPage({
        title: 'Фризьорски Салон Нана',
        categories: ['Profile', 'Digital creator'],
        info: ['Фризьорски Салон Нана. 1,560 likes', '186 talking about this. Digital creator'],
        WORK: 'Works at Фризьорски салон Нана',
        current_city: 'Lives in Plovdiv, Bulgaria',
        hometown: 'From Plovdiv, Bulgaria',
        alternativeSocialMedia: 'https://www.instagram.com/hair_by_.nana',
        websites: ['https://www.instagram.com/hair_by_.nana'],
        likes: 1560,
        followers: 1560,
      })
    ).toEqual({
      platform: 'facebook',
      name: 'Фризьорски Салон Нана',
      category: 'Digital creator',
      about:
        'Фризьорски Салон Нана. 1,560 likes\n186 talking about this. Digital creator\nWorks at Фризьорски салон Нана',
      website: 'https://www.instagram.com/hair_by_.nana',
      followers: 1560,
      likes: 1560,
      address: 'Lives in Plovdiv, Bulgaria; From Plovdiv, Bulgaria',
      links: ['https://www.instagram.com/hair_by_.nana'],
    })
  })

  it('fetches chained Instagram context when a Facebook profile exposes an Instagram URL', async () => {
    const calls: unknown[] = []
    const fetcher = async (_url: string | URL | Request, init?: RequestInit) => {
      calls.push(JSON.parse(String(init?.body)))
      if (calls.length === 1) {
        return new Response(
          JSON.stringify([
            {
              title: 'Фризьорски Салон Нана',
              categories: ['Profile', 'Digital creator'],
              current_city: 'Lives in Plovdiv, Bulgaria',
              alternativeSocialMedia: 'https://www.instagram.com/hair_by_.nana',
              websites: ['https://www.instagram.com/hair_by_.nana'],
            },
          ]),
          { status: 201, headers: { 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify([
          {
            username: 'hair_by_.nana',
            fullName: 'Hair by Nana',
            biography: 'Hair color, haircut and styling in Plovdiv. Book by DM.',
            followersCount: 2500,
            latestPosts: [{ caption: 'Balayage transformation in Plovdiv.' }],
          },
        ]),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const result = await fetchFacebookEnrichment({
      url: 'https://www.facebook.com/profile.php?id=123',
      token: 'test-token',
      analyzeRecentPosts: true,
      fetcher: fetcher as typeof fetch,
    })

    expect(result.linkedProfiles).toEqual([
      {
        platform: 'instagram',
        name: 'Hair by Nana',
        username: 'hair_by_.nana',
        bio: 'Hair color, haircut and styling in Plovdiv. Book by DM.',
        followers: 2500,
      },
    ])
    expect(result.recentPosts).toEqual([{ text: 'Balayage transformation in Plovdiv.' }])
    expect(buildContextFromEnrichment({ sourceType: 'facebook', url: 'https://fb.test', ...result })).toContain(
      'Linked social profiles:'
    )
  })

  it('continues with Facebook and linked Instagram context when Facebook posts are unavailable', async () => {
    const fetcher = async (_url: string | URL | Request, init?: RequestInit) => {
      const requestUrl = String(_url)
      const body = JSON.parse(String(init?.body))
      if (requestUrl.includes('facebook-posts-scraper')) {
        return new Response(JSON.stringify({ error: { message: 'Facebook posts are unavailable' } }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      if (body.usernames) {
        return new Response(
          JSON.stringify([
            {
              username: 'hair_by_.nana',
              fullName: 'Hair by Nana',
              biography: 'Balayage and color correction in Plovdiv.',
              latestPosts: [{ caption: 'Fresh blonde balayage.' }],
            },
          ]),
          { status: 201, headers: { 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify([
          {
            title: 'Фризьорски Салон Нана',
            categories: ['Digital creator'],
            websites: ['https://www.instagram.com/hair_by_.nana'],
          },
        ]),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const result = await fetchFacebookEnrichment({
      url: 'https://www.facebook.com/profile.php?id=123',
      token: 'test-token',
      analyzeRecentPosts: true,
      fetcher: fetcher as typeof fetch,
    })

    expect(result.socialProfile?.name).toBe('Фризьорски Салон Нана')
    expect(result.linkedProfiles?.[0]?.username).toBe('hair_by_.nana')
    expect(result.recentPosts).toEqual([{ text: 'Fresh blonde balayage.' }])
  })

  it('surfaces Apify unavailable-profile errors instead of returning empty profiles', async () => {
    const fetcher = async () =>
      new Response(
        JSON.stringify([
          {
            url: 'https://www.facebook.com/profile.php?id=123',
            error: 'not_available',
            errorDescription: "This content isn't available because the owner only shared it with a small group of people or changed who can see it, or it's been deleted.",
          },
        ]),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      )

    await expect(
      fetchFacebookEnrichment({
        url: 'https://www.facebook.com/profile.php?id=123',
        token: 'test-token',
        analyzeRecentPosts: false,
        fetcher: fetcher as typeof fetch,
      })
    ).rejects.toThrow('Facebook import failed: This content isn')
  })
})
