import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const currentPos = useRef({ x: -100, y: -100 })
  const isHovered = useRef(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = () => { isHovered.current = true }
    const onLeave = () => { isHovered.current = false }

    const interactables = 'a, button, [role="button"], input, textarea, select, [tabindex]'

    const addListeners = () => {
      document.querySelectorAll(interactables).forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    document.addEventListener('mousemove', onMove)
    addListeners()

    const animate = () => {
      currentPos.current.x += (posRef.current.x - currentPos.current.x) * 0.15
      currentPos.current.y += (posRef.current.y - currentPos.current.y) * 0.15

      const { x, y } = currentPos.current
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 6}px, ${y - 6}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${x - 18}px, ${y - 18}px)`
        ringRef.current.style.opacity = isHovered.current ? '1' : '0'
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 12, height: 12,
          borderRadius: '50%',
          background: '#7C3AED',
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'transform 0.02s',
          mixBlendMode: 'screen',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: '50%',
          border: '2px solid #7C3AED',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'opacity 0.2s',
          opacity: 0,
        }}
      />
    </>
  )
}
