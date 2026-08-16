import { Helmet } from 'react-helmet-async'
import { PageLayout } from '../components/common/Layout'
import { DedicationQuote } from '../components/common/DedicationQuote'
import { LuxuryMemoryBook } from '../components/book/LuxuryMemoryBook'
import { luxuryMemoryBookPages } from '../data/memoryBookContent'
import { useLanguage } from '../contexts/LanguageContext'

export function MemoryBookPage() {
  const { t } = useLanguage()

  return (
    <PageLayout titleKey="memoryBookTitle" descriptionKey="memoryBookDesc">
      <Helmet>
        <title>{t('memoryBookTitle')} | M♡S♡O</title>
        <meta name="description" content={t('memoryBookDesc')} />
      </Helmet>
      <div className="space-y-6">
        <DedicationQuote quoteKey="quoteMemoryBook" />
        <LuxuryMemoryBook
          title={t('memoryBookTitle')}
          description={t('memoryBookDesc')}
          pages={luxuryMemoryBookPages}
        />
      </div>
    </PageLayout>
  )
}
