export default function HowItWorks() {
  const steps = [
    { title: 'Lead entra pelo WhatsApp', desc: 'Cliente manda mensagem e a IA responde em segundos.' },
    { title: 'Qualificação Inteligente', desc: 'IA faz perguntas de filtro e identifica casos viáveis.' },
    { title: 'Negócio Fechado', desc: 'IA envia contrato para assinatura ou agenda consulta.' }
  ]

  return (
    <section id="como-funciona" className="py-32 bg-[#050505] border-t border-white/5">
      <div className="max-w-[1000px] mx-auto px-6 text-center">
        
        {/* Header */}
        <span className="text-[#F3CEA1] font-bold tracking-wider uppercase text-xs mb-6 inline-block bg-[#F3CEA1]/10 px-4 py-1.5 rounded-full border border-[#F3CEA1]/20">
          Funil Automatizado
        </span>
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-16 leading-[1.1]">
          Status que se atualiza <br />
          <span className="text-[#F3CEA1]">sozinho</span>.
        </h2>
        
        {/* Steps - Horizontal Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#F3CEA1]/20 to-transparent" />

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#0A0A0A] border border-white/10 text-[#F3CEA1] font-bold text-2xl flex items-center justify-center mb-6 shadow-xl shadow-black">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Visual Representation */}
        <div className="mt-20 relative bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 max-w-3xl mx-auto shadow-2xl">
           <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
              <span className="text-xs text-slate-500 font-bold uppercase">Kanban em Tempo Real</span>
              <div className="flex gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-white/10" />
                 <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
           </div>
           <div className="grid grid-cols-3 gap-4 text-left">
              <div className="bg-black/50 p-4 rounded-xl border border-white/5 opacity-50">
                 <span className="text-[10px] text-slate-500 font-bold uppercase mb-3 block">Novo Lead</span>
                 <div className="h-2 w-12 bg-slate-700 rounded mb-2"/>
                 <div className="h-1.5 w-full bg-slate-800 rounded"/>
              </div>
              <div className="bg-black/50 p-4 rounded-xl border border-[#F3CEA1]/20 shadow-[0_0_15px_rgba(243,206,161,0.05)] transform scale-105 bg-[#F3CEA1]/5">
                 <span className="text-[10px] text-[#F3CEA1] font-bold uppercase mb-3 block">Qualificado</span>
                 <div className="h-2 w-12 bg-[#F3CEA1] rounded mb-2"/>
                 <div className="h-1.5 w-full bg-slate-800 rounded"/>
              </div>
              <div className="bg-black/50 p-4 rounded-xl border border-white/5 opacity-50">
                 <span className="text-[10px] text-slate-500 font-bold uppercase mb-3 block">Fechado</span>
                 <div className="h-2 w-12 bg-slate-700 rounded mb-2"/>
                 <div className="h-1.5 w-full bg-slate-800 rounded"/>
              </div>
           </div>
        </div>

      </div>
    </section>
  )
}
