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
    <div className="relative min-h-screen overflow-hidden bg-[#030508] text-[#F8FAFC]" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{language === 'fr' ? 'Joyeux Anniversaire Mohamed Soufiane | M♡S♡O' : 'عيد ميلاد سعيد محمد سفيان | M♡S♡O'}</title>
        <meta name="description" content={language === 'fr' ? 'Une expérience cinématographique luxueuse d’anniversaire pour Mohamed Soufiane M♡S♡O.' : 'مساحة احتفالية سينمائية فاخرة تحتفي بعيد ميلاد محمد سفيان M♡S♡O.'} />
      </Helmet>

      <IntroScene />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl rounded-[2.2rem] border border-[rgba(226,232,240,0.15)] bg-[rgba(8,17,31,0.85)] px-6 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:px-10 sm:py-10"
        >
          <p className="text-xs uppercase tracking-[0.45em] text-[#E2E8F0] font-bold">{t('fullName')}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-wide text-[#F8FAFC] sm:text-5xl lg:text-6xl">
            {language === 'ar' ? 'عيد ميلاد سعيد' : 'Joyeux Anniversaire'}{' '}
            <span className="bg-gradient-to-r from-[#F8FAFC] via-[#CBD5E1] to-[#38BDF8] bg-clip-text text-transparent">
              {t('fullName')}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#CBD5E1] sm:text-base">
            {introMessage}
          </p>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleEnter}
            className="mt-8 rounded-full border border-[rgba(226,232,240,0.25)] bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#1D4ED8] px-8 py-3.5 text-sm font-bold text-white shadow-[0_12px_35px_rgba(29,78,216,0.3)] transition hover:shadow-[0_15px_40px_rgba(29,78,216,0.45)]"
          >
            {t('enterExperience')}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
