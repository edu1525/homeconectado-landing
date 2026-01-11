import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { TuyaProvider } from '../../contexts/TuyaContext'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Dashboard from '../dashboard/Dashboard'
import LightingCommands from '../commands/LightingCommands'
import SecurityCommands from '../commands/SecurityCommands'
import AssistantCommands from '../commands/AssistantCommands'
import EnergyTips from '../commands/EnergyTips'
import TuyaConnection from '../tuya/TuyaConnection'
import TuyaDeviceControl from '../tuya/TuyaDeviceControl'
import { 
  Home, 
  Lightbulb, 
  Shield, 
  Volume2, 
  Zap, 
  Menu, 
  X,
  LogOut,
  ArrowLeft,
  Wifi
} from 'lucide-react'

const Platform = () => {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [authMode, setAuthMode] = useState('login')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Determinar aba ativa baseada na URL
  const getActiveTabFromPath = () => {
    const path = location.pathname.replace('/platform', '') || '/dashboard'
    return path.replace('/', '') || 'dashboard'
  }
  
  const activeTab = getActiveTabFromPath()
  
  // Em desktop, a sidebar deve estar sempre visível
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/platform/dashboard')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const handleTabChange = (tabId) => {
    navigate(`/platform/${tabId}`)
  }

  const handleBackToLanding = () => {
    navigate('/')
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'from-blue-400 to-blue-600' },
    { id: 'lighting', label: 'Iluminação', icon: Lightbulb, color: 'from-yellow-400 to-orange-500' },
    { id: 'security', label: 'Segurança', icon: Shield, color: 'from-red-400 to-red-600' },
    { id: 'assistant', label: 'Assistente', icon: Volume2, color: 'from-blue-400 to-blue-600' },
    { id: 'energy', label: 'Economia', icon: Zap, color: 'from-green-400 to-green-600' },
    { id: 'tuya', label: 'Tuya Smart', icon: Wifi, color: 'from-cyan-400 to-cyan-600' }
  ]

  const renderContent = () => {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lighting" element={<LightingCommands />} />
        <Route path="/security" element={<SecurityCommands />} />
        <Route path="/assistant" element={<AssistantCommands />} />
        <Route path="/energy" element={<EnergyTips />} />
        <Route path="/tuya" element={
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Tuya Smart</h2>
            <p className="text-gray-600 mb-4">Conecte sua conta Tuya para sincronizar dispositivos</p>
            <TuyaConnection />
          </div>
        } />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Home className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-blue via-brand-cyan via-brand-green to-brand-orange flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {authMode === 'login' ? (
              <Login key="login" onToggleMode={() => setAuthMode('register')} />
            ) : (
              <Register key="register" onToggleMode={() => setAuthMode('login')} />
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  return (
    <TuyaProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToLanding}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
              title="Voltar ao site"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">Home Conectado</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Sempre visível em desktop */}
        <div className="hidden lg:block w-64 bg-white shadow-lg border-r border-gray-200">
          <div className="h-full flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 font-poppins">
                    Home Conectado
                  </h1>
                  <p className="text-sm text-gray-500">Plataforma do Cliente</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === item.id
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sair</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Mobile */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-64 h-full bg-white shadow-lg">
              <div className="h-full flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-900 font-poppins">
                        Home Conectado
                      </h1>
                      <p className="text-sm text-gray-500">Plataforma do Cliente</p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleTabChange(item.id)
                        setSidebarOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === item.id
                          ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sair</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
    </TuyaProvider>
  )
}

export default Platform
