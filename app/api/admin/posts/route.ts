import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyToken, COOKIE_NAME } from '../../../../lib/auth'
import { getAllPosts, createPost, deletePost, updatePost, getPostsStorageMode } from '../../../../lib/posts'
import { sanitizeHtml } from '../../../../lib/sanitize'

async function authorized(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value ?? ''
  return verifyToken(token)
}

// Allowlist of writable fields. Anything not listed here is dropped, which
// prevents mass-assignment of unexpected/internal keys.
const postSchema = z.object({
  id: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  titleBG: z.string().min(1).max(300),
  excerptBG: z.string().max(1000).default(''),
  tags: z.array(z.string().max(50)).max(20).default([]),
  date: z.string().max(40).default(''),
  readTime: z.string().max(40).default(''),
  image: z.string().max(2000).default(''),
  published: z.boolean().default(false),
  createdAt: z.string().max(40).default(''),
  content: z.string().max(200_000).optional(),
})

const updateSchema = postSchema.partial().extend({ id: z.string().min(1).max(200) })

export async function GET(req: NextRequest) {
  if (!(await authorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json({
    posts: await getAllPosts(),
    storage: getPostsStorageMode(),
  })
}

export async function POST(req: NextRequest) {
  if (!(await authorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = postSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid post', details: parsed.error.flatten() }, { status: 400 })
  }
  const post = parsed.data
  if (post.content) post.content = sanitizeHtml(post.content)
  await createPost(post)
  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest) {
  if (!(await authorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = updateSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid update', details: parsed.error.flatten() }, { status: 400 })
  }
  const { id, ...updates } = parsed.data
  if (typeof updates.content === 'string') updates.content = sanitizeHtml(updates.content)
  const ok = await updatePost(id, updates)
  return NextResponse.json({ ok })
}

export async function DELETE(req: NextRequest) {
  if (!(await authorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const id = body?.id
  if (!id || typeof id !== 'string') return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const ok = await deletePost(id)
  return NextResponse.json({ ok })
}
