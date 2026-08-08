import { useMemo } from 'react'
import { motion } from 'framer-motion'

export function GoldenParticles({ count = 25, isBlown = false }) {
  const particles = useMemo(() => {
    return Array.from({ length: isBlown ? count * 2 : count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      type: i % 5 === 0 ? 'heart' : i % 7 === 0 ? 'sparkle' : 'dot',
    }))
  }, [count, isBlown])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: `${p.y}%`, x: `${p.x}%` }}
          animate={{
            opacity: [0, 0.8, 0.2, 0.9, 0],
            y: [`${p.y}%`, `${(p.y - 40 + 100) % 100}%`],
            x: [`${p.x}%`, `${(p.x + (p.id % 2 === 0 ? 15 : -15) + 100) % 100}%`],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          className="flex items-center justify-center text-[#d4af37]"
        >
          {p.type === 'heart' ? (
            <span className="text-xs opacity-75">♥</span>
          ) : p.type === 'sparkle' ? (
            <span className="text-[10px] opacity-85">✨</span>
          ) : (
            <div className="h-full w-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#f5d77f] shadow-[0_0_8px_#d4af37]" />
          )}
        </motion.div>
      ))}
    </div>
  )
}
