import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Camera, 
  Bell, 
  Copy, 
  Check, 
  Volume2,
  AlertTriangle,
  Eye,
  Home,
  Users
} from 'lucide-react'

const SecurityCommands = () => {
  const [copiedCommand, setCopiedCommand] = useState(null)

  const commandCategories = [
    {
      title: 'Sistema de Alarme',
      icon: Shield,
      color: 'from-red-400 to-red-600',
      commands: [
        {
          text: 'Alexa, ative o alarme',
          description: 'Ativa o sistema de segurança completo',
          difficulty: 'Fácil',
          importance: 'Alta'
        },
        {
          text: 'Alexa, desative o alarme',
          description: 'Desativa o sistema de segurança',
          difficulty: 'Fácil',
          importance: 'Alta'
        },
        {
          text: 'Alexa, ative o modo casa',
          description: 'Ativa sensores externos apenas',
          difficulty: 'Médio',
          importance: 'Média'
        },
        {
          text: 'Alexa, ative o modo ausente',
          description: 'Ativa todos os sensores de segurança',
          difficulty: 'Médio',
          importance: 'Média'
        }
      ]
    },
    {
      title: 'Câmeras de Segurança',
      icon: Camera,
      color: 'from-blue-400 to-blue-600',
      commands: [
        {
          text: 'Alexa, mostre a câmera da frente',
          description: 'Exibe feed da câmera frontal',
          difficulty: 'Fácil',
          importance: 'Média'
        },
        {
          text: 'Alexa, mostre a câmera do quintal',
          description: 'Exibe feed da câmera traseira',
          difficulty: 'Fácil',
          importance: 'Média'
        },
        {
          text: 'Alexa, grave a câmera da frente',
          description: 'Inicia gravação da câmera frontal',
          difficulty: 'Médio',
          importance: 'Média'
        },
        {
          text: 'Alexa, pare a gravação',
          description: 'Para todas as gravações ativas',
          difficulty: 'Médio',
          importance: 'Média'
        }
      ]
    },
    {
      title: 'Notificações e Alertas',
      icon: Bell,
      color: 'from-yellow-400 to-orange-500',
      commands: [
        {
          text: 'Alexa, silencie os alertas',
          description: 'Desativa notificações sonoras',
          difficulty: 'Fácil',
          importance: 'Baixa'
        },
        {
          text: 'Alexa, ative os alertas',
          description: 'Reativa notificações sonoras',
          difficulty: 'Fácil',
          importance: 'Baixa'
        },
        {
          text: 'Alexa, status da segurança',
          description: 'Verifica estado atual do sistema',
          difficulty: 'Fácil',
          importance: 'Média'
        },
        {
          text: 'Alexa, última atividade',
          description: 'Mostra última detecção de movimento',
          difficulty: 'Médio',
          importance: 'Média'
        }
      ]
    },
    {
      title: 'Controle de Acesso',
      icon: Lock,
      color: 'from-purple-400 to-purple-600',
      commands: [
        {
          text: 'Alexa, destranque a porta da frente',
          description: 'Abre a fechadura inteligente',
          difficulty: 'Fácil',
          importance: 'Alta'
        },
        {
          text: 'Alexa, tranque a porta da frente',
          description: 'Fecha a fechadura inteligente',
          difficulty: 'Fácil',
          importance: 'Alta'
        },
        {
          text: 'Alexa, destranque o portão',
          description: 'Abre o portão automático',
          difficulty: 'Fácil',
          importance: 'Média'
        },
        {
          text: 'Alexa, tranque o portão',
          description: 'Fecha o portão automático',
          difficulty: 'Fácil',
          importance: 'Média'
        }
      ]
    }
  ]

  const securityTips = [
    {
      icon: AlertTriangle,
      title: 'Dica de Segurança',
      description: 'Sempre verifique se o alarme está ativado antes de sair de casa.'
    },
    {
      icon: Eye,
      title: 'Monitoramento',
      description: 'Configure alertas para receber notificações de movimento quando estiver ausente.'
    },
    {
      icon: Users,
      title: 'Acesso Familiar',
      description: 'Configure códigos de acesso para membros da família.'
    }
  ]

  const copyToClipboard = async (command) => {
    try {
      await navigator.clipboard.writeText(command)
      setCopiedCommand(command)
      setTimeout(() => setCopiedCommand(null), 2000)
    } catch (error) {
      console.error('Erro ao copiar:', error)
    }
  }

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'Alta': return 'bg-red-100 text-red-700'
      case 'Média': return 'bg-yellow-100 text-yellow-700'
      case 'Baixa': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
          Comandos de Segurança
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Controle seu sistema de segurança com comandos de voz para a Alexa. 
          Mantenha sua casa protegida com comandos simples e eficazes.
        </p>
      </motion.div>

      {/* Command Categories */}
      <div className="space-y-12">
        {commandCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            {/* Category Header */}
            <div className={`bg-gradient-to-r ${category.color} p-6`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-poppins">
                    {category.title}
                  </h2>
                  <p className="text-white/80">
                    {category.commands.length} comandos disponíveis
                  </p>
                </div>
              </div>
            </div>

            {/* Commands Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.commands.map((command, commandIndex) => (
                  <motion.div
                    key={commandIndex}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-red-300 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-1">
                          {command.text}
                        </p>
                        <p className="text-sm text-gray-600">
                          {command.description}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(command.text)}
                        className="ml-3 p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                      >
                        {copiedCommand === command.text ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          command.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                          command.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {command.difficulty}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(command.importance)}`}>
                          {command.importance}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Volume2 className="w-3 h-3" />
                        <span>Comando de voz</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Security Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-poppins">
          Dicas de Segurança
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {securityTips.map((tip, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-4">
                <tip.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {tip.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {tip.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default SecurityCommands
