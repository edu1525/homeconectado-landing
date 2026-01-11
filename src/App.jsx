import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Benefits from './components/Benefits'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import Platform from './components/platform/Platform'
import AdminPanel from './components/admin/AdminPanel'

// Componente para a Landing Page
const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Benefits />
      <Testimonials />
      <CTA />
      <Footer />
      <CookieConsent />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota principal - Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Rota da plataforma do cliente */}
        <Route 
          path="/platform/*" 
          element={
            <AuthProvider>
              <Platform />
            </AuthProvider>
          } 
        />
        
        {/* Rota do painel administrativo */}
        <Route path="/admin/*" element={<AdminPanel />} />
        
        {/* Redirecionamento para landing page se rota não encontrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App