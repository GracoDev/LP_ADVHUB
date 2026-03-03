'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { MouseEvent } from 'react'

export default function MouseFollowWrapper({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div 
      className="relative min-h-screen bg-adv-black group"
      onMouseMove={handleMouseMove}
    >
      {/* 
        Global Glow Layer 
        Agora cobre toda a página, seguindo o mouse em qualquer seção.
      */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(243, 206, 161, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Conteúdo da Página */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
