import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '../../../../lib/auth'
import Anthropic from '@anthropic-ai/sdk'

async function authorized(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value ?? ''
  return verifyToken(token)
}

export async function POST(req: NextRequest) {
  if (!(await authorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { topic, language } = await req.json()
  if (!topic) return NextResponse.json({ error: 'Missing topic' }, { status: 400 })

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'ANTHROPIC_API_KEY not set' }, { status: 500 })

  const client = new Anthropic({ apiKey })
  const isBG = language !== 'EN'

  const prompt = isBG
    ? `Напиши SEO-оптимизирана блог статия на БЪЛГАРСКИ език за: "${topic}".

Върни САМО валиден JSON обект (без markdown, без backticks) в следния формат:
{
  "title": "заглавие на статията",
  "excerpt": "кратко резюме (1-2 изречения)",
  "content": "пълният HTML съдържание на статията (параграфи в <p>, заглавия в <h2>/<h3>, списъци в <ul>/<li>)",
  "tags": ["Таг1", "Таг2"],
  "readTime": "X мин",
  "slug": "url-friendly-slug-в-кирилица-или-латиница"
}`
    : `Write an SEO-optimized blog post in ENGLISH about: "${topic}".

Return ONLY a valid JSON object (no markdown, no backticks) in this format:
{
  "title": "post title",
  "excerpt": "short summary (1-2 sentences)",
  "content": "full HTML content (paragraphs in <p>, headings in <h2>/<h3>, lists in <ul>/<li>)",
  "tags": ["Tag1", "Tag2"],
  "readTime": "X min",
  "slug": "url-friendly-slug"
}`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = (message.content[0] as { type: string; text: string }).text.trim()

  let parsed: {
    title: string
    excerpt: string
    content: string
    tags: string[]
    readTime: string
    slug: string
  }
  try {
    parsed = JSON.parse(raw)
  } catch {
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 })
    parsed = JSON.parse(jsonMatch[0])
  }

  return NextResponse.json(parsed)
}
