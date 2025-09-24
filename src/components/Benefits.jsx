import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Shield, Settings, Brain, Zap, Users } from 'lucide-react'

const Benefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Praticidade Total",
      description: "Controle sua casa com um toque ou comando de voz. Automações inteligentes que se adaptam à sua rotina.",
      features: ["Controle remoto", "Agendamentos automáticos", "Cenas personalizadas", "Integração com assistentes"]
    },
    {
      icon: Shield,
      title: "Segurança Avançada",
      description: "Proteção 24/7 com monitoramento inteligente, alertas em tempo real e sistemas de segurança integrados.",
      features: ["Monitoramento 24/7", "Alertas instantâneos", "Câmeras inteligentes", "Controle de acesso"]
    },
    {
      icon: Settings,
      title: "Personalização Completa",
      description: "Configure sua casa exatamente como deseja. Cada ambiente pode ter suas próprias automações e preferências.",
      features: ["Configuração personalizada", "Múltiplos perfis", "Ambientes adaptativos", "Preferências individuais"]
    },
    {
      icon: Brain,
      title: "Inteligência Artificial",
      description: "Sistemas que aprendem com seus hábitos e se adaptam automaticamente para oferecer a melhor experiência.",
      features: ["Aprendizado contínuo", "Adaptação automática", "Previsão de necessidades", "Otimização inteligente"]
    }
  ]

  const stats = [
    { icon: Zap, value: "80%", label: "Economia de Energia" },
    { icon: Users, value: "500+", label: "Famílias Satisfeitas" },
    { icon: Clock, value: "24/7", label: "Suporte Disponível" },
    { icon: Shield, value: "99.9%", label: "Uptime Garantido" }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden" id="benefits" aria-label="Benefícios da automação residencial">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-brand-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-poppins">
            Benefícios que fazem a
            <span className="gradient-text"> diferença</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubra como nossa tecnologia pode transformar sua casa em um ambiente 
            mais inteligente, seguro e eficiente.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 gradient-bg opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                    <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-poppins group-hover:text-brand-blue transition-colors duration-300">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {benefit.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-3">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-500">
                      <div className="w-2 h-2 bg-gradient-to-r from-brand-blue to-brand-green rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Números que
              <span className="gradient-text"> impressionam</span>
            </h3>
            <p className="text-xl text-gray-600">
              Resultados reais de famílias que já transformaram suas casas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-4">
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-orange rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 font-poppins">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="gradient-bg rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
                Pronto para viver o futuro?
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Junte-se a centenas de famílias que já transformaram suas casas em ambientes inteligentes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                  Solicitar Orçamento
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                  Agendar Visita
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Benefits
