import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Zap, Shield, Leaf, Users, Award } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "Inteligência Artificial",
      description: "Sistemas que aprendem com seus hábitos e se adaptam automaticamente"
    },
    {
      icon: Zap,
      title: "Tecnologia Avançada",
      description: "As mais modernas tecnologias de automação e conectividade"
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description: "Proteção completa com monitoramento 24/7 e alertas inteligentes"
    },
    {
      icon: Leaf,
      title: "Sustentabilidade",
      description: "Soluções eco-friendly que reduzem consumo e preservam o meio ambiente"
    },
    {
      icon: Users,
      title: "Suporte Especializado",
      description: "Equipe técnica qualificada para instalação e suporte contínuo"
    },
    {
      icon: Award,
      title: "Qualidade Garantida",
      description: "Produtos certificados e garantia estendida em todos os serviços"
    }
  ]

  return (
    <section className="py-20 bg-gray-50" id="about" aria-label="Sobre a Home Conectado">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-poppins">
            Por que escolher a
            <span className="gradient-text"> Home Conectado?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Somos especialistas em transformar residências em ambientes inteligentes, 
            combinando tecnologia de ponta com design elegante e funcionalidade excepcional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <div className="relative mb-6">
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-orange rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4 font-poppins">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
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
          className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Casas Conectadas" },
              { number: "99%", label: "Satisfação dos Clientes" },
              { number: "24/7", label: "Suporte Técnico" },
              { number: "5+", label: "Anos de Experiência" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 font-poppins">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 gradient-bg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
