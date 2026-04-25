import type { Metadata } from 'next'
import BlogPostClient from './BlogPostClient'

export const metadata: Metadata = {
  title: 'Колко струва сайт за малък бизнес в България — честен отговор | Karchev',
  description: 'Цените за уебсайт варират от 150€ до 5000€. Ето честен разбор на трите варианта, скритите разходи и как да избереш правилното решение за твоя бизнес.',
  keywords: [
    'колко струва сайт',
    'цена сайт малък бизнес',
    'уебсайт цена българия',
    'сайт за малък бизнес',
    'персонализиран сайт цена',
    'web design price bulgaria',
    'website cost small business',
    'affordable website bulgaria',
    'уеб разработка цени',
    'landing page цена',
  ],
  authors: [{ name: 'Georgi Karchev', url: 'https://www.karchx.com' }],
  openGraph: {
    type: 'article',
    locale: 'bg_BG',
    alternateLocale: ['en_US'],
    url: 'https://www.karchx.com/blog/kolko-struva-sait-za-malak-biznes',
    title: 'Колко струва сайт за малък бизнес в България — честен отговор',
    description: 'Цените за уебсайт варират от 150€ до 5000€. Ето честен разбор на трите варианта и скритите разходи.',
    siteName: 'Karchev',
    images: [
      {
        url: '/blogimg.png',
        width: 1200,
        height: 675,
        alt: 'Колко струва сайт за малък бизнес в България — Karchev',
      },
    ],
    publishedTime: '2026-04-25T00:00:00.000Z',
    authors: ['Georgi Karchev'],
    tags: ['уеб разработка', 'цени', 'малък бизнес', 'website cost'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Колко струва сайт за малък бизнес в България — честен отговор',
    description: 'Цените за уебсайт варират от 150€ до 5000€. Ето честен разбор на трите варианта и скритите разходи.',
    images: ['/blogimg.png'],
  },
  alternates: {
    canonical: 'https://www.karchx.com/blog/kolko-struva-sait-za-malak-biznes',
    languages: {
      'bg': 'https://www.karchx.com/blog/kolko-struva-sait-za-malak-biznes',
      'en': 'https://www.karchx.com/blog/kolko-struva-sait-za-malak-biznes',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BlogPost() {
  return <BlogPostClient />
}
