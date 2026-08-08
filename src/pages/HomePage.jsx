import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { PageLayout } from '../components/common/Layout'
import { AnimatedBackground } from '../components/effects/AnimatedBackground'
import { featuredPhotos, latestMemories, quoteContent } from '../data/homeContent'
import { GuestBookSection } from '../components/guestbook/GuestBookSection'
import { useLanguage } from '../contexts/LanguageContext'

export function HomePage() {
  const { t, language } = useLanguage()
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const heroPhoto = useMemo(() => featuredPhotos[0], [])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = heroPhoto.src
    link.download = `mso-memory-${heroPhoto.label.toLowerCase().replace(/\s+/g, '-')}.svg`
    link.click()
  }

  const toggleMusic = async () => {
    if (!audioRef.current) {
      return
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.error('Unable to play audio', error)
      }
    }
  }

  return (
    <PageLayout titleKey="homeTitle" descriptionKey="homeDesc">
      <Helmet>
        <title>Happy Birthday Mohamed Soufiane | M♡S♡O 💎</title>
        <meta name="description" content="A luxurious celebration space dedicated to Mohamed Soufiane M♡S♡O 💎." />
      </Helmet>

      <div className="space-y-6">
        {/* Luxury Hero Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-[2.2rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xl sm:p-8"
        >
          <AnimatedBackground />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37] font-bold">M♡S♡O 💎 | {t('fullName')}</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl text-[var(--text-primary)]">
                {language === 'ar' ? 'قصة احتفال عابرة للزمان بكُليّة من الذهَب والوقار.' : 'A birthday story written in gold and grace.'}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-8 text-[var(--text-secondary)] sm:text-base">
                {language === 'ar'
                  ? 'مرحباً بكم في العالم الخاص بالغالِي محمد سفيان M♡S♡O 💎. صُمم كل جزء ليعكس المحبة، الأصالة واللحظات الثمينة.'
                  : 'Welcome to the luxury birthday portal dedicated to Mohamed Soufiane M♡S♡O 💎.'}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89524] px-5 py-2.5 text-xs font-bold text-[#06070b] shadow-[0_4px_16px_rgba(212,175,55,0.3)] hover:opacity-90 transition"
                >
                  {t('downloadPhoto')}
                </button>
                <Link
                  to="/home/gallery"
                  className="rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.05)] px-5 py-2.5 text-xs font-semibold text-[var(--text-primary)] hover:border-[#d4af37] transition"
                >
                  {t('exploreMemories')}
                </Link>
                <Link
                  to="/home/final-surprise"
                  className="rounded-full border border-[rgba(212,175,55,0.4)] bg-[rgba(212,175,55,0.15)] px-5 py-2.5 text-xs font-bold text-[#d4af37] hover:bg-[#d4af37] hover:text-[#06070b] transition shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                >
                  ✨ {t('finalSurprise')}
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="overflow-hidden rounded-[1.8rem] border border-[rgba(212,175,55,0.25)] bg-[var(--surface-muted)] p-3 shadow-lg"
            >
              <img src={heroPhoto.src} alt={heroPhoto.alt} className="h-72 w-full rounded-[1.2rem] object-cover sm:h-80" />
            </motion.div>
          </div>
        </motion.section>

        {/* Quote Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-md"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37] font-bold">
            {language === 'ar' ? 'مقولة إهداء' : 'Special Tribute Quote'}
          </p>
          <blockquote className="mt-3 text-xl font-bold leading-9 text-[var(--text-primary)] sm:text-2xl">
            “{quoteContent.text}”
          </blockquote>
          <p className="mt-3 text-xs text-[#d4af37] font-semibold">{quoteContent.author}</p>
        </motion.section>

        {/* Featured Photos Section */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-md"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37] font-bold">
                {language === 'ar' ? 'صور مميزة' : 'Featured Photos'}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
                {language === 'ar' ? 'لحظات متلألئة بالحب' : 'Moments that glow'}
              </h3>
            </div>
            <button
              type="button"
              onClick={toggleMusic}
              className="rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.12)] px-4 py-2 text-xs font-bold text-[#d4af37] hover:bg-[#d4af37] hover:text-[#06070b] transition"
            >
              {isPlaying ? t('pauseMusic') : t('playMusic')}
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {featuredPhotos.map((photo) => (
              <div key={photo.id} className="overflow-hidden rounded-[1.6rem] border border-[rgba(212,175,55,0.2)] bg-[var(--surface-muted)] p-3">
                <img src={photo.src} alt={photo.alt} className="h-60 w-full rounded-[1.1rem] object-cover sm:h-72" />
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[var(--text-primary)]">{photo.label}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{photo.alt}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = photo.src
                      link.download = `mso-${photo.label.toLowerCase().replace(/\s+/g, '-')}.svg`
                      link.click()
                    }}
                    className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-semibold text-[#d4af37]"
                  >
                    {t('downloadPhoto')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Latest Memories */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22 }}
          className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-md"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37] font-bold">
            {language === 'ar' ? 'أحدث الذكريات' : 'Latest Memories'}
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {latestMemories.map((memory) => (
              <article key={memory.id} className="overflow-hidden rounded-[1.6rem] border border-[rgba(212,175,55,0.2)] bg-[var(--surface-muted)]">
                <img src={memory.src} alt={memory.title} className="h-44 w-full object-cover" />
                <div className="p-4">
                  <h4 className="text-base font-bold text-[var(--text-primary)]">{memory.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">{memory.description}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        {/* Background Music Player */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-md"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37] font-bold">
            {language === 'ar' ? 'الموسيقى الخلفية الاحتفالية' : 'Background Celebration Soundtrack'}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={toggleMusic}
              className="rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89524] px-5 py-2 text-xs font-bold text-[#06070b]"
            >
              {isPlaying ? t('pauseMusic') : t('playMusic')}
            </button>
            <p className="text-xs text-[var(--text-secondary)]">
              {language === 'ar' ? 'أنغام بيانو هادئة ترافق تصفحك لاحتفال محمد سفيان.' : 'Gentle piano soundtrack for browsing.'}
            </p>
          </div>
          <audio ref={audioRef} loop src="/media/music/soft-piano.wav" />
        </motion.section>
      </div>

      <GuestBookSection />

      {/* Final Surprise Banner CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-12 text-center my-16 px-4"
      >
        <div className="mx-auto max-w-4xl rounded-[2.2rem] border border-[rgba(212,175,55,0.35)] bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(6,7,11,0.95))] p-8 shadow-[0_24px_70px_rgba(212,175,55,0.15)] backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37] font-bold">M♡S♡O 💎</p>
          <h3 className="mt-3 text-2xl font-bold sm:text-3xl text-[var(--text-primary)]">
            {language === 'ar' ? 'هل أنت مستعد للمفاجأة الختامية؟ ✨' : 'Ready for the Final Birthday Surprise? ✨'}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
            {language === 'ar'
              ? 'لحظة فاخرة وسينمائية ختامية إهداء لحبيبي محمد سفيان M♡S♡O 💎'
              : 'A luxury cinematic ending experience dedicated to Mohamed Soufiane M♡S♡O 💎'}
          </p>
          <div className="mt-6">
            <Link
              to="/home/final-surprise"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89524] px-8 py-3.5 text-sm font-bold text-[#06070b] shadow-[0_4px_24px_rgba(212,175,55,0.4)] hover:scale-105 transition duration-300"
            >
              <span>✨ {t('finalSurprise')}</span>
            </Link>
          </div>
        </div>
      </motion.section>
    </PageLayout>
  )
}
