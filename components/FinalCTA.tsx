'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import FloatingPixels from './FloatingPixels'

export default function FinalCTA() {
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

  return (
    <section className="min-h-screen py-32 md:py-44 lg:py-52 bg-[#050505] relative overflow-hidden border-t border-white/5 flex flex-col justify-center">
      
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
          <source src="/assets/videos/cta-background.mp4" type="video/mp4" />
        </video>
        {/* Overlay com gradiente suave - transição gradual do dourado/laranja para o preto */}
        <div 
          className="absolute inset-0 z-10" 
          style={{
            background: 'linear-gradient(to top, #050505 0%, #080808 15%, #0a0a0a 35%, rgba(20, 18, 15, 0.85) 55%, rgba(15, 12, 8, 0.5) 75%, transparent 100%)',
          }}
        />
      </div>

      {/* Pixels flutuantes nas laterais (onde o vídeo não cobre) */}
      <FloatingPixels widerBands />

      {/* Orbes douradas nas laterais – centro livre para o vídeo */}
      <div className="absolute top-1/2 left-[-15%] -translate-y-1/2 w-[600px] h-[800px] bg-[#FFB84D]/10 rounded-full blur-[140px] pointer-events-none z-10" />
      <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] bg-[#F3CEA1]/8 rounded-full blur-[120px] pointer-events-none z-10" />
      <div className="absolute top-1/2 right-[-15%] -translate-y-1/2 w-[600px] h-[800px] bg-[#FFB84D]/10 rounded-full blur-[140px] pointer-events-none z-10" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] bg-[#F3CEA1]/8 rounded-full blur-[120px] pointer-events-none z-10" />
      
      <div className="max-w-5xl mx-auto px-6 text-center relative z-20">
        <h2 className="text-5xl lg:text-8xl font-bold text-white mb-8 tracking-tighter leading-[0.9]">
          Pronto para revolucionar <br />
          <span className="text-adv-gold">seu escritório?</span>
        </h2>
        <p className="text-2xl text-slate-400 mb-14 max-w-2xl mx-auto font-medium">
          Entre em contato e veja sua taxa de conversão decolar em poucos dias.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button id="cta-principal" className="w-full sm:w-auto px-12 py-6 bg-adv-gold text-adv-black rounded-2xl font-bold text-xl hover:bg-yellow-400 transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,184,77,0.25)]">
             Adquirir Agora
          </button>
        </div>
        
        <p className="mt-10 text-slate-500 text-sm font-medium uppercase tracking-widest">
           Setup em menos de 5 minutos • Suporte humano
        </p>
      </div>
    </section>
  )
}
