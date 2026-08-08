import { useCallback, useEffect, useState } from 'react'
import {
  addCommentToPhotoMemory,
  getPhotoMemoryInteractions,
  toggleLikePhotoMemory,
} from '../services/guestBookService'

export function useMemoryInteractions() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPhotos = useCallback(async () => {
    setLoading(true)
    const { data } = await getPhotoMemoryInteractions()
    setPhotos(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos])

  const handleToggleLike = async (photoId) => {
    // Optimistic UI update
    setPhotos((prev) =>
      prev.map((item) => {
        if (item.id === photoId) {
          const liked_by_user = !item.liked_by_user
          const likes_count = liked_by_user ? item.likes_count + 1 : Math.max(0, item.likes_count - 1)
          return { ...item, liked_by_user, likes_count }
        }
        return item
      }),
    )

    await toggleLikePhotoMemory(photoId)
  }

  const handleAddComment = async (photoId, commentData) => {
    if (!commentData.text || !commentData.text.trim()) {
      return
    }

    const { data: updatedPhotos } = await addCommentToPhotoMemory(photoId, commentData)
    if (updatedPhotos) {
      setPhotos(updatedPhotos)
    }
  }

  return {
    photos,
    loading,
    handleToggleLike,
    handleAddComment,
  }
}
