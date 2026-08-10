import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

export function DedicationQuote({ quoteKey, customQuote }) {
  const { t } = useLanguage()
  const quoteText = quoteKey ? t(quoteKey) : customQuote

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-[2rem] border border-[rgba(226,232,240,0.12)] bg-[var(--surface)] p-6 shadow-md"
    >
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E2E8F0]" />
        <p className="text-xs uppercase tracking-[0.35em] text-[#E2E8F0] font-bold">
          {t('dedicationTitle')}
        </p>
      </div>

      <blockquote className="mt-3 text-xl font-bold leading-9 text-[var(--text-primary)] sm:text-2xl">
        “{quoteText}”
      </blockquote>

      <p className="mt-3 text-xs text-[#CBD5E1] font-semibold tracking-wide">
        {t('dedicationTo')}
      </p>
    </motion.section>
  )
}
