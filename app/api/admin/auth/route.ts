import { NextRequest, NextResponse } from 'next/server'
import { signToken, verifyToken, passwordMatches, COOKIE_NAME, COOKIE_MAX_AGE } from '../../../../lib/auth'
import { rateLimit, getClientIp, maybeSweep } from '../../../../lib/rate-limit'

// Max 10 login attempts per 10 minutes per IP — blocks brute-forcing.
const LOGIN_LIMIT = 10
const LOGIN_WINDOW_MS = 10 * 60_000

export async function POST(req: NextRequest) {
  maybeSweep()
  const ip = getClientIp(req)
  const limit = rateLimit(`admin-auth:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS)
  if (!limit.success) {
    return NextResponse.json(
      { error: 'Твърде много опити. Опитайте отново по-късно.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    )
  }

  let password: unknown
  try {
    ;({ password } = await req.json())
  } catch {
    return NextResponse.json({ error: 'Невалидна заявка' }, { status: 400 })
  }

  if (!(await passwordMatches(password))) {
    return NextResponse.json({ error: 'Невалидна парола' }, { status: 401 })
  }

  const token = await signToken()
  if (!token) {
    // ADMIN_SECRET is missing/weak — fail closed instead of issuing a forgeable session.
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
  return res
}

export async function DELETE(req: NextRequest) {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(COOKIE_NAME)
  return res
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value ?? ''
  return NextResponse.json({ authenticated: await verifyToken(token) })
}
