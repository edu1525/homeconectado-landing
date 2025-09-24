import React from 'react'
import { motion } from 'framer-motion'
import { Wrench, Phone, MessageCircle, Mail, Clock, CheckCircle, AlertCircle, Users } from 'lucide-react'

const TechnicalSupport = () => {
  const supportServices = [
    {
      icon: Phone,
      title: "Suporte Telefônico",
      description: "Atendimento direto com nossos técnicos especializados",
      availability: "24/7",
      responseTime: "Imediato",
      features: [
        "Diagnóstico remoto",
        "Orientações técnicas",
        "Resolução de problemas",
        "Suporte em português"
      ]
    },
    {
      icon: MessageCircle,
      title: "Suporte Online",
      description: "Chat e WhatsApp para suporte rápido e prático",
      availability: "24/7",
      responseTime: "Até 5 minutos",
      features: [
        "Chat em tempo real",
        "Compartilhamento de tela",
        "Envio de fotos/vídeos",
        "Histórico de conversas"
      ]
    },
    {
      icon: Wrench,
      title: "Visita Técnica",
      description: "Suporte presencial no local quando necessário",
      availability: "Segunda a Sexta",
      responseTime: "Até 24h",
      features: [
        "Diagnóstico no local",
        "Reparo de equipamentos",
        "Configurações avançadas",
        "Treinamento do usuário"
      ]
    }
  ]

  const supportLevels = [
    {
      level: "Nível 1",
      title: "Suporte Básico",
      description: "Resolução de problemas simples e orientações básicas",
      responseTime: "Imediato",
      coverage: [
        "Problemas de conectividade",
        "Configurações básicas",
        "Orientações de uso",
        "Reset de dispositivos"
      ]
    },
    {
      level: "Nível 2",
      title: "Suporte Técnico",
      description: "Problemas mais complexos e configurações avançadas",
      responseTime: "Até 2 horas",
      coverage: [
        "Problemas de integração",
        "Configurações avançadas",
        "Diagnóstico de hardware",
        "Atualizações de firmware"
      ]
    },
    {
      level: "Nível 3",
      title: "Suporte Especializado",
      description: "Problemas críticos e suporte de engenharia",
      responseTime: "Até 4 horas",
      coverage: [
        "Problemas críticos de sistema",
        "Desenvolvimento de soluções",
        "Integração com terceiros",
        "Suporte de engenharia"
      ]
    }
  ]

  const commonSolutions = [
    {
      problem: "Dispositivo não conecta ao Wi-Fi",
      solution: "Verifique se o Wi-Fi está funcionando, reinicie o dispositivo e tente reconectar. Se o problema persistir, entre em contato conosco.",
      category: "Conectividade"
    },
    {
      problem: "App não responde ou trava",
      solution: "Feche completamente o aplicativo, reinicie o dispositivo móvel e abra o app novamente. Verifique se há atualizações disponíveis.",
      category: "Aplicativo"
    },
    {
      problem: "Automações não funcionam",
      solution: "Verifique se os dispositivos estão online e se as condições da automação estão corretas. Teste manualmente cada dispositivo primeiro.",
      category: "Automação"
    },
    {
      problem: "Assistente de voz não reconhece",
      solution: "Verifique a conexão com a internet, reinicie o assistente e teste os comandos. Certifique-se de que os dispositivos estão configurados corretamente.",
      category: "Assistente de Voz"
    }
  ]

  return (
    <section className="py-20 bg-white" id="support" aria-label="Suporte Técnico">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Wrench className="w-12 h-12 text-brand-blue" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-poppins">
              Suporte
              <span className="gradient-text"> Técnico</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Suporte especializado 24/7 para garantir o funcionamento perfeito do seu sistema
          </p>
        </motion.div>

        {/* Support Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {supportServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-poppins">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-brand-blue" />
                    <span className="text-sm font-semibold text-gray-700">Disponibilidade</span>
                  </div>
                  <p className="text-sm text-gray-600">{service.availability}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-brand-green" />
                    <span className="text-sm font-semibold text-gray-700">Resposta</span>
                  </div>
                  <p className="text-sm text-gray-600">{service.responseTime}</p>
                </div>
              </div>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-500">
                    <CheckCircle className="w-4 h-4 text-brand-green mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Support Levels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12 font-poppins">
            Níveis de Suporte
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportLevels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-white">{level.level}</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 font-poppins">
                    {level.title}
                  </h4>
                  <p className="text-gray-600 mt-2">
                    {level.description}
                  </p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-brand-orange" />
                    <span className="text-sm font-semibold text-gray-700">Tempo de Resposta</span>
                  </div>
                  <p className="text-sm text-gray-600">{level.responseTime}</p>
                </div>
                
                <ul className="space-y-2">
                  {level.coverage.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-500">
                      <CheckCircle className="w-4 h-4 text-brand-green mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Common Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12 font-poppins">
            Soluções Rápidas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commonSolutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-brand-orange" />
                  <span className="bg-brand-orange/10 text-brand-orange px-3 py-1 rounded-full text-sm font-semibold">
                    {solution.category}
                  </span>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                  {solution.problem}
                </h4>
                
                <p className="text-gray-600 leading-relaxed">
                  {solution.solution}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="gradient-bg rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
              Precisa de Ajuda Técnica?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Nossa equipe de especialistas está pronta para resolver qualquer problema
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/5516993739326?text=Olá! Preciso de suporte técnico para meu sistema de automação. Podem me ajudar?"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 inline-block text-center"
              >
                Suporte via WhatsApp
              </a>
              <a 
                href="tel:+5516993739326"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-300 inline-block text-center"
              >
                Ligar para Suporte
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TechnicalSupport
