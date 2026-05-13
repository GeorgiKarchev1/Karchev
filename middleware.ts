import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { getRouteLocale } from '@/lib/site'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin/dashboard')) {
    const token = request.cookies.get(COOKIE_NAME)?.value ?? ''
    if (!(await verifyToken(token))) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  const requestHeaders = new Headers(request.headers)
  const routeLocale = getRouteLocale(pathname)
  const cookieLocale = request.cookies.get('user-lang-preference')?.value
  const country = request.headers.get('x-vercel-ip-country') ?? ''
  const detectedLocale =
    routeLocale ??
    (cookieLocale === 'EN' || cookieLocale === 'BG'
      ? cookieLocale.toLowerCase()
      : country === 'BG'
        ? 'bg'
        : 'en')

  requestHeaders.set('x-site-locale', detectedLocale)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Only set the detected-country cookie if not already set by user preference
  if (!request.cookies.has('user-lang-preference')) {
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
