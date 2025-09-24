import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie, Settings, Check } from 'lucide-react'

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true,
    performance: false,
    functionality: false,
    marketing: false
  })

  useEffect(() => {
    // Verificar se o usuário já deu consentimento
    const consent = localStorage.getItem('cookieConsent')
    console.log('Cookie consent check:', consent)
    if (!consent) {
      console.log('Showing cookie banner')
      setShowBanner(true)
    } else {
      console.log('Cookie consent already given, not showing banner')
    }
  }, [])

  const handleAcceptAll = () => {
    const allPreferences = {
      essential: true,
      performance: true,
      functionality: true,
      marketing: true
    }
    setPreferences(allPreferences)
    saveConsent(allPreferences)
    setShowBanner(false)
  }

  const handleAcceptEssential = () => {
    const essentialOnly = {
      essential: true,
      performance: false,
      functionality: false,
      marketing: false
    }
    setPreferences(essentialOnly)
    saveConsent(essentialOnly)
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    saveConsent(preferences)
    setShowBanner(false)
    setShowSettings(false)
  }

  const saveConsent = (prefs) => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      preferences: prefs,
      timestamp: new Date().toISOString()
    }))
  }

  const togglePreference = (key) => {
    if (key === 'essential') return // Essential cookies não podem ser desabilitados
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  console.log('CookieConsent render - showBanner:', showBanner)
  if (!showBanner) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {!showSettings ? (
              // Banner Principal
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-brand-blue to-brand-green rounded-xl flex items-center justify-center flex-shrink-0">
                    <Cookie className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-poppins">
                      🍪 Utilizamos cookies para melhorar sua experiência
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Utilizamos cookies essenciais para o funcionamento do site e cookies opcionais para análise e personalização. 
                      Você pode escolher quais tipos de cookies aceitar.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleAcceptAll}
                        className="bg-gradient-to-r from-brand-blue to-brand-green text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center"
                      >
                        <Check className="w-4 h-4" />
                        Aceitar Todos
                      </button>
                      
                      <button
                        onClick={handleAcceptEssential}
                        className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-gray-400 transition-colors duration-300"
                      >
                        Apenas Essenciais
                      </button>
                      
                      <button
                        onClick={() => setShowSettings(true)}
                        className="border-2 border-brand-blue text-brand-blue px-6 py-3 rounded-xl font-semibold hover:bg-brand-blue hover:text-white transition-all duration-300 flex items-center gap-2 justify-center"
                      >
                        <Settings className="w-4 h-4" />
                        Personalizar
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleAcceptEssential}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              // Configurações Detalhadas
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 font-poppins">
                    Configurações de Cookies
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Cookies Essenciais */}
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Cookies Essenciais</h4>
                        <p className="text-sm text-gray-600">Necessários para o funcionamento básico do site</p>
                      </div>
                      <div className="w-12 h-6 bg-brand-green rounded-full flex items-center justify-end px-1">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Estes cookies são obrigatórios e não podem ser desabilitados. Incluem cookies de sessão, segurança e funcionalidades básicas.
                    </p>
                  </div>

                  {/* Cookies de Performance */}
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Cookies de Performance</h4>
                        <p className="text-sm text-gray-600">Nos ajudam a entender como você usa o site</p>
                      </div>
                      <button
                        onClick={() => togglePreference('performance')}
                        className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${
                          preferences.performance ? 'bg-brand-blue justify-end' : 'bg-gray-300 justify-start'
                        }`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Incluem Google Analytics e outras ferramentas de análise que nos ajudam a melhorar o site.
                    </p>
                  </div>

                  {/* Cookies de Funcionalidade */}
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Cookies de Funcionalidade</h4>
                        <p className="text-sm text-gray-600">Lembram suas preferências e personalizam sua experiência</p>
                      </div>
                      <button
                        onClick={() => togglePreference('functionality')}
                        className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${
                          preferences.functionality ? 'bg-brand-blue justify-end' : 'bg-gray-300 justify-start'
                        }`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Salvam suas preferências de idioma, tema e outras configurações personalizadas.
                    </p>
                  </div>

                  {/* Cookies de Marketing */}
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Cookies de Marketing</h4>
                        <p className="text-sm text-gray-600">Usados para exibir anúncios relevantes</p>
                      </div>
                      <button
                        onClick={() => togglePreference('marketing')}
                        className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${
                          preferences.marketing ? 'bg-brand-blue justify-end' : 'bg-gray-300 justify-start'
                        }`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Permitem que mostremos anúncios mais relevantes e medimos a eficácia de nossas campanhas.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSavePreferences}
                    className="bg-gradient-to-r from-brand-blue to-brand-green text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center"
                  >
                    <Check className="w-4 h-4" />
                    Salvar Preferências
                  </button>
                  
                  <button
                    onClick={handleAcceptAll}
                    className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-gray-400 transition-colors duration-300"
                  >
                    Aceitar Todos
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Para mais informações, consulte nossa{' '}
                  <a href="/cookies.html" className="text-brand-blue hover:text-brand-green transition-colors duration-300">
                    Política de Cookies
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CookieConsent
