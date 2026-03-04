import Link from 'next/link'
import Logo from './Logo'
import { Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-16 relative overflow-hidden">
      {/* Orbes radiais douradas */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FFB84D]/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[5%] w-[400px] h-[250px] bg-[#F3CEA1]/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[250px] bg-[#FFB84D]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-6 text-center relative z-10">
        
        {/* Brand */}
        <div className="flex flex-col items-center mb-12">
          <Link href="/" className="mb-6 hover:opacity-80 transition-opacity">
            <Logo className="h-8 w-auto" />
          </Link>
          <p className="text-slate-400 text-sm max-w-md leading-relaxed">
            A revolução tecnológica que seu escritório de advocacia precisava para escalar com eficiência e inteligência.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 text-sm text-slate-400 font-medium">
          <Link href="#como-funciona" className="hover:text-[#F3CEA1] transition-colors">
            Como Funciona
          </Link>
          <Link href="#integracoes" className="hover:text-[#F3CEA1] transition-colors">
            Conexões
          </Link>
          <Link href="#garantia" className="hover:text-[#F3CEA1] transition-colors">
            Garantia
          </Link>
          <Link href="#faq" className="hover:text-[#F3CEA1] transition-colors">
            FAQ
          </Link>
          <Link href="#final-cta" className="hover:text-adv-gold transition-colors font-bold text-adv-gold">
            Adquirir Agora
          </Link>
        </div>

        {/* Instagram Highlight */}
        <div className="flex justify-center mb-16">
          <a 
            href="https://www.instagram.com/advhub.ai/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#0A0A0A] border border-white/10 rounded-2xl hover:border-[#F3CEA1]/50 hover:bg-[#0F0F0F] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.04)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="p-2 bg-gradient-to-tr from-purple-500 to-orange-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            
            <div className="text-left">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Siga-nos</p>
              <p className="text-white font-bold group-hover:text-[#F3CEA1] transition-colors">@advhub.ai</p>
            </div>
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8">
          <p className="text-slate-600 text-xs">
            © 2026 Advhub Tecnologia Ltda. Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  )
}
