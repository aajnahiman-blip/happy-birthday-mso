import { useState } from 'react'
import { motion } from 'framer-motion'
import ReactPlayer from 'react-player'

export function LuxuryVideoCard({ video, isActive, onPlay, onPause, onClose }) {
  const [hasError, setHasError] = useState(false)
  const isValidPoster = video.poster && !video.poster.endsWith('.mp4')

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
      <div className="relative aspect-video overflow-hidden bg-black">
        {!hasError ? (
          <ReactPlayer
            url={video.url}
            light={isValidPoster ? video.poster : false}
            playing={isActive}
            controls
            width="100%"
            height="100%"
            playsinline
            onPlay={onPlay}
            onPause={onPause}
            onEnded={onPause}
            onError={(err) => {
              console.error('ReactPlayer error on', video.url, err)
              setHasError(true)
            }}
            config={{
              file: {
                attributes: {
                  playsInline: true,
                  controlsList: 'nodownload',
                  preload: 'metadata',
                },
              },
            }}
          />
        ) : (
          <video
            src={video.url}
            poster={isValidPoster ? video.poster : undefined}
            controls
            playsInline
            className="h-full w-full object-contain"
            onPlay={onPlay}
            onPause={onPause}
            onEnded={onPause}
          />
        )}
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-bold">M♡S♡O 💎 Birthday Video</p>
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

