import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AdminProvider } from '../../contexts/AdminContext'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import DeviceManagement from './DeviceManagement'
import ClientDetails from './ClientDetails'
import { 
  Smartphone, 
  Volume2, 
  Clock, 
  Palette,
  Settings,
  BarChart3,
  ArrowLeft
} from 'lucide-react'

const AdminPanel = () => {
  const [adminUser, setAdminUser] = useState(null)
  const [selectedClient, setSelectedClient] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  
  // Determinar aba ativa baseada na URL
  const getActiveTabFromPath = () => {
    const path = location.pathname.replace('/admin', '') || '/dashboard'
    return path.replace('/', '') || 'dashboard'
  }
  
  const activeTab = getActiveTabFromPath()

  // Verificar se há admin logado no localStorage
  useEffect(() => {
    const savedAdmin = localStorage.getItem('adminUser')
    if (savedAdmin) {
      try {
        const adminData = JSON.parse(savedAdmin)
        setAdminUser(adminData)
      } catch (error) {
        console.error('Erro ao carregar dados do admin:', error)
        localStorage.removeItem('adminUser')
      }
    }
    setLoading(false)
  }, [])

  const handleLogin = (user) => {
    setAdminUser(user)
    // Salvar no localStorage para persistência
    localStorage.setItem('adminUser', JSON.stringify(user))
  }

  const handleLogout = () => {
    setAdminUser(null)
    setSelectedClient(null)
    setActiveTab('dashboard')
    // Remover do localStorage
    localStorage.removeItem('adminUser')
  }

  const handleClientSelect = (client) => {
    setSelectedClient(client)
    setShowDeviceManagement(true)
  }

  const handleViewClientDetails = (client) => {
    setSelectedClient(client)
    setShowClientDetails(true)
  }

  const handleTabChange = (tabId) => {
    navigate(`/admin/${tabId}`)
  }

  const handleBackToLanding = () => {
    navigate('/')
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'devices', label: 'Dispositivos', icon: Smartphone },
    { id: 'commands', label: 'Comandos', icon: Volume2 },
    { id: 'routines', label: 'Rotinas', icon: Clock },
    { id: 'scenes', label: 'Cenas', icon: Palette },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ]

  if (!adminUser) {
    return <AdminLogin onLogin={handleLogin} />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 font-poppins">
                    Painel Administrativo
                  </h1>
                  <p className="text-sm text-gray-500">Home Conectado</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleBackToLanding}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  title="Voltar ao site"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Voltar ao Site</span>
                </button>
                
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {adminUser.username}
                  </p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                >
                  <span className="text-sm font-medium">Sair</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen">
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={
                <AdminDashboard 
                  adminUser={adminUser} 
                  onLogout={handleLogout}
                  onClientSelect={handleClientSelect}
                  onViewClientDetails={handleViewClientDetails}
                />
              } />
              <Route path="/dashboard" element={
                <AdminDashboard 
                  adminUser={adminUser} 
                  onLogout={handleLogout}
                  onClientSelect={handleClientSelect}
                  onViewClientDetails={handleViewClientDetails}
                />
              } />
            
              <Route path="/devices" element={
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Gerenciamento de Dispositivos
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Selecione um cliente no dashboard para gerenciar seus dispositivos.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Smartphone className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-blue-900">Como Funciona</h3>
                    </div>
                    <ol className="list-decimal list-inside space-y-2 text-blue-800">
                      <li>Vá para a aba "Dashboard"</li>
                      <li>Clique no ícone de smartphone ao lado do cliente</li>
                      <li>Gerencie os dispositivos específicos daquele cliente</li>
                      <li>Adicione, edite ou remova dispositivos conforme necessário</li>
                    </ol>
                  </div>
                </div>
              } />
              
              <Route path="/commands" element={
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Gerenciamento de Comandos
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Gerencie comandos personalizados para cada cliente.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Volume2 className="w-6 h-6 text-green-600" />
                      <h3 className="text-lg font-semibold text-green-900">Comandos Personalizados</h3>
                    </div>
                    <p className="text-green-800">
                      Cada cliente pode ter comandos únicos baseados em seus dispositivos específicos. 
                      Os comandos são criados automaticamente baseados nos dispositivos cadastrados.
                    </p>
                  </div>
                </div>
              } />
              
              <Route path="/routines" element={
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Gerenciamento de Rotinas
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Configure rotinas automáticas para os clientes.
                  </p>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-6 h-6 text-purple-600" />
                      <h3 className="text-lg font-semibold text-purple-900">Rotinas Inteligentes</h3>
                    </div>
                    <p className="text-purple-800">
                      Crie rotinas personalizadas para cada cliente baseadas em seus dispositivos e preferências. 
                      Ex: "Boa noite" que desliga todas as luzes e ativa o alarme.
                    </p>
                  </div>
                </div>
              } />
              
              <Route path="/scenes" element={
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Gerenciamento de Cenas
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Crie e gerencie cenas personalizadas por cliente.
                  </p>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Palette className="w-6 h-6 text-orange-600" />
                      <h3 className="text-lg font-semibold text-orange-900">Cenas Personalizadas</h3>
                    </div>
                    <p className="text-orange-800">
                      Configure cenas específicas para cada ambiente do cliente. 
                      Ex: "Modo Cinema", "Modo Relaxamento", "Modo Festa".
                    </p>
                  </div>
                </div>
              } />
              
              <Route path="/settings" element={
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Configurações do Sistema
                  </h2>
                  <p className="text-gray-600">
                    Configure as opções do sistema administrativo.
                  </p>
                </div>
              } />
              
              <Route path="*" element={
                <AdminDashboard 
                  adminUser={adminUser} 
                  onLogout={handleLogout}
                  onClientSelect={handleClientSelect}
                  onViewClientDetails={handleViewClientDetails}
                />
              } />
            </Routes>
          </div>
        </div>

        {/* Device Management Modal */}
        {showDeviceManagement && selectedClient && (
          <DeviceManagement
            client={selectedClient}
            onClose={() => {
              setShowDeviceManagement(false)
              setSelectedClient(null)
            }}
          />
        )}

        {/* Client Details Modal */}
        {showClientDetails && selectedClient && (
          <ClientDetails
            client={selectedClient}
            onClose={() => {
              setShowClientDetails(false)
              setSelectedClient(null)
            }}
          />
        )}
      </div>
    </AdminProvider>
  )
}

export default AdminPanel
