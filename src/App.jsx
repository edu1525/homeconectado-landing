import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Benefits from './components/Benefits'
import Testimonials from './components/Testimonials'
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
      <CTA />
      <Footer />
    </div>
  )
}

export default App
