import { Helmet } from 'react-helmet-async'
import { PageLayout } from '../components/common/Layout'
import { DedicationQuote } from '../components/common/DedicationQuote'
import { LuxuryLetter } from '../components/letters/LuxuryLetter'
import { friendshipLetters } from '../data/letterContent'
import { useLanguage } from '../contexts/LanguageContext'

export function LettersPage() {
  const { t, language } = useLanguage()

  return (
    <PageLayout titleKey="lettersTitle" descriptionKey="lettersDesc">
      <Helmet>
        <title>{t('lettersTitle')} | M♡S♡O</title>
        <meta name="description" content={t('lettersDesc')} />
      </Helmet>

      <div className="space-y-6">
        <DedicationQuote quoteKey="quoteLetters" />

        <section className="rounded-[2rem] border border-[rgba(226,232,240,0.12)] bg-[rgba(8,17,31,0.78)] p-4 shadow-[0_24px_70px_rgba(3,5,8,0.38)] backdrop-blur-xl sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#E2E8F0] font-bold">M♡S♡O</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl text-[var(--text-primary)]">{t('lettersTitle')}</h2>
            <p className="mt-2 max-w-2xl text-xs leading-6 text-[var(--text-secondary)] sm:text-sm">
              {t('lettersDesc')}
            </p>
          </div>
          <div className="rounded-full border border-[rgba(29,78,216,0.2)] bg-[rgba(29,78,216,0.1)] px-4 py-2 text-xs font-bold text-[#38BDF8]">
            {friendshipLetters.length} {t('privateNotes')}
          </div>
        </div>

        <div className="space-y-4">
          {friendshipLetters.map((letter) => (
            <LuxuryLetter key={letter.id} letter={letter} />
          ))}
        </div>
      </section>
      </div>
    </PageLayout>
  )
}
