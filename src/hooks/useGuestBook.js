import { useCallback, useEffect, useMemo, useState } from 'react'
import { getGuestBookEntries } from '../services/guestBookService'

export function useGuestBook() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Control State
  const [sortOrder, setSortOrder] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')

  const fetchEntries = useCallback(async () => {
    setLoading(true)
    const { data } = await getGuestBookEntries()
    setEntries(data || [])
    setError(null)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchEntries()
  }, [fetchEntries])

  const handleToggleLike = useCallback(() => {
    // Read-only: no-op
  }, [])

  const handleAddComment = useCallback(() => {
    // Read-only: no-op
  }, [])

  const sortedAndFilteredEntries = useMemo(() => {
    let result = [...entries]

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (e) => e.name.toLowerCase().includes(q) || e.message.toLowerCase().includes(q),
      )
    }

    // Sorting
    switch (sortOrder) {
      case 'oldest':
        return result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      case 'most_liked':
        return result.sort((a, b) => b.likes_count - a.likes_count)
      case 'newest':
      default:
        return result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
  }, [entries, searchQuery, sortOrder])

  const stats = useMemo(() => {
    const totalWishes = entries.length
    const totalLikes = entries.reduce((acc, curr) => acc + (curr.likes_count || 0), 0)
    const totalComments = entries.reduce((acc, curr) => acc + (curr.comments?.length || 0), 0)
    return { totalWishes, totalLikes, totalComments }
  }, [entries])

  return {
    entries: sortedAndFilteredEntries,
    rawEntriesCount: entries.length,
    loading,
    error,
    stats,

    // Actions (Read-only no-ops)
    handleToggleLike,
    handleAddComment,

    // Controls
    sortOrder,
    setSortOrder,
    searchQuery,
    setSearchQuery,
    refresh: fetchEntries,
  }
}
