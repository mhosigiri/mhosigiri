import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const DOMAINS = [
  { label: 'VR/XR',       desc: 'Unity · XR Toolkit · Motion Capture' },
  { label: 'AI/ML',       desc: 'PyTorch · RAG · Gemini · OCR' },
  { label: 'Full-Stack',  desc: 'React · FastAPI · Spring Boot' },
  { label: 'Networking',  desc: 'Cisco SD-WAN · Layer 2/3' },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="About section"
    >
      <div
        style={{
          maxWidth: 'var(--content-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(2.5rem, 6vw, 5rem)',
        }}
      >
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>About</p>
          <h2
            style={{
              font: 'var(--font-title1)',
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-text)',
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}
          >
            Building at the intersection<br />of VR, AI, and systems
          </h2>

          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.75 }}>
            I'm a Computer Science student at UT Arlington graduating December 2026,
            focused on VR/XR development, AI/ML pipelines, and full-stack engineering.
            I work at the Human Factors Lab building immersive training simulations and
            real-time telemetry systems.
          </p>
        </motion.div>

        {/* Right: domain list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ alignSelf: 'end' }}
        >
          {DOMAINS.map((domain, i) => (
            <div
              key={domain.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '1.125rem 0',
                borderTop: i === 0 ? '1px solid var(--color-border)' : undefined,
                borderBottom: '1px solid var(--color-border)',
                gap: '1.5rem',
              }}
            >
              <span
                style={{
                  font: 'var(--font-body)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  color: 'var(--color-text)',
                }}
              >
                {domain.label}
              </span>
              <span
                style={{
                  font: 'var(--font-small)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                  textAlign: 'right',
                }}
              >
                {domain.desc}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
