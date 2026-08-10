import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import confetti from 'canvas-confetti'
import { FaHeart, FaGift, FaMagic } from 'react-icons/fa'
import { PageLayout } from '../components/common/Layout'
import { LuxuryCake } from '../components/effects/LuxuryCake'
import { GoldenParticles } from '../components/effects/GoldenParticles'
import { AnimatedBackground } from '../components/effects/AnimatedBackground'
import { useLanguage } from '../contexts/LanguageContext'
import { useMusic } from '../contexts/MusicContext'

/* ─── Warm Fireworks cannon ──────────────────────────────────────────────── */
function launchFireworks() {
  const colors = ['#E11D48', '#F59E0B', '#D97706', '#FBBF24', '#ffffff']

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

/* ─── Sustained warm golden/red rain ─────────────────────────────────────── */
function launchGoldenRain() {
  const duration = 5000
  const animationEnd = Date.now() + duration
  const colors = ['#E11D48', '#F59E0B', '#FBBF24', '#ffffff', '#D97706', '#1D4ED8']

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

    // Warm golden/amber light flash
    setShowGoldenFlash(true)
    setTimeout(() => setShowGoldenFlash(false), 1800)

    // Immediate fireworks burst
    launchFireworks()

    // Sustained confetti rain
    launchGoldenRain()
  }, [playMusic])

  /* Gift box confetti pop */
  const handleGiftClick = () => {
    setGiftOpened(true)
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#F59E0B', '#FBBF24', '#ffffff', '#D97706'],
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
        <title>{t('finalSurpriseTitle')} | M♡S♡O</title>
        <meta
          name="description"
          content="A luxury cinematic birthday experience dedicated with love to Mohamed Soufiane — M♡S♡O."
        />
      </Helmet>

      {/* Soft cinematic vignette framing */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(3,5,8,0.5)_100%)]" />

      {/* ── Warm golden/amber celebration light flash overlay ── */}
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
                'radial-gradient(ellipse at center, rgba(245,158,11,0.45) 0%, rgba(225,29,72,0.2) 40%, transparent 75%)',
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative space-y-10 overflow-hidden py-4 z-10">
        {/* Ambient particle system */}
        <AnimatedBackground />
        <GoldenParticles count={35} isBlown={isBlown} />

        {/* ── Hero Section: DARK BG → PROMINENT M♡S♡O LOGO ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative text-center"
        >

          {/* Headline */}
          <motion.h1
            className="text-3xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
            animate={isBlown ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {language === 'ar' ? (
              <>
                كل عام وأنت{' '}
                <span className="bg-gradient-to-r from-[#F8FAFC] via-[#CBD5E1] to-[#38BDF8] bg-clip-text text-transparent">
                  محمد سفيان
                </span>
              </>
            ) : (
              <>
                Happy Birthday{' '}
                <span className="bg-gradient-to-r from-[#F8FAFC] via-[#CBD5E1] to-[#38BDF8] bg-clip-text text-transparent">
                  Mohamed Soufiane
                </span>
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {language === 'ar'
              ? 'مرحباً بك في التجربة الختامية الفاخرة، صُمِّمت كل تفصيلة فيها بحبٍّ خالص إهداءً لمحمد سفيان.'
              : t('finalSurpriseDesc')}
          </p>
        </motion.section>

        {/* ── Interactive Cake Section: MIDNIGHT BLUE GLOW → CAKE CENTERPIECE → WARM CANDLELIGHT ── */}
        <motion.section
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="relative overflow-hidden rounded-[2.4rem] border border-[rgba(226,232,240,0.14)] bg-[rgba(8,17,31,0.88)] p-6 shadow-[0_24px_70px_rgba(3,5,8,0.5)] backdrop-blur-xl sm:p-10"
        >
          {/* Subtle blue/amber atmospheric glow behind cake */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[560px] rounded-full bg-[radial-gradient(ellipse,rgba(245,158,11,0.1)_0%,rgba(29,78,216,0.12)_50%,transparent_70%)] blur-3xl" />

          {/* Ambient corner glows */}
          <div className="pointer-events-none absolute -top-12 -left-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(29,78,216,0.15),transparent_70%)]" />
          <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.1),transparent_70%)]" />

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
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(226,232,240,0.2)] bg-[rgba(29,78,216,0.15)] px-5 py-2 text-sm font-bold tracking-wide text-[#E2E8F0]"
              >
                <FaMagic className="text-xs text-[#38BDF8]" />
                <span>{language === 'ar' ? 'تمت إضاءة أمنياتك' : 'Your wish has been cast'}</span>
                <FaMagic className="text-xs text-[#38BDF8]" />
              </motion.div>

              {/* Gift box → Final message */}
              {!giftOpened ? (
                <motion.div
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleGiftClick}
                  className="cursor-pointer inline-flex flex-col items-center p-8 rounded-[2rem] border border-[rgba(226,232,240,0.18)] bg-[linear-gradient(135deg,rgba(8,17,31,0.92),rgba(3,5,8,0.96))] shadow-[0_0_55px_rgba(29,78,216,0.2)] backdrop-blur-xl"
                >
                  {/* Wobbling gift icon */}
                  <motion.div
                    animate={{ rotate: [0, -6, 6, -4, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="h-20 w-20 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#1D4ED8] to-[#38BDF8] text-white shadow-[0_12px_35px_rgba(29,78,216,0.35)]"
                  >
                    <FaGift className="text-4xl" />
                  </motion.div>

                  <p className="mt-4 text-sm font-bold text-[#E2E8F0]">
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
                  className="relative overflow-hidden rounded-[2.4rem] border border-[rgba(226,232,240,0.2)] bg-[linear-gradient(135deg,rgba(3,5,8,0.97),rgba(8,17,31,0.92))] p-7 shadow-[0_30px_90px_rgba(29,78,216,0.2)] backdrop-blur-2xl sm:p-12 text-start"
                >
                  {/* Corner glows */}
                  <div className="pointer-events-none absolute top-0 end-0 h-64 w-64 bg-[radial-gradient(circle_at_top_right,rgba(29,78,216,0.2),transparent_65%)]" />
                  <div className="pointer-events-none absolute bottom-0 start-0 h-48 w-48 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.12),transparent_70%)]" />

                  <div className="relative z-10 max-w-3xl mx-auto space-y-7">
                    {/* Heart icon */}
                    <div className="flex justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        className="h-16 w-16 flex items-center justify-center rounded-full border-2 border-[rgba(226,232,240,0.25)] bg-[rgba(29,78,216,0.15)] shadow-[0_0_30px_rgba(29,78,216,0.25)]"
                      >
                        <FaHeart className="text-2xl text-sky-400" />
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-4xl font-bold text-center text-[var(--text-primary)] leading-snug">
                      {t('finalMessageTitle')}
                    </h2>

                    {/* Silver/Chrome divider */}
                    <div className="flex items-center gap-3 justify-center">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(226,232,240,0.3)] to-transparent" />
                      <div className="h-1.5 w-1.5 rounded-full bg-[#E2E8F0]" />
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(226,232,240,0.3)] to-transparent" />
                    </div>

                    {/* Arabic romantic message body */}
                    <div className="rounded-2xl border border-[rgba(226,232,240,0.15)] bg-[rgba(255,255,255,0.03)] p-6 shadow-inner sm:p-9">
                      {language === 'ar' ? (
                        <p className="text-base sm:text-lg leading-[2.1] text-[var(--text-secondary)] font-medium text-center" dir="rtl">
                          «&nbsp;إلى حبيبي الغالي على قلبي&nbsp;
                          <span className="text-[#E2E8F0] font-bold">محمد سفيان</span>
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

                    {/* Closing signature with real logo image */}
                    <div className="pt-1 flex flex-col items-center gap-3">
                      <p className="text-xs uppercase tracking-[0.4em] text-[#CBD5E1] font-semibold opacity-90">
                        {language === 'ar' ? 'من قلبي إلى حبيبي' : 'From my heart to my love'}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-extrabold text-[var(--text-primary)] tracking-wide">
                          محمد سفيان
                        </span>
                      </div>
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
          <div className="mx-auto flex items-center justify-center gap-3 max-w-xs">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(226,232,240,0.25)]" />
            <p className="text-[11px] tracking-widest text-[var(--text-secondary)] opacity-70 uppercase font-semibold">
              {language === 'ar'
                ? 'صُنِع بحبٍّ خالص لمحمد سفيان'
                : 'Crafted with pure love for Mohamed Soufiane'}
            </p>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(226,232,240,0.25)]" />
          </div>
        </motion.div>
      </div>
    </PageLayout>
  )
}
