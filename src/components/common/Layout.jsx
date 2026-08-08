import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

export function PageLayout({ children, title, description, titleKey, descriptionKey }) {
  const { t } = useLanguage()

  const displayTitle = titleKey ? t(titleKey) : title
  const displayDescription = descriptionKey ? t(descriptionKey) : description

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-transparent text-[var(--text-primary)] transition-colors duration-300">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-[1.8rem] border border-[var(--border)] bg-[rgba(15,23,42,0.78)] p-6 shadow-[0_24px_70px_rgba(2,8,23,0.38)] backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.14),transparent_40%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent)]" />
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#d4af37]">M♡S♡O 💎 | {t('fullName')}</p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl text-[var(--text-primary)]">{displayTitle}</h1>
            <p className="mt-2.5 max-w-2xl text-xs leading-6 text-[var(--text-secondary)] sm:text-sm">
              {displayDescription}
            </p>
          </div>
        </motion.section>

        {children}
      </main>
    </div>
  )
}
