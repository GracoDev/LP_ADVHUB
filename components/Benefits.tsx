'use client'

export default function Benefits() {
  const scrollToCTA = () => {
    const element = document.getElementById('final-cta')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }
  const benefits = [
    { title: 'Funil Kanban', desc: 'Visualize todas as oportunidades.' },
    { title: 'Atendimento 24/7', desc: 'Nunca perca um lead.' },
    { title: 'Zero Config', desc: 'Setup em 5 minutos.' },
    { title: 'Contratos', desc: 'Assinatura digital integrada.' },
  ]

  return (
    <section id="beneficios" className="py-32 bg-[#050505] border-t border-white/5 text-center">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <span className="text-[#F3CEA1] font-bold tracking-wider uppercase text-xs mb-6 inline-block bg-[#F3CEA1]/10 px-4 py-1.5 rounded-full border border-[#F3CEA1]/20">
            Tudo em um só lugar
        </span>
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 leading-[1.05]">
          Ferramentas poderosas <br />
          para <span className="text-[#F3CEA1]">fechar contratos</span>.
        </h2>
        <p className="text-xl text-slate-400 mb-16 leading-relaxed font-medium max-w-2xl mx-auto">
          Transforme seu escritório em uma máquina de vendas com inteligência artificial especializada.
        </p>

        {/* Grid Cards - 4 cols */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="p-8 bg-[#0A0A0A] rounded-[2rem] border border-white/5 hover:border-[#F3CEA1]/50 transition-all hover:-translate-y-1 hover:shadow-xl group flex flex-col items-center">
              <div className="w-14 h-14 bg-black rounded-2xl border border-white/10 mb-6 flex items-center justify-center text-2xl group-hover:bg-[#F3CEA1] group-hover:text-black group-hover:border-transparent transition-colors duration-300">
                {i === 0 ? '📊' : i === 1 ? '🌙' : i === 2 ? '🔌' : '✍️'}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F3CEA1] transition-colors">{b.title}</h3>
              <p className="text-slate-400 font-medium text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <button 
            onClick={scrollToCTA}
            className="text-white font-bold text-lg border-b-2 border-adv-gold hover:text-adv-gold transition-colors pb-1 inline-flex items-center gap-2 group"
          >
            Começar Agora
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>

      </div>
    </section>
  )
}
