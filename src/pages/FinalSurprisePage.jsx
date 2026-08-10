import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import confetti from 'canvas-confetti'
import { FaCrown, FaGem, FaHeart, FaGift, FaMagic } from 'react-icons/fa'
import { PageLayout } from '../components/common/Layout'
import { LuxuryCake } from '../components/effects/LuxuryCake'
import { GoldenParticles } from '../components/effects/GoldenParticles'
import { AnimatedBackground } from '../components/effects/AnimatedBackground'
import { useLanguage } from '../contexts/LanguageContext'
import { useMusic } from '../contexts/MusicContext'

/* ─── Fireworks cannon ──────────────────────────────────────────────────── */
function launchFireworks() {
  const count = 6
  const colors = ['#d4af37', '#f5d77f', '#ffffff', '#ff6b9d', '#c084fc']

  // starburst from centre
  confetti({
    particleCount: 120,
    spread: 360,
    startVelocity: 45,
    ticks: 120,
    gravity: 0.6,
    origin: { x: 0.5, y: 0.45 },
    colors,
    shapes: ['star'],
    scalar: 1.3,
    zIndex: 9999,
  })

  // cascading side cannons
  const origins = [
    { x: 0.1, y: 0.3 },
    { x: 0.9, y: 0.3 },
    { x: 0.2, y: 0.5 },
    { x: 0.8, y: 0.5 },
    { x: 0.35, y: 0.25 },
    { x: 0.65, y: 0.25 },
  ]

  origins.forEach((origin, i) => {
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 270,
        startVelocity: 38,
        ticks: 100,
        gravity: 0.8,
        origin,
        colors,
        zIndex: 9999,
      })
    }, i * 180)
  })
}

