import { motion } from 'framer-motion'

export function LuxuryVideoCard({ video, onPlay, onPause, onEnded }) {
  const isValidPoster = video.poster && !video.poster.endsWith('.mp4')

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-[1.6rem] border border-[rgba(56,189,248,0.08)] bg-[rgba(8,17,31,0.78)] shadow-[0_24px_70px_rgba(3,5,8,0.35)] backdrop-blur-xl transition-all duration-300 hover:border-[#1D4ED8]"
    >
      {/* ── Native HTML5 Video Area ── */}
      <div className="relative w-full overflow-hidden bg-black">
        <video
          src={video.url || video.src}
          poster={isValidPoster ? video.poster : undefined}
          controls
          playsInline
          preload="metadata"
          className="w-full h-auto block bg-black"
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded || onPause}
        />
      </div>

      {/* ── Card metadata ── */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#E2E8F0] font-bold">
              M♡S♡O Birthday Video
            </p>
            <h3 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">{video.title}</h3>
          </div>
          {video.duration && (
            <span className="rounded-full border border-[rgba(56,189,248,0.15)] bg-[rgba(17,24,39,0.86)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--text-secondary)]">
              {video.duration}
            </span>
          )}
        </div>

        {video.description && (
          <p className="mt-3 text-xs leading-6 text-[var(--text-secondary)]">{video.description}</p>
        )}
      </div>
    </motion.article>
  )
}
