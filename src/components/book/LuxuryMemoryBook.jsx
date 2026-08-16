import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

export function LuxuryMemoryBook({ pages, title, description }) {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)

  const currentPage = useMemo(() => pages[currentIndex], [pages, currentIndex])

  const goToPage = (nextIndex) => {
    if (isAnimating || nextIndex < 0 || nextIndex >= pages.length) {
      return
    }

    setDirection(nextIndex > currentIndex ? 1 : -1)
    setIsAnimating(true)
    setCurrentIndex(nextIndex)
  }

  return (
    <section className="rounded-[2rem] border border-[var(--border)] bg-[rgba(15,23,42,0.72)] p-4 shadow-[0_24px_70px_rgba(2,8,23,0.28)] backdrop-blur-xl sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-muted)]">{t('memoryBookTitle')}</p>
          <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">{title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">{description}</p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-full border border-[rgba(212,175,55,0.2)] bg-[rgba(28,37,57,0.86)] p-1 sm:self-auto">
          <button
            type="button"
            onClick={() => goToPage(currentIndex - 1)}
            disabled={currentIndex === 0 || isAnimating}
            className="rounded-full px-3 py-2 text-sm font-semibold text-[var(--text-primary)] transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t('previous')}
          </button>
          <span className="px-2 text-sm text-[var(--text-secondary)]">
            {currentIndex + 1}/{pages.length}
          </span>
          <button
            type="button"
            onClick={() => goToPage(currentIndex + 1)}
            disabled={currentIndex === pages.length - 1 || isAnimating}
            className="rounded-full bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-[#06070b] transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t('next')}
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[1.7rem] border border-[rgba(212,175,55,0.14)] bg-[linear-gradient(135deg,rgba(11,11,11,0.95),rgba(20,33,61,0.65))] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:p-4">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[820px] overflow-hidden rounded-[1.3rem] border border-[rgba(212,175,55,0.16)] bg-[rgba(28,37,57,0.9)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_50%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent)]" />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentPage.id}
              initial={{ rotateY: direction > 0 ? -115 : 115, opacity: 0.18, x: direction > 0 ? -18 : 18, scale: 0.98 }}
              animate={{ rotateY: 0, opacity: 1, x: 0, scale: 1 }}
              exit={{ rotateY: direction > 0 ? 115 : -115, opacity: 0.18, x: direction > 0 ? 18 : -18, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
              onAnimationComplete={() => setIsAnimating(false)}
              className="absolute inset-0"
            >
              <div className="grid h-full gap-4 p-4 sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
                <div className="relative overflow-hidden rounded-[1.2rem] border border-[rgba(212,175,55,0.16)] bg-[rgba(248,248,248,0.08)]">
                  <img
                    src={currentPage.image}
                    alt={currentPage.title}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 36vw"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center rounded-[1.2rem] border border-[rgba(212,175,55,0.16)] bg-[rgba(248,248,248,0.08)] p-4 shadow-inner sm:p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">{t('page')} {currentIndex + 1}</p>
                  <h4 className="mt-3 text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl">{currentPage.title}</h4>
                  <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)] sm:text-base">{currentPage.memory}</p>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
