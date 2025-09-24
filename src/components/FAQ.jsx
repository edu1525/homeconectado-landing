import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "O que é automação residencial?",
      answer: "A automação residencial é um sistema que permite controlar diversos dispositivos da sua casa através de um aplicativo, comandos de voz ou automações programadas. Isso inclui iluminação, climatização, segurança, entretenimento e muito mais."
    },
    {
      question: "Quanto custa automatizar uma casa?",
      answer: "O investimento varia conforme o tamanho da residência e os sistemas desejados. Oferecemos pacotes personalizados que se adequam ao seu orçamento, desde soluções básicas até automação completa. Entre em contato para um orçamento gratuito."
    },
    {
      question: "A instalação demora muito?",
      answer: "O tempo de instalação depende da complexidade do projeto. Sistemas básicos podem ser instalados em 1-2 dias, enquanto automação completa pode levar de 3-7 dias. Sempre respeitamos o cronograma acordado."
    },
    {
      question: "Preciso de internet para funcionar?",
      answer: "Sim, a maioria dos sistemas de automação requer conexão com a internet para funcionamento completo. No entanto, alguns dispositivos podem funcionar localmente mesmo sem internet, garantindo funcionalidades básicas."
    },
    {
      question: "Vocês oferecem garantia?",
      answer: "Sim! Oferecemos garantia de 2 anos em todos os equipamentos e 1 ano de garantia na instalação. Além disso, fornecemos suporte técnico durante todo o período de garantia."
    },
    {
      question: "Posso controlar de qualquer lugar?",
      answer: "Sim! Com o aplicativo móvel, você pode controlar sua casa de qualquer lugar do mundo, desde que tenha conexão com a internet. Receba notificações e monitore sua residência em tempo real."
    },
    {
      question: "É compatível com assistentes de voz?",
      answer: "Sim! Nossos sistemas são compatíveis com Google Assistant, Amazon Alexa e Apple Siri. Você pode controlar sua casa usando comandos de voz em português."
    },
    {
      question: "Posso expandir o sistema depois?",
      answer: "Claro! Nossos sistemas são modulares e escaláveis. Você pode começar com um sistema básico e ir adicionando novos dispositivos conforme sua necessidade e orçamento."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gray-50" id="faq" aria-label="Perguntas Frequentes">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <HelpCircle className="w-12 h-12 text-brand-blue" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-poppins">
              Perguntas
              <span className="gradient-text"> Frequentes</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tire suas dúvidas sobre automação residencial e nossos serviços
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 font-poppins">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-brand-blue transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="gradient-bg rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
              Ainda tem dúvidas?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Nossa equipe está pronta para esclarecer todas as suas questões
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/5516993739326?text=Olá! Tenho algumas dúvidas sobre automação residencial. Podem me ajudar?"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 inline-block text-center"
              >
                Falar com Especialista
              </a>
              <a 
                href="tel:+5516993739326"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-300 inline-block text-center"
              >
                Ligar Agora
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
