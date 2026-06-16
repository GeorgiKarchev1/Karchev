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
  ['/bg/kazusi', { bg: '/bg/kazusi', en: '/en/case-studies' }],
  ['/en/case-studies', { bg: '/bg/kazusi', en: '/en/case-studies' }],
  ['/bg/kazusi/editing-bg', { bg: '/bg/kazusi/editing-bg', en: '/en/case-studies/editing-bg' }],
  ['/en/case-studies/editing-bg', { bg: '/bg/kazusi/editing-bg', en: '/en/case-studies/editing-bg' }],
  ['/bg/kazusi/yordan-kolev', { bg: '/bg/kazusi/yordan-kolev', en: '/en/case-studies/yordan-kolev' }],
  ['/en/case-studies/yordan-kolev', { bg: '/bg/kazusi/yordan-kolev', en: '/en/case-studies/yordan-kolev' }],
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

export function getHtmlLang(locale: RouteLocale | null): string {
  return locale === 'en' ? 'en' : 'bg'
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

  const stripped = pathWithoutHash.replace(/^\/(bg|en)/, '')
  return `${targetLocale === 'bg' ? '/bg' : '/en'}${stripped || ''}`
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
