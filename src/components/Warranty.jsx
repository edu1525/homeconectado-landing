import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Clock, Wrench, Phone, CheckCircle, AlertTriangle } from 'lucide-react'

const Warranty = () => {
  const warrantyTypes = [
    {
      icon: Shield,
      title: "Garantia de Equipamentos",
      duration: "2 anos",
      description: "Todos os equipamentos possuem garantia de 2 anos contra defeitos de fabricação",
      coverage: [
        "Defeitos de fabricação",
        "Falhas de hardware",
        "Problemas de conectividade",
        "Substituição gratuita"
      ]
    },
    {
      icon: Wrench,
      title: "Garantia de Instalação",
      duration: "1 ano",
      description: "Garantia completa na instalação e configuração do sistema",
      coverage: [
        "Instalação profissional",
        "Configuração personalizada",
        "Testes de funcionamento",
        "Suporte técnico incluído"
      ]
    },
    {
      icon: Clock,
      title: "Suporte Técnico",
      duration: "24/7",
      description: "Suporte técnico disponível 24 horas por dia, 7 dias por semana",
      coverage: [
        "Atendimento telefônico",
        "Suporte remoto",
        "Visitas técnicas",
        "Atualizações de software"
      ]
    }
  ]

  const warrantyProcess = [
    {
      step: "1",
      title: "Identificação do Problema",
      description: "Entre em contato conosco descrevendo o problema encontrado"
    },
    {
      step: "2",
      title: "Diagnóstico",
      description: "Nossa equipe fará o diagnóstico do problema via remoto ou presencial"
    },
    {
      step: "3",
      title: "Solução",
      description: "Aplicaremos a solução mais adequada para resolver o problema"
    },
    {
      step: "4",
      title: "Teste e Validação",
      description: "Testamos o sistema para garantir que tudo está funcionando perfeitamente"
    }
  ]

  const warrantyConditions = [
    {
      icon: CheckCircle,
      title: "Coberto pela Garantia",
      items: [
        "Defeitos de fabricação dos equipamentos",
        "Problemas na instalação realizada por nossa equipe",
        "Falhas de software e configuração",
        "Danos causados por instalação incorreta",
        "Suporte técnico e manutenção preventiva"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Não Coberto pela Garantia",
      items: [
        "Danos causados por uso inadequado",
        "Danos por eventos externos (raios, enchentes, etc.)",
        "Modificações não autorizadas no sistema",
        "Desgaste natural dos equipamentos",
        "Danos causados por terceiros"
      ]
    }
  ]

  return (
    <section className="py-20 bg-gray-50" id="warranty" aria-label="Garantia">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-12 h-12 text-brand-blue" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-poppins">
              Nossa
              <span className="gradient-text"> Garantia</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tranquilidade e segurança para seu investimento em automação residencial
          </p>
        </motion.div>

        {/* Warranty Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {warrantyTypes.map((warranty, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6">
                <warranty.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 font-poppins">
                  {warranty.title}
                </h3>
                <div className="inline-block bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-sm font-semibold">
                  {warranty.duration}
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                {warranty.description}
              </p>
              
              <ul className="space-y-2">
                {warranty.coverage.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-gray-500">
                    <CheckCircle className="w-4 h-4 text-brand-green mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Warranty Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12 font-poppins">
            Como Funciona Nossa Garantia
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {warrantyProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                  {step.title}
                </h4>
                
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Warranty Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {warrantyConditions.map((condition, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <condition.icon className={`w-8 h-8 ${index === 0 ? 'text-brand-green' : 'text-brand-orange'}`} />
                <h3 className="text-xl font-semibold text-gray-900 font-poppins">
                  {condition.title}
                </h3>
              </div>
              
              <ul className="space-y-3">
                {condition.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start text-gray-600">
                    <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${index === 0 ? 'bg-brand-green' : 'bg-brand-orange'}`}></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
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
              Precisa de Suporte?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Nossa equipe está pronta para ajudar com qualquer questão sobre sua garantia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/5516993739326?text=Olá! Preciso de suporte sobre a garantia do meu sistema. Podem me ajudar?"
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

export default Warranty
