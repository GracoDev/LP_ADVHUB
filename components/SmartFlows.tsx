'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Scale, Briefcase, Users, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import FloatingPixels from './FloatingPixels'

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
  const [activeIndex, setActiveIndex] = useState(0)

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % flows.length)
  }, [])
  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + flows.length) % flows.length)
  }, [])

  // Auto-avanço a cada 4 segundos (reinicia ao trocar manualmente)
  useEffect(() => {
    const interval = setInterval(goNext, 4000)
    return () => clearInterval(interval)
  }, [goNext, activeIndex])

  return (
    <section className="py-32 bg-adv-black relative overflow-hidden">
      {/* Orbes radiais douradas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFB84D]/12 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-[#F3CEA1]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] bg-[#FFB84D]/8 rounded-full blur-[100px] pointer-events-none" />
      <FloatingPixels />
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

        {/* Carrossel – card central nítido, laterais borradas (como no print) */}
        <div className="relative flex items-center gap-6 px-2">
          <button
            onClick={goPrev}
            className="shrink-0 w-12 h-12 rounded-full border border-white/10 bg-adv-dark/90 hover:bg-adv-gold hover:border-adv-gold hover:text-adv-black flex items-center justify-center transition-all z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 min-w-0 overflow-hidden">
            <div
              className="flex gap-6 py-4 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(calc(50% - ${activeIndex * 272 + 128}px))`,
              }}
            >
              {flows.map((flow, index) => {
                const isActive = index === activeIndex
                const distance = Math.abs(index - activeIndex)
                return (
                  <motion.div
                    key={flow.id}
                    className="shrink-0 w-[256px] cursor-default transition-all duration-500"
                    style={{
                      filter: isActive ? 'blur(0)' : `blur(${Math.min(8, distance * 5)}px)`,
                      opacity: isActive ? 1 : 0.7,
                      scale: isActive ? 1 : 0.92,
                    }}
                  >
                    <div
                      className={`group relative flex flex-col items-center p-8 bg-adv-dark border rounded-2xl overflow-hidden transition-all min-h-[220px] justify-center text-center ${
                        isActive ? 'border-adv-gold/30 shadow-[0_0_30px_rgba(255,184,77,0.12)]' : 'border-white/5 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,184,77,0.08)]'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${flow.bg} ${flow.color}`}>
                        <flow.icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-adv-gold transition-colors">
                        {flow.title}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {flow.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <button
            onClick={goNext}
            className="shrink-0 w-12 h-12 rounded-full border border-white/10 bg-adv-dark/90 hover:bg-adv-gold hover:border-adv-gold hover:text-adv-black flex items-center justify-center transition-all z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-8">
          {flows.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === activeIndex ? 'bg-adv-gold w-6' : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
