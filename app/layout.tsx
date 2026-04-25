import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.karchx.com'),
  icons: {
    icon: '/img/newfav.png',
    apple: '/img/newfav.png',
    shortcut: '/img/newfav.png',
  },
  title: {
    default: 'Karchev | Съдържание и Сайтове, които продават',
    template: '%s | Karchev'
  },
  description: 'Правим съдържание и сайтове за бизнеси в България — от идея до публикация. Контент производство, уеб разработка и автоматизации.',
  keywords: [
    'уеб разработка българия',
    'контент производство',
    'видео производство',
    'онлайн магазин',
    'landing page',
    'дигитална агенция',
    'сайт за бизнес',
    'уеб дизайн',
    'социални мрежи',
    'Karchev'
  ],
  authors: [{ name: 'Georgi Karchev', url: 'https://www.karchx.com' }],
  creator: 'Georgi Karchev',
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    url: 'https://www.karchx.com',
    title: 'Karchev | Съдържание и Сайтове, които продават',
    description: 'Правим съдържание и сайтове за бизнеси в България. Запази безплатна консултация.',
    siteName: 'Karchev',
    images: [
      {
        url: '/img/azseriozen_optimized_1000.jpg',
        width: 1000,
        height: 1000,
        alt: 'Georgi Karchev - Дигитална Агенция България',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karchev | Съдържание и Сайтове, които продават',
    description: 'Правим съдържание и сайтове за бизнеси в България.',
    images: ['/img/azseriozen_optimized_1000.jpg'],
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
    canonical: 'https://www.karchx.com',
  },
  verification: {
    google: 'GjxFoZiqby4aaoCuqQjHBZP4UCAFUwn7Yn9l5MIIdgI',
  },
}

import { LanguageProvider } from '@/context/LanguageContext'
import CookieBanner from '@/components/CookieBanner'
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg" className="scroll-smooth overflow-x-hidden">
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
                '@type': 'LocalBusiness',
                name: 'Karchev',
                url: 'https://www.karchx.com',
                image: 'https://www.karchx.com/img/azseriozen_optimized_1000.jpg',
                description: 'Дигитална агенция в България, специализирана в контент производство и уеб разработка за малки, средни и големи бизнеси.',
                areaServed: 'Bulgaria',
                founder: {
                  '@type': 'Person',
                  name: 'Georgi Karchev',
                  sameAs: [
                    'https://www.linkedin.com/in/georgi-karchev-415901244/',
                    'https://github.com/GeorgiKarchev1',
                  ],
                },
                hasOfferCatalog: {
                  '@type': 'OfferCatalog',
                  name: 'Услуги',
                  itemListElement: [
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Service',
                        name: 'Контент Производство',
                        description: 'Видео съдържание от идея до публикация за социалните мрежи.',
                      },
                    },
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Service',
                        name: 'Уеб Разработка',
                        description: 'Landing страници, онлайн магазини и уеб автоматизации.',
                      },
                    },
                  ],
                },
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
