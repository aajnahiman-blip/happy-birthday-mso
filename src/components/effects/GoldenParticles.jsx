import { useMemo } from 'react'
import { motion } from 'framer-motion'

export function GoldenParticles({ count = 25, isBlown = false }) {
  const particles = useMemo(() => {
    const totalCount = isBlown ? Math.floor(count * 1.6) : count
    const warmColors = [
      'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
      'bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.6)]',
      'bg-[#E11D48] shadow-[0_0_8px_rgba(225,29,72,0.6)]',
      'bg-amber-200 shadow-[0_0_6px_rgba(253,230,138,0.6)]',
      'bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]',
    ]

    return Array.from({ length: totalCount }).map((_, i) => {
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1.5,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 5,
        colorClass: warmColors[i % warmColors.length],
      }
    })
  }, [count, isBlown])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: '105%', x: `${p.x}%` }}
          animate={{
            opacity: [0, 0.7, 0.45, 0.7, 0],
            y: ['105%', '-10%'],
            x: [`${p.x}%`, `${(p.x + (p.id % 2 === 0 ? 8 : -8))}%`],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          style={{ position: 'absolute' }}
          className="flex items-center justify-center select-none"
        >
          <div
            className={`rounded-full ${p.colorClass}`}
            style={{ width: `${p.size}px`, height: `${p.size}px` }}
          />
        </motion.div>
      ))}
    </div>
  )
}
