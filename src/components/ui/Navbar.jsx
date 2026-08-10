import { NavLink } from 'react-router-dom'
import { FaGlobe } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'

const navItems = [
  { to: '/home', labelKey: 'home' },

  { to: '/home/gallery', labelKey: 'gallery' },
  { to: '/home/our-photos', labelKey: 'photos' },
  { to: '/home/graduation', labelKey: 'graduation' },
  { to: '/home/umrah', labelKey: 'umrah' },
  { to: '/home/memory-book', labelKey: 'memoryBook' },
  { to: '/home/videos', labelKey: 'videos' },
  { to: '/home/letters', labelKey: 'letters' },
  // { to: '/home/final-surprise', labelKey: 'finalSurprise' },
]

export function Navbar() {
  const { t, language, toggleLanguage } = useLanguage()

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(6,7,11,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold tracking-wider text-[var(--accent)] hover:opacity-90 transition"
        >
          <span className="bg-gradient-to-r from-[#1E3A5F] via-[#1E3A5F] to-[#d4af37] bg-clip-text text-transparent">
            M♡S♡O 💎
          </span>
        </NavLink>

        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm transition duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#4166a7] to-[#1E3A5F] text-[#1E3A5F] shadow-[0_4px_16px_rgba(212,175,55,0.3)] font-bold'
                    : 'text-[var(--text-secondary)] hover:bg-[#1E3A5F] hover:text-[var(--text-primary)]'
                }`
              }
            >
              {t(item.labelKey)}
            </NavLink>
          ))}

          {/* Language Selector Button */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.12)] px-3 py-1.5 text-xs font-bold text-[#d4af37] hover:bg-[#9ab7e9] hover:text-[#06070b] transition duration-200"
            title="تغيير اللغة / Change Language"
          >
            <FaGlobe className="text-xs" />
            <span>{language === 'ar' ? 'English' : 'العربية'}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
