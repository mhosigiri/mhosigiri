import { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Contact',    href: '#contact' },
]

export function NavBar() {
  const { theme, toggle } = useTheme()
  const [active, setActive]     = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.4 }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        .nav-link {
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.9375rem;
          font-weight: 400;
          padding: 4px 0;
          transition: opacity 0.15s;
          letter-spacing: 0.005em;
        }
        .nav-link:hover { opacity: 0.5; }
        .nav-link.active {
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-thickness: 1px;
        }
        .mobile-link {
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: clamp(1.75rem, 7vw, 3rem);
          font-weight: 500;
          color: var(--color-text);
          padding: 0.5rem 0;
          transition: opacity 0.15s;
          text-align: left;
        }
        .mobile-link:hover { opacity: 0.4; }
      `}</style>

      {/* Desktop nav */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          height: scrolled ? 52 : 64,
          background: scrolled ? 'rgba(245,244,240,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : 'none',
          transition: 'height 0.3s, background 0.3s, border-color 0.3s',
        }}
        aria-label="Main navigation"
        className="hidden md:flex"
      >
        {/* Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            letterSpacing: '0.01em',
          }}
        >
          Anish KC
        </button>

        {/* Links + theme toggle */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className={`nav-link${active === link.href.slice(1) ? ' active' : ''}`}
              style={{ color: 'var(--color-text)' }}
              aria-label={link.label}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              background: 'none',
              border: '1px solid var(--color-border)',
              cursor: 'pointer',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 0,
              color: 'var(--color-text-muted)',
              fontSize: 14,
              transition: 'color 0.15s, border-color 0.15s',
              flexShrink: 0,
            }}
          >
            {theme === 'dark' ? '○' : '●'}
          </button>
        </div>
      </nav>

      {/* Mobile hamburger */}
      <div style={{ position: 'fixed', top: 16, right: 20, zIndex: 200 }} className="md:hidden">
        <button
          onClick={() => setMenuOpen(v => !v)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text)',
            fontSize: '0.875rem',
            fontWeight: 500,
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--color-bg)',
            zIndex: 150,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 clamp(1.5rem, 5vw, 3rem)',
            gap: 8,
          }}
        >
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="mobile-link"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
