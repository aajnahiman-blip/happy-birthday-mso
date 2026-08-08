import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCrown, FaStar } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'

export function LuxuryCake({ isBlown, onBlowCandles }) {
  const { t } = useLanguage()
  const [hovered, setHovered] = useState(false)

  const handleClick = () => {
    if (isBlown) return
    onBlowCandles()
  }

  return (
    <div className="relative flex flex-col items-center justify-center py-6">
      {/* Make a wish prompt */}
      <motion.button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative cursor-pointer outline-none"
        aria-label={t('makeAWish')}
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.4)] bg-[rgba(15,23,42,0.85)] px-6 py-2.5 shadow-[0_0_25px_rgba(212,175,55,0.25)] backdrop-blur-xl transition duration-300 group-hover:border-[#d4af37]">
          <FaStar className={`text-sm text-[#d4af37] ${isBlown ? '' : 'animate-spin'}`} />
          <span className="text-sm font-bold tracking-wider text-[var(--text-primary)]">
            {isBlown ? t('makeAWish') : t('makeAWish')}
          </span>
          <FaCrown className="text-sm text-[#d4af37]" />
        </div>

        {/* Cake Container */}
        <div className="relative flex flex-col items-center">
          {/* Candles Row */}
          <div className="relative z-20 flex gap-6 sm:gap-8 mb-[-4px]">
            {[1, 2, 3, 4, 5].map((candleIndex) => (
              <div key={candleIndex} className="relative flex flex-col items-center">
                {/* Flame */}
                {!isBlown && (
                  <motion.div
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{
                      scale: [1, 1.15, 0.95, 1.1],
                      opacity: [0.9, 1, 0.85, 1],
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: 'mirror',
                      delay: candleIndex * 0.1,
                    }}
                    className="relative mb-1 flex justify-center"
                  >
                    {/* Flame Inner & Glow */}
                    <div className="h-5 w-3.5 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_15px_#f5d77f,0_0_30px_#d4af37]" />
                  </motion.div>
                )}

                {/* Candle Smoke when blown */}
                {isBlown && (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                    animate={{ opacity: 0, y: -25, scale: 1.5 }}
                    transition={{ duration: 1.5, delay: candleIndex * 0.1 }}
                    className="mb-1 h-3 w-1.5 rounded-full bg-slate-400 blur-[1px]"
                  />
                )}

                {/* Candle Body */}
                <div className="h-10 w-2.5 rounded-t-sm border border-[rgba(212,175,55,0.4)] bg-gradient-to-b from-[#f5d77f] via-[#d4af37] to-[#14213d] shadow-md" />
              </div>
            ))}
          </div>

          {/* Tier 1 (Top) */}
          <div className="relative z-10 h-14 w-44 rounded-t-2xl border border-[rgba(212,175,55,0.3)] bg-gradient-to-r from-[#14213d] via-[#1f1f1f] to-[#0f172a] shadow-lg sm:w-56">
            <div className="absolute top-0 inset-x-0 h-3 rounded-t-2xl bg-gradient-to-r from-[#d4af37]/30 via-[#f5d77f]/40 to-[#d4af37]/30" />
            <div className="flex h-full items-center justify-center text-xs font-bold tracking-widest text-[#d4af37] opacity-80">
              M ♡ S ♡ O
            </div>
          </div>

          {/* Tier 2 (Middle) */}
          <div className="relative z-0 h-16 w-60 rounded-t-2xl border border-[rgba(212,175,55,0.35)] bg-gradient-to-r from-[#0b0b0b] via-[#1f1f1f] to-[#0b0b0b] shadow-xl sm:w-72">
            <div className="absolute top-0 inset-x-0 h-3 rounded-t-2xl bg-[#d4af37]/20" />
            <div className="flex h-full items-center justify-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f5d77f]" />
              <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
            </div>
          </div>

          {/* Tier 3 (Base) */}
          <div className="relative z-0 h-20 w-72 rounded-t-3xl border border-[rgba(212,175,55,0.4)] bg-gradient-to-r from-[#06070b] via-[#14213d] to-[#06070b] shadow-2xl sm:w-88">
            <div className="absolute top-0 inset-x-0 h-4 rounded-t-3xl bg-gradient-to-r from-[#d4af37]/40 via-[#f5d77f]/50 to-[#d4af37]/40" />
            <div className="flex h-full items-center justify-center text-sm font-bold tracking-[0.35em] text-[#d4af37]">
              💎 LUXURY CELEBRATION 💎
            </div>
          </div>

          {/* Stand / Plate */}
          <div className="h-4 w-80 rounded-full border border-[rgba(212,175,55,0.5)] bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#d4af37] shadow-[0_10px_30px_rgba(212,175,55,0.3)] sm:w-96" />
        </div>
      </motion.button>

      {/* Touch / Click Hint */}
      <p className="mt-4 text-center text-xs text-[var(--text-secondary)]">
        {isBlown
          ? t('wishBlownMessage') || 'تمت إضاءة أمنياتك بنجاح! ✨'
          : t('blowOutCandles')}
      </p>
    </div>
  )
}
