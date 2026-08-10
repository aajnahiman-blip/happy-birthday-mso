import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { musicTracks } from '../data/media'

const MusicContext = createContext(undefined)

export function MusicProvider({ children }) {
  const audioRef = useRef(null)
  const [currentTrack, setCurrentTrack] = useState(musicTracks[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.75)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Initialize or update audio src
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio()
      audio.loop = true
      audio.preload = 'metadata'
      audioRef.current = audio
    }

    const audio = audioRef.current
    const trackSrc = currentTrack?.src || musicTracks[0].src

    if (audio.src !== window.location.origin + trackSrc && !audio.src.endsWith(trackSrc)) {
      const wasPlaying = !audio.paused
      audio.src = trackSrc
      if (wasPlaying) {
        audio.play().catch((err) => {
          console.warn('Autoplay prevented or playback interrupted:', err)
          setIsPlaying(false)
        })
      }
    }
  }, [currentTrack])

  // Sync volume & muted state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.muted = isMuted
    }
  }, [volume, isMuted])

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0)
    const handleLoadedMetadata = () => setDuration(audio.duration || 0)

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [])

  const playMusic = async () => {
    if (!audioRef.current) return
    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (err) {
      console.warn('Playback failed:', err)
      setIsPlaying(false)
    }
  }

  const pauseMusic = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const togglePlayback = async () => {
    if (!audioRef.current) return
    if (audioRef.current.paused) {
      await playMusic()
    } else {
      pauseMusic()
    }
  }

  const resumeMusic = async () => {
    await playMusic()
  }

  const playTrack = async (track) => {
    setCurrentTrack(track)
    if (audioRef.current) {
      audioRef.current.src = track.src
      await playMusic()
    }
  }

  const setVolume = (val) => {
    setVolumeState(val)
    if (val === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  const seek = (timeInSeconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timeInSeconds
      setCurrentTime(timeInSeconds)
    }
  }

  const value = useMemo(
    () => ({
      currentTrack,
      setCurrentTrack: playTrack,
      isPlaying,
      togglePlayback,
      playMusic,
      pauseMusic,
      resumeMusic,
      volume,
      setVolume,
      isMuted,
      toggleMute,
      currentTime,
      duration,
      seek,
    }),
    [currentTrack, isPlaying, volume, isMuted, currentTime, duration],
  )

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}

export function useMusic() {
  const context = useContext(MusicContext)

  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider')
  }

  return context
}

