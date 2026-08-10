import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCrown, FaStar } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'

export function LuxuryCake({ isBlown, onBlowCandles }) {
  const { t, language } = useLanguage()
  const [hovered, setHovered] = useState(false)

  const handleClick = () => {
    if (isBlown) return
    onBlowCandles()
  }

  return (
    <div className="relative flex flex-col items-center justify-center py-6">
      {/* Ambient glow ring under cake when blown */}
      <AnimatePresence>
        {isBlown && (
          <motion.div
            key="glow-ring"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="pointer-events-none absolute bottom-0 h-16 w-80 rounded-full blur-2xl sm:w-96"
            style={{ background: 'radial-gradient(ellipse, rgba(29,78,216,0.45) 0%, transparent 70%)' }}
          />
        )}
      </AnimatePresence>

      {/* Clickable cake button */}
      <motion.button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={!isBlown ? { scale: 1.04 } : {}}
        whileTap={!isBlown ? { scale: 0.95 } : {}}
        className={`group relative outline-none ${isBlown ? 'cursor-default' : 'cursor-pointer'}`}
        aria-label={isBlown ? 'Candles blown' : t('blowOutCandles')}
      >
        {/* CTA label pill */}
        <div
          className={`mb-8 inline-flex items-center gap-2 rounded-full border px-6 py-2.5 backdrop-blur-xl transition-all duration-300 shadow-[0_0_25px_rgba(29,78,216,0.2)] ${
            isBlown
              ? 'border-[rgba(56,189,248,0.4)] bg-[rgba(29,78,216,0.2)] text-[#38BDF8]'
              : 'border-[rgba(56,189,248,0.2)] bg-[rgba(8,17,31,0.85)] text-[var(--text-primary)] group-hover:border-[#2563EB]'
          }`}
        >
          <FaStar
            className={`text-sm text-[#38BDF8] transition-transform ${
              !isBlown ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '3s' }}
          />
          <span className="text-sm font-bold tracking-wider">
            {isBlown
              ? language === 'ar'
                ? '✨ تمّ إطفاء الشموع بالأمنيات ✨'
                : '✨ Candles blown — wish granted! ✨'
              : t('makeAWish')}
          </span>
          <FaCrown className="text-sm text-[#2563EB]" />
        </div>

        {/* ── Cake Structure ── */}
        <div className="relative flex flex-col items-center">
          {/* Candles Row */}
          <div className="relative z-20 flex gap-5 sm:gap-7 mb-[-4px]">
            {[1, 2, 3, 4, 5].map((ci) => (
              <div key={ci} className="relative flex flex-col items-center">
                {/* Flame - REAL WARM FLAME (Yellow/Amber/White) */}
                <AnimatePresence>
                  {!isBlown && (
                    <motion.div
                      key={`flame-${ci}`}
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{
                        scale: [1, 1.18, 0.92, 1.12, 1],
                        opacity: [0.9, 1, 0.85, 1, 0.95],
                        x: [0, 1.5, -1.5, 1, 0],
                      }}
                      exit={{ scale: 0, opacity: 0, y: -10, transition: { duration: 0.35 } }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        delay: ci * 0.09,
                      }}
                      className="relative mb-1 flex justify-center"
                    >
                      {/* Outer flame glow */}
                      <div className="absolute h-6 w-6 rounded-full bg-amber-400 opacity-25 blur-md" />
                      {/* Inner warm flame */}
                      <div className="h-5 w-3 rounded-full bg-gradient-to-t from-amber-600 via-yellow-300 to-white shadow-[0_0_14px_#f5d77f,0_0_28px_rgba(245,215,127,0.8)]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Smoke trail when blown */}
                <AnimatePresence>
                  {isBlown && (
                    <motion.div
                      key={`smoke-${ci}`}
                      initial={{ opacity: 0.7, y: 0, scaleX: 0.5 }}
                      animate={{ opacity: 0, y: -28, scaleX: 1.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.6, delay: ci * 0.08 }}
                      className="mb-1 h-3 w-1.5 rounded-full bg-slate-400 blur-[2px]"
                    />
                  )}
                </AnimatePresence>

                {/* Candle body - Masculine Navy/Cyan gradient */}
                <div
                  className="h-10 w-2.5 rounded-t-sm border border-[rgba(56,189,248,0.3)] shadow-md"
                  style={{
                    background: 'linear-gradient(to bottom, #38BDF8, #1D4ED8 40%, #08111F)',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Tier 1 — Top */}
          <motion.div
            animate={isBlown ? { boxShadow: '0 0 40px rgba(29,78,216,0.35)' } : {}}
            className="relative z-10 h-14 w-44 rounded-t-2xl border border-[rgba(56,189,248,0.2)] sm:w-56 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #08111F, #111827, #0B1730)' }}
          >
            <div className="absolute top-0 inset-x-0 h-3 rounded-t-2xl bg-gradient-to-r from-[#1D4ED8]/20 via-[#38BDF8]/35 to-[#1D4ED8]/20" />
            <div className="flex h-full items-center justify-center text-xs font-bold tracking-widest text-[#38BDF8] opacity-90">
              M ♡ S ♡ O
            </div>
          </motion.div>

          {/* Tier 2 — Middle */}
          <div
            className="relative z-0 h-16 w-60 rounded-t-xl border border-[rgba(56,189,248,0.22)] sm:w-72 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #060A0F, #111827, #060A0F)' }}
          >
            <div className="absolute top-0 inset-x-0 h-3 rounded-t-xl bg-[#1D4ED8]/20" />
            <div className="flex h-full items-center justify-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#1D4ED8]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#38BDF8]" />
              <span className="h-2 w-2 rounded-full bg-[#1D4ED8]" />
            </div>
          </div>

          {/* Tier 3 — Base */}
          <motion.div
            animate={isBlown ? { boxShadow: '0 0 60px rgba(29,78,216,0.3)' } : {}}
            className="relative z-0 h-20 w-72 rounded-t-3xl border border-[rgba(56,189,248,0.25)] sm:w-96 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #030508, #08111F, #030508)' }}
          >
            <div className="absolute top-0 inset-x-0 h-4 rounded-t-3xl bg-gradient-to-r from-[#1D4ED8]/30 via-[#38BDF8]/40 to-[#1D4ED8]/30" />
            <div className="flex h-full items-center justify-center text-sm font-bold tracking-[0.35em] text-[#38BDF8]">
              💎 LUXURY CELEBRATION 💎
            </div>
          </motion.div>

          {/* Plate */}
          <div className="h-4 w-80 rounded-full border border-[rgba(56,189,248,0.35)] sm:w-[26rem] shadow-[0_10px_30px_rgba(29,78,216,0.25)]"
            style={{ background: 'linear-gradient(90deg, #1D4ED8, #38BDF8, #1D4ED8)' }}
          />
        </div>
      </motion.button>

      {/* Hint text */}
      <p className="mt-4 text-center text-xs text-[var(--text-secondary)] max-w-xs opacity-80">
        {isBlown
          ? language === 'ar'
            ? 'أضاءت أمنياتك السماء يا حبيبي ✨'
            : 'Your wishes lit up the sky ✨'
          : t('blowOutCandles')}
      </p>
    </div>
  )
}
