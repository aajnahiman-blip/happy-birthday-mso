import { useLanguage } from '../../contexts/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-[rgba(226,232,240,0.12)] bg-[rgba(3,5,8,0.95)] backdrop-blur-xl py-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-[#E2E8F0] tracking-wider text-xs sm:text-sm">
              M♡S♡O | {t('fullName')}
            </p>
          </div>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">{t('footerCopy')}</p>
        </div>
        <div className="text-xs text-[var(--text-muted)]">
          {t('footerTitle')} © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  )
}
