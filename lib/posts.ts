import { promises as fs } from 'fs'
import path from 'path'

export interface BlogPost {
  id: string
  slug: string
  titleBG: string
  excerptBG: string
  tags: string[]
  date: string
  readTime: string
  image: string
  published: boolean
  createdAt: string
  content?: string
}

const POSTS_FILE = path.join(process.cwd(), 'data', 'posts.json')
const POSTS_BLOB_PATH = 'admin/posts.json'

function getBlobAccess(): 'public' | 'private' {
  return process.env.ADMIN_POSTS_BLOB_ACCESS === 'private' ? 'private' : 'public'
}

function shouldUseBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

async function readLocalPosts(): Promise<BlogPost[]> {
  try {
    const raw = await fs.readFile(POSTS_FILE, 'utf-8')
    return JSON.parse(raw) as BlogPost[]
  } catch {
    return []
  }
}

async function writeLocalPosts(posts: BlogPost[]): Promise<void> {
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2), 'utf-8')
}

async function readBlobPosts(): Promise<BlogPost[]> {
  try {
    const { get } = await import('@vercel/blob')
    const blob = await get(POSTS_BLOB_PATH, { access: getBlobAccess() })
    if (!blob) return []

    const raw = await new Response(blob.stream).text()
    return JSON.parse(raw) as BlogPost[]
  } catch {
    return []
  }
}

async function writeBlobPosts(posts: BlogPost[]): Promise<void> {
  const { put } = await import('@vercel/blob')
  await put(POSTS_BLOB_PATH, JSON.stringify(posts, null, 2), {
    access: getBlobAccess(),
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  })
}

async function readPosts(): Promise<BlogPost[]> {
  if (shouldUseBlobStorage()) {
    return readBlobPosts()
  }

  return readLocalPosts()
}

async function persistPosts(posts: BlogPost[]): Promise<void> {
  if (shouldUseBlobStorage()) {
    await writeBlobPosts(posts)
    return
  }

  await writeLocalPosts(posts)
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return readPosts()
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.published)
}

export async function createPost(post: BlogPost): Promise<void> {
  const posts = await readPosts()
  posts.unshift(post)
  await persistPosts(posts)
}

export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<boolean> {
  const posts = await readPosts()
  const idx = posts.findIndex((post) => post.id === id)
  if (idx === -1) return false

  posts[idx] = { ...posts[idx], ...updates }
  await persistPosts(posts)
  return true
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await readPosts()
  const filtered = posts.filter((post) => post.id !== id)
  if (filtered.length === posts.length) return false

  await persistPosts(filtered)
  return true
}

export function getPostsStorageMode(): 'blob' | 'local' {
  return shouldUseBlobStorage() ? 'blob' : 'local'
}
