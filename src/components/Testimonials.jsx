import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Arquiteta",
      location: "Franca, SP",
      rating: 5,
      text: "A Home Conectado transformou completamente minha casa. A automação da iluminação e o sistema de segurança me dão uma tranquilidade incrível. Recomendo para todos que buscam praticidade e tecnologia.",
      avatar: "MS"
    },
    {
      name: "João Santos",
      role: "Empresário",
      location: "Franca, SP",
      rating: 5,
      text: "Incrível como a IA aprendeu meus hábitos e agora minha casa se adapta automaticamente. A economia na conta de energia foi surpreendente. Vale cada centavo investido!",
      avatar: "JS"
    },
    {
      name: "Ana Costa",
      role: "Médica",
      location: "Franca, SP",
      rating: 5,
      text: "Como médica, passo muito tempo fora de casa. O sistema de monitoramento e os alertas inteligentes me deixam muito mais segura. A equipe de suporte é excepcional!",
      avatar: "AC"
    },
    {
      name: "Carlos Oliveira",
      role: "Engenheiro",
      location: "Franca, SP",
      rating: 5,
      text: "A integração entre todos os dispositivos é perfeita. Posso controlar tudo pelo app ou por comando de voz. A qualidade dos produtos e instalação é de primeiro mundo.",
      avatar: "CO"
    },
    {
      name: "Fernanda Lima",
      role: "Designer",
      location: "Franca, SP",
      rating: 5,
      text: "A personalização das cenas de iluminação é fantástica. Cada ambiente tem sua própria atmosfera. Meus clientes ficam impressionados quando visitam minha casa!",
      avatar: "FL"
    },
    {
      name: "Roberto Alves",
      role: "Advogado",
      location: "Franca, SP",
      rating: 5,
      text: "A segurança foi o que mais me impressionou. As câmeras com reconhecimento facial e os alertas em tempo real são incríveis. Minha família se sente muito mais protegida.",
      avatar: "RA"
    }
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden" id="testimonials" aria-label="Depoimentos de clientes">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-brand-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl"></div>
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
            O que nossos clientes
            <span className="gradient-text"> dizem</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Histórias reais de famílias que transformaram suas casas com nossa tecnologia
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-12 h-12 text-brand-blue" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 font-poppins">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-gray-400">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 gradient-bg opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl"></div>
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
          className="bg-gradient-to-r from-brand-blue to-brand-green rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden"
        >
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 font-poppins">
              Mais de 500 famílias já transformaram suas casas
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 font-poppins">
                  4.9/5
                </div>
                <div className="flex justify-center gap-1 mb-2">
                  {renderStars(5)}
                </div>
                <p className="text-white/90">Avaliação média dos clientes</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 font-poppins">
                  98%
                </div>
                <p className="text-white/90">Clientes recomendariam</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 font-poppins">
                  24h
                </div>
                <p className="text-white/90">Tempo médio de resposta</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
