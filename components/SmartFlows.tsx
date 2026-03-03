'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Scale, Briefcase, Users, FileText } from 'lucide-react'

const flows = [
  {
    id: 1,
    title: 'BPC / LOAS',
    desc: 'Triagem automática de requisitos de renda e deficiência.',
    icon: Users,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10'
  },
  {
    id: 2,
    title: 'Trabalhista',
    desc: 'Cálculo prévio de verbas e identificação de vínculo.',
    icon: Briefcase,
    color: 'text-adv-gold',
    bg: 'bg-adv-gold/10'
  },
  {
    id: 3,
    title: 'Previdenciário',
    desc: 'Análise de tempo de contribuição e idade mínima.',
    icon: Scale,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  },
  {
    id: 4,
    title: 'Fluxo Personalizado',
    desc: 'Crie sua própria lógica de atendimento em minutos.',
    icon: FileText,
    color: 'text-green-400',
    bg: 'bg-green-400/10'
  }
]

export default function SmartFlows() {
  return (
    <section className="py-32 bg-adv-black relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F3CEA1]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        
        <div className="mb-16">
          <span className="text-adv-gold text-xs font-bold tracking-widest uppercase mb-4 block">
            Inteligência Jurídica
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Fluxos Prontos para <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
              Começar Hoje
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {flows.map((flow) => (
            <motion.div
              key={flow.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: flow.id * 0.1 }}
              className="group relative flex items-center justify-between p-6 bg-adv-dark border border-white/5 rounded-2xl hover:border-white/10 hover:bg-white/5 transition-all cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <div className="flex items-center gap-6 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${flow.bg} ${flow.color}`}>
                  <flow.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-adv-gold transition-colors">
                    {flow.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {flow.desc}
                  </p>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-adv-gold group-hover:border-adv-gold group-hover:text-black transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
