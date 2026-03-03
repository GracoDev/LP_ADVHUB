'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: "Preciso usar a IA obrigatoriamente?",
    answer: "Não. A plataforma funciona primeiro como um CRM profissional de WhatsApp com funil Kanban e multiatendimento. A IA é opcional. Você ativa quando quiser e apenas nas etapas que desejar."
  },
  {
    question: "Meu WhatsApp pode ser bloqueado?",
    answer: "Seguimos as políticas oficiais da Meta e utilizamos práticas seguras. Nada de disparos em massa ou automações arriscadas. Centenas de escritórios utilizam diariamente sem problemas."
  },
  {
    question: "Preciso trocar meu número?",
    answer: "Não. Você conecta o número que já utiliza hoje. Seus clientes continuam enviando mensagens normalmente. Você apenas passa a atender de forma organizada e profissional."
  },
  {
    question: "A IA pode responder errado para meus clientes?",
    answer: "Você tem controle total sobre o que a IA pode ou não responder. Ela faz triagem inicial, coleta informações básicas e pode ser limitada a etapas específicas. Nunca emite parecer jurídico."
  },
  {
    question: "Quanto tempo leva para implementar?",
    answer: "A conexão é instantânea via QR Code. Em menos de 30 minutos você já está atendendo. Configurar a IA leva cerca de 30 a 60 minutos adicionais."
  },
  {
    question: "A plataforma substitui o advogado?",
    answer: "Jamais. Ela organiza o atendimento e elimina tarefas repetitivas. O advogado continua responsável pela estratégia e decisões jurídicas."
  },
  {
    question: "E se eu não gostar ou não me adaptar?",
    answer: "Você tem 8 dias de garantia total. Se não gerar resultado ou não se adaptar, devolvemos 100% do valor investido. Simples assim."
  },
  {
    question: "Posso começar devagar?",
    answer: "Sim. Você pode começar usando apenas como CRM organizado e ativar a IA gradualmente, começando pela triagem inicial."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-adv-black relative overflow-hidden" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Perguntas Frequentes
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            Tire suas dúvidas antes de começar
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-white/10 rounded-xl overflow-hidden bg-adv-dark hover:border-adv-gold/30 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-medium text-white pr-8">{faq.question}</span>
                <div className={`p-2 rounded-full ${openIndex === index ? 'bg-adv-gold/20' : 'bg-white/5'} transition-colors`}>
                  {openIndex === index ? (
                    <ChevronUp className={`w-5 h-5 ${openIndex === index ? 'text-adv-gold' : 'text-gray-400'}`} />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-6">Ainda tem dúvidas?</p>
          <button className="px-8 py-3 bg-transparent border border-white/20 rounded-lg text-white font-medium hover:bg-white/5 transition-all shadow-sm">
            Falar com um especialista
          </button>
        </motion.div>
      </div>
    </section>
  )
}
