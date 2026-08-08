import { useFavorites } from '../../contexts/FavoritesContext'
import { galleryItems } from '../../data/media'

export function GalleryGrid() {
  const { isFavorite, toggleFavorite } = useFavorites()

  return (
    <section className="grid gap-4 sm:grid-cols-2">
      {galleryItems.map((item) => (
        <article key={item.id} className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
          <img src={item.src} alt={item.alt} className="h-56 w-full object-cover sm:h-72" />
          <div className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{item.alt}</p>
            </div>
            <button
              type="button"
              onClick={() => toggleFavorite(item.id)}
              className={`rounded-full border px-3 py-2 text-sm ${
                isFavorite(item.id) ? 'border-[var(--accent)] bg-[var(--accent-soft)]' : 'border-[var(--border)]'
              }`}
            >
              {isFavorite(item.id) ? '★' : '☆'}
            </button>
          </div>
        </article>
      ))}
    </section>
  )
}
