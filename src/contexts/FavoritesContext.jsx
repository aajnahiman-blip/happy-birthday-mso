import { createContext, useContext, useMemo, useState } from 'react'

const FavoritesContext = createContext(undefined)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (itemId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(itemId)
        ? currentFavorites.filter((favoriteId) => favoriteId !== itemId)
        : [...currentFavorites, itemId],
    )
  }

  const isFavorite = (itemId) => favorites.includes(itemId)

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
    }),
    [favorites],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }

  return context
}
