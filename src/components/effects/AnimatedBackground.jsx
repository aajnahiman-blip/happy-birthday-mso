import { motion } from 'framer-motion'

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.16),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(20,33,61,0.45),_transparent_40%)]">
      <motion.div
        className="absolute -left-6 top-8 h-40 w-40 rounded-full bg-[rgba(212,175,55,0.14)] blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, 24, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[rgba(58,80,107,0.22)] blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
