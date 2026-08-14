import { motion } from 'framer-motion'
import { FaComment, FaHeart, FaRegImage } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'

export function MemoryInteractions({ photos, loading }) {
  const { t, language } = useLanguage()

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="rounded-[1.8rem] border border-[rgba(56,189,248,0.12)] bg-[rgba(8,17,31,0.78)] p-6 shadow-[0_16px_40px_rgba(3,5,8,0.35)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[rgba(56,189,248,0.15)] bg-[rgba(29,78,216,0.12)] text-[#38BDF8]">
            <FaRegImage className="text-lg" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">{t('photoInteractions')}</h3>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)] sm:text-sm">
              {language === 'fr'
                ? 'Photos et souvenirs précieux de Mohamed Soufiane M♡S♡O.'
                : 'صور وذكريات مميزة وخالدة لمحمد سفيان M♡S♡O.'}
            </p>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-72 animate-pulse rounded-[1.8rem] border border-[rgba(56,189,248,0.1)] bg-[rgba(8,17,31,0.5)]" />
          ))}
        </div>
      ) : null}

      {/* Grid of Photo Cards (Read-Only & Full Original Aspect Ratio) */}
      {!loading && (
        <div className="grid gap-6 md:grid-cols-3 items-start">
          {photos.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-between overflow-hidden rounded-[1.8rem] border border-[rgba(56,189,248,0.12)] bg-[rgba(8,17,31,0.78)] shadow-[0_16px_40px_rgba(3,5,8,0.35)] backdrop-blur-xl transition duration-300 hover:border-[rgba(56,189,248,0.3)]"
            >
              <div>
                {/* Photo Image Container (Uncropped, Natural Aspect Ratio) */}
                <div className="relative overflow-hidden w-full bg-[rgba(3,5,8,0.6)] p-2 flex items-center justify-center min-h-[220px]">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="max-h-72 w-full object-contain rounded-xl transition duration-500 hover:scale-[1.02]"
                  />
                  <div className="absolute top-3 ltr:left-3 rtl:right-3 rounded-full border border-[rgba(56,189,248,0.15)] bg-[rgba(3,5,8,0.85)] px-3 py-1 text-[11px] font-bold text-[#38BDF8] backdrop-blur-md">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="font-bold text-[var(--text-primary)] text-base">{item.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">{item.description}</p>
                </div>
              </div>

              {/* Static Badges Footer */}
              <div className="p-4 pt-0 border-t border-[rgba(255,255,255,0.08)] mt-2">
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-sky-400">
                    <FaHeart className="text-xs" />
                    <span>{item.likes_count}</span>
                  </div>

                  {item.comments && item.comments.length > 0 ? (
                    <div className="flex items-center gap-1.5 rounded-full border border-[rgba(56,189,248,0.15)] bg-[rgba(29,78,216,0.1)] px-3 py-1 text-xs font-bold text-[#38BDF8]">
                      <FaComment className="text-xs" />
                      <span>{item.comments.length}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
