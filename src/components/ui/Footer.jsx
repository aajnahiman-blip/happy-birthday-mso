import { useLanguage } from '../../contexts/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-[var(--border)] bg-[rgba(3,5,8,0.94)] backdrop-blur-xl py-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-bold text-[#2563EB] tracking-wider">M♡S♡O 💎 | {t('fullName')}</p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">{t('footerCopy')}</p>
        </div>
        <div className="text-xs text-[var(--text-muted)]">
          {t('footerTitle')} © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  )
}
