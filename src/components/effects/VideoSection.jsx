import { videoItems } from '../../data/media'

export function VideoSection() {
  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm sm:p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">Video</p>
      <h3 className="mt-2 text-xl font-semibold">Media-ready player shell</h3>
      <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)]">
        <video controls poster={videoItems[0].poster} className="aspect-video">
          <source src={videoItems[0].src} type="video/mp4" />
        </video>
      </div>
    </section>
  )
}
