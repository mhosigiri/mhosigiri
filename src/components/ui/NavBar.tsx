import { useEffect, useState } from 'react'
import { ArrowUpRight, Moon, Sun } from 'lucide-react'

export function NavBar() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const ThemeIcon = theme === 'dark' ? Sun : Moon

  return (
    <header className="site-header">
      <a className="site-header__home" href="#top" aria-label="Anish KC home">AK</a>

      <nav className="site-header__nav" aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Work</a>
        <a className="site-header__contact" href="#contact">
          Contact <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </nav>

      <button
        className="site-header__theme"
        type="button"
        onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <ThemeIcon size={17} aria-hidden="true" />
      </button>
    </header>
  )
}
