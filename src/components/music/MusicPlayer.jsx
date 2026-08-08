import { useMemo } from 'react'
import { useMusic } from '../../contexts/MusicContext'
import { musicTracks } from '../../data/media'

export function MusicPlayer() {
  const { currentTrack, setCurrentTrack, isPlaying, togglePlayback, volume, setVolume } = useMusic()

  const activeTrack = useMemo(() => currentTrack ?? musicTracks[0], [currentTrack])

  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">Music</p>
          <h3 className="mt-2 text-xl font-semibold">{activeTrack.title}</h3>
          <p className="text-sm text-[var(--text-secondary)]">{activeTrack.artist}</p>
        </div>

        <div className="flex items-center gap-3">
          {musicTracks.map((track) => (
            <button
              key={track.id}
              type="button"
              onClick={() => setCurrentTrack(track)}
              className={`rounded-full border px-3 py-2 text-sm transition ${
                activeTrack.id === track.id ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)]' : 'border-[var(--border)] text-[var(--text-secondary)]'
              }`}
            >
              {track.title}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={togglePlayback}
          className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          className="w-full sm:max-w-xs"
        />
      </div>
    </section>
  )
}
