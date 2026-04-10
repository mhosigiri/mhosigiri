import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export function GlassCard({ children, className = '', style, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={`glass-card ${className}`}
      style={{ padding: '1.5rem', ...style }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}
