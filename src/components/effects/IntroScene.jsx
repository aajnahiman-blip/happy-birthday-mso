import { motion } from 'framer-motion'

const lights = [
  { id: 1, left: '8%', top: '12%', size: 'h-24 w-16', color: 'from-[#1D4ED8] to-[#08111F]' },
  { id: 2, left: '24%', top: '18%', size: 'h-20 w-14', color: 'from-[#0B1730] to-[#08111F]' },
  { id: 3, left: '72%', top: '14%', size: 'h-28 w-18', color: 'from-[#1F2937] to-[#030508]' },
  { id: 4, left: '84%', top: '24%', size: 'h-24 w-16', color: 'from-[#CBD5E1] to-[#08111F]' },
]

const sparkles = [
  { id: 1, left: '12%', top: '30%', rotate: 18 },
  { id: 2, left: '28%', top: '20%', rotate: 48 },
  { id: 3, left: '40%', top: '24%', rotate: 88 },
  { id: 4, left: '68%', top: '34%', rotate: 24 },
  { id: 5, left: '80%', top: '22%', rotate: 66 },
]

function GlowBurst({ delay }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, delay, ease: 'easeOut' }}
    >
      {[0, 1, 2, 3, 4, 5].map((dot) => (
        <motion.span
          key={dot}
          className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-[#38BDF8]"
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={{ x: [0, Math.cos(dot * 60) * 120], y: [0, Math.sin(dot * 60) * 120], scale: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, delay, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  )
}

export function IntroScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(29,78,216,0.12),_transparent_38%),radial-gradient(circle_at_bottom,_rgba(8,17,31,0.28),_transparent_35%)]" />

      <motion.div
        className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_35%,rgba(255,255,255,0.03))]"
        animate={{ x: ['-20%', '20%', '-20%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {lights.map((light) => (
        <motion.div
          key={light.id}
          className={`absolute ${light.size} rounded-[999px] bg-gradient-to-b ${light.color} shadow-[0_20px_50px_rgba(3,5,8,0.4)]`}
          style={{ left: light.left, top: light.top }}
          animate={{ y: [0, -14, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 3.6 + light.id * 0.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute inset-x-2 top-3 h-4 rounded-full bg-white/20" />
          <div className="absolute bottom-[-20px] left-1/2 h-8 w-[2px] -translate-x-1/2 bg-white/50" />
        </motion.div>
      ))}

      {sparkles.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute h-3 w-3 rounded-full bg-[#38BDF8]/60"
          style={{ left: piece.left, top: piece.top, rotate: `${piece.rotate}deg` }}
          animate={{ y: [0, 24, 0], x: [0, 10, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4 + piece.id * 0.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative flex h-48 w-48 items-center justify-center rounded-[2rem] border border-[rgba(56,189,248,0.15)] bg-white/10 backdrop-blur-xl"
          animate={{ y: [0, -8, 0], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 3.7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute inset-4 rounded-[1.75rem] border border-[rgba(56,189,248,0.12)]" />
          <motion.div
            className="absolute top-5 h-16 w-24 rounded-t-[2rem] border border-[rgba(56,189,248,0.12)] bg-white/10"
            animate={{ rotateX: [0, 20, 0], y: [0, -4, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute bottom-8 h-16 w-28 rounded-[1.2rem] border border-[rgba(56,189,248,0.12)] bg-white/10" />
          <div className="absolute bottom-12 text-5xl text-[#38BDF8]">✦</div>
        </motion.div>
      </div>

      <div className="absolute inset-0">
        <GlowBurst delay={0.2} />
        <GlowBurst delay={1.5} />
        <GlowBurst delay={2.8} />
      </div>
    </div>
  )
}
