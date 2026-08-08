import { Helmet } from 'react-helmet-async'
import { PageLayout } from '../components/common/Layout'
import { ReusableGallery } from '../components/gallery/ReusableGallery'
import { memoriesGallery } from '../data/galleryContent'
import { useLanguage } from '../contexts/LanguageContext'

export function OurMemoriesPage() {
  const { t } = useLanguage()

  return (
    <PageLayout titleKey="galleryTitle" descriptionKey="galleryDesc">
      <Helmet>
        <title>{t('galleryTitle')} | M♡S♡O 💎</title>
        <meta name="description" content="A luxury gallery of cherished memories celebrating Mohamed Soufiane M♡S♡O 💎." />
      </Helmet>
      <ReusableGallery
        title={t('galleryTitle')}
        description={t('galleryDesc')}
        items={memoriesGallery}
        pageTitle={t('galleryTitle')}
        pageDescription={t('galleryDesc')}
      />
    </PageLayout>
  )
}
