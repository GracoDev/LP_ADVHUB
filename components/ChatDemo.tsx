'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, Send, MoreHorizontal, ShieldCheck } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const fullConversation = [
  {
    role: 'client',
    text: 'Boa noite. Tenho 61 anos e já contribuo há mais de 35 anos. Posso me aposentar?',
    time: '19:12'
  },
  {
    role: 'ai',
    text: 'Boa noite, Carlos! Trabalhou com carteira assinada na maior parte desse período?',
    time: '19:12'
  },
  {
    role: 'client',
    text: 'Sim, sempre com carteira assinada.',
    time: '19:13'
  },
  {
    role: 'ai',
    text: 'Certo. Trabalhou em atividade especial ou insalubre?',
    time: '19:13'
  },
  {
    role: 'client',
    text: '8 anos em metalúrgica.',
    time: '19:14'
  },
  {
    role: 'ai',
    text: 'Isso é ótimo! Há fortes indícios de direito à aposentadoria. Posso agendar uma análise com especialista amanhã às 15h?',
    time: '19:15'
  },
  {
    role: 'client',
    text: 'Pode ser.',
    time: '19:16'
  },
  {
    role: 'ai',
    text: 'Agendado ✅\nEnviarei a lista de documentos em breve.',
    time: '19:16'
  }
]

export default function ChatDemo() {
  const [messages, setMessages] = useState<typeof fullConversation>([])
  const [isTyping, setIsTyping] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToCTA = () => {
    const element = document.getElementById('final-cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Efeito de digitação e envio progressivo
  useEffect(() => {
    let currentIndex = 0
    let timeoutId: NodeJS.Timeout

    const processNextMessage = () => {
      if (currentIndex >= fullConversation.length) {
        // Reinicia o chat após um tempo
        timeoutId = setTimeout(() => {
          setMessages([])
          currentIndex = 0
          processNextMessage()
        }, 5000)
        return
      }

      const msg = fullConversation[currentIndex]
      
      // Se for mensagem da IA, mostra "digitando..." antes
      if (msg.role === 'ai') {
        setIsTyping(true)
        timeoutId = setTimeout(() => {
          setIsTyping(false)
          setMessages(prev => [...prev, msg])
          currentIndex++
          // Pausa antes da próxima mensagem do cliente
          timeoutId = setTimeout(processNextMessage, 1500)
        }, 1500) // Tempo de digitação da IA
      } else {
        // Mensagem do cliente (aparece "instantaneamente" ou com leve delay simulando leitura)
        timeoutId = setTimeout(() => {
          setMessages(prev => [...prev, msg])
          currentIndex++
          processNextMessage()
        }, 1000)
      }
    }

    processNextMessage()

    return () => clearTimeout(timeoutId)
  }, [])

  // Auto-scroll sempre que mensagens mudam
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages, isTyping])

  return (
    <section className="py-24 bg-adv-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-adv-gold/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-end">
          
          {/* Left Column: Text & Explanation */}
          <div className="order-2 lg:order-1 pb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Enquanto você dorme, <br/>
              <span className="text-adv-gold">novos casos estão sendo fechados.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-400 mb-8"
            >
              Veja como a IA atende, qualifica e encaminha o cliente pronta para contratação.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-adv-dark/50 border border-white/10 rounded-2xl p-6 mb-8"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-adv-gold" />
                O que aconteceu aqui:
              </h3>
              <ul className="space-y-3">
                {[
                  "A IA identificou o tipo de caso",
                  "Coletou informações estratégicas",
                  "Avaliou indícios de direito",
                  "Conduziu para agendamento"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-400">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={scrollToCTA}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-adv-gold text-adv-black rounded-xl font-medium text-lg shadow-lg hover:bg-yellow-400 transition-all text-center"
              >
                👉 Quero que a IA trabalhe para mim
              </motion.button>
              
              <motion.button
                onClick={scrollToCTA}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-white/20 text-white rounded-xl font-medium text-lg hover:bg-white/5 transition-all text-center"
              >
                Ver como funciona na prática
              </motion.button>
            </div>
          </div>

          {/* Right Column: Chat Interface */}
          <div className="order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto max-w-[400px]"
            >
              {/* Phone Frame */}
              <div className="bg-adv-dark border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative h-[550px] flex flex-col">
                
                {/* Status Bar Mock */}
                <div className="h-7 bg-adv-black/50 w-full flex justify-between items-center px-6 text-[10px] text-white/50">
                  <span>19:12</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-white/20 rounded-full" />
                    <div className="w-3 h-3 bg-white/20 rounded-full" />
                  </div>
                </div>

                {/* Chat Header */}
                <div className="bg-adv-card border-b border-white/5 p-4 flex items-center gap-3 z-10">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-adv-gold to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                      OR
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-adv-card rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm">Oliveira & Rocha Advogados</h3>
                    <p className="text-adv-gold text-xs">Online agora</p>
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-gray-500 ml-auto" />
                </div>

                {/* Chat Area */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-adv-black scrollbar-hide scroll-smooth"
                >
                  <div className="text-center text-xs text-gray-500 my-4">Hoje</div>
                  
                  <AnimatePresence initial={false}>
                    {messages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex ${msg.role === 'client' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed relative group ${
                            msg.role === 'client' 
                              ? 'bg-adv-card text-gray-200 rounded-tr-none border border-white/5' 
                              : 'bg-adv-gold/10 text-adv-gold/90 rounded-tl-none border border-adv-gold/20'
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.text}</p>
                          <span className={`text-[10px] mt-1 block opacity-50 ${msg.role === 'client' ? 'text-right' : 'text-left'}`}>
                            {msg.time}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-2 mt-4 ml-1"
                    >
                      <div className="flex gap-1 p-2 bg-adv-card rounded-xl rounded-tl-none border border-white/5">
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                      </div>
                      <span className="text-xs text-gray-500">digitando...</span>
                    </motion.div>
                  )}
                  
                  {/* Elemento invisível para garantir scroll até o final */}
                  <div className="h-2" />
                </div>

                {/* Input Area Mock */}
                <div className="p-3 bg-adv-card border-t border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">+</span>
                  </div>
                  <div className="flex-1 bg-adv-black rounded-full h-9 border border-white/5 px-4 flex items-center text-xs text-gray-600">
                    Mensagem
                  </div>
                  <div className="w-9 h-9 rounded-full bg-adv-gold/20 flex items-center justify-center">
                    <Send className="w-4 h-4 text-adv-gold" />
                  </div>
                </div>

              </div>
              
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
