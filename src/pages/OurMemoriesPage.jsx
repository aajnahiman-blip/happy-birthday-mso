import { Helmet } from 'react-helmet-async'
import { PageLayout } from '../components/common/Layout'
import { DedicationQuote } from '../components/common/DedicationQuote'
import { ReusableGallery } from '../components/gallery/ReusableGallery'
import { memoriesGallery } from '../data/galleryContent'
import { useLanguage } from '../contexts/LanguageContext'

export function OurMemoriesPage() {
  const { t } = useLanguage()

  return (
    <PageLayout titleKey="galleryTitle" descriptionKey="galleryDesc">
      <Helmet>
        <title>{t('galleryTitle')} | M♡S♡O</title>
        <meta name="description" content={t('galleryDesc')} />
      </Helmet>

      <div className="space-y-6">
        <DedicationQuote quoteKey="quoteGallery" />
        <ReusableGallery
          title={t('galleryTitle')}
          description={t('galleryDesc')}
          items={memoriesGallery}
          pageTitle={t('galleryTitle')}
          pageDescription={t('galleryDesc')}
        />
      </div>
    </PageLayout>
  )
}
