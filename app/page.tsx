import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import HowItWorks from '@/components/HowItWorks'
import About from '@/components/About'
import WhoItsFor from '@/components/WhoItsFor'
import Contact from '@/components/Contact'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f1f0ea] text-[#2d232e] selection:bg-[#534b52]/30 selection:text-[#f1f0ea]">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <WhoItsFor />
      <Contact />
      <About />
      <FinalCTA />
      <Footer />
    </main>
  )
}