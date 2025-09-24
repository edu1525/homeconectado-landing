import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle, Calendar, ArrowRight, Sparkles } from 'lucide-react'

const CTA = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Ligue Agora",
      description: "Fale diretamente com nossos especialistas",
      action: "(16) 9 9373-9326",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Conversa rápida e prática",
      action: "Iniciar Conversa",
      color: "from-green-400 to-green-600"
    },
    {
      icon: Mail,
      title: "E-mail",
      description: "Envie suas dúvidas por escrito",
      action: "contato@homeconectado.com.br",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: Calendar,
      title: "Agendar Visita",
      description: "Visita técnica gratuita",
      action: "Agendar Agora",
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    <section className="py-20 gradient-bg relative overflow-hidden" id="contact" aria-label="Entre em contato conosco">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8 flex justify-center"
          >
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-poppins">
            Pronto para transformar
            <span className="block bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent">
              sua casa?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Entre em contato agora e descubra como podemos tornar sua residência 
            mais inteligente, segura e eficiente.
          </p>

          {/* Main CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <a 
              href="https://wa.me/5516993739326?text=Olá! Gostaria de solicitar um orçamento gratuito para automação residencial. Podem me ajudar?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-white/20 flex items-center gap-3 mx-auto"
            >
              Solicitar Orçamento Gratuito
              <ArrowRight className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2 font-poppins">
                  {method.title}
                </h3>
                
                <p className="text-white/80 text-sm mb-4">
                  {method.description}
                </p>
                
                <a 
                  href={
                    method.title === "WhatsApp" 
                      ? "https://wa.me/5516993739326" 
                      : method.title === "Agendar Visita"
                      ? "https://wa.me/5516993739326?text=Olá! Gostaria de agendar uma visita técnica para conhecer as soluções de automação residencial. Podem me ajudar?"
                      : method.title === "Ligue Agora"
                      ? "tel:+5516993739326"
                      : method.title === "E-mail"
                      ? "mailto:contato@homeconectado.com.br"
                      : "#"
                  }
                  target={method.title === "WhatsApp" || method.title === "Agendar Visita" ? "_blank" : "_self"}
                  rel={method.title === "WhatsApp" || method.title === "Agendar Visita" ? "noopener noreferrer" : ""}
                  className={`w-full py-3 bg-gradient-to-r ${method.color} text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 block text-center`}
                >
                  {method.action}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-poppins">
              Garantia de Satisfação
            </h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Oferecemos garantia total de satisfação. Se não ficar completamente satisfeito 
              com nossa solução, devolvemos seu investimento.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Instalação gratuita</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Suporte 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Garantia estendida</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Financiamento disponível</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
