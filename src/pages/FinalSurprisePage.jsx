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

/* ============================================================
   WARM BIRTHDAY FIREWORKS
   Red + Gold + Amber + Warm Yellow + White
============================================================ */

function launchFireworks() {
  const colors = [
    '#E11D48',
    '#F59E0B',
    '#D97706',
    '#FBBF24',
    '#FFFFFF',
  ]

  /* Main central burst */
  confetti({
    particleCount: 120,
    spread: 360,
    startVelocity: 45,
    ticks: 120,
    gravity: 0.6,
    origin: {
      x: 0.5,
      y: 0.45,
    },
    colors,
    shapes: ['star'],
    scalar: 1.3,
    zIndex: 9999,
  })

  /* Side celebration cannons */
  const origins = [
    { x: 0.1, y: 0.3 },
    { x: 0.9, y: 0.3 },
    { x: 0.2, y: 0.5 },
    { x: 0.8, y: 0.5 },
    { x: 0.35, y: 0.25 },
    { x: 0.65, y: 0.25 },
  ]

  origins.forEach((origin, index) => {
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
    }, index * 180)
  })
}

/* ============================================================
   WARM GOLDEN / RED CELEBRATION RAIN
============================================================ */

function launchGoldenRain() {
  const duration = 5000
  const animationEnd = Date.now() + duration

  const colors = [
    '#E11D48',
    '#F59E0B',
    '#FBBF24',
    '#FFFFFF',
    '#D97706',
  ]

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      clearInterval(interval)
      return
    }

    const particleCount = Math.max(
      10,
      Math.floor(60 * (timeLeft / duration)),
    )

    /* Left side */
    confetti({
      particleCount,
      startVelocity: 35,
      spread: 360,
      ticks: 80,
      gravity: 0.9,
      origin: {
        x: Math.random() * 0.35 + 0.05,
        y: Math.random() - 0.2,
      },
      colors,
      zIndex: 9999,
    })

    /* Right side */
    confetti({
      particleCount,
      startVelocity: 35,
      spread: 360,
      ticks: 80,
      gravity: 0.9,
      origin: {
        x: Math.random() * 0.35 + 0.6,
        y: Math.random() - 0.2,
      },
      colors,
      zIndex: 9999,
    })
  }, 200)
}

/* ============================================================
   FINAL SURPRISE PAGE
============================================================ */

