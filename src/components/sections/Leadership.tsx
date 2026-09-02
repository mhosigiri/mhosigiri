import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface LeadershipRole {
  organization: string
  role: string
  bullets: string[]
}

const LEADERSHIP_ROLES: LeadershipRole[] = [
  {
    organization: 'HackUTA 2026',
    role: 'Director',
    bullets: [
      'Directing HackUTA 2026, an event selecting 800 hackers from 2,000+ applicants.',
      'Leading the planning and execution of the hackathon experience.',
    ],
  },
  {
    organization: 'CodePath',
    role: 'Peer Mentor',
    bullets: [
      'Mentoring peers as they build technical skills and navigate coursework.',
      'Providing feedback and support through collaborative learning sessions.',
    ],
  },
  {
    organization: 'Adobe',
    role: 'Student Ambassador',
    bullets: [
      'Representing Adobe on campus and connecting students with its creative and technical tools.',
      'Helping foster a student community around digital creativity and innovation.',
    ],
  },
]

export function Leadership() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      id="leadership"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="Leadership section"
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ marginBottom: '2.5rem' }}
        >
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>Leadership</p>
          <h2 style={{ font: 'var(--font-title1)', fontFamily: 'var(--font-sans)', color: 'var(--color-text)' }}>
            Communities I help lead
          </h2>
        </motion.div>

        <div>
          {LEADERSHIP_ROLES.map((leadership, index) => (
            <motion.article
              key={leadership.organization}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(180px, 0.6fr) 1fr',
                gap: '1.5rem',
                padding: '1.5rem 0',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <div>
                <p style={{ font: 'var(--font-body)', fontFamily: 'var(--font-sans)', fontWeight: 500, color: 'var(--color-text)' }}>
                  {leadership.organization}
                </p>
                <p style={{ font: 'var(--font-label)', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', letterSpacing: '0.04em' }}>
                  {leadership.role}
                </p>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 6, listStyle: 'none' }}>
                {leadership.bullets.map(bullet => (
                  <li
                    key={bullet}
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
            </motion.article>
          ))}
          <div style={{ borderTop: '1px solid var(--color-border)' }} />
        </div>
      </div>
    </section>
  )
}
