import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const handler = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        height: 2,
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #7C3AED, #2563EB)',
        zIndex: 9998,
        transition: 'width 0.1s',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}
