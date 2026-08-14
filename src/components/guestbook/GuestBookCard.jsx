import { motion } from 'framer-motion'
import { FaComment, FaHeart } from 'react-icons/fa'
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

export function GuestBookCard({ entry }) {
  const { t, language } = useLanguage()

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

      {/* Card Footer (Static Read-Only Metadata Badges) */}
      <div className="mt-5 border-t border-[rgba(255,255,255,0.08)] pt-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {/* Static Likes Count Badge */}
            <div className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-sky-400">
              <FaHeart className="text-xs" />
              <span>{entry.likes_count ?? 0}</span>
            </div>

            {/* Static Comments Count Badge */}
            {entry.comments && entry.comments.length > 0 ? (
              <div className="flex items-center gap-1.5 rounded-full border border-[rgba(56,189,248,0.15)] bg-[rgba(29,78,216,0.1)] px-3 py-1 text-xs font-bold text-[#38BDF8]">
                <FaComment className="text-xs" />
                <span>{entry.comments.length}</span>
              </div>
            ) : null}
          </div>

          <span className="text-[11px] text-[var(--text-muted)]">{t('verifiedGuest')}</span>
        </div>

        {/* Static Comments List (Read-Only) if comments exist */}
        {entry.comments && entry.comments.length > 0 ? (
          <div className="mt-3 overflow-hidden rounded-2xl border border-[rgba(56,189,248,0.12)] bg-[rgba(3,5,8,0.6)] p-3">
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
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
          </div>
        ) : null}
      </div>
    </motion.article>
  )
}
