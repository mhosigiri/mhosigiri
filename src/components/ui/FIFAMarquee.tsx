import { motion } from 'framer-motion'

const FIFA_LOGO = (
  <img
    src="/fifa.png"
    alt="FIFA World Cup 2026"
    style={{
      height: '2.5em',
      width: 'auto',
      display: 'inline-block',
      verticalAlign: 'middle',
      objectFit: 'contain',
    }}
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
    <span>Network Operations Intern</span>
    <span style={{ opacity: 0.4, margin: '0 2.5rem' }}>•</span>
  </>
)

export function FIFAMarquee() {
  return (
    <section
      aria-label="FIFA World Cup 2026 announcement"
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
              duration: 20,
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
        @media (prefers-reduced-motion: reduce) {
          section[aria-label="FIFA World Cup 2026 announcement"] > div > div {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
