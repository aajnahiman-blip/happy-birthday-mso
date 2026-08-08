import { createClient } from '@supabase/supabase-js'
import { initialGuestBookEntries, initialPhotoMemories } from '../data/guestBookMockData'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

const GUESTBOOK_STORAGE_KEY = 'happy-birthday-guestbook-entries'
const PHOTO_MEMORIES_STORAGE_KEY = 'happy-birthday-photo-memories'
const TABLE_NAME = 'guest_book_entries'

function normalizeEntry(entry) {
  return {
    id: entry?.id ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: entry?.name ?? '',
    message: entry?.message ?? '',
    emoji: entry?.emoji ?? '✨',
    created_at: entry?.created_at ?? new Date().toISOString(),
    likes_count: typeof entry?.likes_count === 'number' ? entry.likes_count : 0,
    liked_by_user: Boolean(entry?.liked_by_user),
    comments: Array.isArray(entry?.comments) ? entry.comments : [],
  }
}

function sortEntries(entries) {
  return [...entries].sort((left, right) => new Date(right.created_at) - new Date(left.created_at))
}

function readFallbackGuestbook() {
  if (typeof window === 'undefined') {
    return initialGuestBookEntries.map(normalizeEntry)
  }

  try {
    const stored = window.localStorage.getItem(GUESTBOOK_STORAGE_KEY)
    if (!stored) {
      window.localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(initialGuestBookEntries))
      return initialGuestBookEntries.map(normalizeEntry)
    }

    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed.map(normalizeEntry) : initialGuestBookEntries.map(normalizeEntry)
  } catch (error) {
    console.warn('Unable to read guest book fallback entries', error)
    return initialGuestBookEntries.map(normalizeEntry)
  }
}

function writeFallbackGuestbook(entries) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(entries))
  } catch (error) {
    console.warn('Unable to persist guest book fallback entries', error)
  }
}

function readFallbackPhotos() {
  if (typeof window === 'undefined') {
    return initialPhotoMemories
  }

  try {
    const stored = window.localStorage.getItem(PHOTO_MEMORIES_STORAGE_KEY)
    if (!stored) {
      window.localStorage.setItem(PHOTO_MEMORIES_STORAGE_KEY, JSON.stringify(initialPhotoMemories))
      return initialPhotoMemories
    }

    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : initialPhotoMemories
  } catch (error) {
    console.warn('Unable to read photo memories fallback entries', error)
    return initialPhotoMemories
  }
}

function writeFallbackPhotos(photos) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(PHOTO_MEMORIES_STORAGE_KEY, JSON.stringify(photos))
  } catch (error) {
    console.warn('Unable to persist photo memories fallback entries', error)
  }
}

export async function getGuestBookEntries() {
  if (!supabase) {
    const fallbackEntries = readFallbackGuestbook()
    return { data: sortEntries(fallbackEntries), error: null }
  }

  try {
    const { data, error } = await supabase.from(TABLE_NAME).select('*').order('created_at', { ascending: false })

    if (error) {
      const fallbackEntries = readFallbackGuestbook()
      return { data: sortEntries(fallbackEntries), error }
    }

    return { data: sortEntries((data ?? []).map(normalizeEntry)), error: null }
  } catch (err) {
    const fallbackEntries = readFallbackGuestbook()
    return { data: sortEntries(fallbackEntries), error: err }
  }
}

export async function createGuestBookEntry(entryData) {
  const normalizedEntry = normalizeEntry({
    ...entryData,
    created_at: new Date().toISOString(),
    likes_count: 0,
    liked_by_user: false,
    comments: [],
  })

  if (!supabase) {
    const existingEntries = readFallbackGuestbook()
    const nextEntries = sortEntries([normalizedEntry, ...existingEntries])
    writeFallbackGuestbook(nextEntries)
    return { data: normalizedEntry, error: null }
  }

  try {
    const { data, error } = await supabase.from(TABLE_NAME).insert([normalizedEntry]).select('*').single()

    if (error) {
      const existingEntries = readFallbackGuestbook()
      const nextEntries = sortEntries([normalizedEntry, ...existingEntries])
      writeFallbackGuestbook(nextEntries)
      return { data: normalizedEntry, error: null }
    }

    return { data: normalizeEntry(data), error: null }
  } catch (err) {
    const existingEntries = readFallbackGuestbook()
    const nextEntries = sortEntries([normalizedEntry, ...existingEntries])
    writeFallbackGuestbook(nextEntries)
    return { data: normalizedEntry, error: null }
  }
}

export async function toggleLikeGuestBookEntry(id) {
  const existingEntries = readFallbackGuestbook()
  const updatedEntries = existingEntries.map((entry) => {
    if (entry.id === id) {
      const liked_by_user = !entry.liked_by_user
      const likes_count = liked_by_user ? entry.likes_count + 1 : Math.max(0, entry.likes_count - 1)
      return { ...entry, liked_by_user, likes_count }
    }
    return entry
  })

  writeFallbackGuestbook(updatedEntries)

  if (supabase) {
    // If Supabase table is attached, update database async
    const target = updatedEntries.find((e) => e.id === id)
    if (target) {
      await supabase.from(TABLE_NAME).update({ likes_count: target.likes_count }).eq('id', id)
    }
  }

  return { data: updatedEntries, error: null }
}

export async function addCommentToGuestBookEntry(entryId, commentData) {
  const newComment = {
    id: `comm-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    author: commentData.author?.trim() || 'Visitor',
    text: commentData.text?.trim() || '',
    created_at: new Date().toISOString(),
  }

  const existingEntries = readFallbackGuestbook()
  const updatedEntries = existingEntries.map((entry) => {
    if (entry.id === entryId) {
      return {
        ...entry,
        comments: [...entry.comments, newComment],
      }
    }
    return entry
  })

  writeFallbackGuestbook(updatedEntries)

  if (supabase) {
    const target = updatedEntries.find((e) => e.id === entryId)
    if (target) {
      await supabase.from(TABLE_NAME).update({ comments: target.comments }).eq('id', entryId)
    }
  }

  return { data: updatedEntries, error: null }
}

export async function getPhotoMemoryInteractions() {
  const photos = readFallbackPhotos()
  return { data: photos, error: null }
}

export async function toggleLikePhotoMemory(photoId) {
  const photos = readFallbackPhotos()
  const updatedPhotos = photos.map((item) => {
    if (item.id === photoId) {
      const liked_by_user = !item.liked_by_user
      const likes_count = liked_by_user ? item.likes_count + 1 : Math.max(0, item.likes_count - 1)
      return { ...item, liked_by_user, likes_count }
    }
    return item
  })

  writeFallbackPhotos(updatedPhotos)
  return { data: updatedPhotos, error: null }
}

export async function addCommentToPhotoMemory(photoId, commentData) {
  const newComment = {
    id: `pcomm-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    author: commentData.author?.trim() || 'Visitor',
    text: commentData.text?.trim() || '',
    created_at: new Date().toISOString(),
  }

  const photos = readFallbackPhotos()
  const updatedPhotos = photos.map((item) => {
    if (item.id === photoId) {
      return {
        ...item,
        comments: [...item.comments, newComment],
      }
    }
    return item
  })

  writeFallbackPhotos(updatedPhotos)
  return { data: updatedPhotos, error: null }
}
