import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin/dashboard')) {
    const token = request.cookies.get(COOKIE_NAME)?.value ?? ''
    if (!(await verifyToken(token))) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  const response = NextResponse.next()

  // Page language now comes from the URL (app/bg, app/en and the policy
  // subtrees each provide it), so no locale header is forwarded here — reading
  // request headers in the root layout used to force every route in the app to
  // render dynamically.
  //
  // This cookie is still the only language hint for routes that carry no locale
  // in the path (/admin, /os), where the cookie banner falls back to it.
  if (!request.cookies.has('user-lang-preference')) {
    const country = request.headers.get('x-vercel-ip-country') ?? ''
    response.cookies.set('detected-country-lang', country === 'BG' ? 'BG' : 'EN', {
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'lax',
    })
  }

  return response
}

export const config = {
  // Skip Next internals, metadata routes and static files: middleware on an
  // asset request is pure latency now that the pages themselves are static.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|img/|blog/|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff2?|ttf|pdf|txt|xml|webmanifest)$).*)',
  ],
}
