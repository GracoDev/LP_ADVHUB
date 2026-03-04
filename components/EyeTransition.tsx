'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Moon, MoonStar, BedDouble, Star, Sparkles, AlarmClock, Sun, Coffee } from 'lucide-react'

type TransitionVariant = 'close' | 'open'

interface EyeTransitionProps {
  childrenA: React.ReactNode
  childrenB: React.ReactNode
  /** close: só pálpebras fechando + próximo conteúdo surge (efeito sonho). open: só pálpebras abrindo revelando o próximo */
  variant?: TransitionVariant
}

// Efeitos de sono: startAt = progress (0–0.5) em que começam a surgir conforme o scroll
const sleepElements = [
  { Icon: Moon, x: '18%', y: '18%', size: 32, startAt: 0.02 },
  { Icon: MoonStar, x: '82%', y: '22%', size: 28, startAt: 0.06 },
  { Icon: BedDouble, x: '50%', y: '15%', size: 30, startAt: 0.10 },
  { Icon: Star, x: '25%', y: '78%', size: 24, startAt: 0.14 },
  { Icon: Sparkles, x: '75%', y: '82%', size: 26, startAt: 0.18 },
  { Icon: Moon, x: '88%', y: '75%', size: 22, startAt: 0.22 },
  { Icon: Star, x: '12%', y: '25%', size: 20, startAt: 0.26 },
  { Icon: Sparkles, x: '45%', y: '85%', size: 20, startAt: 0.30 },
] as const

const REVEAL_RANGE = 0.055 // quanto de progress para borrado → nítido

// Efeitos de acordar: variante open, startAt após LIDS_START (0.28)
const wakeElements = [
  { Icon: AlarmClock, x: '20%', y: '20%', size: 32, startAt: 0.30 },
  { Icon: Sun, x: '80%', y: '18%', size: 30, startAt: 0.35 },
  { Icon: Coffee, x: '50%', y: '15%', size: 28, startAt: 0.40 },
  { Icon: Sun, x: '25%', y: '78%', size: 26, startAt: 0.45 },
  { Icon: Sparkles, x: '75%', y: '82%', size: 24, startAt: 0.50 },
  { Icon: AlarmClock, x: '12%', y: '55%', size: 22, startAt: 0.55 },
  { Icon: Coffee, x: '88%', y: '75%', size: 24, startAt: 0.60 },
  { Icon: Sun, x: '45%', y: '85%', size: 20, startAt: 0.65 },
] as const

