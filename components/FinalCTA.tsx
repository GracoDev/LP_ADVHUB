'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

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
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked
      })
    }
  }, [])

  return (
    <section className="py-40 bg-[#050505] relative overflow-hidden border-t border-white/5">
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          className={`min-w-full min-h-full object-cover blur-0 scale-[0.50] transition-opacity duration-1000 ${isVisible ? 'opacity-50' : 'opacity-0'}`}
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        >
          <source src="/assets/videos/cta-background.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradiente forte para garantir legibilidade no final da página */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/35 z-10" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#F3CEA1]/5 rounded-full blur-[150px] pointer-events-none z-10" />
      
      <div className="max-w-5xl mx-auto px-6 text-center relative z-20">
        <h2 className="text-5xl lg:text-8xl font-bold text-white mb-8 tracking-tighter leading-[0.9]">
          Pronto para revolucionar <br />
          <span className="text-adv-gold">seu escritório?</span>
        </h2>
        <p className="text-2xl text-slate-400 mb-14 max-w-2xl mx-auto font-medium">
          Entre em contato e veja sua taxa de conversão decolar em poucos dias.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="w-full sm:w-auto px-12 py-6 bg-adv-gold text-adv-black rounded-2xl font-bold text-xl hover:bg-yellow-400 transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,184,77,0.25)]">
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
