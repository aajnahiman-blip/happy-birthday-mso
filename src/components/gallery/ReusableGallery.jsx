import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

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
                      <span className="text-sm text-[var(--text-muted)]">Loading image…</span>
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(2,8,23,0.92)] px-3 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur"
          >
            Close
          </button>
          <div className="w-full max-w-4xl rounded-[1.8rem] border border-[rgba(212,175,55,0.18)] bg-[rgba(15,23,42,0.95)] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.46)] sm:p-4">
            <img src={selectedImage.src} alt={selectedImage.title} className="max-h-[70vh] w-full rounded-[1.2rem] object-contain" />
            <div className="mt-4 px-2 pb-2">
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">{selectedImage.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
