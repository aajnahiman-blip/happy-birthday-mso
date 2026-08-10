import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * LuxuryVideoCard — uses native HTML5 <video> for guaranteed compatibility.
 *
 * react-player v3.x changed its API (url→src, different prop forwarding),
 * making it incompatible with the rest of the codebase. The native <video>
 * element is 100% reliable for local MP4 files, supports all required features
 * (play/pause/seek/controls/mobile/events), and preserves the music sync logic.
 */
export function LuxuryVideoCard({ video, isActive, onPlay, onPause, onClose }) {
  const videoRef = useRef(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const isValidPoster = video.poster && !video.poster.endsWith('.mp4')

  /* ── Sync isActive → actual play/pause on the DOM element ── */
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    if (isActive) {
      const playPromise = el.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('[LuxuryVideoCard] play() rejected:', err)
        })
      }
    } else {
      el.pause()
    }
  }, [isActive])

  const handlePlay = () => {
    setHasStarted(true)
    setIsLoading(false)
    onPlay()
  }

  const handlePause = () => {
    onPause()
  }

  const handleEnded = () => {
    onPause()
  }

  const handleWaiting = () => {
    setIsLoading(true)
  }

  const handleCanPlay = () => {
    setIsLoading(false)
  }

  const handleError = (e) => {
    const el = e.target
    const mediaErr = el?.error
    const errMsg = mediaErr
      ? `MediaError code ${mediaErr.code}: ${mediaErr.message}`
      : String(e)
    console.error('[LuxuryVideoCard] video error on', video.url, errMsg)
    setError(errMsg)
    setIsLoading(false)
    onPause()
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`overflow-hidden rounded-[1.6rem] border transition-all duration-300 ${
        isActive
          ? 'border-[#d4af37] bg-[rgba(15,23,42,0.92)] shadow-[0_0_30px_rgba(212,175,55,0.25)]'
          : 'border-[rgba(212,175,55,0.16)] bg-[rgba(15,23,42,0.76)] shadow-[0_24px_70px_rgba(2,8,23,0.25)]'
      } backdrop-blur-xl`}
    >
      {/* ── Video area ── */}
      <div className="relative aspect-video overflow-hidden bg-black">
        {error ? (
          /* Error state */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[rgba(6,7,11,0.9)] text-center p-4">
            <span className="text-2xl">⚠️</span>
            <p className="text-xs text-[#d4af37] font-bold">Video unavailable</p>
            <p className="text-[10px] text-[var(--text-secondary)] max-w-xs">{error}</p>
          </div>
        ) : (
          <>
            {/* Loading spinner overlay */}
            {isLoading && (
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d4af37] border-t-transparent" />
              </div>
            )}

            <video
              ref={videoRef}
              src={video.url}
              poster={isValidPoster ? video.poster : undefined}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
              style={{ display: 'block', width: '100%', height: '100%' }}
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleEnded}
              onWaiting={handleWaiting}
              onCanPlay={handleCanPlay}
              onError={handleError}
            />
          </>
        )}
      </div>

      {/* ── Card metadata & controls ── */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-bold">
              M♡S♡O 💎 Birthday Video
            </p>
            <h3 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">{video.title}</h3>
          </div>
          {video.duration && (
            <span className="rounded-full border border-[rgba(212,175,55,0.2)] bg-[rgba(28,37,57,0.86)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--text-secondary)]">
              {video.duration}
            </span>
          )}
        </div>

        {video.description && (
          <p className="mt-3 text-xs leading-6 text-[var(--text-secondary)]">{video.description}</p>
        )}

        <div className="mt-4 flex items-center gap-3">
          {!isActive ? (
            <button
              type="button"
              onClick={onPlay}
              className="rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89524] px-5 py-2 text-xs font-bold text-[#06070b] shadow-[0_4px_16px_rgba(212,175,55,0.3)] hover:opacity-90 transition"
            >
              ▶ Play Video
            </button>
          ) : (
            <button
              type="button"
              onClick={onPause}
              className="rounded-full bg-[rgba(212,175,55,0.2)] border border-[#d4af37] px-5 py-2 text-xs font-bold text-[#d4af37] hover:bg-[#d4af37] hover:text-[#06070b] transition"
            >
              ⏸ Pause
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:border-[#d4af37] transition"
          >
            Close
          </button>
        </div>
      </div>
    </motion.article>
  )
}
