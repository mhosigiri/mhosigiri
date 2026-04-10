import { motion, AnimatePresence } from 'framer-motion'

interface LoadingSplashProps {
  progress: number
  isComplete: boolean
}

export function LoadingSplash({ progress, isComplete }: LoadingSplashProps) {
  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#05050F',
            zIndex: 9000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              fontWeight: 700,
              color: '#7C3AED',
              letterSpacing: '-0.02em',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            AK
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: '"SF Mono", Menlo, monospace',
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
            }}
          >
            Initializing cosmos...
          </motion.p>
          <div style={{
            width: 200,
            height: 2,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 1,
            overflow: 'hidden',
          }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #7C3AED, #2563EB)',
                borderRadius: 1,
                width: `${progress}%`,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
