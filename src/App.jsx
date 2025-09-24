import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Benefits from './components/Benefits'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import HelpCenter from './components/HelpCenter'
import Warranty from './components/Warranty'
import TechnicalSupport from './components/TechnicalSupport'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Benefits />
      <Testimonials />
      <FAQ />
      <HelpCenter />
      <Warranty />
      <TechnicalSupport />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
