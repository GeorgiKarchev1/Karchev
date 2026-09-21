import type { Metadata } from 'next'
import './globals.css'
import './studio.css'
import './hero.css'
import ConsentAnalytics from '@/components/site/ConsentAnalytics'
import { Inter, Space_Grotesk, Manrope } from 'next/font/google'
import { LanguageProvider } from '@/context/LanguageContext'
import CookieBanner from '@/components/CookieBanner'
import { CONTACT_EMAIL } from '@/lib/contact-info'
import { BASE_URL } from '@/lib/site'

// Self-hosted via next/font: no render-blocking request to fonts.googleapis.com
// (which the CSP also blocks), no layout shift, and the files are preloaded.
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const marketing = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-marketing',
  display: 'swap',
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: '/img/newfav.png',
    apple: '/img/newfav.png',
    shortcut: '/img/newfav.png',
  },
  title: {
    default: 'KARCHX | Growth Systems',
    template: '%s | KARCHX'
  },
  description: 'Growth systems for established businesses. Find the gaps between marketing and sales, implement focused improvements and measure the results.',
  keywords: [
    'growth systems',
    'growth consulting',
    'sales process improvement',
    'growth sprint',
    'business process automation',
    'KARCHX',
  ],
  authors: [{ name: 'Georgi Karchev', url: BASE_URL }],
  creator: 'Georgi Karchev',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['bg_BG'],
    url: BASE_URL,
    title: 'KARCHX | Growth Systems',
    description: 'Connect your offer, marketing, sales and team with a practical growth system.',
    siteName: 'KARCHX',
    images: [
      {
        url: '/img/og-image.png',
        width: 1536,
        height: 1024,
        alt: 'KARCHX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KARCHX | Growth Systems',
    description: 'Growth diagnosis, focused implementation and ongoing improvement for your business.',
    images: ['/img/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: 'GjxFoZiqby4aaoCuqQjHBZP4UCAFUwn7Yn9l5MIIdgI',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // lang is Bulgarian here because BG is the primary market and every
  // non-localised route is Bulgarian. The /en and /policies subtrees correct
  // it in their own layouts.
  return (
    <html lang="bg" className={`${inter.variable} ${spaceGrotesk.variable} ${marketing.variable} scroll-smooth overflow-x-hidden`}>
      <body className="font-sans antialiased text-white overflow-x-hidden">
        <ConsentAnalytics />
        <LanguageProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                  {
                    '@type': 'Organization',
                    name: 'KARCHX',
                    telephone: '+359895739335',
                    email: CONTACT_EMAIL,
                    url: BASE_URL,
                    logo: `${BASE_URL}/img/newfav.png`,
                    image: `${BASE_URL}/img/og-image.png`,
                    founder: {
                      '@type': 'Person',
                      name: 'Georgi Karchev',
                      sameAs: [
                        'https://www.linkedin.com/in/georgi-karchev-415901244/',
                        'https://github.com/GeorgiKarchev1',
                      ],
                    },
                    sameAs: [
                      'https://www.linkedin.com/in/georgi-karchev-415901244/',
                      'https://github.com/GeorgiKarchev1',
                    ],
                  },
                  {
                    '@type': 'ProfessionalService',
                    '@id': `${BASE_URL}/#business`,
                    name: 'KARCHX',
                    telephone: '+359895739335',
                    email: CONTACT_EMAIL,
                    // Point at /bg, not the bare domain: the root only 308s here.
                    url: `${BASE_URL}/bg`,
                    image: `${BASE_URL}/img/og-image.png`,
                    priceRange: '\u20AC\u20AC',
                    // Bulgaria is the primary market, so say so in a typed way
                    // rather than as a bare string.
                    address: {
                      '@type': 'PostalAddress',
                      addressCountry: 'BG',
                    },
                    areaServed: [
                      { '@type': 'Country', name: 'Bulgaria' },
                    ],
                    inLanguage: ['bg-BG', 'en-US'],
                    serviceType: [
                      'Growth diagnosis and strategy',
                      'Growth sprint implementation',
                      'Sales process improvement',
                      'Marketing and content systems',
                      'Business process automation',
                    ],
                    founder: {
                      '@type': 'Person',
                      name: 'Georgi Karchev',
                    },
                  },
                  {
                    '@type': 'WebSite',
                    '@id': `${BASE_URL}/#website`,
                    name: 'KARCHX',
                    url: BASE_URL,
                    inLanguage: 'bg-BG',
                    publisher: { '@id': `${BASE_URL}/#business` },
                  },
                ],
              }),
            }}
          />
          {children}
  
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  )
}
