import { Helmet } from 'react-helmet-async'
import { PageLayout } from '../components/common/Layout'
import { ReusableGallery } from '../components/gallery/ReusableGallery'
import { photoGallery } from '../data/galleryContent'
import { useLanguage } from '../contexts/LanguageContext'

export function OurPhotosPage() {
  const { t } = useLanguage()

  return (
    <PageLayout titleKey="photosTitle" descriptionKey="photosDesc">
      <Helmet>
        <title>{t('photosTitle')} | M♡S♡O 💎</title>
        <meta name="description" content="Elegant photo gallery of Mohamed Soufiane M♡S♡O 💎." />
      </Helmet>
      <ReusableGallery
        title={t('photosTitle')}
        description={t('photosDesc')}
        items={photoGallery}
        pageTitle={t('photosTitle')}
        pageDescription={t('photosDesc')}
      />
    </PageLayout>
  )
}