export default function EyeTransition({ childrenA, childrenB, variant = 'close' }: EyeTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => setProgress(v))

  useEffect(() => {
    setProgress(scrollYProgress.get())
  }, [scrollYProgress])

  // Variante CLOSE: pálpebras fecham (0→0.35), terminam mais cedo para scroll fluir
  // Variante OPEN: 0→0.25 Guarantee some aos poucos; 0.2→0.25 tela preta; 0.25→1 pálpebras abrem
  const LIDS_CLOSE_END = 0.35   // pálpebras totalmente fechadas (close) - antes era 0.5
  const FADE_OUT_END = 0.25   // Guarantee totalmente sumida (fade gradual 0→0.25)
  const LIDS_START = 0.28     // pálpebras começam a abrir (breve tela preta entre 0.25 e 0.28)
  const topLidHeight = useTransform(
    scrollYProgress,
    variant === 'close'
      ? [0, LIDS_CLOSE_END, 1]
      : [LIDS_START, 1],
    variant === 'close'
      ? ['0%', '52%', '52%']
      : ['52%', '0%']
  )
  const bottomLidHeight = useTransform(
    scrollYProgress,
    variant === 'close'
      ? [0, LIDS_CLOSE_END, 1]
      : [LIDS_START, 1],
    variant === 'close'
      ? ['0%', '52%', '52%']
      : ['52%', '0%']
  )

  // Opacidade das pálpebras: open=visíveis desde FADE_OUT_END (cobrem o gap; evitam flash do B)
  const lidsOpacity = variant === 'close'
    ? (progress <= LIDS_CLOSE_END ? 1 : Math.max(0, 1 - (progress - LIDS_CLOSE_END) / 0.1))
    : (progress >= FADE_OUT_END ? 1 : 0)

  // Conteúdo A – close: Hero até pálpebras fecharem; open: Guarantee some AOS POUCOS (0→FADE_OUT_END)
  const opacityA = variant === 'close'
    ? (progress < LIDS_CLOSE_END ? 1 : 0)
    : (progress < FADE_OUT_END ? Math.max(0, 1 - progress / FADE_OUT_END) : 0)

  // Conteúdo B – surge após pálpebras fecharem (close) ou quando pálpebras abrem (open)
  const opacityB = variant === 'close'
    ? (progress >= LIDS_CLOSE_END ? 1 : 0)
    : (progress >= LIDS_START ? 1 : 0)

  // Efeito sonho: blur ao surgir (após pálpebras fecharem), depois limpa
  const dreamBlur = variant === 'close' ? (progress >= LIDS_CLOSE_END ? Math.max(0, 5 - (progress - LIDS_CLOSE_END) * 20) : 0) : 0

  // Efeitos de sono: visíveis durante o fechamento; aparição guiada pelo scroll
  const showSleepEffects = variant === 'close' && progress > 0.005 && progress < LIDS_CLOSE_END - 0.01
  const sleepOpacity = showSleepEffects ? 1 : 0

  // Efeitos de acordar: visíveis durante abertura das pálpebras (variante open)
  const showWakeEffects = variant === 'open' && progress >= LIDS_START + 0.02 && progress < 0.72
  const wakeOpacity = showWakeEffects ? 1 : 0

  // progress → blur, opacity, scale (de pouco em pouco conforme o scroll)
  const getReveal = (startAt: number) => {
    const t = Math.max(0, Math.min(1, (progress - startAt) / REVEAL_RANGE))
    return {
      blur: 14 * (1 - t),
      opacity: t,
      scale: 0.75 + 0.25 * t,
    }
  }

  return (
    <div ref={containerRef} className="h-[320vh] relative w-full">
      {/* Âncora de scroll para CTAs - pálpebras abertas, com margem para não overshoot no FAQ */}
      {variant === 'open' && (
        <div
          id="final-cta"
          className="absolute left-0 right-0 w-full pointer-events-none invisible"
          style={{ top: '80%', height: 1 }}
          aria-hidden
        />
      )}
      <div className="sticky top-0 h-screen w-full bg-[#050505] overflow-hidden">
        {/* Conteúdo A */}
        <motion.div
          className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide"
          initial={{ opacity: 1 }}
          animate={{ opacity: opacityA }}
          transition={{ duration: 0.12 }}
          style={{ pointerEvents: opacityA < 0.01 ? 'none' : 'auto' }}
        >
          {childrenA}
        </motion.div>

        {/* Conteúdo B - efeito sonho (blur + scale do centro) na variante close */}
        <motion.div
          className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{
            opacity: opacityB,
            filter: `blur(${dreamBlur}px)`,
          }}
          transition={{ duration: 0.12 }}
          style={{ pointerEvents: opacityB < 0.01 ? 'none' : 'auto' }}
        >
          {childrenB}
        </motion.div>

        {/* Efeitos de sono – aparição guiada pelo scroll (borrado → nítido) */}
        {variant === 'close' && (
          <div
            className="absolute inset-0 z-[55] pointer-events-none"
            style={{ opacity: sleepOpacity }}
          >
            {sleepElements.map(({ Icon, x, y, size, startAt }, i) => {
              const r = getReveal(startAt)
              return (
                <motion.div
                  key={i}
                  className="absolute text-adv-gold"
                  style={{
                    left: x,
                    top: y,
                    transform: 'translate(-50%, -50%)',
                    filter: `blur(${r.blur}px) drop-shadow(0 0 10px rgba(255,184,77,${0.3 + 0.3 * r.opacity}))`,
                    opacity: r.opacity,
                    scale: r.scale,
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ y: { duration: 2.5 + i * 0.2, repeat: Infinity, ease: 'easeInOut' } }}
                >
                  <Icon size={size} strokeWidth={1.5} stroke="currentColor" fill="none" />
                </motion.div>
              )
            })}
            {/* "Zzz" topo – startAt escalonados */}
            {['Z', 'z', 'z'].map((char, i) => {
              const startAt = 0.08 + i * 0.04
              const r = getReveal(startAt)
              return (
                <motion.span
                  key={`zzz-top-${i}`}
                  className="absolute text-adv-gold font-bold text-2xl md:text-3xl select-none"
                  style={{
                    left: `${20 + i * 8}%`,
                    top: '12%',
                    filter: `blur(${r.blur}px) drop-shadow(0 0 14px rgba(255,184,77,${0.4 + 0.3 * r.opacity}))`,
                    opacity: r.opacity,
                    scale: 0.7 + 0.3 * r.opacity,
                  }}
                  animate={{ y: [0, -6, 0], rotate: [0, -4, 4, 0] }}
                  transition={{
                    y: { duration: 2 + i * 0.1, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  {char}
                </motion.span>
              )
            })}
            {/* "Zzz" base */}
            {['Z', 'z', 'z'].map((char, i) => {
              const startAt = 0.20 + i * 0.04
              const r = getReveal(startAt)
              return (
                <motion.span
                  key={`zzz-bottom-${i}`}
                  className="absolute text-adv-gold font-bold text-2xl md:text-3xl select-none"
                  style={{
                    left: `${60 + i * 8}%`,
                    top: '88%',
                    filter: `blur(${r.blur}px) drop-shadow(0 0 14px rgba(255,184,77,${0.4 + 0.3 * r.opacity}))`,
                    opacity: r.opacity,
                    scale: 0.7 + 0.3 * r.opacity,
                  }}
                  animate={{ y: [0, -6, 0], rotate: [0, -4, 4, 0] }}
                  transition={{
                    y: { duration: 2.2 + i * 0.1, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  {char}
                </motion.span>
              )
            })}
          </div>
        )}

        {/* Efeitos de acordar – aparição guiada pelo scroll (pálpebras abrindo) */}
        {variant === 'open' && (
          <div
            className="absolute inset-0 z-[55] pointer-events-none"
            style={{ opacity: wakeOpacity }}
          >
            {wakeElements.map(({ Icon, x, y, size, startAt }, i) => {
              const r = getReveal(startAt)
              return (
                <motion.div
                  key={i}
                  className="absolute text-adv-gold"
                  style={{
                    left: x,
                    top: y,
                    transform: 'translate(-50%, -50%)',
                    filter: `blur(${r.blur}px) drop-shadow(0 0 10px rgba(255,184,77,${0.3 + 0.3 * r.opacity}))`,
                    opacity: r.opacity,
                    scale: r.scale,
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ y: { duration: 2.2 + i * 0.15, repeat: Infinity, ease: 'easeInOut' } }}
                >
                  <Icon size={size} strokeWidth={1.5} stroke="currentColor" fill="none" />
                </motion.div>
              )
            })}
            {/* "☀" topo e base – acordar */}
            {['☀', '☀', '☀'].map((char, i) => {
              const startAt = 0.32 + i * 0.05
              const r = getReveal(startAt)
              return (
                <motion.span
                  key={`sun-top-${i}`}
                  className="absolute text-adv-gold font-bold text-2xl md:text-3xl select-none"
                  style={{
                    left: `${22 + i * 8}%`,
                    top: '14%',
                    filter: `blur(${r.blur}px) drop-shadow(0 0 14px rgba(255,184,77,${0.4 + 0.3 * r.opacity}))`,
                    opacity: r.opacity,
                    scale: 0.7 + 0.3 * r.opacity,
                  }}
                  animate={{ y: [0, -5, 0], rotate: [0, 10, -10, 0] }}
                  transition={{
                    y: { duration: 2.5 + i * 0.1, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  {char}
                </motion.span>
              )
            })}
            {['☀', '☀', '☀'].map((char, i) => {
              const startAt = 0.46 + i * 0.05
              const r = getReveal(startAt)
              return (
                <motion.span
                  key={`sun-bottom-${i}`}
                  className="absolute text-adv-gold font-bold text-2xl md:text-3xl select-none"
                  style={{
                    left: `${58 + i * 8}%`,
                    top: '86%',
                    filter: `blur(${r.blur}px) drop-shadow(0 0 14px rgba(255,184,77,${0.4 + 0.3 * r.opacity}))`,
                    opacity: r.opacity,
                    scale: 0.7 + 0.3 * r.opacity,
                  }}
                  animate={{ y: [0, -5, 0], rotate: [0, -8, 8, 0] }}
                  transition={{
                    y: { duration: 2.3 + i * 0.1, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  {char}
                </motion.span>
              )
            })}
          </div>
        )}

        {/* Pálpebras - só visíveis durante o movimento */}
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none"
          animate={{ opacity: lidsOpacity }}
          transition={{ duration: 0.15 }}
        >
          {/* Pálpebra superior - arco (centro alto, cantos baixos), concavidade para cima */}
          <motion.div
            className="absolute left-0 right-0 top-0 bg-[#050505]"
            style={{
              height: topLidHeight,
              borderBottomLeftRadius: '80% 35%',
              borderBottomRightRadius: '80% 35%',
            }}
          />
          {/* Pálpebra inferior - sorriso (centro baixo, cantos altos), concavidade para baixo */}
          <motion.div
            className="absolute left-0 right-0 bottom-0 bg-[#050505]"
            style={{
              height: bottomLidHeight,
              borderTopLeftRadius: '80% 35%',
              borderTopRightRadius: '80% 35%',
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}
