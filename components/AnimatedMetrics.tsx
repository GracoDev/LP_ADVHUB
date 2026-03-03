'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const metrics = [
  { value: '+312%', label: 'Taxa de Conversão' },
  { value: '4h', label: 'Economizadas / dia' },
  { value: '24/7', label: 'Atendimento Ativo' },
]

export default function AnimatedMetrics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-adv-black border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {metrics.map((metric, i) => (
            <div key={i} className="pt-8 md:pt-0">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="text-6xl md:text-7xl font-bold text-white mb-2 tracking-tighter"
              >
                {metric.value}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + (i * 0.2) }}
                className="text-adv-gold font-medium uppercase tracking-widest text-sm"
              >
                {metric.label}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
