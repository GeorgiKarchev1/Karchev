import { describe, expect, it } from 'vitest'
import {
  mapApifyFacebookPage,
  mapApifyInstagramProfile,
  mapFirecrawlDocuments,
} from './providers'

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
      followers: 500,
      likes: 300,
      phone: '+359...',
      address: 'Plovdiv',
    })
  })
})
