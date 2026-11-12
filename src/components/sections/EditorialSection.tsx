import type { ReactNode } from 'react'
import './Editorial.css'

interface EditorialSectionProps {
  id: string
  title: string
  children: ReactNode
}

export function EditorialSection({ id, title, children }: EditorialSectionProps) {
  const headingId = id + '-heading'

  return (
    <section id={id} className="editorial-section" aria-labelledby={headingId}>
      <div className="editorial-section__layout">
        <h2 id={headingId} className="editorial-section__title">{title}</h2>
        <div className="editorial-section__body">{children}</div>
      </div>
    </section>
  )
}
