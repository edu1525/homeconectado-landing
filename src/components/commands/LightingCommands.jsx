import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Lightbulb, 
  Sun, 
  Moon, 
  Zap, 
  Copy, 
  Check, 
  Volume2,
  Clock,
  Star,
  Home
} from 'lucide-react'

const LightingCommands = () => {
  const [copiedCommand, setCopiedCommand] = useState(null)

  const commandCategories = [
    {
      title: 'Controle Básico',
      icon: Lightbulb,
      color: 'from-yellow-400 to-orange-500',
      commands: [
        {
          text: 'Alexa, acenda a luz da sala',
          description: 'Liga a luz principal da sala',
          difficulty: 'Fácil'
        },
        {
          text: 'Alexa, apague a luz da sala',
          description: 'Desliga a luz principal da sala',
          difficulty: 'Fácil'
        },
        {
          text: 'Alexa, acenda todas as luzes',
          description: 'Liga todas as luzes da casa',
          difficulty: 'Fácil'
        },
        {
          text: 'Alexa, apague todas as luzes',
          description: 'Desliga todas as luzes da casa',
          difficulty: 'Fácil'
        }
      ]
    },
    {
      title: 'Controle por Ambiente',
      icon: Home,
      color: 'from-blue-400 to-blue-600',
      commands: [
        {
          text: 'Alexa, acenda a luz do quarto',
          description: 'Liga a luz do quarto principal',
          difficulty: 'Fácil'
        },
        {
          text: 'Alexa, acenda a luz da cozinha',
          description: 'Liga a luz da cozinha',
          difficulty: 'Fácil'
        },
        {
          text: 'Alexa, acenda a luz do banheiro',
          description: 'Liga a luz do banheiro',
          difficulty: 'Fácil'
        },
        {
          text: 'Alexa, acenda a luz da varanda',
          description: 'Liga a luz da área externa',
          difficulty: 'Fácil'
        }
      ]
    },
    {
      title: 'Controle de Intensidade',
      icon: Zap,
      color: 'from-purple-400 to-purple-600',
      commands: [
        {
          text: 'Alexa, diminua a luz da sala',
          description: 'Reduz a intensidade da luz',
          difficulty: 'Médio'
        },
        {
          text: 'Alexa, aumente a luz da sala',
          description: 'Aumenta a intensidade da luz',
          difficulty: 'Médio'
        },
        {
          text: 'Alexa, coloque a luz da sala em 50%',
          description: 'Define intensidade específica',
          difficulty: 'Médio'
        },
        {
          text: 'Alexa, luz máxima na sala',
          description: 'Define intensidade máxima',
          difficulty: 'Médio'
        }
      ]
    },
    {
      title: 'Cenas e Rotinas',
      icon: Star,
      color: 'from-green-400 to-green-600',
      commands: [
        {
          text: 'Alexa, ative o modo cinema',
          description: 'Cena pré-configurada para filmes',
          difficulty: 'Avançado'
        },
        {
          text: 'Alexa, ative o modo relaxamento',
          description: 'Luzes suaves para descanso',
          difficulty: 'Avançado'
        },
        {
          text: 'Alexa, boa noite',
          description: 'Rotina para dormir',
          difficulty: 'Avançado'
        },
        {
          text: 'Alexa, bom dia',
          description: 'Rotina para acordar',
          difficulty: 'Avançado'
        }
      ]
    }
  ]

  const tips = [
    {
      icon: Sun,
      title: 'Dica de Economia',
      description: 'Use "Alexa, boa noite" para desligar todas as luzes automaticamente antes de dormir.'
    },
    {
      icon: Clock,
      title: 'Automação por Horário',
      description: 'Configure rotinas para acender/apagar luzes em horários específicos.'
    },
    {
      icon: Volume2,
      title: 'Comandos Personalizados',
      description: 'Crie comandos únicos como "Alexa, luz da festa" para suas cenas favoritas.'
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
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
          Comandos de Iluminação
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Controle suas luzes inteligentes com comandos de voz para a Alexa. 
          Organize por categoria e dificuldade.
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
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-brand-blue/30 transition-all duration-300"
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
                        className="ml-3 p-2 text-gray-400 hover:text-brand-blue transition-colors duration-300"
                      >
                        {copiedCommand === command.text ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        command.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                        command.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {command.difficulty}
                      </span>
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

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-poppins">
          Dicas e Truques
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-brand-blue to-brand-green rounded-xl flex items-center justify-center mb-4">
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

export default LightingCommands