/* ─── Sustained golden rain ─────────────────────────────────────────────── */
function launchGoldenRain() {
  const duration = 5000
  const animationEnd = Date.now() + duration
  const colors = ['#d4af37', '#f5d77f', '#ffffff', '#14213d', '#e2e8f0']

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()
    if (timeLeft <= 0) return clearInterval(interval)

    const particleCount = 60 * (timeLeft / duration)

    confetti({
      particleCount,
      startVelocity: 35,
      spread: 360,
      ticks: 80,
      gravity: 0.9,
      origin: { x: Math.random() * 0.35 + 0.05, y: Math.random() - 0.2 },
      colors,
      zIndex: 9999,
    })
    confetti({
      particleCount,
      startVelocity: 35,
      spread: 360,
      ticks: 80,
      gravity: 0.9,
      origin: { x: Math.random() * 0.35 + 0.6, y: Math.random() - 0.2 },
      colors,
      zIndex: 9999,
    })
  }, 200)
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export function FinalSurprisePage() {
  const { t, language } = useLanguage()
  const { playMusic } = useMusic()

  const [isBlown, setIsBlown] = useState(false)
  const [giftOpened, setGiftOpened] = useState(false)
  const [showGoldenFlash, setShowGoldenFlash] = useState(false)
  const hasTriggered = useRef(false)

  /* Blow candles → trigger full celebration */
  const triggerCelebration = useCallback(() => {
    if (hasTriggered.current) return
    hasTriggered.current = true
    setIsBlown(true)

    // Start music
    playMusic()

    // Cinematic golden light flash
    setShowGoldenFlash(true)
    setTimeout(() => setShowGoldenFlash(false), 1800)

    // Immediate fireworks burst
    launchFireworks()

    // Sustained golden confetti rain
    launchGoldenRain()
  }, [playMusic])

  /* Gift box confetti pop */
  const handleGiftClick = () => {
    setGiftOpened(true)
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#f5d77f', '#ffffff', '#ff6b9d'],
      shapes: ['star', 'circle'],
      zIndex: 9999,
    })
  }

  /* Candle blow animation: slight screen shake */
  useEffect(() => {
    if (!isBlown) return
    document.documentElement.style.transition = 'filter 0.15s'
    document.documentElement.style.filter = 'brightness(1.25)'
    setTimeout(() => {
      document.documentElement.style.filter = ''
    }, 300)
  }, [isBlown])

  return (
    <PageLayout titleKey="finalSurpriseTitle" descriptionKey="finalSurpriseDesc">
      <Helmet>
        <title>{t('finalSurpriseTitle')} | M♡S♡O 💎</title>
        <meta
          name="description"
          content="A luxury cinematic birthday surprise dedicated with love to Mohamed Soufiane — M♡S♡O 💎."
        />
      </Helmet>

      {/* ── Cinematic golden flash overlay ── */}
      <AnimatePresence>
        {showGoldenFlash && (
          <motion.div
            key="golden-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.55, 0.3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="pointer-events-none fixed inset-0 z-[9998]"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(212,175,55,0.75) 0%, rgba(245,215,127,0.4) 40%, transparent 75%)',
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative space-y-10 overflow-hidden py-4">
        {/* Ambient particle system */}
        <AnimatedBackground />
        <GoldenParticles count={35} isBlown={isBlown} />

        {/* ── Hero Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative text-center"
        >
          {/* Brand pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.35)] bg-[rgba(212,175,55,0.12)] px-5 py-1.5 text-xs font-bold tracking-widest text-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <FaGem className="text-[10px]" />
            <span>M♡S♡O 💎 | {t('fullName')}</span>
            <FaGem className="text-[10px]" />
          </div>

          {/* Headline */}
          <motion.h1
            className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
            animate={isBlown ? { scale: [1, 1.04, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {language === 'ar' ? (
              <>
                كل عام وأنت{' '}
                <span className="bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#d4af37] bg-clip-text text-transparent">
                  M♡S♡O 💎
                </span>
              </>
            ) : (
              <>
                Happy Birthday{' '}
                <span className="bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#d4af37] bg-clip-text text-transparent">
                  M♡S♡O 💎
                </span>
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {language === 'ar'
              ? 'مرحباً بك في المفاجأة الختامية الفاخرة ✨ صُمِّمت كل تفصيلة فيها بحبٍّ خالص إهداءً للغالي على قلبي محمد سفيان.'
              : t('finalSurpriseDesc')}
          </p>

          {/* Decorative ornament */}
          <div className="mx-auto mt-5 flex items-center gap-3 justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <FaCrown className="text-sm text-[#d4af37]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>
        </motion.section>

        {/* ── Interactive Cake Card ── */}
        <motion.section
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="relative overflow-hidden rounded-[2.4rem] border border-[rgba(212,175,55,0.25)] bg-[rgba(12,18,38,0.88)] p-6 shadow-[0_24px_70px_rgba(2,8,23,0.45)] backdrop-blur-xl sm:p-10"
        >
          {/* Ambient corner glows */}
          <div className="pointer-events-none absolute -top-12 -left-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_70%)]" />
          <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)]" />

          <LuxuryCake isBlown={isBlown} onBlowCandles={triggerCelebration} />
        </motion.section>

        {/* ── Post-Celebration: Romantic Message reveal ── */}
        <AnimatePresence>
          {isBlown && (
            <motion.section
              key="celebration-reveal"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center my-4"
            >
              {/* Success banner */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.45)] bg-[rgba(212,175,55,0.15)] px-5 py-2 text-sm font-bold tracking-wide text-[#d4af37]"
              >
                <FaMagic className="text-xs" />
                <span>{language === 'ar' ? 'تمت إضاءة أمنياتك ✨' : 'Your wish has been cast ✨'}</span>
                <FaMagic className="text-xs" />
              </motion.div>

              {/* Gift box → Final message */}
              {!giftOpened ? (
                <motion.div
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleGiftClick}
                  className="cursor-pointer inline-flex flex-col items-center p-8 rounded-[2rem] border border-[rgba(212,175,55,0.4)] bg-[linear-gradient(135deg,rgba(12,18,38,0.92),rgba(6,7,11,0.96))] shadow-[0_0_55px_rgba(212,175,55,0.28)] backdrop-blur-xl"
                >
                  {/* Wobbling gift icon */}
                  <motion.div
                    animate={{ rotate: [0, -6, 6, -4, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="h-20 w-20 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#d4af37] to-[#f5d77f] text-[#06070b] shadow-[0_12px_35px_rgba(212,175,55,0.45)]"
                  >
                    <FaGift className="text-4xl" />
                  </motion.div>

                  <p className="mt-4 text-sm font-bold text-[#d4af37]">
                    {language === 'ar'
                      ? 'انقر لفتح الهدية الختامية 💝'
                      : 'Tap to open your final gift 💝'}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    {language === 'ar'
                      ? 'رسالة حب خاصة تنتظرك...'
                      : 'A special love letter awaits...'}
                  </p>
                </motion.div>
              ) : (
                /* ── Revealed Romantic Final Message ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-[2.4rem] border border-[rgba(212,175,55,0.38)] bg-[linear-gradient(135deg,rgba(6,7,11,0.97),rgba(14,22,50,0.92))] p-7 shadow-[0_30px_90px_rgba(212,175,55,0.28)] backdrop-blur-2xl sm:p-12 text-start"
                >
                  {/* Corner gold glows */}
                  <div className="pointer-events-none absolute top-0 end-0 h-64 w-64 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.28),transparent_65%)]" />
                  <div className="pointer-events-none absolute bottom-0 start-0 h-48 w-48 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.15),transparent_70%)]" />

                  <div className="relative z-10 max-w-3xl mx-auto space-y-7">
                    {/* Heart icon */}
                    <div className="flex justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        className="h-16 w-16 flex items-center justify-center rounded-full border-2 border-[rgba(212,175,55,0.5)] bg-[rgba(212,175,55,0.15)] shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                      >
                        <FaHeart className="text-2xl text-rose-400" />
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-4xl font-bold text-center text-[var(--text-primary)] leading-snug">
                      {t('finalMessageTitle')}
                    </h2>

                    {/* Gold divider */}
                    <div className="flex items-center gap-3 justify-center">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />
                      <FaGem className="text-[#d4af37] text-xs opacity-80" />
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />
                    </div>

                    {/* Arabic romantic message body */}
                    <div className="rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[rgba(255,255,255,0.04)] p-6 shadow-inner sm:p-9">
                      {language === 'ar' ? (
                        <p className="text-base sm:text-lg leading-[2.1] text-[var(--text-secondary)] font-medium text-center" dir="rtl">
                          «&nbsp;إلى حبيبي الغالي على قلبي&nbsp;
                          <span className="text-[#f5d77f] font-bold">محمد سفيان</span>
                          &nbsp;…<br />
                          كل لحظة في حياتي تصبح أجمل لأنّك فيها.
                          أنت الشخص الذي يجعل الدنيا تبدو مكاناً يستحق الابتسام،
                          وأتمنى أن يكون كل عامٍ قادم أجمل وأسعد وأكمل مما سبقه.
                          <br /><br />
                          هذا الموقع لم يُصنَع من كودٍ وألوان فحسب،
                          بل صُنِع من كل دفقة حبٍّ في قلبي، ومن كل ذكرى أحملها معي.
                          <br /><br />
                          كل عام وأنت حبيبي، وبهجتي، ووطني.&nbsp;»
                        </p>
                      ) : (
                        <p className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-medium text-center">
                          "{t('finalMessageBody')}"
                        </p>
                      )}
                    </div>

                    {/* Closing signature */}
                    <div className="pt-1 flex flex-col items-center gap-2">
                      <p className="text-xs uppercase tracking-[0.4em] text-[#d4af37] font-bold opacity-90">
                        {language === 'ar' ? 'من قلبي إلى حبيبي' : 'From my heart to my love'}
                      </p>
                      <motion.p
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="text-2xl font-extrabold text-[var(--text-primary)] tracking-wide"
                      >
                        محمد سفيان |{' '}
                        <span className="bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#d4af37] bg-clip-text text-transparent">
                          M♡S♡O 💎
                        </span>
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── Closing luxury footer tag ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="pb-6 text-center"
        >
          <p className="text-xs tracking-widest text-[var(--text-secondary)] opacity-60 uppercase font-semibold">
            {language === 'ar'
              ? '✦ صُنِع بحبٍّ خالص لمحمد سفيان ✦'
              : '✦ Crafted with pure love for Mohamed Soufiane ✦'}
          </p>
        </motion.div>
      </div>
    </PageLayout>
  )
}
