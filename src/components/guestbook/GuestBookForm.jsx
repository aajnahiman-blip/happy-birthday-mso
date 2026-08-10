import { AnimatePresence, motion } from 'framer-motion'
import { FaCheckCircle, FaMagic, FaPaperPlane, FaRegSmile, FaUser } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'

const QUICK_EMOJIS = ['🎉', '🎂', '✨', '❤️', '👑', '🥳', '🥂', '🎁', '💖', '🌟', '🍰', '💌']
const MAX_MESSAGE_LENGTH = 500

export function GuestBookForm({
  name,
  message,
  selectedEmoji,
  errors,
  isSubmitting,
  isSuccess,
  successMessage,
  onNameChange,
  onMessageChange,
  onAppendEmoji,
  onSubmit,
}) {
  const { t, language } = useLanguage()
  const charsRemaining = MAX_MESSAGE_LENGTH - message.length

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-[2.2rem] border border-[rgba(56,189,248,0.15)] bg-[rgba(8,17,31,0.85)] p-6 shadow-[0_24px_70px_rgba(3,5,8,0.45)] backdrop-blur-2xl sm:p-8"
    >
      {/* Background ambient radial light */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(29,78,216,0.15)_0%,transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(8,17,31,0.5)_0%,transparent_70%)] blur-2xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-2">
          <span className="flex h-8 items-center gap-2 rounded-full border border-[rgba(226,232,240,0.18)] bg-[rgba(29,78,216,0.12)] px-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#E2E8F0]">
            <span>M♡S♡O | {t('guestbook')}</span>
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl lg:text-4xl">
          {t('leaveWish')}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
          {language === 'ar'
            ? 'اكتب رسالة تهنئة، دعاء صادق، أو كلمة طيبة لمحمد سفيان M♡S♡O بمناسبة عيد ميلاده المبارك.'
            : 'Write a warm message, blessing, or memory to celebrate Mohamed Soufiane M♡S♡O.'}
        </p>

        {/* Success Banner */}
        <AnimatePresence>
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="mt-5 overflow-hidden rounded-2xl border border-[rgba(56,189,248,0.3)] bg-gradient-to-r from-[rgba(29,78,216,0.16)] via-[rgba(8,17,31,0.9)] to-[rgba(29,78,216,0.16)] p-4 shadow-[0_10px_30px_rgba(29,78,216,0.2)] backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#1D4ED8] to-[#38BDF8] text-white shadow-md">
                  <FaCheckCircle className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                    {language === 'ar' ? 'تم نشر التهنئة بنجاح!' : 'Wish Sent Successfully!'}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] sm:text-sm">{successMessage}</p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
          {/* Visitor Name Field */}
          <div>
            <label htmlFor="guestbook-name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              {t('yourName')} <span className="text-[#2563EB]">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-4 rtl:pr-4 text-[var(--text-muted)]">
                <FaUser className="text-sm text-[#2563EB]" />
              </div>
              <input
                id="guestbook-name"
                type="text"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder={language === 'ar' ? 'مثال: سارة م. / أبو أحمد' : 'e.g. Sarah M.'}
                maxLength={60}
                className={`w-full rounded-2xl border bg-[rgba(3,5,8,0.6)] py-3.5 ltr:pl-11 ltr:pr-4 rtl:pr-11 rtl:pl-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition duration-200 ${
                  errors.name
                    ? 'border-red-400/80 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                    : 'border-[rgba(56,189,248,0.15)] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/25'
                }`}
              />
            </div>
            {errors.name ? (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.name}
              </motion.p>
            ) : null}
          </div>

          {/* Birthday Message Field */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="guestbook-message" className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                {t('birthdayMessage')} <span className="text-[#2563EB]">*</span>
              </label>
              <span className={`text-xs ${charsRemaining < 50 ? 'text-amber-400 font-semibold' : 'text-[var(--text-muted)]'}`}>
                {charsRemaining} {language === 'ar' ? 'حرف متبقي' : 'characters left'}
              </span>
            </div>
            <div className="relative">
              <textarea
                id="guestbook-message"
                value={message}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                    onMessageChange(e.target.value)
                  }
                }}
                rows={4}
                placeholder={
                  language === 'ar'
                    ? 'اكتب أمنياتك ودعواتك الصادقة لمحمد سفيان بمناسبة عيد ميلاده...'
                    : 'Write your heartfelt birthday wishes, blessings, or favorite memories...'
                }
                className={`w-full rounded-2xl border bg-[rgba(3,5,8,0.6)] p-4 text-sm leading-relaxed text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition duration-200 ${
                  errors.message
                    ? 'border-red-400/80 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                    : 'border-[rgba(56,189,248,0.15)] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/25'
                }`}
              />
            </div>
            {errors.message ? (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.message}
              </motion.p>
            ) : null}
          </div>

          {/* Quick Emoji Bar */}
          <div>
            <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)]">
              <FaRegSmile className="text-[#2563EB]" /> {language === 'ar' ? 'رموز سريعة (اضغط للإضافة):' : 'Quick Emojis (tap to add):'}
            </div>
            <div className="flex flex-wrap gap-2">
              {QUICK_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => onAppendEmoji(emoji)}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border text-base transition-all duration-200 ${
                    selectedEmoji === emoji
                      ? 'border-[#2563EB] bg-[rgba(29,78,216,0.2)] shadow-[0_0_12px_rgba(29,78,216,0.3)]'
                      : 'border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] hover:border-[rgba(56,189,248,0.3)] hover:bg-[rgba(29,78,216,0.1)]'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Form Error Banner */}
          {errors.form ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
              {errors.form}
            </div>
          ) : null}

          {/* Submit Button */}
          <div className="pt-2">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#1D4ED8] px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(29,78,216,0.3)] transition duration-300 hover:shadow-[0_12px_36px_rgba(29,78,216,0.45)] disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>{language === 'ar' ? 'جاري نشر التهنئة…' : 'Publishing Wish…'}</span>
                </>
              ) : (
                <>
                  <FaPaperPlane className="text-xs" />
                  <span>{t('postWish')}</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.section>
  )
}
