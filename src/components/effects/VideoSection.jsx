import { videoItems } from '../../data/media'

export function VideoSection() {
  const video = videoItems[0]
  const isValidPoster = video?.poster && !video.poster.endsWith('.mp4')

  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm sm:p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">Video</p>
      <h3 className="mt-2 text-xl font-semibold">Media-ready player shell</h3>
      <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-black">
        <video
          controls
          playsInline
          preload="metadata"
          poster={isValidPoster ? video.poster : undefined}
          className="w-full h-auto block bg-black"
        >
          <source src={video.url || video.src} type="video/mp4" />
        </video>
      </div>
    </section>
  )
}
