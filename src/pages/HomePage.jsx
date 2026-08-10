import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { PageLayout } from '../components/common/Layout'
import { DedicationQuote } from '../components/common/DedicationQuote'
import { AnimatedBackground } from '../components/effects/AnimatedBackground'
import { featuredPhotos, latestMemories, quoteContent } from '../data/homeContent'
import { GuestBookSection } from '../components/guestbook/GuestBookSection'
import { useLanguage } from '../contexts/LanguageContext'
import { useMusic } from '../contexts/MusicContext'

export function HomePage() {
  const { t, language } = useLanguage()
  const { isPlaying, togglePlayback } = useMusic()

  const heroPhoto = useMemo(() => featuredPhotos[0], [])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = heroPhoto.src
    link.download = `mso-memory-${heroPhoto.label.toLowerCase().replace(/\s+/g, '-')}.svg`
    link.click()
  }

  return (
    <PageLayout titleKey="homeTitle" descriptionKey="homeDesc">
      <Helmet>
        <title>Happy Birthday Mohamed Soufiane | M♡S♡O</title>
        <meta name="description" content="A luxury celebration space dedicated to Mohamed Soufiane M♡S♡O." />
      </Helmet>

      <div className="space-y-6">
        <DedicationQuote quoteKey="quoteHome" />

        {/* Featured Photos Section */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="rounded-[2rem] border border-[rgba(226,232,240,0.12)] bg-[var(--surface)] p-6 shadow-md"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#E2E8F0] font-bold">
                {language === 'ar' ? 'صور مميزة' : 'Featured Photos'}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
                {language === 'ar' ? 'لحظات دافئة مميزة' : 'Moments that glow'}
              </h3>
            </div>
            <button
              type="button"
              onClick={togglePlayback}
              className="rounded-full border border-[rgba(226,232,240,0.18)] bg-[rgba(29,78,216,0.12)] px-4 py-2 text-xs font-bold text-[#E2E8F0] hover:bg-[#1D4ED8] hover:text-white transition"
            >
              {isPlaying ? t('pauseMusic') : t('playMusic')}
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {featuredPhotos.map((photo) => (
              <div key={photo.id} className="overflow-hidden rounded-[1.6rem] border border-[rgba(226,232,240,0.12)] bg-[var(--surface-muted)] p-3">
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
                    className="rounded-full border border-[rgba(226,232,240,0.18)] px-3 py-1.5 text-xs font-semibold text-[#CBD5E1]"
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
          className="rounded-[2rem] border border-[rgba(226,232,240,0.12)] bg-[var(--surface)] p-6 shadow-md"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-[#E2E8F0] font-bold">
            {language === 'ar' ? 'أحدث الذكريات' : 'Latest Memories'}
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {latestMemories.map((memory) => (
              <article key={memory.id} className="overflow-hidden rounded-[1.6rem] border border-[rgba(226,232,240,0.12)] bg-[var(--surface-muted)]">
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
          className="rounded-[2rem] border border-[rgba(226,232,240,0.12)] bg-[var(--surface)] p-6 shadow-md"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-[#E2E8F0] font-bold">
            {language === 'ar' ? 'الموسيقى الخلفية الاحتفالية' : 'Background Celebration Soundtrack'}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={togglePlayback}
              className="rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#1e40af] px-5 py-2 text-xs font-bold text-white shadow-[0_4px_16px_rgba(29,78,216,0.25)]"
            >
              {isPlaying ? t('pauseMusic') : t('playMusic')}
            </button>
            <p className="text-xs text-[var(--text-secondary)]">
              {language === 'ar' ? 'أنغام بيانو هادئة ترافق تصفحك لاحتفال محمد سفيان.' : 'Gentle piano soundtrack for browsing.'}
            </p>
          </div>
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
        <div className="mx-auto max-w-4xl rounded-[2.2rem] border border-[rgba(226,232,240,0.18)] bg-[linear-gradient(135deg,rgba(8,17,31,0.94),rgba(3,5,8,0.97))] p-8 shadow-[0_24px_70px_rgba(29,78,216,0.12)] backdrop-blur-xl">
          <h3 className="mt-2 text-2xl font-bold sm:text-3xl text-[var(--text-primary)]">
            {language === 'ar' ? 'هل أنت مستعد للمفاجأة الختامية؟' : 'Ready for the Final Surprise?'}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
            {language === 'ar'
              ? 'تجربة ختامية فاخرة وسينمائية إهداء لمحمد سفيان M♡S♡O'
              : 'A luxury cinematic ending experience dedicated to Mohamed Soufiane M♡S♡O'}
          </p>
          <div className="mt-6">
            <Link
              to="/home/final-surprise"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#1e40af] px-8 py-3.5 text-sm font-bold text-white shadow-[0_4px_24px_rgba(29,78,216,0.3)] hover:scale-105 transition duration-300"
            >
              <span>{t('finalSurprise')}</span>
            </Link>
          </div>
        </div>
      </motion.section>
    </PageLayout>
  )
}
