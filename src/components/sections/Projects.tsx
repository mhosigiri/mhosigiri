import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { EditorialSection } from './EditorialSection'

import { PROJECTS, type Category, type Project } from '../../data/portfolio'

type Filter = 'Highlights' | 'All' | Category

const FILTERS: Filter[] = ['Highlights', 'All', 'VR/XR', 'AI/ML', 'Full-Stack', 'Systems']

function ProjectItem({ project }: { project: Project }) {
  return (
    <li className="work-item">
      <p className="editorial-meta work-item__meta">
        <span>{project.category}</span>
        <time dateTime={project.year}>{project.year}</time>
      </p>
      <div>
        <h3 className="work-item__title">
          {project.link ? (
            <a href={project.link} target="_blank" rel="noreferrer">
              {project.title}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : project.title}
        </h3>
        <p className="editorial-meta">{project.subtitle}</p>
      </div>
      <p className="editorial-description">{project.description}</p>
      <p className="editorial-meta work-item__tools">{project.tags.join(' · ')}</p>
    </li>
  )
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Highlights')
  const projects = PROJECTS.filter((project) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Highlights') return project.featured
    return project.category === activeFilter
  })

  return (
    <EditorialSection id="projects" title="Selected work">
      <div className="work-filters" role="group" aria-label="Filter projects by category">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={filter === activeFilter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <ul className="work-grid" role="list" aria-label="Projects">
        {projects.map((project) => <ProjectItem key={project.id} project={project} />)}
      </ul>
    </EditorialSection>
  )
}
