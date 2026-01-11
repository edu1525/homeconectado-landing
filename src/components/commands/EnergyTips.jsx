import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Lightbulb, 
  Thermometer, 
  Clock, 
  Copy, 
  Check, 
  Volume2,
  TrendingDown,
  Leaf,
  Sun,
  Moon,
  Home
} from 'lucide-react'

const EnergyTips = () => {
  const [copiedCommand, setCopiedCommand] = useState(null)

  const energyCategories = [
    {
      title: 'Comandos de Economia',
      icon: Zap,
      color: 'from-green-400 to-green-600',
      commands: [
        {
          text: 'Alexa, modo economia de energia',
          description: 'Ativa modo de baixo consumo',
          difficulty: 'Fácil',
          savings: '15-20%'
        },
        {
          text: 'Alexa, desligue dispositivos não essenciais',
          description: 'Desliga aparelhos em standby',
          difficulty: 'Fácil',
          savings: '10-15%'
        },
        {
          text: 'Alexa, ajuste temperatura para 22°C',
          description: 'Define temperatura ideal para economia',
          difficulty: 'Médio',
          savings: '20-25%'
        },
        {
          text: 'Alexa, ative modo noturno',
          description: 'Reduz iluminação e consumo',
          difficulty: 'Fácil',
          savings: '30-40%'
        }
      ]
    },
    {
      title: 'Controle de Iluminação',
      icon: Lightbulb,
      color: 'from-yellow-400 to-orange-500',
      commands: [
        {
          text: 'Alexa, reduza brilho das luzes',
          description: 'Diminui intensidade para economizar',
          difficulty: 'Fácil',
          savings: '40-50%'
        },
        {
          text: 'Alexa, use apenas luzes essenciais',
          description: 'Mantém apenas luzes necessárias',
          difficulty: 'Fácil',
          savings: '60-70%'
        },
        {
          text: 'Alexa, ative sensor de presença',
          description: 'Luzes ligam/desligam automaticamente',
          difficulty: 'Médio',
          savings: '50-60%'
        },
        {
          text: 'Alexa, programe desligamento automático',
          description: 'Desliga luzes em horário específico',
          difficulty: 'Avançado',
          savings: '30-40%'
        }
      ]
    },
    {
      title: 'Climatização Inteligente',
      icon: Thermometer,
      color: 'from-blue-400 to-blue-600',
      commands: [
        {
          text: 'Alexa, desligue ar condicionado',
          description: 'Desativa climatização quando não necessário',
          difficulty: 'Fácil',
          savings: '25-30%'
        },
        {
          text: 'Alexa, programe ar condicionado para 24°C',
          description: 'Temperatura ideal para economia',
          difficulty: 'Médio',
          savings: '15-20%'
        },
        {
          text: 'Alexa, ative ventilação natural',
          description: 'Usa ventilação em vez de ar condicionado',
          difficulty: 'Fácil',
          savings: '80-90%'
        },
        {
          text: 'Alexa, feche cortinas para economizar',
          description: 'Reduz entrada de calor solar',
          difficulty: 'Fácil',
          savings: '10-15%'
        }
      ]
    },
    {
      title: 'Rotinas de Economia',
      icon: Clock,
      color: 'from-purple-400 to-purple-600',
      commands: [
        {
          text: 'Alexa, boa noite econômica',
          description: 'Rotina para dormir com economia',
          difficulty: 'Avançado',
          savings: '40-50%'
        },
        {
          text: 'Alexa, sair de casa',
          description: 'Desliga tudo ao sair',
          difficulty: 'Fácil',
          savings: '70-80%'
        },
        {
          text: 'Alexa, modo férias',
          description: 'Mantém apenas segurança ativa',
          difficulty: 'Avançado',
          savings: '90-95%'
        },
        {
          text: 'Alexa, otimize consumo agora',
          description: 'Aplica todas as otimizações',
          difficulty: 'Fácil',
          savings: '25-35%'
        }
      ]
    }
  ]

  const energyTips = [
    {
      icon: TrendingDown,
      title: 'Monitoramento de Consumo',
      description: 'Acompanhe seu consumo em tempo real com comandos de verificação.'
    },
    {
      icon: Leaf,
      title: 'Sustentabilidade',
      description: 'Reduza sua pegada de carbono com automação inteligente.'
    },
    {
      icon: Sun,
      title: 'Horários de Pico',
      description: 'Evite usar dispositivos de alto consumo em horários de pico.'
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
        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
          Economia de Energia
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Reduza sua conta de energia com comandos inteligentes para a Alexa. 
          Controle seu consumo e economize de forma sustentável.
        </p>
      </motion.div>

      {/* Command Categories */}
      <div className="space-y-12">
        {energyCategories.map((category, categoryIndex) => (
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
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-green-300 transition-all duration-300"
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
                        className="ml-3 p-2 text-gray-400 hover:text-green-500 transition-colors duration-300"
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
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Economia: {command.savings}
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

      {/* Energy Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-poppins">
          Dicas de Economia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {energyTips.map((tip, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4">
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

      {/* Energy Savings Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-8 text-white"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 font-poppins">
            Economia Total Potencial
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Com todos os comandos de economia, você pode reduzir sua conta de energia em até
          </p>
          <div className="text-6xl font-bold mb-4">70%</div>
          <p className="text-lg opacity-80">
            Use a automação inteligente para economizar de forma sustentável
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default EnergyTips
