import { Helmet } from 'react-helmet-async'
import { PageLayout } from '../components/common/Layout'
import { DedicationQuote } from '../components/common/DedicationQuote'
import { ReusableTimeline } from '../components/timeline/ReusableTimeline'
import { umrahMilestones } from '../data/timelineContent'
import { useLanguage } from '../contexts/LanguageContext'

export function UmrahPage() {
  const { t } = useLanguage()

  return (
    <PageLayout titleKey="umrahTitle" descriptionKey="umrahDesc">
      <Helmet>
        <title>{t('umrahTitle')} | M♡S♡O 💎</title>
        <meta name="description" content="Umrah journey timeline of Mohamed Soufiane M♡S♡O 💎." />
      </Helmet>
      <div className="space-y-6">
        <DedicationQuote quoteKey="quoteUmrah" />
        <ReusableTimeline
          title={t('umrahTitle')}
          description={t('umrahDesc')}
          milestones={umrahMilestones}
          pageTitle={t('umrahTitle')}
          pageDescription={t('umrahDesc')}
        />
      </div>
    </PageLayout>
  )
}
