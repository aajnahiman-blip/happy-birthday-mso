import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaComment, FaHeart, FaPaperPlane, FaRegComment, FaRegHeart, FaRegImage } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'

export function MemoryInteractions({ photos, loading, onToggleLike, onAddComment }) {
  const { t, language } = useLanguage()
  const [activePhotoComments, setActivePhotoComments] = useState(null)
  const [authorName, setAuthorName] = useState('')
  const [commentText, setCommentText] = useState('')

  const handleCommentSubmit = async (e, photoId) => {
    e.preventDefault()
    if (!commentText.trim()) return

    await onAddComment(photoId, {
      author: authorName.trim() || (language === 'ar' ? 'مهنئ' : 'Visitor'),
      text: commentText.trim(),
    })
    setCommentText('')
  }

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="rounded-[1.8rem] border border-[rgba(212,175,55,0.2)] bg-[rgba(15,23,42,0.76)] p-6 shadow-[0_16px_40px_rgba(2,8,23,0.3)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.12)] text-[#d4af37]">
            <FaRegImage className="text-lg" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">{t('photoInteractions')}</h3>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)] sm:text-sm">
              {language === 'ar'
                ? 'أظهر محبتك! أعجب وعلق مباشرة على الصور والذكريات المميزة لمحمد سفيان M♡S♡O 💎.'
                : 'Show your love! Like and comment directly on cherished photos and milestone memories.'}
            </p>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-72 animate-pulse rounded-[1.8rem] border border-[rgba(212,175,55,0.15)] bg-[rgba(15,23,42,0.5)]" />
          ))}
        </div>
      ) : null}

      {/* Grid of Photo Cards */}
      {!loading && (
        <div className="grid gap-6 md:grid-cols-3">
          {photos.map((item) => {
            const isDrawerOpen = activePhotoComments === item.id

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-between overflow-hidden rounded-[1.8rem] border border-[rgba(212,175,55,0.2)] bg-[rgba(15,23,42,0.76)] shadow-[0_16px_40px_rgba(2,8,23,0.3)] backdrop-blur-xl transition duration-300 hover:border-[rgba(212,175,55,0.45)]"
              >
                <div>
                  {/* Photo Image */}
                  <div className="relative overflow-hidden h-48 w-full">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 ltr:left-3 rtl:right-3 rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(6,7,11,0.8)] px-3 py-1 text-[11px] font-bold text-[#d4af37] backdrop-blur-md">
                      {item.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h4 className="font-bold text-[var(--text-primary)] text-base">{item.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">{item.description}</p>
                  </div>
                </div>

                {/* Interactive Actions Footer */}
                <div className="p-4 pt-0 border-t border-[rgba(255,255,255,0.08)] mt-2">
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onToggleLike(item.id)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                        item.liked_by_user
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-[rgba(255,255,255,0.06)] text-[var(--text-secondary)] hover:bg-[rgba(212,175,55,0.12)] hover:text-[#d4af37]'
                      }`}
                    >
                      {item.liked_by_user ? (
                        <FaHeart className="text-rose-500 text-xs" />
                      ) : (
                        <FaRegHeart className="text-xs" />
                      )}
                      <span>
                        {item.likes_count} {language === 'ar' ? 'إعجاب' : 'Likes'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActivePhotoComments(isDrawerOpen ? null : item.id)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                        isDrawerOpen
                          ? 'bg-[rgba(212,175,55,0.2)] text-[#d4af37] border border-[rgba(212,175,55,0.3)]'
                          : 'bg-[rgba(255,255,255,0.06)] text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.12)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {isDrawerOpen ? <FaComment className="text-xs" /> : <FaRegComment className="text-xs" />}
                      <span>
                        {item.comments?.length ?? 0} {language === 'ar' ? 'تعليق' : 'Comments'}
                      </span>
                    </button>
                  </div>

                  {/* Photo Comments Drawer */}
                  <AnimatePresence>
                    {isDrawerOpen ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 overflow-hidden rounded-xl border border-[rgba(212,175,55,0.15)] bg-[rgba(6,7,11,0.6)] p-3 text-xs"
                      >
                        {/* Comments List */}
                        {item.comments && item.comments.length > 0 ? (
                          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                            {item.comments.map((comm) => (
                              <div key={comm.id} className="rounded-lg bg-[rgba(15,23,42,0.8)] p-2">
                                <div className="font-bold text-[#d4af37]">{comm.author}</div>
                                <p className="mt-0.5 text-[11px] text-[var(--text-secondary)]">{comm.text}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-[var(--text-muted)] text-center py-1">
                            {language === 'ar' ? 'لا توجد تعليقات بعد. اترك فكرة!' : 'No comments yet. Leave a thought!'}
                          </p>
                        )}

                        {/* Comment Form */}
                        <form
                          onSubmit={(e) => handleCommentSubmit(e, item.id)}
                          className="mt-2.5 pt-2 border-t border-[rgba(255,255,255,0.08)] space-y-1.5"
                        >
                          <input
                            type="text"
                            placeholder={language === 'ar' ? 'اسمك' : 'Your name'}
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(15,23,42,0.9)] px-2.5 py-1 text-[11px] text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#d4af37]"
                          />
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              placeholder={language === 'ar' ? 'أضف تعليقاً...' : 'Add a comment...'}
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              className="flex-1 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(15,23,42,0.9)] px-2.5 py-1 text-[11px] text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#d4af37]"
                            />
                            <button
                              type="submit"
                              disabled={!commentText.trim()}
                              className="rounded-lg bg-[rgba(212,175,55,0.2)] px-2.5 py-1 font-bold text-[#d4af37] border border-[rgba(212,175,55,0.3)] hover:bg-[#d4af37] hover:text-[#06070b] transition disabled:opacity-40"
                            >
                              <FaPaperPlane className="text-[10px]" />
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </section>
  )
}
