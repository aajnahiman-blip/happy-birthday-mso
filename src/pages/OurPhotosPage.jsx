import { Helmet } from 'react-helmet-async'
import { PageLayout } from '../components/common/Layout'
import { DedicationQuote } from '../components/common/DedicationQuote'
import { ReusableGallery } from '../components/gallery/ReusableGallery'
import { photoGallery } from '../data/galleryContent'
import { useLanguage } from '../contexts/LanguageContext'

export function OurPhotosPage() {
  const { t } = useLanguage()

  return (
    <PageLayout titleKey="photosTitle" descriptionKey="photosDesc">
      <Helmet>
        <title>{t('photosTitle')} | M♡S♡O</title>
        <meta name="description" content="Elegant photo gallery of Mohamed Soufiane M♡S♡O." />
      </Helmet>

      <div className="space-y-6">
        <DedicationQuote quoteKey="quotePhotos" />
        <ReusableGallery
          title={t('photosTitle')}
          description={t('photosDesc')}
          items={photoGallery}
          pageTitle={t('photosTitle')}
          pageDescription={t('photosDesc')}
        />
      </div>
    </PageLayout>
  )
}
