import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

export function LuxuryLetter({ letter }) {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mx-auto flex w-full max-w-3xl justify-center px-1 py-2 sm:px-2">
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        onClick={() => setIsOpen((current) => !current)}
        className="relative w-full max-w-[560px] text-left"
        aria-label={isOpen ? t('closeLetterAction') : t('openLetterAction')}
      >
        <motion.div
          animate={{ rotateX: isOpen ? -12 : 0, rotateZ: isOpen ? -4 : 0, y: isOpen ? -6 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[1.8rem] border border-[rgba(56,189,248,0.1)] bg-[linear-gradient(135deg,rgba(8,17,31,0.96),rgba(17,24,39,0.86))] p-3 shadow-[0_24px_70px_rgba(3,5,8,0.3)]"
        >
          <div className="relative overflow-hidden rounded-[1.3rem] border border-[rgba(29,78,216,0.08)] bg-[rgba(248,248,248,0.06)] p-4 sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(29,78,216,0.08),transparent_35%)]" />

            <div className="relative z-10">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">{t('loveLetterTag')}</p>
                  <h3 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">{letter.title}</h3>
                </div>
                <span className="rounded-full border border-[rgba(56,189,248,0.1)] bg-[rgba(17,24,39,0.88)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                  {letter.date}
                </span>
              </div>

              <div className="relative overflow-hidden rounded-[1.2rem] border border-[rgba(8,17,31,0.1)] bg-[rgba(248,248,248,0.95)] p-4 text-[#08111F] shadow-inner sm:p-6">
                <AnimatePresence mode="wait">
                  {!isOpen ? (
                    <motion.div
                      key="front"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex min-h-[220px] flex-col justify-center"
                    >
                      <div className="mx-auto flex w-full max-w-[360px] flex-col items-center rounded-[1.2rem] border border-[rgba(8,17,31,0.1)] bg-[linear-gradient(135deg,rgba(248,248,248,0.98),rgba(224,232,245,0.95))] p-6 text-center shadow-[0_12px_32px_rgba(8,17,31,0.06)]">
                        <div className="mb-4 h-12 w-24 rounded-full border border-[rgba(56,189,248,0.12)]" />
                        <p className="text-sm uppercase tracking-[0.35em] text-[#94A3B8]">{t('openLetter')}</p>
                        <p className="mt-3 text-sm leading-7 text-[#08111F]">{t('openLetterDesc')}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="letter"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="min-h-[220px]"
                    >
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                        className="font-['Cormorant_Garamond'] text-[1.05rem] leading-8 text-[#08111F] sm:text-[1.15rem]"
                      >
                        {letter.message}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="mt-6 text-sm uppercase tracking-[0.3em] text-[#94A3B8]"
                      >
                        {letter.signature}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.button>
    </div>
  )
}
