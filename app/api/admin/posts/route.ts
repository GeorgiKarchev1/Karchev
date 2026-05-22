import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '../../../../lib/auth'
import { getAllPosts, createPost, deletePost, updatePost, BlogPost, getPostsStorageMode } from '../../../../lib/posts'

async function authorized(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value ?? ''
  return verifyToken(token)
}

export async function GET(req: NextRequest) {
  if (!(await authorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json({
    posts: await getAllPosts(),
    storage: getPostsStorageMode(),
  })
}

export async function POST(req: NextRequest) {
  if (!(await authorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json() as BlogPost
  if (!body.id || !body.titleBG) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  await createPost(body)
  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest) {
  if (!(await authorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json() as { id: string } & Partial<BlogPost>
  const { id, ...updates } = body
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const ok = await updatePost(id, updates)
  return NextResponse.json({ ok })
}

export async function DELETE(req: NextRequest) {
  if (!(await authorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const ok = await deletePost(id)
  return NextResponse.json({ ok })
}
