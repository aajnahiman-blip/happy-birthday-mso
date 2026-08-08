import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

export function ReusableTimeline({ title, description, milestones, pageTitle, pageDescription }) {
  return (
    <div className="space-y-6">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-muted)]">Our Story</p>
        <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-8 text-[var(--text-secondary)] sm:text-base">{description}</p>
      </motion.section>

      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <motion.article
            key={milestone.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className="overflow-hidden rounded-[1.6rem] border border-white/20 bg-[var(--surface)] shadow-[0_16px_45px_rgba(0,0,0,0.08)] backdrop-blur-sm"
          >
            <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
              <div className="overflow-hidden">
                <img src={milestone.image} alt={milestone.title} className="h-56 w-full object-cover md:h-full" loading="lazy" />
              </div>
              <div className="p-5 sm:p-6">
                {milestone.date ? (
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">{milestone.date}</p>
                ) : null}
                <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">{milestone.title}</h3>
                <p className="mt-3 text-sm leading-8 text-[var(--text-secondary)]">{milestone.story}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
