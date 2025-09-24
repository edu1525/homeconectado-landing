import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Phone, MessageCircle, Mail, Clock, CheckCircle } from 'lucide-react'

const HelpCenter = () => {
  const helpCategories = [
    {
      icon: BookOpen,
      title: "Guias e Tutoriais",
      description: "Aprenda a usar seu sistema de automação",
      items: [
        "Como configurar o aplicativo",
        "Primeiros passos com automação",
        "Configuração de cenas",
        "Integração com assistentes de voz"
      ]
    },
    {
      icon: Phone,
      title: "Suporte Técnico",
      description: "Assistência especializada 24/7",
      items: [
        "Suporte por telefone",
        "Chat online em tempo real",
        "Visita técnica no local",
        "Diagnóstico remoto"
      ]
    },
    {
      icon: MessageCircle,
      title: "Comunidade",
      description: "Conecte-se com outros usuários",
      items: [
        "Fórum da comunidade",
        "Dicas e truques",
        "Compartilhamento de experiências",
        "Grupo no WhatsApp"
      ]
    }
  ]

  const supportMethods = [
    {
      icon: Phone,
      title: "Telefone",
      description: "Atendimento direto com especialistas",
      contact: "(16) 9 9373-9326",
      hours: "24/7",
      action: "tel:+5516993739326"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Suporte rápido e prático",
      contact: "Iniciar conversa",
      hours: "24/7",
      action: "https://wa.me/5516993739326?text=Olá! Preciso de suporte técnico. Podem me ajudar?"
    },
    {
      icon: Mail,
      title: "E-mail",
      description: "Suporte detalhado por escrito",
      contact: "contato@homeconectado.com.br",
      hours: "Resposta em até 2h",
      action: "mailto:contato@homeconectado.com.br"
    }
  ]

  const commonIssues = [
    {
      problem: "App não conecta com os dispositivos",
      solution: "Verifique se o Wi-Fi está funcionando e se os dispositivos estão ligados. Reinicie o aplicativo e tente novamente."
    },
    {
      problem: "Dispositivo não responde aos comandos",
      solution: "Verifique a conexão de energia e reinicie o dispositivo. Se o problema persistir, entre em contato conosco."
    },
    {
      problem: "Automações não funcionam",
      solution: "Verifique se as condições da automação estão corretas e se os dispositivos estão online. Teste manualmente primeiro."
    },
    {
      problem: "Assistente de voz não reconhece comandos",
      solution: "Verifique se o dispositivo está conectado à internet e se os comandos estão configurados corretamente no aplicativo."
    }
  ]

  return (
    <section className="py-20 bg-white" id="help" aria-label="Central de Ajuda">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-poppins">
            Central de
            <span className="gradient-text"> Ajuda</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Encontre respostas rápidas e suporte especializado para seu sistema de automação
          </p>
        </motion.div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {helpCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6">
                <category.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-poppins">
                {category.title}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {category.description}
              </p>
              
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-gray-500">
                    <CheckCircle className="w-4 h-4 text-brand-green mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Support Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12 font-poppins">
            Canais de Suporte
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-4">
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2 font-poppins">
                  {method.title}
                </h4>
                
                <p className="text-gray-600 mb-4">
                  {method.description}
                </p>
                
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-brand-orange" />
                  <span className="text-sm text-gray-500">{method.hours}</span>
                </div>
                
                <a
                  href={method.action}
                  target={method.title === "WhatsApp" ? "_blank" : "_self"}
                  rel={method.title === "WhatsApp" ? "noopener noreferrer" : ""}
                  className="w-full py-3 gradient-bg text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 block text-center"
                >
                  {method.contact}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Common Issues */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12 font-poppins">
            Problemas Comuns
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commonIssues.map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                  {issue.problem}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {issue.solution}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HelpCenter
