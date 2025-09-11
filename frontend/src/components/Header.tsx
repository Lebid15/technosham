import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../state/theme'
import { useI18n } from '../state/i18n'

// Small utility icons
const ArrowDown = () => <span aria-hidden>▾</span>
const Hamburger = () => <span aria-hidden>☰</span>

// Click outside hook
function useClickOutside<T extends HTMLElement>(onOutside: () => void) {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        onOutside()
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [onOutside])
  return ref
}

export function Header() {
  const { pathname } = useLocation()
  const { theme, setTheme } = useTheme()
  const { t, lang, setLang, rtl } = useI18n()

  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({})

  // Close dropdowns on route change
  useEffect(() => {
    setOpenDropdown(null)
    setMobileOpen(false)
    setMobileExpanded({})
  }, [pathname])

  const containerRef = useClickOutside<HTMLDivElement>(() => {
    setOpenDropdown(null)
  })

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = mobileOpen ? 'hidden' : prev || ''
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  const items = useMemo(
    () => [
      { key: 'home', label: `🏠 ${t('home')}`, href: '/' },
      {
        key: 'services',
        label: `🛠️ ${t('services')}`,
        children: [
          { key: 'webdev', label: t('webdev'), href: '/services/web-development' },
          { key: 'design', label: t('design'), href: '/services/graphic-design' },
          { key: 'training', label: t('training'), href: '/services/training-courses' },
          { key: 'mobile', label: t('mobile'), href: '/services/mobile-apps' },
          { key: 'remote_it', label: t('remote_it'), href: '/services/remote-it-support' },
        ],
      },
      {
        key: 'products',
        label: `📦 ${t('products')}`,
        children: [
          { key: 'watan', label: t('watan'), href: '/products/watan' },
          { key: 'saas', label: t('saas'), href: '/products/saas-marketplace' },
          { key: 'courses', label: t('courses'), href: '/products/courses' },
        ],
      },
      { key: 'about', label: t('about'), href: '/about' },
      {
        key: 'settings',
        label: `⚙️ ${t('settings')}`,
        children: [
          { key: 'theme', label: `${t('theme')}: ${t(theme)}`, action: 'toggleTheme' as const },
          { key: 'language', label: `${t('language')}: ${lang.toUpperCase()}`, action: 'selectLang' as const },
        ],
      },
    ],
    [t, theme, lang]
  )

  const switchLang = (newLang: 'en' | 'ar' | 'tr') => setLang(newLang)
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  return (
    <div ref={containerRef} className={`header ${rtl ? 'rtl' : ''} ${theme}`}>
      {/* Overlay shading */}
      {mobileOpen && <div className="overlay" onClick={() => setMobileOpen(false)} />}

      <div className="bar">
        <Link to="/" className="brand">Technosham</Link>

        {/* Desktop nav */}
        <nav className="nav desktop">
          {items.map((it) => (
            <div key={it.key} className="nav-item">
              {it.children ? (
                <button
                  className="nav-link"
                  onClick={() => setOpenDropdown(openDropdown === it.key ? null : it.key)}
                  aria-expanded={openDropdown === it.key}
                >
                  <span>{it.label}</span> <ArrowDown />
                </button>
              ) : (
                <NavLink to={it.href!} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  {it.label}
                </NavLink>
              )}
              {it.children && (
                <div className={`dropdown ${openDropdown === it.key ? 'open' : ''}`} role="menu">
                  {it.key === 'settings' ? (
                    <div className="dropdown-content">
                      <button className="dropdown-item" onClick={toggleTheme}>{t('theme')} — {t(theme)}</button>
                      <div className="dropdown-item lang-row">
                        <span>{t('language')}</span>
                        <div className="lang-buttons">
                          {['en','ar','tr'].map(code => (
                            <button key={code} className={`chip ${lang===code ? 'selected' : ''}`} onClick={() => switchLang(code as any)}>
                              {code.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="dropdown-content">
                      {it.children.map((c) => (
                        <NavLink key={c.key} to={c.href!} className="dropdown-item">
                          {c.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button className="hamburger" aria-label="Menu" onClick={() => setMobileOpen(!mobileOpen)}>
          <Hamburger />
        </button>
      </div>

      {/* Mobile/Tablet drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        {items.map((it) => (
          <div key={it.key} className="m-item">
            {it.children ? (
              <button className="m-link" onClick={() => setMobileExpanded({ ...mobileExpanded, [it.key]: !mobileExpanded[it.key] })}>
                <span>{it.label}</span> <ArrowDown />
              </button>
            ) : (
              <NavLink to={it.href!} className="m-link" onClick={() => setMobileOpen(false)}>
                {it.label}
              </NavLink>
            )}
            {it.children && (
              <div className={`m-sub ${mobileExpanded[it.key] ? 'open' : ''}`}>
                {it.key === 'settings' ? (
                  <div className="m-sub-content">
                    <button className="m-sub-item" onClick={toggleTheme}>{t('theme')} — {t(theme)}</button>
                    <div className="m-sub-item lang-row">
                      <span>{t('language')}</span>
                      <div className="lang-buttons">
                        {['en','ar','tr'].map(code => (
                          <button key={code} className={`chip ${lang===code ? 'selected' : ''}`} onClick={() => switchLang(code as any)}>
                            {code.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="m-sub-content">
                    {it.children.map((c) => (
                      <NavLink key={c.key} to={c.href!} className="m-sub-item" onClick={() => setMobileOpen(false)}>
                        {c.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
