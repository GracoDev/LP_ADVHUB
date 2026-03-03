export default function Testimonials() {
  const testimonials = [
    { 
      quote: "Triplicamos o número de contratos fechados no primeiro mês.",
      author: "João Silva",
      role: "Silva & Associados",
      metric: "+312% Conversão"
    },
    { 
      quote: "O cliente assina o contrato direto no WhatsApp em segundos.",
      author: "Maria Santos",
      role: "Advocacia Santos",
      metric: "Fechamento Rápido"
    },
    { 
      quote: "Agora só falo com quem realmente tem um caso e quer contratar.",
      author: "Carlos Mendes",
      role: "Mendes Advocacia",
      metric: "4h economizadas/dia"
    }
  ]

  return (
    <section id="depoimentos" className="py-32 bg-[#050505] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-20 text-center">
          Confiado por escritórios <br/> <span className="text-[#F3CEA1]">em todo Brasil</span>
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[#0A0A0A] p-10 rounded-[2.5rem] border border-white/5 relative hover:border-white/10 transition-colors">
              <span className="inline-block bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1 rounded-full mb-6 border border-green-500/20">
                {t.metric}
              </span>
              <p className="text-slate-300 text-xl font-medium mb-8 leading-relaxed">
                &quot;{t.quote}&quot;
              </p>
              
              <div className="pt-8 border-t border-white/5 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center font-bold text-white border border-white/5">
                  {t.author[0]}
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.author}</h4>
                  <p className="text-slate-500 text-xs uppercase tracking-wide font-bold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
