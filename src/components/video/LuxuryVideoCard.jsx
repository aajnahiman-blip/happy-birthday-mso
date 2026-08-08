import { motion } from 'framer-motion'
import ReactPlayer from 'react-player'

export function LuxuryVideoCard({ video, isActive, onPlay, onPause, onClose }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-[1.6rem] border border-[rgba(212,175,55,0.16)] bg-[rgba(15,23,42,0.76)] shadow-[0_24px_70px_rgba(2,8,23,0.25)] backdrop-blur-xl"
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        <ReactPlayer
          url={video.url}
          light={video.poster}
          playing={isActive}
          controls
          width="100%"
          height="100%"
          playsinline
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onPause}
          config={{ file: { attributes: { playsInline: true } } }}
        />
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">Featured Video</p>
            <h3 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">{video.title}</h3>
          </div>
          <span className="rounded-full border border-[rgba(212,175,55,0.2)] bg-[rgba(28,37,57,0.86)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--text-secondary)]">
            {video.duration}
          </span>
        </div>

        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{video.description}</p>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={onPlay}
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[#06070b]"
          >
            {isActive ? 'Playing' : 'Play'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[rgba(212,175,55,0.2)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)]"
          >
            Close
          </button>
        </div>
      </div>
    </motion.article>
  )
}
