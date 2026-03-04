'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, CheckCircle2 } from 'lucide-react'

export default function Guarantee() {
  const scrollToCTA = () => {
    const element = document.getElementById('final-cta')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <section className="py-24 bg-adv-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-adv-dark rounded-3xl p-8 md:p-12 border border-white/10 shadow-xl shadow-[0_0_50px_rgba(255,184,77,0.06)] max-w-4xl mx-auto text-center relative overflow-hidden">
          
          {/* Badge Icon */}
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10"
          >
            <ShieldCheck className="w-12 h-12 text-green-500" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Garantia Blindada de 8 Dias
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Teste sem risco. Resultado ou seu dinheiro de volta.
            </p>

            <div className="prose prose-lg mx-auto text-gray-300 mb-8">
              <p>
                Se em até 8 dias você não tiver fechado ao menos 4 novos contratos utilizando a organização e a IA da plataforma, devolvemos 100% do valor investido.
              </p>
              <p className="font-medium text-white mt-4">
                Sem perguntas. Sem burocracia. Sem letras miúdas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-10 text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Zero risco para você</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Cancelamento simples</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Teste completo</span>
              </div>
            </div>

            <motion.button
              onClick={scrollToCTA}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-green-700 transition-all w-full sm:w-auto"
            >
              👉 Quero testar sem risco
            </motion.button>
          </div>
          
          {/* Background Decorative Element */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-500/5 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
