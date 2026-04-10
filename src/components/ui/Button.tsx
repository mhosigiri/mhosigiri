import type { ReactNode, CSSProperties } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  onClick?: () => void
  href?: string
  className?: string
  'aria-label'?: string
  style?: CSSProperties
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
  'aria-label': ariaLabel,
  style,
}: ButtonProps) {
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: variant === 'primary' ? '11px 22px' : '10px 20px',
    fontSize: '0.9375rem',
    fontWeight: 500,
    fontFamily: 'var(--font-sans)',
    letterSpacing: '0.01em',
    cursor: 'pointer',
    textDecoration: 'none',
    border: variant === 'ghost'
      ? '1px solid var(--color-border)'
      : '1px solid var(--color-text)',
    background: variant === 'primary'
      ? 'var(--color-text)'
      : 'transparent',
    color: variant === 'primary'
      ? 'var(--color-bg)'
      : 'var(--color-text)',
    borderRadius: 0,
    transition: 'opacity 0.15s, background 0.15s, color 0.15s',
    lineHeight: 1,
    ...style,
  }

  const hoverStyle = `
    .btn-primary:hover { opacity: 0.8; }
    .btn-ghost:hover { background: var(--color-surface); }
  `

  const cls = `${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`

  if (href) {
    return (
      <>
        <style>{hoverStyle}</style>
        <a href={href} style={base} className={cls} aria-label={ariaLabel}>
          {children}
        </a>
      </>
    )
  }

  return (
    <>
      <style>{hoverStyle}</style>
      <button style={base} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </button>
    </>
  )
}
