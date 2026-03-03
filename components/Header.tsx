'use client'

import Link from 'next/link'
import Logo from './Logo'

export default function Header() {
  const scrollToCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('final-cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="h-8 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-400">
          <Link href="#como-funciona" className="hover:text-white transition-colors scroll-smooth">
            Como Funciona
          </Link>
          <Link href="#integracoes" className="hover:text-white transition-colors scroll-smooth">
            Conexões
          </Link>
          <Link href="#garantia" className="hover:text-white transition-colors scroll-smooth">
            Garantia
          </Link>
          <Link href="#faq" className="hover:text-white transition-colors scroll-smooth">
            FAQ
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-6">
          <Link 
            href="#" 
            className="hidden md:block text-slate-300 font-medium hover:text-white transition-colors text-sm"
          >
            Entrar
          </Link>
          <button 
            onClick={scrollToCTA}
            className="px-6 py-2.5 bg-[#F3CEA1] text-black rounded-lg font-bold text-sm hover:bg-[#E5BE90] transition-all hover:shadow-[0_0_15px_rgba(243,206,161,0.3)] transform hover:-translate-y-0.5"
          >
            Adquirir
          </button>
        </div>
      </div>
    </header>
  )
}
