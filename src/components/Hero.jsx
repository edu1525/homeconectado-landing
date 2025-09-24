import React from 'react'
import { motion } from 'framer-motion'
import { Home, Wifi, Lightbulb, Sparkles } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen gradient-bg flex items-center justify-center overflow-hidden" role="banner" aria-label="Seção principal da Home Conectado">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                <Home className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center animate-glow">
                <Wifi className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-brand-green rounded-full flex items-center justify-center">
                <Lightbulb className="w-3 h-3 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-poppins"
          >
            Sua Casa
            <span className="block gradient-text bg-gradient-to-r from-white via-yellow-200 to-orange-200">
              Inteligente e Conectada
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Transforme sua residência em um ambiente inteligente com tecnologia de ponta, 
            conectividade total e automação personalizada para sua comodidade e segurança.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {[
              { icon: Sparkles, text: "IA Integrada" },
              { icon: Wifi, text: "Conectividade Total" },
              { icon: Home, text: "Automação Completa" }
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <feature.icon className="w-5 h-5 text-white" />
                <span className="text-white font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a 
              href="https://wa.me/5516993739326?text=Olá! Gostaria de solicitar um orçamento para automação residencial. Podem me ajudar?"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-10 py-4 shadow-2xl hover:shadow-white/20 inline-block text-center" 
              aria-label="Solicitar orçamento gratuito para automação residencial"
            >
              Solicitar Orçamento
            </a>
            <a 
              href="https://wa.me/5516993739326?text=Olá! Gostaria de falar com um especialista sobre automação residencial. Podem me ajudar?"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-10 py-4 inline-block text-center" 
              aria-label="Falar com especialista em automação residencial"
            >
              Falar com Especialista
            </a>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 hidden lg:block"
        >
          <div className="w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Wifi className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-10 hidden lg:block"
        >
          <div className="w-12 h-12 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
