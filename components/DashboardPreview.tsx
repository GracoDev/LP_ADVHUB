'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Calendar, TrendingUp } from 'lucide-react'
import FloatingPixels from './FloatingPixels'

export default function DashboardPreview() {
  return (
    <section className="py-32 bg-adv-black relative overflow-hidden">
      {/* Orbes radiais douradas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFB84D]/12 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] bg-[#F3CEA1]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-[#FFB84D]/8 rounded-full blur-[120px] pointer-events-none" />
      <FloatingPixels />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Visão total do seu <span className="text-adv-gold">escritório</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Acompanhe métricas em tempo real, conversões e agendamentos em um dashboard intuitivo e poderoso.
          </p>
        </div>

        {/* Dashboard Container */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-adv-dark border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative"
        >
          {/* Top Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-adv-card p-5 rounded-2xl border border-white/5 transition-all duration-300 hover:border-[#F3CEA1]/50 hover:shadow-[0_0_20px_rgba(243,206,161,0.1)] group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-400 text-xs font-medium uppercase group-hover:text-[#F3CEA1] transition-colors">Total de Chats</p>
                  <h3 className="text-3xl font-bold text-white mt-1">53</h3>
                </div>
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#F3CEA1]/10 transition-colors">
                  <MessageSquare className="w-5 h-5 text-slate-400 group-hover:text-[#F3CEA1] transition-colors" />
                </div>
              </div>
              <p className="text-xs text-slate-500">Todos os atendimentos</p>
            </div>

            <div className="bg-adv-card p-5 rounded-2xl border border-white/5 transition-all duration-300 hover:border-[#F3CEA1]/50 hover:shadow-[0_0_20px_rgba(243,206,161,0.1)] group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-400 text-xs font-medium uppercase group-hover:text-[#F3CEA1] transition-colors">Taxa de Conversão</p>
                  <h3 className="text-3xl font-bold text-white mt-1">35.9%</h3>
                </div>
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#F3CEA1]/10 transition-colors">
                  <TrendingUp className="w-5 h-5 text-adv-gold" />
                </div>
              </div>
              <p className="text-xs text-slate-500">Chats convertidos em leads</p>
            </div>

            <div className="bg-adv-card p-5 rounded-2xl border border-white/5 transition-all duration-300 hover:border-[#F3CEA1]/50 hover:shadow-[0_0_20px_rgba(243,206,161,0.1)] group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-400 text-xs font-medium uppercase group-hover:text-[#F3CEA1] transition-colors">Reuniões</p>
                  <h3 className="text-3xl font-bold text-white mt-1">18</h3>
                </div>
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#F3CEA1]/10 transition-colors">
                  <Calendar className="w-5 h-5 text-slate-400 group-hover:text-[#F3CEA1] transition-colors" />
                </div>
              </div>
              <p className="text-xs text-slate-500">Agendadas automaticamente</p>
            </div>

            <div className="bg-adv-card p-5 rounded-2xl border border-white/5 transition-all duration-300 hover:border-[#F3CEA1]/50 hover:shadow-[0_0_20px_rgba(243,206,161,0.1)] group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-400 text-xs font-medium uppercase group-hover:text-[#F3CEA1] transition-colors">Atendimento 24/7</p>
                  <h3 className="text-3xl font-bold text-white mt-1">0.0%</h3>
                </div>
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#F3CEA1]/10 transition-colors">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-600 border-t-adv-gold animate-spin" />
                </div>
              </div>
              <p className="text-xs text-slate-500">Fora do horário</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chart Area (2 cols) */}
            <div className="lg:col-span-2 bg-adv-card rounded-2xl border border-white/5 p-6">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-white font-bold">Evolução Temporal</h4>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white/10 rounded-lg text-xs text-white">7d</span>
                  <span className="px-3 py-1 text-slate-500 text-xs hover:bg-white/5 rounded-lg cursor-pointer">30d</span>
                </div>
              </div>
              
              {/* Fake Chart SVG */}
              <div className="h-[250px] w-full relative">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <path 
                    d="M0,200 C50,200 80,150 120,150 S180,220 220,180 S280,50 320,100 S380,180 420,180 S480,80 520,120 S580,200 650,200" 
                    fill="none" 
                    stroke="#FFB84D" 
                    strokeWidth="3"
                    className="drop-shadow-[0_0_10px_rgba(255,184,77,0.3)]"
                  />
                  <path 
                    d="M0,220 C50,220 80,180 120,180 S180,240 220,200 S280,100 320,140 S380,200 420,200 S480,120 520,150 S580,220 650,220" 
                    fill="none" 
                    stroke="#3B82F6" 
                    strokeWidth="2"
                    opacity="0.5"
                  />
                </svg>
                
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                  <div className="w-full h-px bg-white" />
                  <div className="w-full h-px bg-white" />
                  <div className="w-full h-px bg-white" />
                  <div className="w-full h-px bg-white" />
                  <div className="w-full h-px bg-white" />
                </div>
              </div>
            </div>

            {/* Status Distribution (1 col) */}
            <div className="bg-adv-card rounded-2xl border border-white/5 p-6">
              <h4 className="text-white font-bold mb-6">Distribuição por Status</h4>
              <div className="space-y-4">
                {[
                  { label: 'Recepção prev', val: '0.0%', color: 'bg-slate-700' },
                  { label: 'Desqualificado', val: '11.3%', color: 'bg-purple-500' },
                  { label: 'Contrato Assinado', val: '13.2%', color: 'bg-adv-gold' },
                  { label: 'Humano', val: '17.0%', color: 'bg-slate-600' },
                  { label: 'Qualificado', val: '18.9%', color: 'bg-blue-500' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>{item.label}</span>
                      <span>{item.val}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: item.val }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full rounded-full ${item.color}`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}