export function FinalSurprisePage() {
  const { t, language } = useLanguage()
  const { playMusic } = useMusic()

  const [isBlown, setIsBlown] = useState(false)
  const [giftOpened, setGiftOpened] = useState(false)
  const [showGoldenFlash, setShowGoldenFlash] = useState(false)

  const hasTriggered = useRef(false)

  /* ==========================================================
     BLOW CANDLES → FULL CELEBRATION
  ========================================================== */

  const triggerCelebration = useCallback(() => {
    if (hasTriggered.current) return

    hasTriggered.current = true

    setIsBlown(true)

    /* Start music */
    playMusic()

    /* Warm cinematic flash */
    setShowGoldenFlash(true)

    const flashTimer = setTimeout(() => {
      setShowGoldenFlash(false)
    }, 1800)

    /* Fireworks */
    launchFireworks()

    /* Golden celebration rain */
    launchGoldenRain()

    return () => clearTimeout(flashTimer)
  }, [playMusic])

  /* ==========================================================
     GIFT CLICK → FINAL MESSAGE
  ========================================================== */

  const handleGiftClick = () => {
    setGiftOpened(true)

    confetti({
      particleCount: 100,
      spread: 120,
      origin: {
        y: 0.6,
      },
      colors: [
        '#E11D48',
        '#F59E0B',
        '#FBBF24',
        '#FFFFFF',
        '#D97706',
      ],
      shapes: ['star', 'circle'],
      zIndex: 9999,
    })
  }

  /* ==========================================================
     CELEBRATION BRIGHTNESS EFFECT
  ========================================================== */

  useEffect(() => {
    if (!isBlown) return

    document.documentElement.style.transition = 'filter 0.15s'
    document.documentElement.style.filter = 'brightness(1.25)'

    const timer = setTimeout(() => {
      document.documentElement.style.filter = ''
    }, 300)

    return () => {
      clearTimeout(timer)
      document.documentElement.style.filter = ''
    }
  }, [isBlown])

  return (
    <PageLayout
      titleKey="finalSurpriseTitle"
      descriptionKey="finalSurpriseDesc"
    >
      {/* ======================================================
          SEO
      ====================================================== */}

      <Helmet>
        <title>{t('finalSurpriseTitle')} | M♡S♡O</title>

        <meta
          name="description"
          content="A luxury cinematic birthday experience dedicated with love to Mohamed Soufiane — M♡S♡O."
        />
      </Helmet>

      {/* ======================================================
          CINEMATIC DARK VIGNETTE
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(3,5,8,0.58)_100%)]" />

      {/* ======================================================
          WARM GOLDEN FLASH
      ====================================================== */}

      <AnimatePresence>
        {showGoldenFlash && (
          <motion.div
            key="golden-flash"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.55, 0.3, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.8,
              ease: 'easeInOut',
            }}
            className="pointer-events-none fixed inset-0 z-[9998]"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(245,158,11,0.48) 0%, rgba(225,29,72,0.2) 40%, transparent 75%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 space-y-10 overflow-hidden py-4">
        {/* Ambient background */}
        <AnimatedBackground />

        <GoldenParticles
          count={35}
          isBlown={isBlown}
        />

        {/* ====================================================
            FINAL SURPRISE HERO

            IMPORTANT:
            - Hero exists ONLY on Final Surprise
            - NO logo here
            - Logo remains exclusively in Navbar
        ==================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative px-4 py-8 text-center sm:py-12"
        >
          {/* Warm cinematic glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(245,158,11,0.1)_0%,rgba(225,29,72,0.05)_40%,transparent_72%)] blur-3xl" />

          {/* Small label */}
          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
              duration: 0.6,
            }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#F59E0B] sm:text-sm"
          >
            {language === 'ar'
              ? 'لحظتك الأخيرة معي'
              : 'Your final moment with me'}
          </motion.p>

          {/* Main heading */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.25,
              duration: 0.7,
            }}
            className="text-3xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
          >
            {language === 'ar' ? (
              <>
                كل عام وأنت{' '}
                <span className="bg-gradient-to-r from-[#F8FAFC] via-[#FBBF24] to-[#F59E0B] bg-clip-text text-transparent">
                  حبيبي الغالي
                </span>
              </>
            ) : (
              <>
                Happy Birthday{' '}
                <span className="bg-gradient-to-r from-[#F8FAFC] via-[#FBBF24] to-[#F59E0B] bg-clip-text text-transparent">
                  My Dear Love
                </span>
              </>
            )}
          </motion.h1>

          {/* Hero description */}
          <motion.p
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
              duration: 0.7,
            }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[var(--text-secondary)] sm:text-base"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            {language === 'ar'
              ? 'قبل أن تنتهي هذه الرحلة، تركت لك أجمل مفاجأة… لحظة صنعتها من الحب، والذكريات، وكل المشاعر التي أحملها لك.'
              : 'Before this journey ends, I left you one final surprise… a moment made from love, memories, and everything I carry in my heart for you.'}
          </motion.p>
        </motion.section>

        {/* ====================================================
            INTERACTIVE CAKE
        ==================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            scale: 0.94,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.55,
          }}
          className="relative overflow-hidden rounded-[2.4rem] border border-[rgba(226,232,240,0.14)] bg-[rgba(8,17,31,0.88)] p-6 shadow-[0_24px_70px_rgba(3,5,8,0.55)] backdrop-blur-xl sm:p-10"
        >
          {/* Warm central glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(245,158,11,0.13)_0%,rgba(217,119,6,0.08)_35%,transparent_72%)] blur-3xl" />

          {/* Warm corner glow */}
          <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12),transparent_70%)]" />

          {/* Subtle red glow */}
          <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(225,29,72,0.08),transparent_70%)]" />

          {/* Existing cake */}
          <LuxuryCake
            isBlown={isBlown}
            onBlowCandles={triggerCelebration}
          />
        </motion.section>

        {/* ====================================================
            CELEBRATION REVEAL
        ==================================================== */}

        <AnimatePresence>
          {isBlown && (
            <motion.section
              key="celebration-reveal"
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative my-4 text-center"
            >
              {/* ==================================================
                  SUCCESS BANNER
              ================================================== */}

              <motion.div
                initial={{
                  scale: 0.8,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(245,158,11,0.28)] bg-[rgba(245,158,11,0.09)] px-5 py-2 text-sm font-bold tracking-wide text-[#FBBF24]"
              >
                <FaMagic className="text-xs text-[#F59E0B]" />

                <span>
                  {language === 'ar'
                    ? 'تمت إضاءة أمنياتك'
                    : 'Your wish has been cast'}
                </span>

                <FaMagic className="text-xs text-[#F59E0B]" />
              </motion.div>

              {/* ==================================================
                  GIFT BOX
              ================================================== */}

              {!giftOpened ? (
                <motion.div
                  whileHover={{
                    scale: 1.04,
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={handleGiftClick}
                  className="mx-auto inline-flex cursor-pointer flex-col items-center rounded-[2rem] border border-[rgba(245,158,11,0.2)] bg-[linear-gradient(135deg,rgba(8,17,31,0.94),rgba(3,5,8,0.97))] p-8 shadow-[0_0_55px_rgba(245,158,11,0.12)] backdrop-blur-xl"
                >
                  {/* Gift icon */}
                  <motion.div
                    animate={{
                      rotate: [0, -6, 6, -4, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#B45309] via-[#F59E0B] to-[#FBBF24] text-white shadow-[0_12px_35px_rgba(245,158,11,0.3)]"
                  >
                    <FaGift className="text-4xl" />
                  </motion.div>

                  <p className="mt-4 text-sm font-bold text-[#F8FAFC]">
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
                /* ==================================================
                   FINAL ROMANTIC MESSAGE
                ================================================== */

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.88,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative overflow-hidden rounded-[2.4rem] border border-[rgba(226,232,240,0.2)] bg-[linear-gradient(135deg,rgba(3,5,8,0.97),rgba(8,17,31,0.92))] p-7 text-start shadow-[0_30px_90px_rgba(3,5,8,0.5)] backdrop-blur-2xl sm:p-12"
                >
                  {/* Warm corner glow */}
                  <div className="pointer-events-none absolute end-0 top-0 h-64 w-64 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_65%)]" />

                  {/* Red corner glow */}
                  <div className="pointer-events-none absolute bottom-0 start-0 h-48 w-48 bg-[radial-gradient(circle_at_bottom_left,rgba(225,29,72,0.1),transparent_70%)]" />

                  <div className="relative z-10 mx-auto max-w-3xl space-y-7">
                    {/* Heart */}
                    <div className="flex justify-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.12, 1],
                        }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                        }}
                        className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[rgba(245,158,11,0.28)] bg-[rgba(225,29,72,0.1)] shadow-[0_0_30px_rgba(225,29,72,0.18)]"
                      >
                        <FaHeart className="text-2xl text-[#E11D48]" />
                      </motion.div>
                    </div>

                    {/* Final title */}
                    <h2 className="text-center text-2xl font-bold leading-snug text-[var(--text-primary)] sm:text-4xl">
                      {t('finalMessageTitle')}
                    </h2>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(245,158,11,0.35)] to-transparent" />

                      <div className="h-1.5 w-1.5 rounded-full bg-[#FBBF24]" />

                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(245,158,11,0.35)] to-transparent" />
                    </div>

                    {/* Message */}
                    <div className="rounded-2xl border border-[rgba(226,232,240,0.15)] bg-[rgba(255,255,255,0.03)] p-6 shadow-inner sm:p-9">
                      {language === 'ar' ? (
                        <p
                          className="text-center text-base font-medium leading-[2.1] text-[var(--text-secondary)] sm:text-lg"
                          dir="rtl"
                        >
                          «&nbsp;إلى حبيبي الغالي على قلبي&nbsp;

                          <span className="font-bold text-[#FBBF24]">
                            محمد سفيان
                          </span>

                          &nbsp;…<br />

                          كل لحظة في حياتي تصبح أجمل لأنّك فيها.
                          أنت الشخص الذي يجعل الدنيا تبدو مكاناً يستحق الابتسام،
                          وأتمنى أن يكون كل عامٍ قادم أجمل وأسعد وأكمل مما سبقه.

                          <br />
                          <br />

                          هذا الموقع لم يُصنَع من كودٍ وألوان فحسب،
                          <br />

                          بل صُنِع من كل مشاعر الحب التي أحملها في قلبي،
                          <br />

                          ومن كل ذكرى جميلة أحتفظ بها معك.

                          <br />
                          <br />

                          كل عام وأنت حبيبي،
                          <br />
                          وبهجتي،
                          <br />
                          ووطني.&nbsp;»
                        </p>
                      ) : (
                        <p className="text-center text-base font-medium leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                          "{t('finalMessageBody')}"
                        </p>
                      )}
                    </div>

                    {/* Closing signature */}
                    <div className="flex flex-col items-center gap-3 pt-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#CBD5E1] opacity-90">
                        {language === 'ar'
                          ? 'من قلبي إلى حبيبي'
                          : 'From my heart to my love'}
                      </p>

                      <div className="flex items-center gap-3">
                        <span className="text-xl font-extrabold tracking-wide text-[var(--text-primary)]">
                          حبيبتك إيمان
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* ====================================================
            CLOSING FOOTER
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.9,
            duration: 0.6,
          }}
          className="pb-6 text-center"
        >
          <div className="mx-auto flex max-w-xs items-center justify-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(226,232,240,0.25)]" />

            <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)] opacity-70">
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