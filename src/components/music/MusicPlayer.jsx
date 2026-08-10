import { useMemo } from 'react'
import { useMusic } from '../../contexts/MusicContext'
import { musicTracks } from '../../data/media'

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

export function MusicPlayer() {
  const {
    currentTrack,
    setCurrentTrack,
    isPlaying,
    togglePlayback,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    currentTime,
    duration,
    seek,
  } = useMusic()

  const activeTrack = useMemo(() => currentTrack ?? musicTracks[0], [currentTrack])

  const handleSeek = (e) => {
    const time = Number(e.target.value)
    seek(time)
  }

  return (
    <section className="rounded-[2rem] border border-[rgba(29,78,216,0.2)] bg-[rgba(8,17,31,0.88)] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#2563EB] font-bold">Background Music</p>
          <h3 className="mt-1 text-xl font-bold text-[var(--text-primary)]">{activeTrack.title}</h3>
          <p className="text-xs text-[var(--text-secondary)]">{activeTrack.artist}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {musicTracks.map((track) => (
            <button
              key={track.id}
              type="button"
              onClick={() => setCurrentTrack(track)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                activeTrack.id === track.id
                  ? 'border-[#1D4ED8] bg-[rgba(29,78,216,0.15)] text-[#38BDF8]'
                  : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[#2563EB]'
              }`}
            >
              {track.title}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-5 space-y-1.5">
        <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min="0"
          max={duration || 100}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-[#2563EB] cursor-pointer"
        />
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={togglePlayback}
          className="rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#1e40af] px-6 py-2 text-xs font-bold text-white shadow-[0_4px_16px_rgba(29,78,216,0.25)] hover:opacity-90 transition"
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMute}
            className="text-xs font-semibold text-[#38BDF8] hover:underline"
          >
            {isMuted || volume === 0 ? '🔇 Muted' : '🔊 Volume'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="w-24 sm:w-32 accent-[#2563EB] cursor-pointer"
          />
        </div>
      </div>
    </section>
  )
}
