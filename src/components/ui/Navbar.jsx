import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaGlobe, FaTimes } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'

const navItems = [
  { to: '/home', labelKey: 'home', end: true },
  { to: '/home/gallery', labelKey: 'gallery' },
  { to: '/home/our-photos', labelKey: 'photos' },
  { to: '/home/graduation', labelKey: 'graduation' },
  { to: '/home/umrah', labelKey: 'umrah' },
  { to: '/home/memory-book', labelKey: 'memoryBook' },
  { to: '/home/videos', labelKey: 'videos' },
  { to: '/home/letters', labelKey: 'letters' },
  // { to: '/home/final-surprise', labelKey: 'finalSurprise' },
]

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const panelVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
}

const linkVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.04 * i, duration: 0.2 },
  }),
}

export function Navbar() {
  const { t, language, toggleLanguage } = useLanguage()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('touchstart', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('touchstart', handleClick)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const toggle = useCallback(() => setIsOpen((v) => !v), [])

  const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-1.5 text-xs font-semibold transition duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-[#1D4ED8] to-[#1e40af] text-white shadow-[0_4px_16px_rgba(29,78,216,0.3)] font-bold'
        : 'text-[var(--text-secondary)] hover:bg-[rgba(29,78,216,0.15)] hover:text-[var(--text-primary)]'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `block w-full rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-[#1D4ED8] to-[#1e40af] text-white font-bold shadow-[inset_0_0_0_1px_rgba(56,189,248,0.2)]'
        : 'text-[var(--text-secondary)] hover:bg-[rgba(29,78,216,0.12)] hover:text-[var(--text-primary)]'
    }`

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(3,5,8,0.94)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="flex-shrink-0 flex items-center gap-2 text-base font-bold tracking-wider text-[var(--accent)] hover:opacity-90 transition sm:text-lg"
        >
          <span className="bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#38BDF8] bg-clip-text text-transparent">
            M♡S♡O 💎
          </span>
        </NavLink>

        <div className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={linkClass}
            >
              {t(item.labelKey)}
            </NavLink>
          ))}

          <button
            type="button"
            onClick={toggleLanguage}
            className="ms-1 flex items-center gap-1.5 rounded-full border border-[rgba(56,189,248,0.2)] bg-[rgba(29,78,216,0.1)] px-3 py-1.5 text-xs font-bold text-[#38BDF8] hover:bg-[rgba(29,78,216,0.22)] transition duration-200"
            title="تغيير اللغة / Change Language"
          >
            <FaGlobe className="text-[10px]" />
            <span>{language === 'ar' ? 'EN' : 'عر'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1 rounded-full border border-[rgba(56,189,248,0.15)] bg-[rgba(29,78,216,0.08)] px-2.5 py-1.5 text-[11px] font-bold text-[#38BDF8] transition"
            title="تغيير اللغة / Change Language"
          >
            <FaGlobe className="text-[10px]" />
            <span>{language === 'ar' ? 'EN' : 'عر'}</span>
          </button>

          <button
            ref={buttonRef}
            type="button"
            onClick={toggle}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(56,189,248,0.15)] bg-[rgba(8,17,31,0.7)] text-[var(--text-primary)] transition hover:border-[rgba(56,189,248,0.3)] hover:bg-[rgba(29,78,216,0.15)] active:scale-95"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <FaTimes className="text-base text-[#38BDF8]" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <FaBars className="text-base" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[calc(var(--navbar-h,52px))] z-40 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              key="panel"
              ref={menuRef}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-x-0 top-full z-50 mx-3 mt-1.5 overflow-hidden rounded-2xl border border-[rgba(56,189,248,0.1)] bg-[rgba(3,5,8,0.97)] shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl lg:hidden"
            >
              <div className="max-h-[70vh] overflow-y-auto overscroll-contain p-3">
                <div className="space-y-0.5">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.to}
                      custom={i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <NavLink
                        to={item.to}
                        end={item.end}
                        className={mobileLinkClass}
                        onClick={() => setIsOpen(false)}
                      >
                        {t(item.labelKey)}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                <div className="my-3 h-px bg-gradient-to-r from-transparent via-[rgba(56,189,248,0.15)] to-transparent" />

                <p className="text-center text-[10px] tracking-widest text-[var(--text-secondary)] opacity-50 uppercase font-semibold pb-1">
                  M♡S♡O 💎
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
