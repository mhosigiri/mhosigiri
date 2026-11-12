import { useCallback, useEffect, useRef } from 'react'
import { ArrowDown, ArrowDownRight } from 'lucide-react'
import { CoinScene } from '../three/CoinScene'
import { PROJECTS, ROLES } from '../../data/portfolio'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const chapters = [
  ...ROLES.map((role) => ({
    id: role.id,
    label: role.period ? `Experience · ${role.period}` : 'Experience',
    title: role.company,
    subtitle: role.role,
    description: role.details?.bullets[0],
  })),
  ...PROJECTS.filter((project) => project.featured).map((project) => ({
    id: project.id,
    label: `Project · ${project.year}`,
    title: project.title,
    subtitle: project.subtitle,
    description: project.description,
  })),
]

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const getProgress = useCallback(() => {
    const hero = heroRef.current
    const viewport = viewportRef.current
    if (!hero || !viewport) return 0

    const distance = hero.offsetHeight - viewport.offsetHeight
    if (distance <= 0) return 0

    const passed = viewport.getBoundingClientRect().top - hero.getBoundingClientRect().top
    return Math.min(1, Math.max(0, passed / distance))
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track || reduceMotion) return

    const columns = Array.from(track.querySelectorAll<HTMLElement>('.hero__chapter'))
    let layout: { column: HTMLElement; left: number; width: number }[] = []
    let width = 0
    let travel = 0
    let mobileStops: number[] = []
    let frame = 0

    const render = () => {
      frame = 0
      const progress = getProgress()
      let offset = travel * progress
      if (mobileStops.length > 1) {
        const position = progress * (mobileStops.length - 1)
        const index = Math.min(Math.floor(position), mobileStops.length - 2)
        const slide = Math.min(1, Math.max(0, (position - index - 0.16) / 0.68))
        const ease = slide * slide * (3 - 2 * slide)
        offset = mobileStops[index] + (mobileStops[index + 1] - mobileStops[index]) * ease
      }
      track.style.transform = `translate3d(${-offset}px, 0, 0)`
      viewport.style.setProperty('--intro-cue-opacity', String(Math.max(0, 1 - progress * 18)))

      for (const { column, left, width: columnWidth } of layout) {
        const entered = width * 0.86 - (left - offset)
        const reveal = Math.min(1, Math.max(0, entered / (columnWidth * 0.85)))
        column.style.setProperty('--chapter-reveal', String(reveal))
      }
    }

    const queueRender = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }

    const measure = () => {
      width = viewport.clientWidth
      travel = Math.max(0, track.scrollWidth - width)
      layout = columns.map((column) => ({ column, left: column.offsetLeft, width: column.offsetWidth }))
      mobileStops = width <= 640
        ? [0, ...layout.map(({ left, width: columnWidth }) => Math.min(travel, left - (width - columnWidth) / 2))]
        : []
      queueRender()
    }

    const resize = new ResizeObserver(measure)
    resize.observe(viewport)
    resize.observe(track)
    window.addEventListener('scroll', queueRender, { passive: true })
    measure()

    return () => {
      resize.disconnect()
      window.removeEventListener('scroll', queueRender)
      cancelAnimationFrame(frame)
      track.style.removeProperty('transform')
      viewport.style.removeProperty('--intro-cue-opacity')
    }
  }, [getProgress, reduceMotion])

  return (
    <section ref={heroRef} id="hero" className="hero" aria-labelledby="hero-title">
      <div ref={viewportRef} className="hero__viewport">
        <div ref={trackRef} className="hero__track">
          <div className="hero__intro">
            <h1 id="hero-title" className="hero__title">Anish KC</h1>
          </div>
          {chapters.map((chapter) => (
            <article key={chapter.id} className="hero__chapter" aria-hidden="true">
              <p className="hero__chapter-label">{chapter.label}</p>
              <h2>{chapter.title}</h2>
              {(chapter.subtitle || chapter.description) && (
                <div className="hero__chapter-copy">
                  {chapter.subtitle && <p>{chapter.subtitle}</p>}
                  {chapter.description && <p>{chapter.description}</p>}
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="hero__stage" aria-hidden="true">
          <CoinScene pointerTarget={viewportRef} getProgress={getProgress} />
        </div>

        <div className="hero__details">
          <p className="hero__description">
            VR/XR, AI &amp; systems
            <span>Computer Science · UT Arlington</span>
          </p>
          <span className="hero__scroll-cue">
            Scroll to explore <ArrowDown size={14} aria-hidden="true" />
          </span>
          <a className="hero__work-link" href="#projects">
            All projects
            <span className="hero__arrow" aria-hidden="true"><ArrowDownRight size={16} /></span>
          </a>
        </div>
      </div>
    </section>
  )
}
