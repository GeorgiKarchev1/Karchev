import type { Metadata } from 'next'

export type RouteLocale = 'bg' | 'en'
export type UiLanguage = 'BG' | 'EN'

export const BASE_URL = 'https://www.karchx.com'

const ROUTE_PAIRS: Array<[string, { bg: string; en: string }]> = [
  ['/', { bg: '/bg', en: '/en' }],
  ['/bg', { bg: '/bg', en: '/en' }],
  ['/en', { bg: '/bg', en: '/en' }],
  ['/bg/izrabotka-na-saitove', { bg: '/bg/izrabotka-na-saitove', en: '/en/website-development' }],
  ['/en/website-development', { bg: '/bg/izrabotka-na-saitove', en: '/en/website-development' }],
  ['/bg/landing-stranitsi', { bg: '/bg/landing-stranitsi', en: '/en/landing-pages' }],
  ['/en/landing-pages', { bg: '/bg/landing-stranitsi', en: '/en/landing-pages' }],
  ['/bg/ai-avtomatizatsii', { bg: '/bg/ai-avtomatizatsii', en: '/en/ai-automation' }],
  ['/en/ai-automation', { bg: '/bg/ai-avtomatizatsii', en: '/en/ai-automation' }],
  ['/bg/ai-integratsiya', { bg: '/bg/ai-integratsiya', en: '/en/ai-integration' }],
  ['/en/ai-integration', { bg: '/bg/ai-integratsiya', en: '/en/ai-integration' }],
  ['/bg/blog', { bg: '/bg/blog', en: '/en/blog' }],
  ['/en/blog', { bg: '/bg/blog', en: '/en/blog' }],
  ['/bg/tools', { bg: '/bg/tools', en: '/en/tools' }],
  ['/en/tools', { bg: '/bg/tools', en: '/en/tools' }],
  ['/bg/estimate', { bg: '/bg/estimate', en: '/en/estimate' }],
  ['/en/estimate', { bg: '/bg/estimate', en: '/en/estimate' }],
  ['/bg/blog/kolko-struva-sait-za-malak-biznes', { bg: '/bg/blog/kolko-struva-sait-za-malak-biznes', en: '/en/blog/website-cost-small-business-bulgaria' }],
  ['/en/blog/website-cost-small-business-bulgaria', { bg: '/bg/blog/kolko-struva-sait-za-malak-biznes', en: '/en/blog/website-cost-small-business-bulgaria' }],
  ['/bg/blog/kakvo-tryabva-da-ima-sait-za-malak-biznes', { bg: '/bg/blog/kakvo-tryabva-da-ima-sait-za-malak-biznes', en: '/en/blog/what-a-small-business-website-needs' }],
  ['/en/blog/what-a-small-business-website-needs', { bg: '/bg/blog/kakvo-tryabva-da-ima-sait-za-malak-biznes', en: '/en/blog/what-a-small-business-website-needs' }],
  ['/bg/blog/koga-ti-tryabva-landing-stranitsa-vmesto-sait', { bg: '/bg/blog/koga-ti-tryabva-landing-stranitsa-vmesto-sait', en: '/en/blog/when-you-need-a-landing-page-instead-of-a-website' }],
  ['/en/blog/when-you-need-a-landing-page-instead-of-a-website', { bg: '/bg/blog/koga-ti-tryabva-landing-stranitsa-vmesto-sait', en: '/en/blog/when-you-need-a-landing-page-instead-of-a-website' }],
  ['/bg/blog/kak-ai-avtomatizatsiite-pestyat-vreme-na-malak-biznes', { bg: '/bg/blog/kak-ai-avtomatizatsiite-pestyat-vreme-na-malak-biznes', en: '/en/blog/how-ai-automation-saves-time-for-small-businesses' }],
  ['/en/blog/how-ai-automation-saves-time-for-small-businesses', { bg: '/bg/blog/kak-ai-avtomatizatsiite-pestyat-vreme-na-malak-biznes', en: '/en/blog/how-ai-automation-saves-time-for-small-businesses' }],
  ['/bg/blog/greshkite-v-saita-koito-ubivat-doverieto', { bg: '/bg/blog/greshkite-v-saita-koito-ubivat-doverieto', en: '/en/blog/website-mistakes-that-kill-trust' }],
  ['/en/blog/website-mistakes-that-kill-trust', { bg: '/bg/blog/greshkite-v-saita-koito-ubivat-doverieto', en: '/en/blog/website-mistakes-that-kill-trust' }],
  ['/bg/blog/ai-avtomatizatsii-za-seo-sadarzhanie-i-blog-sistema', { bg: '/bg/blog/ai-avtomatizatsii-za-seo-sadarzhanie-i-blog-sistema', en: '/en/blog/ai-automation-seo-content-pipeline' }],
  ['/en/blog/ai-automation-seo-content-pipeline', { bg: '/bg/blog/ai-avtomatizatsii-za-seo-sadarzhanie-i-blog-sistema', en: '/en/blog/ai-automation-seo-content-pipeline' }],
]

