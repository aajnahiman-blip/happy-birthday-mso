import { Helmet } from 'react-helmet-async'
import { PageLayout } from '../components/common/Layout'
import { DedicationQuote } from '../components/common/DedicationQuote'
import { ReusableTimeline } from '../components/timeline/ReusableTimeline'
import { graduationMilestones } from '../data/timelineContent'
import { useLanguage } from '../contexts/LanguageContext'

export function GraduationPage() {
  const { t } = useLanguage()

  return (
    <PageLayout titleKey="graduationTitle" descriptionKey="graduationDesc">
      <Helmet>
        <title>{t('graduationTitle')} | M♡S♡O 💎</title>
        <meta name="description" content="Graduation timeline celebrating Mohamed Soufiane M♡S♡O 💎." />
      </Helmet>
      <div className="space-y-6">
        <DedicationQuote quoteKey="quoteGraduation" />
        <ReusableTimeline
        title={t('graduationTitle')}
        description={t('graduationDesc')}
        milestones={graduationMilestones}
        pageTitle={t('graduationTitle')}
        pageDescription={t('graduationDesc')}
      />
      </div>
    </PageLayout>
  )
}
