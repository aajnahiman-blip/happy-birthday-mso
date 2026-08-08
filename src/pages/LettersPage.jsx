import { Helmet } from 'react-helmet-async'
import { PageLayout } from '../components/common/Layout'
import { LuxuryLetter } from '../components/letters/LuxuryLetter'
import { friendshipLetters } from '../data/letterContent'
import { useLanguage } from '../contexts/LanguageContext'

export function LettersPage() {
  const { t, language } = useLanguage()

  return (
    <PageLayout titleKey="lettersTitle" descriptionKey="lettersDesc">
      <Helmet>
        <title>{t('lettersTitle')} | M♡S♡O 💎</title>
        <meta name="description" content="Romantic letters of love for Mohamed Soufiane M♡S♡O 💎." />
      </Helmet>

      <section className="rounded-[2rem] border border-[var(--border)] bg-[rgba(15,23,42,0.72)] p-4 shadow-[0_24px_70px_rgba(2,8,23,0.28)] backdrop-blur-xl sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37] font-bold">M♡S♡O 💎</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl text-[var(--text-primary)]">{t('lettersTitle')}</h2>
            <p className="mt-2 max-w-2xl text-xs leading-6 text-[var(--text-secondary)] sm:text-sm">
              {t('lettersDesc')}
            </p>
          </div>
          <div className="rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.12)] px-4 py-2 text-xs font-bold text-[#d4af37]">
            {friendshipLetters.length} {language === 'ar' ? 'رسائل خاصة' : 'Private notes'}
          </div>
        </div>

        <div className="space-y-4">
          {friendshipLetters.map((letter) => (
            <LuxuryLetter key={letter.id} letter={letter} />
          ))}
        </div>
      </section>
    </PageLayout>
  )
}
