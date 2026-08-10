import { useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageLayout } from '../components/common/Layout'
import { DedicationQuote } from '../components/common/DedicationQuote'
import { LuxuryVideoCard } from '../components/video/LuxuryVideoCard'
import { useMusic } from '../contexts/MusicContext'
import { birthdayVideos } from '../data/videoContent'
import { useLanguage } from '../contexts/LanguageContext'

export function BirthdayVideosPage() {
  const { t, language } = useLanguage()
  const { isPlaying, pauseMusic, resumeMusic } = useMusic()
  const [activeVideoId, setActiveVideoId] = useState(null)
  const wasMusicPlayingRef = useRef(false)

  const activeVideo = useMemo(() => birthdayVideos.find((video) => video.id === activeVideoId) ?? null, [activeVideoId])

  const handlePlay = (videoId) => {
    if (!activeVideoId) {
      wasMusicPlayingRef.current = isPlaying
      if (isPlaying) {
        pauseMusic()
      }
    }
    setActiveVideoId(videoId)
  }

  const handlePause = () => {
    setActiveVideoId(null)
    if (wasMusicPlayingRef.current) {
      resumeMusic()
      wasMusicPlayingRef.current = false
    }
  }

  const handleClose = () => {
    setActiveVideoId(null)
    if (wasMusicPlayingRef.current) {
      resumeMusic()
      wasMusicPlayingRef.current = false
    }
  }

  return (
    <PageLayout titleKey="videosTitle" descriptionKey="videosDesc">
      <Helmet>
        <title>{t('videosTitle')} | M♡S♡O</title>
        <meta name="description" content="Birthday videos gallery celebrating Mohamed Soufiane M♡S♡O." />
      </Helmet>

      <div className="space-y-6">
        <DedicationQuote quoteKey="quoteVideos" />

        <section className="rounded-[2rem] border border-[rgba(226,232,240,0.12)] bg-[rgba(8,17,31,0.78)] p-4 shadow-[0_24px_70px_rgba(3,5,8,0.38)] backdrop-blur-xl sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#E2E8F0] font-bold">M♡S♡O</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl text-[var(--text-primary)]">{t('videosTitle')}</h2>
            <p className="mt-2 max-w-2xl text-xs leading-6 text-[var(--text-secondary)] sm:text-sm">
              {t('videosDesc')}
            </p>
          </div>
          <div className="rounded-full border border-[rgba(29,78,216,0.2)] bg-[rgba(29,78,216,0.1)] px-4 py-2 text-xs font-bold text-[#38BDF8]">
            {birthdayVideos.length} {language === 'ar' ? 'فيديوهات احتفالية' : 'Cinematic videos'}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {birthdayVideos.map((video) => (
            <LuxuryVideoCard
              key={video.id}
              video={video}
              isActive={activeVideo?.id === video.id}
              onPlay={() => handlePlay(video.id)}
              onPause={handlePause}
              onClose={handleClose}
            />
          ))}
        </div>
      </section>
      </div>
    </PageLayout>
  )
}
