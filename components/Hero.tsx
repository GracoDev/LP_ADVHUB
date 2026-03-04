'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Play } from 'lucide-react'
import FloatingPixels from './FloatingPixels'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Controle de loop suave com fade in/out
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const video = videoRef.current
      const timeLeft = video.duration - video.currentTime

      // Começa a desaparecer 1s antes do fim
      if (timeLeft < 1.0 && isVisible) {
        setIsVisible(false)
      }
      
      // Começa a aparecer no início
      if (video.currentTime < 0.5 && !isVisible) {
        setIsVisible(true)
      }
    }
  }

  const handleEnded = () => {
    const v = videoRef.current
    if (v) {
      v.muted = true
      v.currentTime = 0
      v.play()
    }
  }

  useEffect(() => {
    const v = videoRef.current
    if (v) {
      v.muted = true
      v.volume = 0
      v.play().catch(() => {
        // Autoplay blocked
      })
    }
  }, [])

  const scrollToCTA = () => {
    const element = document.getElementById('final-cta');
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };


  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          className={`min-w-full min-h-full object-cover blur-0 scale-[0.40] transition-opacity duration-1000 ${isVisible ? 'opacity-50' : 'opacity-0'}`}
          muted
          playsInline
          onLoadedMetadata={(e) => { e.currentTarget.muted = true; e.currentTarget.volume = 0 }}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        >
          <source src="/assets/videos/background.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradiente para garantir legibilidade */}
        <div className="absolute inset-0 bg-adv-black/55 z-10" />
      </div>

      {/* Pixels flutuantes nas laterais (onde o vídeo não cobre) */}
      <FloatingPixels widerBands />

      {/* Orbes radiais douradas AdvHub */}
      <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-[#FFB84D]/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[650px] h-[650px] bg-[#F3CEA1]/18 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] bg-[#FFB84D]/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-[#F3CEA1]/12 rounded-full blur-[100px] pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-8"
        >
          Feche contratos<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-adv-gold to-orange-600">
            enquanto dorme.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          IA que qualifica leads, agenda reuniões e fecha contratos pelo WhatsApp.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button 
            onClick={scrollToCTA}
            className="group relative px-10 py-5 bg-adv-gold text-adv-black rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,184,77,0.3)] shadow-[0_0_30px_rgba(255,184,77,0.15)]"
          >
            <span className="relative z-10">Começar Agora</span>
          </button>
          
          <button 
            onClick={scrollToCTA}
            className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-3 group shadow-[0_0_25px_rgba(255,255,255,0.06)]"
          >
            <span>Ver Demonstração</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform text-adv-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mt-8"
        >
          <span className="w-2 h-2 rounded-full bg-adv-gold animate-pulse shadow-[0_0_10px_rgba(255,184,77,0.5)]" />
          <span className="text-sm text-slate-300 font-medium tracking-wide">IA Jurídica de Alta Performance</span>
        </motion.div>

      </div>
      
      {/* Play Button removido pois agora é loop automático */}
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-slate-500 to-transparent" />
      </motion.div>
    </section>
  )
}
