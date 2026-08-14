import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCommentDots, FaGlobe, FaHeart, FaMagic, FaPenFancy, FaPhotoVideo } from 'react-icons/fa'
import { GuestBookForm } from './GuestBookForm'
import { GuestBookList } from './GuestBookList'
import { MemoryInteractions } from './MemoryInteractions'
import { DedicationQuote } from '../common/DedicationQuote'
import { useGuestBook } from '../../hooks/useGuestBook'
import { useMemoryInteractions } from '../../hooks/useMemoryInteractions'
import { useLanguage } from '../../contexts/LanguageContext'

export function GuestBookSection() {
  const { t, language, setLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState('wishes') // 'wishes' | 'photos'

  const {
    entries,
    loading,
    error,
    stats,
    name,
    message,
    selectedEmoji,
    errors,
    isSubmitting,
    isSuccess,
    successMessage,
    handleNameChange,
    handleMessageChange,
    appendEmoji,
    handleSubmit,
    handleToggleLike,
    handleAddComment,
    sortOrder,
    setSortOrder,
    searchQuery,
    setSearchQuery,
  } = useGuestBook()

  const {
    photos,
    loading: loadingPhotos,
    handleToggleLike: handleTogglePhotoLike,
    handleAddComment: handleAddPhotoComment,
  } = useMemoryInteractions()

  return (
    <section className="space-y-8 mt-24 mb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <DedicationQuote quoteKey="quoteGuestbook" />

      {/* Guestbook Section Header with AR/FR Language Switcher */}
      <div className="text-center mt-12">
        {/* AR / FR Only Language Selector for Guest Book */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 font-medium">
            <FaGlobe className="text-[#38BDF8] text-xs" />
            <span>{language === 'fr' ? 'Langue du livre d’or :' : 'لغة دفتر الزوار:'}</span>
          </span>
          <div className="flex items-center gap-1 rounded-full border border-[rgba(56,189,248,0.15)] bg-[rgba(3,5,8,0.7)] p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setLanguage('ar')}
              className={`rounded-full px-3 py-1 text-xs font-bold transition duration-200 ${
                language === 'ar'
                  ? 'bg-gradient-to-r from-[#1D4ED8] to-[#1e40af] text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              العربية
            </button>
            <button
              type="button"
              onClick={() => setLanguage('fr')}
              className={`rounded-full px-3 py-1 text-xs font-bold transition duration-200 ${
                language === 'fr'
                  ? 'bg-gradient-to-r from-[#1D4ED8] to-[#1e40af] text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              Français
            </button>
          </div>
        </div>

        <h2 className="text-3xl font-bold sm:text-4xl text-[var(--text-primary)]">
          {t('guestbookTitle')}
        </h2>
        <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)] sm:text-base max-w-2xl mx-auto">
          {t('guestbookDesc')}
        </p>
      </div>

      {/* Quick Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="grid grid-cols-3 gap-3 sm:gap-5"
      >
        <div className="flex flex-col items-center justify-center rounded-[1.6rem] border border-[rgba(56,189,248,0.12)] bg-[rgba(8,17,31,0.78)] p-3 text-center shadow-[0_12px_30px_rgba(3,5,8,0.35)] backdrop-blur-xl sm:p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(29,78,216,0.15)] text-[#38BDF8] text-sm sm:text-base">
            <FaMagic />
          </div>
          <span className="mt-2 text-lg font-bold text-[var(--text-primary)] sm:text-2xl lg:text-3xl">
            {stats.totalWishes}
          </span>
          <span className="text-[11px] font-medium tracking-wide uppercase text-[var(--text-secondary)] sm:text-xs">
            {t('wishesPosted')}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center rounded-[1.6rem] border border-[rgba(56,189,248,0.12)] bg-[rgba(8,17,31,0.78)] p-3 text-center shadow-[0_12px_30px_rgba(3,5,8,0.35)] backdrop-blur-xl sm:p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/15 text-sky-400 text-sm sm:text-base">
            <FaHeart />
          </div>
          <span className="mt-2 text-lg font-bold text-[var(--text-primary)] sm:text-2xl lg:text-3xl">
            {stats.totalLikes}
          </span>
          <span className="text-[11px] font-medium tracking-wide uppercase text-[var(--text-secondary)] sm:text-xs">
            {t('heartsShared')}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center rounded-[1.6rem] border border-[rgba(56,189,248,0.12)] bg-[rgba(8,17,31,0.78)] p-3 text-center shadow-[0_12px_30px_rgba(3,5,8,0.35)] backdrop-blur-xl sm:p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/15 text-[#38BDF8] text-sm sm:text-base">
            <FaCommentDots />
          </div>
          <span className="mt-2 text-lg font-bold text-[var(--text-primary)] sm:text-2xl lg:text-3xl">
            {stats.totalComments}
          </span>
          <span className="text-[11px] font-medium tracking-wide uppercase text-[var(--text-secondary)] sm:text-xs">
            {t('replies')}
          </span>
        </div>
      </motion.div>

      {/* Luxury Form Section */}
      <GuestBookForm
        name={name}
        message={message}
        selectedEmoji={selectedEmoji}
        errors={errors}
        isSubmitting={isSubmitting}
        isSuccess={isSuccess}
        successMessage={successMessage}
        onNameChange={handleNameChange}
        onMessageChange={handleMessageChange}
        onAppendEmoji={appendEmoji}
        onSubmit={handleSubmit}
      />

      {/* Navigation Tabs */}
      <div className="flex justify-center mt-12 mb-6">
        <div className="flex items-center gap-2 rounded-2xl border border-[rgba(56,189,248,0.15)] bg-[rgba(3,5,8,0.75)] p-1.5 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setActiveTab('wishes')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold sm:text-sm transition duration-200 ${
              activeTab === 'wishes'
                ? 'bg-gradient-to-r from-[#1D4ED8] to-[#1e40af] text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <FaPenFancy />
            <span>{t('wishesFeed')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold sm:text-sm transition duration-200 ${
              activeTab === 'photos'
                ? 'bg-gradient-to-r from-[#1D4ED8] to-[#1e40af] text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <FaPhotoVideo />
            <span>{t('photoInteractions')}</span>
          </button>
        </div>
      </div>

      {/* Tab Content Display */}
      {activeTab === 'wishes' ? (
        <GuestBookList
          entries={entries}
          loading={loading}
          error={error}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleLike={handleToggleLike}
          onAddComment={handleAddComment}
          totalCount={entries.length}
        />
      ) : (
        <MemoryInteractions
          photos={photos}
          loading={loadingPhotos}
          onToggleLike={handleTogglePhotoLike}
          onAddComment={handleAddPhotoComment}
        />
      )}
    </section>
  )
}