// Pages that exist in one language only. Switching language from here has no
// equivalent URL to go to, so the toggle falls back to that language's home
// (or blog index) instead of inventing a slug that 404s.
const SINGLE_LOCALE_FALLBACKS: Array<[RegExp, { bg: string; en: string }]> = [
  [/^\/(bg|en)\/blog\//, { bg: '/bg/blog', en: '/en/blog' }],
]

const LOCALIZED_PATHS = new Map<string, { bg: string; en: string }>(ROUTE_PAIRS)

export function getRouteLocale(pathname: string): RouteLocale | null {
  if (pathname === '/bg' || pathname.startsWith('/bg/')) return 'bg'
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  return null
}

export function getUiLanguageFromLocale(locale: RouteLocale): UiLanguage {
  return locale === 'bg' ? 'BG' : 'EN'
}

export function getLocaleLabel(locale: RouteLocale): string {
  return locale === 'bg' ? 'BG' : 'EN'
}

export function getLocalizedSwitchPath(pathname: string, targetLocale: RouteLocale): string {
  const pathWithoutHash = pathname.split('#')[0]
  const pair = LOCALIZED_PATHS.get(pathWithoutHash)

  if (pair) {
    return pair[targetLocale]
  }

  const currentLocale = getRouteLocale(pathWithoutHash)
  if (!currentLocale) {
    return pathWithoutHash
  }

  // No pair means the page exists in one language only — a single-locale
  // funnel page, or a post written in the admin panel. Swapping the prefix
  // would point at a slug that does not exist, so fall back to the nearest
  // page that does.
  for (const [pattern, fallback] of SINGLE_LOCALE_FALLBACKS) {
    if (pattern.test(pathWithoutHash)) return fallback[targetLocale]
  }
  return targetLocale === 'bg' ? '/bg' : '/en'
}

export function withLocalePrefix(path: string, locale: RouteLocale): string {
  if (!path.startsWith('/')) return path
  if (path === '/') return locale === 'bg' ? '/bg' : '/en'
  if (path.startsWith('/bg') || path.startsWith('/en')) return path
  if (path.startsWith('/blog')) return locale === 'bg' ? `/bg${path}` : `/en${path}`
  return `${locale === 'bg' ? '/bg' : '/en'}${path}`
}

export function getPolicyPath(locale: RouteLocale, type: 'privacy' | 'terms' | 'cookies'): string {
  if (locale === 'bg') {
    if (type === 'privacy') return '/politiki/poveritelnost'
    if (type === 'terms') return '/politiki/obshti-uslovia'
    return '/politiki/biskvitki'
  }

  if (type === 'privacy') return '/policies/privacy-policy'
  if (type === 'terms') return '/policies/terms-of-service'
  return '/policies/cookies'
}

export function absoluteUrl(path: string): string {
  return `${BASE_URL}${path}`
}

export function localizedAlternates(bgPath: string, enPath: string, canonicalLocale: RouteLocale) {
  return {
    canonical: absoluteUrl(canonicalLocale === 'bg' ? bgPath : enPath),
    languages: {
      bg: absoluteUrl(bgPath),
      en: absoluteUrl(enPath),
      'x-default': absoluteUrl('/bg'),
    },
  }
}

/** Facebook/LinkedIn/Viber expect the region-qualified form. */
export function getOgLocale(locale: RouteLocale): string {
  return locale === 'bg' ? 'bg_BG' : 'en_US'
}

// The shared card. og-image.png is the only raster social image in the repo,
// so it also stands in for pages whose own artwork is an SVG — Facebook and
// most other scrapers will not render SVG in a link preview.
const FALLBACK_OG_IMAGE = { url: '/img/og-image.png', width: 1536, height: 1024, alt: 'KARCHX' }

/**
 * Fill in Open Graph and Twitter card metadata from a page's existing title,
 * description, locale and path.
 *
 * Without this, every service page, article and tools page inherited the root
 * layout's card — English copy, `og:locale: en_US` — so sharing a Bulgarian
 * page anywhere showed an English preview.
 */
export function withSocialMetadata(
  meta: Metadata,
  {
    locale,
    path,
    type = 'website',
    image,
  }: { locale: RouteLocale; path: string; type?: 'website' | 'article'; image?: string }
): Metadata {
  if (meta.openGraph) return meta // an explicit card always wins

  const title = typeof meta.title === 'string' ? meta.title : undefined
  const description = typeof meta.description === 'string' ? meta.description : undefined
  const usable = image && !image.endsWith('.svg')
    ? [{ url: image, alt: title ?? 'KARCHX' }]
    : [FALLBACK_OG_IMAGE]

  return {
    ...meta,
    openGraph: {
      type,
      locale: getOgLocale(locale),
      alternateLocale: [getOgLocale(locale === 'bg' ? 'en' : 'bg')],
      url: absoluteUrl(path),
      siteName: 'KARCHX',
      title,
      description,
      images: usable,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: usable.map((i) => i.url),
    },
  }
}
