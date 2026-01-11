import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { 
  Home, 
  LogOut, 
  Settings, 
  Lightbulb, 
  Shield, 
  Volume2, 
  Zap,
  ChevronRight,
  Star,
  Clock,
  User
} from 'lucide-react'

const Dashboard = () => {
  const { user, userData, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const quickActions = [
    {
      icon: Lightbulb,
      title: 'Comandos de Iluminação',
      description: 'Controle suas luzes com a Alexa',
      color: 'from-yellow-400 to-orange-500',
      href: '#lighting'
    },
    {
      icon: Shield,
      title: 'Sistema de Segurança',
      description: 'Comandos de segurança e monitoramento',
      color: 'from-red-400 to-red-600',
      href: '#security'
    },
    {
      icon: Volume2,
      title: 'Assistente Virtual',
      description: 'Comandos para Alexa e Google',
      color: 'from-blue-400 to-blue-600',
      href: '#assistant'
    },
    {
      icon: Zap,
      title: 'Economia de Energia',
      description: 'Dicas para otimizar o consumo',
      color: 'from-green-400 to-green-600',
      href: '#energy'
    }
  ]

  const recentCommands = [
    { command: 'Alexa, acenda a luz da sala', time: '2 min atrás', type: 'lighting' },
    { command: 'Alexa, ative o modo segurança', time: '1 hora atrás', type: 'security' },
    { command: 'Alexa, qual a temperatura?', time: '3 horas atrás', type: 'assistant' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 font-poppins">
                  Home Conectado
                </h1>
                <p className="text-sm text-gray-500">Painel do Cliente</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {userData?.name || 'Cliente'}
                  </p>
                  <p className="text-xs text-gray-500">{userData?.email}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-poppins">
            Bem-vindo, {userData?.name?.split(' ')[0] || 'Cliente'}! 👋
          </h2>
          <p className="text-gray-600">
            Gerencie sua automação residencial e descubra novos comandos para sua Alexa.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6 font-poppins">
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
                onClick={() => setActiveTab(action.href.replace('#', ''))}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {action.title}
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  {action.description}
                </p>
                <div className="flex items-center text-brand-blue text-sm font-medium">
                  <span>Acessar</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Commands */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 font-poppins">
                Comandos Recentes
              </h3>
              <div className="space-y-4">
                {recentCommands.map((cmd, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                      <Volume2 className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{cmd.command}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{cmd.time}</span>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-medium rounded-full">
                      {cmd.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Installation Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">
                Sua Instalação
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Home className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Endereço</p>
                    <p className="text-xs text-gray-500">{userData?.address || 'Não informado'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Instalado em</p>
                    <p className="text-xs text-gray-500">
                      {userData?.installationDate ? 
                        new Date(userData.installationDate).toLocaleDateString('pt-BR') : 
                        'Não informado'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-brand-blue to-brand-green rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6" />
                <h3 className="text-lg font-semibold font-poppins">
                  Dica do Dia
                </h3>
              </div>
              <p className="text-sm opacity-90">
                Use "Alexa, crie uma rotina" para automatizar múltiplos dispositivos com um único comando.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
