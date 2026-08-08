import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import confetti from 'canvas-confetti'
import { FaCrown, FaGem, FaHeart, FaStar } from 'react-icons/fa'
import { PageLayout } from '../components/common/Layout'
import { LuxuryCake } from '../components/effects/LuxuryCake'
import { GoldenParticles } from '../components/effects/GoldenParticles'
import { AnimatedBackground } from '../components/effects/AnimatedBackground'
import { useLanguage } from '../contexts/LanguageContext'

export function FinalSurprisePage() {
  const { t, language } = useLanguage()
  const [isBlown, setIsBlown] = useState(false)

  const triggerCelebration = useCallback(() => {
    if (isBlown) return
    setIsBlown(true)

    // Trigger multiple waves of fireworks & confetti
    const duration = 4 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 }

    const randomInRange = (min, max) => Math.random() * (max - min) + min

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // Gold & Dark Navy celebration confetti
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#d4af37', '#f5d77f', '#ffffff', '#14213d'],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#d4af37', '#ffd700', '#ffffff', '#3a506b'],
      })
    }, 250)
  }, [isBlown])

  return (
    <PageLayout titleKey="finalSurpriseTitle" descriptionKey="finalSurpriseDesc">
      <Helmet>
        <title>{t('finalSurpriseTitle')} | M♡S♡O 💎</title>
        <meta
          name="description"
          content="A cinematic luxury ending celebration dedicated to Mohamed Soufiane M♡S♡O 💎."
        />
      </Helmet>

      <div className="relative space-y-12 overflow-hidden py-4">
        {/* Background particle & ambient light system */}
        <AnimatedBackground />
        <GoldenParticles count={30} isBlown={isBlown} />

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.12)] px-4 py-1.5 text-xs font-bold tracking-widest text-[#d4af37]">
            <FaGem className="text-xs" />
            <span>M♡S♡O 💎 | {t('fullName')}</span>
            <FaGem className="text-xs" />
          </div>

          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl lg:text-6xl text-[var(--text-primary)] tracking-tight leading-tight">
            Happy Birthday <span className="bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#d4af37] bg-clip-text text-transparent">M♡S♡O 💎</span>
          </h1>

          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {t('finalSurpriseDesc')}
          </p>
        </motion.section>

        {/* Interactive Luxury Cake Card */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative overflow-hidden rounded-[2.2rem] border border-[rgba(212,175,55,0.25)] bg-[rgba(15,23,42,0.85)] p-6 sm:p-10 shadow-[0_24px_70px_rgba(2,8,23,0.4)] backdrop-blur-xl"
        >
          <LuxuryCake isBlown={isBlown} onBlowCandles={triggerCelebration} />
        </motion.section>

        {/* Revealed Romantic Final Message Card */}
        <AnimatePresence>
          {isBlown && (
            <motion.section
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[2.2rem] border border-[rgba(212,175,55,0.35)] bg-[linear-gradient(135deg,rgba(6,7,11,0.95),rgba(20,33,61,0.85))] p-6 sm:p-10 shadow-[0_30px_90px_rgba(212,175,55,0.2)] backdrop-blur-2xl"
            >
              <div className="absolute top-0 ltr:right-0 rtl:left-0 h-40 w-40 bg-[radial-gradient(circle,rgba(212,175,55,0.2),transparent_70%)] pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(212,175,55,0.4)] bg-[rgba(212,175,55,0.15)] text-[#d4af37]">
                  <FaHeart className="text-2xl text-rose-500 animate-pulse" />
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold text-[var(--text-primary)] leading-snug">
                  {t('finalMessageTitle')}
                </h2>

                <div className="rounded-2xl border border-[rgba(212,175,55,0.15)] bg-[rgba(248,248,248,0.04)] p-6 sm:p-8">
                  <p className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-medium">
                    “{t('finalMessageBody')}”
                  </p>
                </div>

                <div className="pt-2 flex flex-col items-center justify-center gap-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-bold">
                    {language === 'ar' ? 'من قلبي إلى حبيبي' : 'From my heart to my love'}
                  </p>
                  <p className="text-lg font-bold text-[var(--text-primary)]">
                    محمد سفيان | M♡S♡O 💎
                  </p>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  )
}
