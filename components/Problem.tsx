export default function Problem() {
  return (
    <section className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden flex flex-col items-center">
      <div className="max-w-[1000px] mx-auto px-6 relative z-10 w-full text-center">
        
        {/* Header Centralized */}
        <span className="text-[#F3CEA1] font-bold tracking-wider uppercase text-xs mb-6 inline-block bg-[#F3CEA1]/10 px-4 py-1.5 rounded-full border border-[#F3CEA1]/20">
          O Problema
        </span>
        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-[1.05] tracking-tight">
          WhatsApp lotado. <br />
          <span className="text-slate-500">Escritório parado.</span>
        </h2>
        <p className="text-xl text-slate-400 mb-16 leading-relaxed font-medium max-w-2xl mx-auto">
          A cada minuto que um lead espera, sua chance de fechar cai. <br className="hidden md:block"/>
          Você está perdendo contratos porque não consegue responder a todos a tempo.
        </p>
        
        {/* Cards Grid - 3 cols centralized */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Resposta Lenta', desc: 'Leads frios desistem em < 5min.' },
            { title: 'Triagem Manual', desc: 'Advogados caros fazendo trabalho repetitivo.' },
            { title: 'Sem Padrão', desc: 'Atendimento inconsistente que não passa segurança.' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F3CEA1] font-bold text-2xl mb-6 group-hover:scale-110 transition-transform">
                !
              </div>
              <h3 className="text-white text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Visual Alert Bar */}
        <div className="mt-16 bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto shadow-2xl">
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white font-bold">Status Atual</span>
           </div>
           <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
           <p className="text-slate-400 text-sm">
             <span className="text-red-400 font-bold">99+ mensagens não lidas</span> no WhatsApp agora.
           </p>
        </div>

      </div>
    </section>
  )
}
