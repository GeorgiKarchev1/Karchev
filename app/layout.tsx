import type { Metadata } from 'next'
import './globals.css'
import { headers } from 'next/headers'
import Script from 'next/script'
import { LanguageProvider } from '@/context/LanguageContext'
import CookieBanner from '@/components/CookieBanner'
import { BASE_URL, getHtmlLang } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: '/img/newfav.png',
    apple: '/img/newfav.png',
    shortcut: '/img/newfav.png',
  },
  title: {
    default: 'Karchev | Websites, Content & AI Systems for Growth',
    template: '%s | Karchev'
  },
  description: 'Karchev builds conversion-focused websites, content systems, and AI automations for businesses in Bulgaria and international markets.',
  keywords: [
    'website development bulgaria',
    'landing page development',
    'content production',
    'ai automation for business',
    'small business website',
    'Karchev',
  ],
  authors: [{ name: 'Georgi Karchev', url: BASE_URL }],
  creator: 'Georgi Karchev',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['bg_BG'],
    url: BASE_URL,
    title: 'Karchev | Websites, Content & AI Systems for Growth',
    description: 'Conversion-focused websites, content production, and AI automation for businesses in Bulgaria and beyond.',
    siteName: 'Karchev',
    images: [
      {
        url: '/img/og-image.png',
        width: 1536,
        height: 1024,
        alt: 'Karchev',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karchev | Websites, Content & AI Systems for Growth',
    description: 'Conversion-focused websites, content production, and AI automation for businesses.',
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
  const localeHeader = headers().get('x-site-locale')
  const htmlLang = getHtmlLang(localeHeader === 'en' ? 'en' : localeHeader === 'bg' ? 'bg' : null)
  const initialLanguage = htmlLang === 'en' ? 'EN' : 'BG'

  return (
    <html lang={htmlLang} className="scroll-smooth overflow-x-hidden">
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
        <LanguageProvider initialLanguage={initialLanguage}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                  {
                    '@type': 'Organization',
                    name: 'Karchev',
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
                    name: 'Karchev',
                    url: BASE_URL,
                    image: `${BASE_URL}/img/og-image.png`,
                    areaServed: ['Bulgaria', 'United States'],
                    serviceType: [
                      'Website development',
                      'Landing page development',
                      'Content production',
                      'AI automation',
                    ],
                    founder: {
                      '@type': 'Person',
                      name: 'Georgi Karchev',
                    },
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
