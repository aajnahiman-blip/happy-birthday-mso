import { useCallback, useEffect, useMemo, useState } from 'react'
import confetti from 'canvas-confetti'
import {
  addCommentToGuestBookEntry,
  createGuestBookEntry,
  getGuestBookEntries,
  toggleLikeGuestBookEntry,
} from '../services/guestBookService'

export function useGuestBook() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Form State
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState('✨')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Control State
  const [sortOrder, setSortOrder] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')

  const fetchEntries = useCallback(async () => {
    setLoading(true)
    const { data, error: serviceError } = await getGuestBookEntries()
    if (serviceError && (!data || data.length === 0)) {
      setError('Unable to load guest book entries.')
    } else {
      setEntries(data || [])
      setError(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchEntries()
  }, [fetchEntries])

  const appendEmoji = useCallback((emojiChar) => {
    setSelectedEmoji(emojiChar)
    setMessage((prev) => prev + (prev && !prev.endsWith(' ') ? ' ' : '') + emojiChar)
    setErrors((prev) => ({ ...prev, message: undefined }))
  }, [])

  const handleNameChange = (val) => {
    setName(val)
    if (val.trim()) {
      setErrors((prev) => ({ ...prev, name: undefined }))
    }
  }

  const handleMessageChange = (val) => {
    setMessage(val)
    if (val.trim()) {
      setErrors((prev) => ({ ...prev, message: undefined }))
    }
  }

  const validate = () => {
    const lang = window.localStorage.getItem('language') || 'ar'
    const nextErrors = {}
    if (!name.trim()) {
      nextErrors.name = lang === 'ar' ? 'يرجى إدخال اسمك.' : 'Please enter your name.'
    }
    if (!message.trim()) {
      nextErrors.message = lang === 'ar' ? 'يرجى كتابة رسالة التهنئة.' : 'Please write a birthday message.'
    } else if (message.trim().length < 3) {
      nextErrors.message = lang === 'ar' ? 'يجب أن تكون الرسالة 3 أحرف على الأقل.' : 'Message must be at least 3 characters long.'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault()
    }

    if (!validate()) {
      return
    }

    setIsSubmitting(true)
    const trimmedName = name.trim()
    const trimmedMessage = message.trim()

    const { data: newEntry, error: submitError } = await createGuestBookEntry({
      name: trimmedName,
      message: trimmedMessage,
      emoji: selectedEmoji,
    })

    setIsSubmitting(false)

    if (submitError && !newEntry) {
      const lang = window.localStorage.getItem('language') || 'ar'
      setErrors({ form: lang === 'ar' ? 'تعذر نشر رسالتك. يرجى المحاولة مرة أخرى.' : 'Could not submit your message. Please try again.' })
      return
    }

    // Trigger Celebration Confetti
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f8f8f8', '#ffd700', '#ff69b4', '#14213d'],
      })
    } catch {
      // Ignore if confetti fails
    }

    // Reset Form
    setName('')
    setMessage('')
    setErrors({})
    setIsSuccess(true)
    const lang = window.localStorage.getItem('language') || 'ar'
    setSuccessMessage(
      lang === 'ar'
        ? `شكراً لك يا ${trimmedName}! تم نشر تهنئتك بنجاح. 🎉`
        : `Thank you, ${trimmedName}! Your birthday message has been published.`
    )

    // Update local entries list
    setEntries((prev) => [newEntry, ...prev])

    // Auto clear success notice
    setTimeout(() => {
      setIsSuccess(false)
      setSuccessMessage('')
    }, 6000)
  }

  const handleToggleLike = async (id) => {
    // Optimistic UI update
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          const liked_by_user = !entry.liked_by_user
          const likes_count = liked_by_user ? entry.likes_count + 1 : Math.max(0, entry.likes_count - 1)
          return { ...entry, liked_by_user, likes_count }
        }
        return entry
      }),
    )

    await toggleLikeGuestBookEntry(id)
  }

  const handleAddComment = async (entryId, commentData) => {
    if (!commentData.text || !commentData.text.trim()) {
      return
    }

    const { data: updatedEntries } = await addCommentToGuestBookEntry(entryId, commentData)
    if (updatedEntries) {
      setEntries(updatedEntries)
    }
  }

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

    // Form
    name,
    message,
    selectedEmoji,
    errors,
    isSubmitting,
    isSuccess,
    successMessage,
    handleNameChange,
    handleMessageChange,
    appendEmoji,
    handleSubmit,

    // Actions
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
