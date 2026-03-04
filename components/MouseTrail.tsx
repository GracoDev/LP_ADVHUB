'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ClickRipple {
  id: number
  x: number
  y: number
}

export default function MouseTrail() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [ripples, setRipples] = useState<ClickRipple[]>([])
  const idRef = useRef(0)
  const rafRef = useRef<number>()

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isVisible) setIsVisible(true)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      setPos({ x: e.clientX, y: e.clientY })
    })
  }, [isVisible])

  const handleClick = useCallback((e: MouseEvent) => {
    setRipples(prev => [...prev.slice(-3), { id: idRef.current++, x: e.clientX, y: e.clientY }])
    setTimeout(() => {
      setRipples(prev => prev.slice(1))
    }, 600)
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [handleMouseMove, handleClick])

  if (!isVisible) return null

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden
    >
      {/* Glow que segue o cursor - halo tecnológico */}
      <motion.div
        className="absolute w-[280px] h-[280px] rounded-full"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255, 184, 77, 0.2) 0%, rgba(255, 184, 77, 0.06) 40%, transparent 70%)',
          filter: 'blur(10px)',
        }}
        animate={{ left: pos.x, top: pos.y }}
        transition={{ type: 'spring', damping: 35, stiffness: 400 }}
      />

      {/* Ondas de clique - feedback visual elegante */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 0 3px rgba(255, 184, 77, 0.4), 0 0 30px rgba(255, 184, 77, 0.15)',
            }}
            initial={{ width: 0, height: 0, opacity: 0.9 }}
            animate={{ width: 120, height: 120, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
