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
      <div className="flex flex-col gap-4 rounded-[1.8rem] border border-[rgba(56,189,248,0.12)] bg-[rgba(8,17,31,0.78)] p-4 shadow-[0_16px_40px_rgba(3,5,8,0.35)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-5">
        {/* Left: Total Count & Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[rgba(56,189,248,0.15)] bg-[rgba(29,78,216,0.12)] text-[#38BDF8]">
            <FaRegSmile className="text-lg" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{t('wishesFeed')}</h3>
            <p className="text-xs text-[var(--text-secondary)]">
              {language === 'fr' ? (
                <>
                  Affichage de <span className="font-bold text-[#38BDF8]">{entries.length}</span> sur {totalCount} messages
                </>
              ) : (
                <>
                  عرض <span className="font-bold text-[#38BDF8]">{entries.length}</span> من أصل {totalCount} تهنئة
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
              <FaSearch className="text-xs text-[#2563EB]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('searchMessages')}
              className="w-full rounded-xl border border-[rgba(56,189,248,0.12)] bg-[rgba(3,5,8,0.6)] py-2 ltr:pl-9 ltr:pr-3 rtl:pr-9 rtl:pl-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30"
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
          <div className="flex items-center gap-1 rounded-xl border border-[rgba(56,189,248,0.12)] bg-[rgba(3,5,8,0.6)] p-1 text-xs">
            <span className="hidden px-2 text-[var(--text-muted)] sm:inline-flex items-center gap-1">
              <FaSortAmountDown className="text-[10px] text-[#2563EB]" /> {language === 'fr' ? 'Trier :' : 'ترتيب:'}
            </span>
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => onSortChange(option.id)}
                className={`rounded-lg px-2.5 py-1.5 font-bold transition duration-200 ${
                  sortOrder === option.id
                    ? 'bg-gradient-to-r from-[#1D4ED8] to-[#1e40af] text-white shadow-sm'
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
              className="h-48 animate-pulse rounded-[1.8rem] border border-[rgba(56,189,248,0.1)] bg-[rgba(8,17,31,0.5)] p-6"
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
          className="flex flex-col items-center justify-center rounded-[2rem] border border-[rgba(56,189,248,0.12)] bg-[rgba(8,17,31,0.6)] p-10 text-center backdrop-blur-xl"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(29,78,216,0.12)] text-[#38BDF8] text-2xl mb-4">
            <FaRegSmile />
          </div>
          <h4 className="text-lg font-bold text-[var(--text-primary)]">
            {searchQuery
              ? language === 'fr'
                ? 'Aucun message ne correspond à la recherche'
                : 'لم نجد تهنئة تطابق البحث'
              : language === 'fr'
              ? 'Soyez le premier à écrire un vœu pour Mohamed Soufiane !'
              : 'كن أول من يكتب تهنئة لمحمد سفيان!'}
          </h4>
          <p className="mt-2 max-w-md text-xs text-[var(--text-secondary)] sm:text-sm">
            {searchQuery
              ? language === 'fr'
                ? `Aucun message trouvé contenant "${searchQuery}". Essayez d’effacer le filtre.`
                : `لم يتم العثور على أي رسائل تحتوي على "${searchQuery}". حاول مسح التصفية.`
              : language === 'fr'
              ? 'Écrivez votre message de félicitations ci-dessus !'
              : 'اكتب تهنئتك الدافئة باستخدام النموذج أعلاه لافتتاح سجل التبريكات!'}
          </p>
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="mt-4 rounded-xl border border-[rgba(56,189,248,0.2)] bg-[rgba(29,78,216,0.1)] px-4 py-2 text-xs font-bold text-[#38BDF8] hover:bg-[#1D4ED8] hover:text-white transition"
            >
              {language === 'fr' ? 'Effacer le filtre' : 'إلغاء التصفية'}
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
