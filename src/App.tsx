import { NavBar } from './components/ui/NavBar'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Experience } from './components/sections/Experience'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Contact } from './components/sections/Contact'
import './App.css'

export default function App() {
  return (
    <div id="top" className="portfolio">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <NavBar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <span>Anish KC</span>
          <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </div>
  )
}
