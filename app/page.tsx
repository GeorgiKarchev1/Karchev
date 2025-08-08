'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Footer />
    </main>
  )
}