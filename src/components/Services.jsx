import React from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Shield, Mic, Zap, Home, Smartphone } from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Lightbulb,
      title: "Iluminação Inteligente",
      description: "Controle total da iluminação com dimmers automáticos, cenas personalizadas e economia de energia.",
      features: ["Controle por voz", "Agendamento automático", "Detecção de presença", "Economia de até 80%"],
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Shield,
      title: "Sistema de Segurança",
      description: "Monitoramento 24/7 com câmeras inteligentes, sensores de movimento e alertas em tempo real.",
      features: ["Câmeras HD", "Reconhecimento facial", "Alertas por app", "Integração com alarme"],
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: Mic,
      title: "Assistentes Virtuais",
      description: "Controle sua casa com comandos de voz através de assistentes inteligentes integrados.",
      features: ["Comandos em português", "Múltiplos dispositivos", "Rotinas personalizadas", "Integração total"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Economia de Energia",
      description: "Monitore e otimize o consumo energético com relatórios detalhados e automações inteligentes.",
      features: ["Monitoramento em tempo real", "Relatórios mensais", "Otimização automática", "Economia garantida"],
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Home,
      title: "Automação Residencial",
      description: "Transforme sua casa em um ambiente totalmente automatizado e personalizado para seu estilo de vida.",
      features: ["Cenas personalizadas", "Agendamentos inteligentes", "Integração completa", "Controle remoto"],
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: Smartphone,
      title: "App Mobile",
      description: "Controle total da sua casa através do aplicativo móvel com interface intuitiva e responsiva.",
      features: ["Interface intuitiva", "Controle remoto", "Notificações push", "Múltiplos usuários"],
      color: "from-cyan-500 to-blue-500"
    }
  ]

  return (
    <section className="py-20 bg-white" id="services" aria-label="Serviços de automação residencial">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-poppins">
            Nossos
            <span className="gradient-text"> Serviços</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Soluções completas em automação residencial para tornar sua casa mais inteligente, 
            segura e eficiente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                    <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 font-poppins group-hover:text-brand-blue transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-brand-green rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                <button className={`w-full py-3 bg-gradient-to-r ${service.color} text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0`}>
                  Saiba Mais
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-brand-blue to-brand-green rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
              Pronto para automatizar sua casa?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Entre em contato e descubra como podemos transformar sua residência
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                Solicitar Orçamento
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-300">
                Falar com Especialista
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
