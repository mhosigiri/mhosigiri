import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { CoinScene } from '../three/CoinScene'

const ROLES = [
  'VR/XR Developer',
  'AI Engineer',
  'Full-Stack Builder',
  'Network Ops · FIFA WC 2026',
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [nudge, setNudge]       = useState({ x: 0, y: 0 })
  const [exitRatio, setExitRatio] = useState(0)

  useEffect(() => {
    let pointerX = 0
    let pointerY = 0

    const onPointer = (e: PointerEvent) => {
      pointerX = e.clientX
      pointerY = e.clientY
      const nx = (pointerX / window.innerWidth  - 0.5) * 2
      const ny = (pointerY / window.innerHeight - 0.5) * 2
      setNudge({ x: nx, y: ny })
    }

    const onScroll = () => {
      if (!sectionRef.current) return
      const rect   = sectionRef.current.getBoundingClientRect()
      const height = sectionRef.current.offsetHeight
      // start blurring once the bottom 30% of the hero is scrolling off
      const ratio  = Math.min(Math.max(-rect.bottom / (height * 0.3), 0), 1)
      setExitRatio(ratio)
    }

    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll',      onScroll,  { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll',      onScroll)
    }
  }, [])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        overflow: 'hidden', // clips canvas to hero bounds
      }}
      aria-label="Hero section"
    >
      {/* 3D Coin — absolutely fills the hero, scrolls away with it */}
      <CoinScene nudge={nudge} exitRatio={exitRatio} />

      {/* Text content above the coin */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 'var(--content-max)', margin: '0 auto', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0.2, 1] }}
        >
          <h1
            style={{
              font: 'var(--font-display)',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.03em',
              color: 'var(--color-text)',
              lineHeight: 0.9,
              marginBottom: '2.5rem',
            }}
          >
            Anish KC
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '2rem',
            borderTop: '1px solid var(--color-border)',
            paddingTop: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.5rem' }}>
            {ROLES.map(role => (
              <span
                key={role}
                style={{ font: 'var(--font-small)', fontFamily: 'var(--font-sans)', color: 'var(--color-text-muted)' }}
              >
                {role}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={scrollToProjects} aria-label="View my work">
              View Work <ArrowDownRight size={15} />
            </Button>
            <Button variant="ghost" href="/resume.pdf" aria-label="Download resume">
              Resume
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Context annotation */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          position: 'absolute',
          top: 'clamp(5.5rem, 8vw, 7rem)',
          right: 'var(--section-pad-x)',
          font: 'var(--font-label)',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          textAlign: 'right',
          lineHeight: 1.8,
          zIndex: 2,
        }}
      >
        CS @ UT Arlington<br />
        Graduating Dec 2026
      </motion.p>
    </section>
  )
}
