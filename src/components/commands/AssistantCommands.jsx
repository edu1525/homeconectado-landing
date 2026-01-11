import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Volume2, 
  Mic, 
  Brain, 
  Clock, 
  Copy, 
  Check, 
  Music,
  Sun,
  Cloud,
  Home,
  Calendar,
  MessageSquare
} from 'lucide-react'

const AssistantCommands = () => {
  const [copiedCommand, setCopiedCommand] = useState(null)

  const commandCategories = [
    {
      title: 'Informações da Casa',
      icon: Home,
      color: 'from-blue-400 to-blue-600',
      commands: [
        {
          text: 'Alexa, qual a temperatura da casa?',
          description: 'Verifica temperatura atual',
          difficulty: 'Fácil',
          category: 'Temperatura'
        },
        {
          text: 'Alexa, qual a umidade?',
          description: 'Verifica umidade do ambiente',
          difficulty: 'Fácil',
          category: 'Ambiente'
        },
        {
          text: 'Alexa, como está o clima?',
          description: 'Previsão do tempo atual',
          difficulty: 'Fácil',
          category: 'Clima'
        },
        {
          text: 'Alexa, que horas são?',
          description: 'Horário atual',
          difficulty: 'Fácil',
          category: 'Tempo'
        }
      ]
    },
    {
      title: 'Entretenimento',
      icon: Music,
      color: 'from-purple-400 to-purple-600',
      commands: [
        {
          text: 'Alexa, toque música relaxante',
          description: 'Reproduz playlist relaxante',
          difficulty: 'Fácil',
          category: 'Música'
        },
        {
          text: 'Alexa, pause a música',
          description: 'Pausa reprodução atual',
          difficulty: 'Fácil',
          category: 'Música'
        },
        {
          text: 'Alexa, próximo',
          description: 'Pula para próxima música',
          difficulty: 'Fácil',
          category: 'Música'
        },
        {
          text: 'Alexa, conte uma piada',
          description: 'Alexa conta uma piada',
          difficulty: 'Fácil',
          category: 'Entretenimento'
        }
      ]
    },
    {
      title: 'Produtividade',
      icon: Brain,
      color: 'from-green-400 to-green-600',
      commands: [
        {
          text: 'Alexa, crie um lembrete para às 15h',
          description: 'Define lembrete para horário específico',
          difficulty: 'Médio',
          category: 'Lembretes'
        },
        {
          text: 'Alexa, que compromissos tenho hoje?',
          description: 'Lista agenda do dia',
          difficulty: 'Médio',
          category: 'Agenda'
        },
        {
          text: 'Alexa, adicione leite na lista de compras',
          description: 'Adiciona item à lista de compras',
          difficulty: 'Fácil',
          category: 'Listas'
        },
        {
          text: 'Alexa, defina um timer de 10 minutos',
          description: 'Inicia cronômetro',
          difficulty: 'Fácil',
          category: 'Timer'
        }
      ]
    },
    {
      title: 'Controle Geral',
      icon: Mic,
      color: 'from-orange-400 to-orange-600',
      commands: [
        {
          text: 'Alexa, pare tudo',
          description: 'Para todas as atividades',
          difficulty: 'Fácil',
          category: 'Controle'
        },
        {
          text: 'Alexa, silencie',
          description: 'Alexa para de responder temporariamente',
          difficulty: 'Fácil',
          category: 'Controle'
        },
        {
          text: 'Alexa, acorde',
          description: 'Reativa respostas da Alexa',
          difficulty: 'Fácil',
          category: 'Controle'
        },
        {
          text: 'Alexa, o que você pode fazer?',
          description: 'Lista funcionalidades disponíveis',
          difficulty: 'Fácil',
          category: 'Ajuda'
        }
      ]
    }
  ]

  const assistantTips = [
    {
      icon: Clock,
      title: 'Rotinas Inteligentes',
      description: 'Configure rotinas para automatizar múltiplas ações com um comando.'
    },
    {
      icon: MessageSquare,
      title: 'Comandos Personalizados',
      description: 'Crie comandos únicos para suas necessidades específicas.'
    },
    {
      icon: Sun,
      title: 'Integração com Dispositivos',
      description: 'Use a Alexa para controlar todos os seus dispositivos inteligentes.'
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Volume2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
          Comandos do Assistente Virtual
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Maximize o potencial da sua Alexa com comandos inteligentes. 
          Desde informações da casa até entretenimento e produtividade.
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
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-all duration-300"
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
                        className="ml-3 p-2 text-gray-400 hover:text-blue-500 transition-colors duration-300"
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
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {command.category}
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

      {/* Assistant Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-poppins">
          Dicas do Assistente
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assistantTips.map((tip, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
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

export default AssistantCommands
