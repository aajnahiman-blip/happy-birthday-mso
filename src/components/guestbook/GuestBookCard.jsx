import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaComment, FaHeart, FaPaperPlane, FaRegComment, FaRegHeart } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'

function formatTimestamp(dateStr, language) {
  if (!dateStr) {
    return language === 'fr' ? 'À l’instant' : 'الآن'
  }
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr

    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return language === 'fr' ? 'À l’instant' : 'الآن'
    }
    if (diffInSeconds < 3600) {
      const mins = Math.floor(diffInSeconds / 60)
      return language === 'fr' ? `Il y a ${mins} min` : `منذ ${mins} دقيقة`
    }
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return language === 'fr' ? `Il y a ${hours} h` : `منذ ${hours} ساعة`
    }

    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'ar-EG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

export function GuestBookCard({ entry, onToggleLike, onAddComment }) {
  const { t, language } = useLanguage()
  const [showComments, setShowComments] = useState(false)
  const [commentAuthor, setCommentAuthor] = useState('')
  const [commentText, setCommentText] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!commentText.trim()) return

    setIsSubmittingComment(true)
    await onAddComment(entry.id, {
      author: commentAuthor.trim() || t('visitorName'),
      text: commentText.trim(),
    })
    setIsSubmittingComment(false)
    setCommentText('')
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[1.8rem] border border-[rgba(56,189,248,0.12)] bg-[rgba(8,17,31,0.78)] p-5 shadow-[0_16px_40px_rgba(3,5,8,0.32)] backdrop-blur-xl transition-all duration-300 hover:border-[rgba(56,189,248,0.3)] hover:shadow-[0_20px_50px_rgba(29,78,216,0.15)] sm:p-6"
    >
      {/* Top subtle glow bar */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[rgba(56,189,248,0.3)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1D4ED8] via-[#1e40af] to-[#1e3a8a] text-sm font-bold text-white shadow-[0_4px_14px_rgba(29,78,216,0.3)]">
              {getInitials(entry.name)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[var(--text-primary)] text-base">{entry.name}</h3>
                {entry.emoji ? <span className="text-base">{entry.emoji}</span> : null}
              </div>
              <p className="text-xs text-[var(--text-muted)]">{formatTimestamp(entry.created_at, language)}</p>
            </div>
          </div>

          <span className="rounded-full border border-[rgba(56,189,248,0.15)] bg-[rgba(29,78,216,0.08)] px-2.5 py-1 text-[11px] font-bold tracking-wide text-[#38BDF8]">
            {t('congratulations')}
          </span>
        </div>

        {/* Card Message Body */}
        <div className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          <p className="whitespace-pre-wrap">{entry.message}</p>
        </div>
      </div>

      {/* Card Actions & Footer */}
      <div className="mt-5 border-t border-[rgba(255,255,255,0.08)] pt-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            {/* Like Button */}
            <button
              type="button"
              onClick={() => onToggleLike(entry.id)}
              className={`group/heart flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                entry.liked_by_user
                  ? 'bg-blue-500/20 text-sky-400 border border-blue-500/30'
                  : 'bg-[rgba(255,255,255,0.05)] text-[var(--text-secondary)] hover:bg-[rgba(29,78,216,0.12)] hover:text-[#38BDF8]'
              }`}
            >
              <motion.span
                animate={entry.liked_by_user ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                {entry.liked_by_user ? (
                  <FaHeart className="text-sky-400 text-sm" />
                ) : (
                  <FaRegHeart className="text-sm transition-transform group-hover/heart:scale-110" />
                )}
              </motion.span>
              <span>{entry.likes_count ?? 0}</span>
              <span className="hidden sm:inline text-[10px] opacity-80">
                {entry.liked_by_user ? t('unlike') : t('like')}
              </span>
            </button>

            {/* Comment Toggle Button */}
            <button
              type="button"
              onClick={() => setShowComments((prev) => !prev)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                showComments
                  ? 'bg-[rgba(29,78,216,0.18)] text-[#38BDF8] border border-[rgba(56,189,248,0.2)]'
                  : 'bg-[rgba(255,255,255,0.05)] text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.1)] hover:text-[var(--text-primary)]'
              }`}
            >
              {showComments ? <FaComment className="text-sm" /> : <FaRegComment className="text-sm" />}
              <span>{entry.comments?.length ?? 0} {t('comments')}</span>
            </button>
          </div>

          <span className="text-[11px] text-[var(--text-muted)]">{t('verifiedGuest')}</span>
        </div>

        {/* Collapsible Comments Drawer */}
        <AnimatePresence>
          {showComments ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3 overflow-hidden rounded-2xl border border-[rgba(56,189,248,0.12)] bg-[rgba(3,5,8,0.6)] p-3"
            >
              {/* Existing Comments */}
              {entry.comments && entry.comments.length > 0 ? (
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {entry.comments.map((comm) => (
                    <div key={comm.id} className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(8,17,31,0.6)] p-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#38BDF8]">{comm.author}</span>
                        <span className="text-[10px] text-[var(--text-muted)]">{formatTimestamp(comm.created_at, language)}</span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">{comm.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-2 text-center text-xs text-[var(--text-muted)]">
                  {t('noCommentsYet')}
                </p>
              )}

              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mt-3 pt-2 border-t border-[rgba(255,255,255,0.08)] space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t('yourName')}
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    className="w-1/3 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(8,17,31,0.8)] px-2.5 py-1.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#2563EB]"
                  />
                  <input
                    type="text"
                    placeholder={t('writeCommentPlaceholder')}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-1 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(8,17,31,0.8)] px-3 py-1.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#2563EB]"
                  />
                  <button
                    type="submit"
                    title={t('send')}
                    disabled={isSubmittingComment || !commentText.trim()}
                    className="flex items-center justify-center rounded-xl bg-[rgba(29,78,216,0.2)] px-3 py-1.5 text-xs font-bold text-[#38BDF8] border border-[rgba(56,189,248,0.2)] hover:bg-[#1D4ED8] hover:text-white transition duration-200 disabled:opacity-40"
                  >
                    <FaPaperPlane className="text-[10px]" />
                  </button>
                </div>
              </form>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}
