import type { Metadata } from 'next'
import './globals.css'
import './studio.css'
import Script from 'next/script'
import { Inter, Space_Grotesk, Manrope } from 'next/font/google'
import { LanguageProvider } from '@/context/LanguageContext'
import CookieBanner from '@/components/CookieBanner'
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
    default: 'KARCHX | Your Personalised AI Agent',
    template: '%s | KARCHX'
  },
  description: 'One AI agent built specifically for you. Your tasks, your tools and your rules, with a personal approach from our first conversation to setup.',
  keywords: [
    'personalised ai agent',
    'custom ai agent',
    'ai integration',
    'ai automation for business',
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
    title: 'KARCHX | Your Personalised AI Agent',
    description: 'One AI agent configured around your tasks, information and tools. Built individually by KARCHX.',
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
    title: 'KARCHX | Your Personalised AI Agent',
    description: 'Your own AI agent, built around your tasks and tools.',
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
      <head>
        {/* The analytics scripts below load afterInteractive; warming DNS+TLS
            here takes the handshake off their critical path. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="" />
      </head>
      <body className="font-sans antialiased text-white overflow-x-hidden">
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wh7c0g9u2q");
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HYR74PQ33D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HYR74PQ33D');
          `}
        </Script>
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
                      { '@type': 'Country', name: 'United States' },
                    ],
                    inLanguage: ['bg-BG', 'en-US'],
                    serviceType: [
                      'Custom AI agents',
                      'AI integration',
                      'Business process automation',
                      'Website development',
                      'Landing page development',
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
