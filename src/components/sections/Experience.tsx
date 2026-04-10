import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface Role {
  id: string
  company: string
  role: string
  period: string
  bullets: string[]
  tags: string[]
  badge?: string
}

const ROLES: Role[] = [
  {
    id: 'fifa',
    company: 'HBS / FIFA World Cup 2026',
    role: 'Network Operations Intern',
    period: 'Summer 2026',
    bullets: [
      'Supporting network operations for 2,500+ endpoints across live match venues',
      'Configuring and monitoring Cisco SD-WAN infrastructure for real-time broadcast',
      'Collaborating with international teams on Layer 2/3 network architecture',
      'Implementing redundancy protocols to ensure zero-downtime during match events',
    ],
    tags: ['Cisco SD-WAN', 'Layer 2/3', 'Enterprise Networking'],
    badge: 'Internship',
  },
  {
    id: 'hfl',
    company: 'Human Factors Lab · UTA',
    role: 'VR Developer & Research Assistant',
    period: 'May 2025 – Present',
    bullets: [
      'Developed VR de-escalation training for Fort Worth Police Department using Unity XR Toolkit',
      'Built real-time telemetry pipeline capturing officer biometrics and decision-making patterns',
      'Integrated motion capture system for realistic avatar animation in training scenarios',
      'Authored research on user performance metrics in immersive law enforcement simulations',
    ],
    tags: ['Unity', 'C#', 'Python', 'XR Toolkit', 'Motion Capture'],
    badge: 'Research',
  },
  {
    id: 'ai',
    company: 'AI & Automation Externship',
    role: 'AI/ML Extern',
    period: 'May – Jul 2025',
    bullets: [
      'Designed and implemented OCR pipeline for automated document digitization',
      'Built RAG pipeline for intelligent support routing, reducing response time by 50%',
      'Reduced cloud infrastructure costs 20% via architecture review and right-sizing',
    ],
    tags: ['OCR', 'RAG', 'Python', 'NLP', 'Cloud'],
    badge: 'Externship',
  },
]

function ExperienceRow({ role, index }: { role: Role; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <button
        onClick={() => setExpanded(v => !v)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          padding: '1.5rem 0',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '1.5rem',
          alignItems: 'start',
        }}
        aria-expanded={expanded}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
            <span
              style={{
                font: 'var(--font-body)',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                color: 'var(--color-text)',
              }}
            >
              {role.company}
            </span>
            {role.badge && (
              <span
                style={{
                  font: 'var(--font-label)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                  border: '1px solid var(--color-border)',
                  padding: '1px 7px',
                  letterSpacing: '0.06em',
                }}
              >
                {role.badge}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ font: 'var(--font-small)', fontFamily: 'var(--font-sans)', color: 'var(--color-text-muted)' }}>
              {role.role}
            </span>
            <span
              style={{
                font: 'var(--font-label)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.04em',
              }}
            >
              {role.period}
            </span>
          </div>
        </div>

        <div style={{ paddingTop: 4, color: 'var(--color-text-muted)' }}>
          {expanded ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: '1.5rem' }}>
              <ul style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {role.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      font: 'var(--font-small)',
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.65,
                    }}
                  >
                    <span style={{ color: 'var(--color-text)', flexShrink: 0, opacity: 0.4 }}>—</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {role.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      font: 'var(--font-label)',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-text-muted)',
                      padding: '2px 8px',
                      border: '1px solid var(--color-border)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Experience() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true })

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="Experience section"
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        <div ref={titleRef} style={{ marginBottom: '2.5rem' }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-label"
            style={{ marginBottom: '0.75rem' }}
          >
            Experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ font: 'var(--font-title1)', fontFamily: 'var(--font-sans)', color: 'var(--color-text)' }}
          >
            Where I've worked
          </motion.h2>
        </div>

        <div>
          {ROLES.map((role, i) => (
            <ExperienceRow key={role.id} role={role} index={i} />
          ))}
          <div style={{ borderTop: '1px solid var(--color-border)' }} />
        </div>
      </div>
    </section>
  )
}
