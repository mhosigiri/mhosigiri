import { motion } from 'framer-motion'

const LOGO_STYLE = {
  height: '2.5em',
  width: 'auto',
  display: 'inline-block',
  verticalAlign: 'middle',
  objectFit: 'contain',
} as const

const FIFA_LOGO = (
  <img
    src="/fifa.png"
    alt="FIFA World Cup 2026"
    style={LOGO_STYLE}
  />
)

const CORNELL_TECH_LOGO = (
  <img
    src="/cornell-tech.png"
    alt="Cornell Tech"
    style={LOGO_STYLE}
  />
)

const HARVEY_LOGO = (
  <img
    src="/harvey.png"
    alt="Harvey"
    className="harvey-logo"
    style={{ ...LOGO_STYLE, height: '1.8em' }}
  />
)

const MARQUEE_CONTENT = (
  <>
    <span style={{ fontWeight: 600 }}>Summer 2026</span>
    <span style={{ opacity: 0.4, margin: '0 1.25rem' }}>•</span>
    {FIFA_LOGO}
    <span style={{ opacity: 0.4, margin: '0 1.25rem' }}>•</span>
    <span style={{ fontWeight: 600 }}>FIFA World Cup 2026</span>
    <span style={{ opacity: 0.4, margin: '0 1.25rem' }}>•</span>
    <span>HBS FIFA Programme Intern</span>
    <span style={{ opacity: 0.4, margin: '0 1.25rem' }}>•</span>
    {CORNELL_TECH_LOGO}
    <span style={{ opacity: 0.4, margin: '0 1.25rem' }}>•</span>
    <span style={{ fontWeight: 600 }}>Cornell Tech</span>
    <span style={{ opacity: 0.4, margin: '0 1.25rem' }}>•</span>
    <span>Break Through Tech AI ML Fellow</span>
    <span style={{ opacity: 0.4, margin: '0 1.25rem' }}>•</span>
    {HARVEY_LOGO}
    <span style={{ opacity: 0.4, margin: '0 1.25rem' }}>•</span>
    <span style={{ fontWeight: 600 }}>Harvey</span>
    <span style={{ opacity: 0.4, margin: '0 1.25rem' }}>•</span>
    <span>Machine Learning Fellow</span>
    <span style={{ opacity: 0.4, margin: '0 2.5rem' }}>•</span>
  </>
)

export function FIFAMarquee() {
  return (
    <section
      aria-label="Experience highlights"
      style={{
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          padding: '1rem 0',
        }}
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 32,
              ease: 'linear',
            },
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            font: 'var(--font-body)',
            fontFamily: 'var(--font-sans)',
            color: 'var(--color-text)',
            gap: 0,
          }}
        >
          {MARQUEE_CONTENT}
          {MARQUEE_CONTENT}
          {MARQUEE_CONTENT}
          {MARQUEE_CONTENT}
        </motion.div>
      </div>

      <style>{`
        [data-theme="dark"] .harvey-logo { filter: invert(1); }

        @media (prefers-reduced-motion: reduce) {
          section[aria-label="Experience highlights"] > div > div {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
