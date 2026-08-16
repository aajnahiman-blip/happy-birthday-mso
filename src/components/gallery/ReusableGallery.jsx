import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../../contexts/LanguageContext'

function getAspectClass(aspect) {
  switch (aspect) {
    case 'portrait':
      return 'md:col-span-1 md:row-span-2'
    case 'landscape':
      return 'md:col-span-2'
    case 'square':
    default:
      return 'md:col-span-1'
  }
}

function getImageHeight(aspect) {
  switch (aspect) {
    case 'portrait':
      return 'h-72 md:h-96'
    case 'landscape':
      return 'h-60 md:h-72'
    case 'square':
    default:
      return 'h-64 md:h-72'
  }
}

export function ReusableGallery({ title, description, items, pageTitle, pageDescription }) {
  const { t } = useLanguage()
  const [selectedImage, setSelectedImage] = useState(null)
  const [loadedImages, setLoadedImages] = useState([])

  useEffect(() => {
    const imagePromises = items.map((item) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = item.src
        img.onload = () => resolve(item.src)
        img.onerror = () => resolve(item.src)
      })
    })

    Promise.all(imagePromises).then(() => {
      setLoadedImages(items.map((item) => item.src))
    })
  }, [items])

  const galleryItems = useMemo(() => items, [items])

  return (
    <div className="space-y-6">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-[2rem] border border-[var(--border)] bg-[rgba(15,23,42,0.72)] p-4 shadow-[0_24px_70px_rgba(2,8,23,0.28)] backdrop-blur-xl sm:p-6"
      >
        <div className="columns-1 gap-4 sm:columns-2 md:columns-3">
          {galleryItems.map((item, index) => {
            const isLoaded = loadedImages.includes(item.src)
            return (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                whileHover={{ y: -4, scale: 1.01 }}
                onClick={() => setSelectedImage(item)}
                className={`group mb-4 block w-full overflow-hidden rounded-[1.4rem] border border-[rgba(212,175,55,0.16)] bg-[rgba(28,37,57,0.8)] text-left shadow-[0_16px_40px_rgba(0,0,0,0.2)] backdrop-blur-sm ${getAspectClass(item.aspect)}`}
              >
                <div className="relative overflow-hidden">
                  {!isLoaded ? (
                    <div className={`flex items-center justify-center bg-[rgba(28,37,57,0.86)] ${getImageHeight(item.aspect)}`}>
                      <span className="text-sm text-[var(--text-muted)]">{t('loading')}</span>
                    </div>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className={`w-full object-cover transition duration-500 group-hover:scale-105 ${getImageHeight(item.aspect)}`}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
                <div className="p-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">{item.category}</p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{item.description}</p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.section>

      {selectedImage ? (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 md:p-8 select-none overflow-hidden max-w-full max-h-full">
          <div className="absolute top-4 right-4 z-[110] flex items-center justify-end">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="rounded-full border border-white/20 bg-black/60 hover:bg-black/90 px-4 py-2 text-xs md:text-sm font-semibold text-white transition backdrop-blur-md cursor-pointer"
            >
              {t('close')}
            </button>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full max-w-[100vw] max-h-[100vh] overflow-hidden p-2 mt-12 md:mt-0">
            <div className="relative flex flex-col items-center justify-center max-w-full max-h-full">
              <div className="relative flex items-center justify-center max-w-full max-h-[68vh] md:max-h-[75vh]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                />
              </div>
              <div className="mt-4 text-center max-w-2xl px-4">
                <h3 className="text-base md:text-lg font-bold text-[#F8F8F8] tracking-wide">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="mt-1.5 text-xs md:text-sm text-[#C0C0C0] leading-relaxed max-h-[12vh] overflow-y-auto pr-1">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
