import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { IntroScene } from '../components/effects/IntroScene'
import { introMessage } from '../data/homeContent'
import { useLanguage } from '../contexts/LanguageContext'
import { useMusic } from '../contexts/MusicContext'

export function IntroPage() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const { playMusic } = useMusic()

  const handleEnter = async () => {
    await playMusic()
    navigate('/home')
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const timer = window.setTimeout(() => {
      navigate('/home')
    }, 7000)

    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [navigate])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06070b] text-[#f8f8f8]" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>Happy Birthday Mohamed Soufiane | M♡S♡O 💎</title>
        <meta name="description" content="A luxury cinematic birthday intro experience for Mohamed Soufiane M♡S♡O 💎." />
      </Helmet>

      <IntroScene />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl rounded-[2.2rem] border border-[rgba(212,175,55,0.28)] bg-[rgba(15,23,42,0.78)] px-6 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:px-10 sm:py-10"
        >
          <p className="text-xs uppercase tracking-[0.45em] text-[#d4af37] font-bold">M♡S♡O 💎 | {t('fullName')}</p>
          <h1 className="mt-4 text-3xl font-bold tracking-wide text-[#f8f8f8] sm:text-5xl lg:text-6xl">
            {language === 'ar' ? 'عيد ميلاد سعيد' : 'Happy Birthday'} <span className="text-[#d4af37]">M♡S♡O 💎</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#c0c0c0] sm:text-base">
            {introMessage}
          </p>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleEnter}
            className="mt-8 rounded-full border border-[rgba(212,175,55,0.4)] bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#d4af37] px-8 py-3.5 text-sm font-bold text-[#06070b] shadow-[0_12px_35px_rgba(212,175,55,0.35)] transition hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)]"
          >
            {language === 'ar' ? 'دخول التجربة الفاخرة 💎' : 'Enter the Experience 💎'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

