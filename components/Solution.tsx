export default function Solution() {
  const features = [
    { 
      title: 'Filtro Automático', 
      desc: 'IA elimina curiosos e passa apenas casos viáveis.',
      icon: '⚡'
    },
    { 
      title: 'Agenda Sincronizada', 
      desc: 'Consultas marcadas direto no seu Google Calendar.',
      icon: '📅'
    },
    { 
      title: 'Contrato Assinado', 
      desc: 'Procuração assinada digitalmente no WhatsApp.',
      icon: '✍️'
    },
  ]

  return (
    <section className="py-32 bg-[#050505] border-t border-white/5 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-3xl">
            <span className="text-[#F3CEA1] font-bold tracking-wider uppercase text-xs mb-6 block bg-[#F3CEA1]/10 w-fit px-3 py-1 rounded-full border border-[#F3CEA1]/20">
              A Solução
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
              Sua IA jurídica que <br />
              <span className="text-[#F3CEA1]">nunca descansa</span>.
            </h2>
          </div>
          <div className="hidden md:block">
            <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-bold transition-all">
              Ver todas as features →
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="group relative p-10 bg-[#0A0A0A] rounded-[2rem] border border-white/5 hover:border-[#F3CEA1]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F3CEA1]/5 flex flex-col items-start h-full">
              
              <div className="w-16 h-16 bg-black rounded-2xl border border-white/10 flex items-center justify-center text-3xl mb-8 shadow-inner group-hover:scale-110 transition-transform duration-300 group-hover:border-[#F3CEA1]/30 group-hover:bg-[#F3CEA1]/10 group-hover:text-[#F3CEA1]">
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#F3CEA1] transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-slate-400 leading-relaxed text-lg font-medium mb-8">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
