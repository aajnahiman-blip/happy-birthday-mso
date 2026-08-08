import { AnimatePresence, motion } from 'framer-motion'
import { FaRegSmile, FaSearch, FaSortAmountDown } from 'react-icons/fa'
import { GuestBookCard } from './GuestBookCard'
import { useLanguage } from '../../contexts/LanguageContext'

export function GuestBookList({
  entries,
  loading,
  error,
  sortOrder,
  onSortChange,
  searchQuery,
  onSearchChange,
  onToggleLike,
  onAddComment,
  totalCount,
}) {
  const { t, language } = useLanguage()

  const SORT_OPTIONS = [
    { id: 'newest', label: t('sortNewest') },
    { id: 'oldest', label: t('sortOldest') },
    { id: 'most_liked', label: t('sortMostLiked') },
  ]

  return (
    <section className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col gap-4 rounded-[1.8rem] border border-[rgba(212,175,55,0.2)] bg-[rgba(15,23,42,0.72)] p-4 shadow-[0_16px_40px_rgba(2,8,23,0.3)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-5">
        {/* Left: Total Count & Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.12)] text-[#d4af37]">
            <FaRegSmile className="text-lg" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{t('wishesFeed')}</h3>
            <p className="text-xs text-[var(--text-secondary)]">
              {language === 'ar' ? (
                <>
                  عرض <span className="font-bold text-[#d4af37]">{entries.length}</span> من أصل {totalCount} تهنئة
                </>
              ) : (
                <>
                  Showing <span className="font-bold text-[#d4af37]">{entries.length}</span> of {totalCount} wishes
                </>
              )}
            </p>
          </div>
        </div>

        {/* Right: Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative min-w-[160px] flex-1 sm:w-56 sm:flex-none">
            <div className="pointer-events-none absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3 text-[var(--text-muted)]">
              <FaSearch className="text-xs text-[#d4af37]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('searchWishes')}
              className="w-full rounded-xl border border-[rgba(212,175,55,0.2)] bg-[rgba(6,7,11,0.6)] py-2 ltr:pl-9 ltr:pr-3 rtl:pr-9 rtl:pl-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center ltr:pr-3 rtl:pl-3 text-xs text-[var(--text-muted)] hover:text-white"
              >
                ✕
              </button>
            ) : null}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1 rounded-xl border border-[rgba(212,175,55,0.2)] bg-[rgba(6,7,11,0.6)] p-1 text-xs">
            <span className="hidden px-2 text-[var(--text-muted)] sm:inline-flex items-center gap-1">
              <FaSortAmountDown className="text-[10px] text-[#d4af37]" /> {language === 'ar' ? 'ترتيب:' : 'Sort:'}
            </span>
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => onSortChange(option.id)}
                className={`rounded-lg px-2.5 py-1.5 font-bold transition duration-200 ${
                  sortOrder === option.id
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b89524] text-[#06070b] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.06)]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Skeleton State */}
      {loading ? (
        <div className="grid gap-5 md:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-48 animate-pulse rounded-[1.8rem] border border-[rgba(212,175,55,0.15)] bg-[rgba(15,23,42,0.5)] p-6"
            />
          ))}
        </div>
      ) : null}

      {/* Error Message State */}
      {!loading && error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-sm text-red-400">
          {error}
        </div>
      ) : null}

      {/* Empty State */}
      {!loading && !error && entries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-[2rem] border border-[rgba(212,175,55,0.2)] bg-[rgba(15,23,42,0.6)] p-10 text-center backdrop-blur-xl"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(212,175,55,0.12)] text-[#d4af37] text-2xl mb-4">
            <FaRegSmile />
          </div>
          <h4 className="text-lg font-bold text-[var(--text-primary)]">
            {searchQuery
              ? language === 'ar'
                ? 'لم نجد تهنئة تطابق البحث'
                : 'No matching wishes found'
              : language === 'ar'
              ? 'كن أول من يكتب تهنئة لمحمد سفيان!'
              : 'Be the first to leave a wish!'}
          </h4>
          <p className="mt-2 max-w-md text-xs text-[var(--text-secondary)] sm:text-sm">
            {searchQuery
              ? language === 'ar'
                ? `لم يتم العثور على أي رسائل تحتوي على "${searchQuery}". حاول مسح التصفية.`
                : `We couldn't find any messages matching "${searchQuery}". Try clearing your search filter.`
              : language === 'ar'
              ? 'اكتب تهنئتك الدافئة باستخدام النموذج أعلاه لافتتاح سجل التبريكات!'
              : 'Write your warm birthday message using the form above to kick off the Guest Book!'}
          </p>
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="mt-4 rounded-xl border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.1)] px-4 py-2 text-xs font-bold text-[#d4af37] hover:bg-[#d4af37] hover:text-[#06070b] transition"
            >
              {language === 'ar' ? 'إلغاء التصفية' : 'Clear Search Filter'}
            </button>
          ) : null}
        </motion.div>
      ) : null}

      {/* Animated Cards Grid */}
      {!loading && !error && entries.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {entries.map((entry) => (
              <GuestBookCard
                key={entry.id}
                entry={entry}
                onToggleLike={onToggleLike}
                onAddComment={onAddComment}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : null}
    </section>
  )
}
