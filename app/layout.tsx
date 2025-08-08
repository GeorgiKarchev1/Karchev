import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Karchev - Full Stack Developer',
  description: 'Personal portfolio of Karchev, a passionate full stack developer from Bulgaria specializing in modern web technologies and video editing platforms.',
  keywords: 'developer, portfolio, full stack, web development, react, next.js, video editing, bulgaria',
  authors: [{ name: 'Karchev' }],
  openGraph: {
    title: 'Karchev - Full Stack Developer',
    description: 'Personal portfolio showcasing modern web development projects and video editing platforms',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}