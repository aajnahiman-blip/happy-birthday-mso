import { createContext, useContext, useMemo, useState } from 'react'

const MusicContext = createContext(undefined)

export function MusicProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.75)

  const togglePlayback = () => setIsPlaying((currentValue) => !currentValue)

  const value = useMemo(
    () => ({
      currentTrack,
      setCurrentTrack,
      isPlaying,
      togglePlayback,
      volume,
      setVolume,
    }),
    [currentTrack, isPlaying, volume],
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
