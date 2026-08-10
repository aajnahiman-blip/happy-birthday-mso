import { useMemo } from 'react'
import { motion } from 'framer-motion'

export function GoldenParticles({ count = 30, isBlown = false }) {
  const particles = useMemo(() => {
    const totalCount = isBlown ? count * 2.5 : count
    return Array.from({ length: totalCount }).map((_, i) => {
      const typeChoice = i % 8
      let type = 'dot'
      if (typeChoice === 0) type = 'heart'
      else if (typeChoice === 1) type = 'sparkle'
      else if (typeChoice === 2 && isBlown) type = 'balloon'
      else if (typeChoice === 3 && isBlown) type = 'rose'

      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 4,
        type,
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
            opacity: [0, 0.9, 0.7, 0.9, 0],
            y: ['105%', '-10%'],
            x: [`${p.x}%`, `${(p.x + (p.id % 2 === 0 ? 12 : -12))}%`],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
          }}
          className="flex items-center justify-center select-none"
        >
          {p.type === 'heart' ? (
            <span className="text-rose-400 text-sm drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]">♥</span>
          ) : p.type === 'balloon' ? (
            <span className="text-amber-400 text-base drop-shadow-[0_0_10px_rgba(212,175,55,0.7)]">🎈</span>
          ) : p.type === 'rose' ? (
            <span className="text-rose-300 text-sm opacity-90 drop-shadow-[0_0_6px_rgba(244,114,182,0.5)]">🌹</span>
          ) : p.type === 'sparkle' ? (
            <span className="text-[#f5d77f] text-xs drop-shadow-[0_0_10px_#d4af37]">✨</span>
          ) : (
            <div
              className="rounded-full bg-gradient-to-r from-[#d4af37] to-[#f5d77f] shadow-[0_0_10px_#d4af37]"
              style={{ width: `${p.size}px`, height: `${p.size}px` }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

