'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const PIXEL_COUNT = 180
const CLICK_RADIUS = 180
const CLICK_REPULSE_STRENGTH = 120
// Faixas laterais padrão (0-16% esquerda, 84-100% direita)
const DEFAULT_LEFT_BAND_END = 16
const DEFAULT_RIGHT_BAND_START = 84
// Hero/FinalCTA: pixels mais próximos do centro (0-24% esquerda, 76-100% direita)
const WIDER_LEFT_BAND_END = 24
const WIDER_RIGHT_BAND_START = 76

interface Pixel {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
  isLeftBand?: boolean
}

function generatePixels(leftBandEnd: number, rightBandStart: number): Pixel[] {
  const result: Pixel[] = []
  for (let i = 0; i < PIXEL_COUNT; i++) {
    const side = Math.random() > 0.5 ? 0 : 1
    const xPercent = side === 0
      ? Math.random() * leftBandEnd
      : rightBandStart + Math.random() * (100 - rightBandStart)
    const yPercent = 2 + Math.random() * 96
    result.push({
      id: i,
      x: xPercent,
      y: yPercent,
      size: 2.8 + Math.random() * 2.2,
      opacity: 0.2 + Math.random() * 0.5,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 4,
    })
  }
  return result
}

interface FloatingPixelsProps {
  /** Hero e FinalCTA: pixels mais próximos do centro */
  widerBands?: boolean
}

export default function FloatingPixels({ widerBands = false }: FloatingPixelsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [clickBurst, setClickBurst] = useState<{ x: number; y: number } | null>(null)
  const [pixels, setPixels] = useState<Pixel[] | null>(null)

  const leftBandEnd = widerBands ? WIDER_LEFT_BAND_END : DEFAULT_LEFT_BAND_END
  const rightBandStart = widerBands ? WIDER_RIGHT_BAND_START : DEFAULT_RIGHT_BAND_START

  useEffect(() => {
    setPixels(generatePixels(leftBandEnd, rightBandStart))
  }, [leftBandEnd, rightBandStart])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setClickBurst({ x, y })
        setTimeout(() => setClickBurst(null), 550)
      }
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  const leftPixels = pixels ? pixels.filter((p) => p.x < leftBandEnd) : []
  const rightPixels = pixels ? pixels.filter((p) => p.x >= rightBandStart) : []

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      aria-hidden
    >
      {/* Faixa esquerda - overflow hidden para pixels não invadirem o centro */}
      <div
        className="absolute left-0 top-0 bottom-0 overflow-hidden"
        style={{ width: `${leftBandEnd}%` }}
      >
        {leftPixels.map((pixel) => (
          <PixelDot
            key={pixel.id}
            pixel={{ ...pixel, x: (pixel.x / leftBandEnd) * 100, isLeftBand: true }}
            clickBurst={clickBurst}
            containerRef={containerRef}
            bandSide="left"
            leftBandEnd={leftBandEnd}
            rightBandStart={rightBandStart}
          />
        ))}
      </div>
      {/* Faixa direita */}
      <div
        className="absolute right-0 top-0 bottom-0 overflow-hidden"
        style={{ width: `${100 - rightBandStart}%` }}
      >
        {rightPixels.map((pixel) => (
          <PixelDot
            key={pixel.id}
            pixel={{
              ...pixel,
              x: ((pixel.x - rightBandStart) / (100 - rightBandStart)) * 100,
              isLeftBand: false,
            }}
            clickBurst={clickBurst}
            containerRef={containerRef}
            bandSide="right"
            leftBandEnd={leftBandEnd}
            rightBandStart={rightBandStart}
          />
        ))}
      </div>
    </div>
  )
}

function PixelDot({
  pixel,
  clickBurst,
  containerRef,
  bandSide,
  leftBandEnd,
  rightBandStart,
}: {
  pixel: Pixel
  clickBurst: { x: number; y: number } | null
  containerRef: React.RefObject<HTMLDivElement | null>
  bandSide: 'left' | 'right'
  leftBandEnd: number
  rightBandStart: number
}) {
  const [repulse, setRepulse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current || !clickBurst) {
      if (!clickBurst) setRepulse({ x: 0, y: 0 })
      return
    }

    const rect = containerRef.current.getBoundingClientRect()
    const pixelX =
      bandSide === 'left'
        ? (pixel.x / 100) * (leftBandEnd / 100) * rect.width
        : (rightBandStart / 100) * rect.width +
          (pixel.x / 100) * ((100 - rightBandStart) / 100) * rect.width
    const pixelY = (pixel.y / 100) * rect.height

    const dx = clickBurst.x - pixelX
    const dy = clickBurst.y - pixelY
    const distance = Math.sqrt(dx * dx + dy * dy)
    let totalX = 0
    let totalY = 0
    if (distance < CLICK_RADIUS && distance > 0) {
      const force = (1 - distance / CLICK_RADIUS) * CLICK_REPULSE_STRENGTH
      const angle = Math.atan2(dy, dx)
      totalX = -Math.cos(angle) * force
      totalY = -Math.sin(angle) * force
    }

    setRepulse({ x: totalX, y: totalY })
  }, [clickBurst, pixel.x, pixel.y, bandSide, leftBandEnd, rightBandStart, containerRef])

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${pixel.x}%`,
        top: `${pixel.y}%`,
        width: pixel.size,
        height: pixel.size,
      }}
      animate={{
        x: [0, 5, -4, 6, -3, 0],
        y: [0, -4, 5, -3, 4, 0],
        transition: {
          duration: pixel.duration,
          delay: pixel.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
    >
      <motion.div
        className="w-full h-full rounded-none bg-[#F3CEA1] shadow-[0_0_8px_rgba(243,206,161,0.5)]"
        style={{ opacity: pixel.opacity }}
        animate={{
          x: repulse.x,
          y: repulse.y,
        }}
        transition={{
          type: 'spring',
          stiffness: clickBurst ? 280 : 180,
          damping: clickBurst ? 18 : 25,
        }}
      />
    </motion.div>
  )
}
