import { Helmet } from 'react-helmet-async'
import { PageLayout } from '../components/common/Layout'
import { LuxuryMemoryBook } from '../components/book/LuxuryMemoryBook'
import { luxuryMemoryBookPages } from '../data/memoryBookContent'
import { useLanguage } from '../contexts/LanguageContext'

export function MemoryBookPage() {
  const { t } = useLanguage()

  return (
    <PageLayout titleKey="memoryBookTitle" descriptionKey="memoryBookDesc">
      <Helmet>
        <title>{t('memoryBookTitle')} | M♡S♡O 💎</title>
        <meta name="description" content="Luxury memory book dedicated to Mohamed Soufiane M♡S♡O 💎." />
      </Helmet>

      <LuxuryMemoryBook
        title={t('memoryBookTitle')}
        description={t('memoryBookDesc')}
        pages={luxuryMemoryBookPages}
      />
    </PageLayout>
  )
}
