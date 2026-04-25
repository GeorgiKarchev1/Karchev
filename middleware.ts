import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Only set the detected-country cookie if not already set by user preference
  if (!request.cookies.has('user-lang-preference')) {
    const country = request.headers.get('x-vercel-ip-country') ?? ''
    const detectedLang = country === 'BG' ? 'BG' : 'EN'
    response.cookies.set('detected-country-lang', detectedLang, {
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'lax',
    })
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|img/).*)'],
}
