import { NavBar }      from './components/ui/NavBar'
import { Hero }        from './components/sections/Hero'
import { FIFAMarquee } from './components/ui/FIFAMarquee'
import { About }       from './components/sections/About'
import { Experience }  from './components/sections/Experience'
import { Projects }    from './components/sections/Projects'
import { Skills }      from './components/sections/Skills'
import { Contact }     from './components/sections/Contact'

function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '2rem var(--section-pad-x) 3rem',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}
    >
      <span style={{ font: 'var(--font-small)', fontFamily: 'var(--font-sans)', color: 'var(--color-text-muted)' }}>
        Anish KC
      </span>
      <span style={{ font: 'var(--font-small)', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', letterSpacing: '0.04em' }}>
        Built with React · 2025
      </span>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <NavBar />

      <main id="main-content">
        <Hero />
        <FIFAMarquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
