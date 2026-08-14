import { initialGuestBookEntries, initialPhotoMemories } from '../data/guestBookMockData'

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

export async function getGuestBookEntries() {
  return { data: initialGuestBookEntries.map(normalizeEntry), error: null }
}

export async function createGuestBookEntry() {
  return { data: null, error: 'Guestbook is read-only.' }
}

export async function toggleLikeGuestBookEntry() {
  return { data: initialGuestBookEntries.map(normalizeEntry), error: null }
}

export async function addCommentToGuestBookEntry() {
  return { data: initialGuestBookEntries.map(normalizeEntry), error: null }
}

export async function getPhotoMemoryInteractions() {
  return { data: initialPhotoMemories, error: null }
}

export async function toggleLikePhotoMemory() {
  return { data: initialPhotoMemories, error: null }
}

export async function addCommentToPhotoMemory() {
  return { data: initialPhotoMemories, error: null }
}
