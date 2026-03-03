'use client'

import { motion } from 'framer-motion'
import { Check, X, Clock, MessageSquare, AlertCircle, TrendingUp, Users, RefreshCw } from 'lucide-react'

export default function Comparison() {
  return (
    <section className="py-24 bg-adv-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Não perca mais nenhum cliente para a concorrência
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            Enquanto você demora para responder, seu concorrente fecha contrato. Cada minuto sem organização é dinheiro perdido.
          </motion.p>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Card: Sem a Plataforma (Vermelho) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-adv-dark/50 rounded-2xl p-8 border border-red-900/20 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <X className="w-24 h-24 text-red-500" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-red-500/10 p-2 rounded-lg">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-red-400">Sem a Plataforma</h3>
              </div>

              <ul className="space-y-4">
                {[
                  { icon: Clock, text: "Mensagens chegando fora do horário" },
                  { icon: RefreshCw, text: "40% do tempo gasto em tarefas repetitivas" },
                  { icon: AlertCircle, text: "Clientes esperando resposta" },
                  { icon: MessageSquare, text: "Leads esquecidos no WhatsApp" },
                  { icon: Users, text: "Atendimento desorganizado" },
                  { icon: TrendingUp, text: "Oportunidades perdidas para concorrentes" }
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-400">
                    <item.icon className="w-5 h-5 mt-0.5 shrink-0 text-red-500/70" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card: Com a Plataforma (Verde) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-adv-dark/50 rounded-2xl p-8 border border-green-900/20 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Check className="w-24 h-24 text-green-500" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-green-500/10 p-2 rounded-lg">
                  <Check className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-400">Com a Plataforma</h3>
              </div>

              <ul className="space-y-4">
                {[
                  "Atendimento 24/7 automático",
                  "Triagem inteligente de novos leads",
                  "5h por dia recuperadas para focar em contratos",
                  "Conversas organizadas em funil visual",
                  "Clientes mais qualificados",
                  "Mais contratos fechados"
                ].map((text, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-400">
                    <div className="bg-green-500/10 rounded-full p-1 mt-0.5">
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-adv-gold text-adv-black rounded-xl font-medium text-lg shadow-lg hover:shadow-xl hover:bg-yellow-400 transition-all"
          >
            👉 Experimentar com garantia de 8 dias
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-white/20 text-white rounded-xl font-medium text-lg hover:bg-white/5 transition-all"
          >
            Agendar demonstração
          </motion.button>
        </div>
      </div>
    </section>
  )
}
