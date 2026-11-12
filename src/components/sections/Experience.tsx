import { EditorialSection } from './EditorialSection'

import { ROLES, type Role } from '../../data/portfolio'

function ExperienceEntry({ role }: { role: Role }) {
  const summary = (
    <>
      <span className="experience-entry__name">
        <span className="experience-entry__company">{role.company}</span>
        {role.role && <span className="editorial-meta">{role.role}</span>}
      </span>
      {role.period && <span className="editorial-meta experience-entry__period">{role.period}</span>}
    </>
  )

  if (!role.details) {
    return <div className="experience-entry experience-entry__summary">{summary}</div>
  }

  return (
    <details className="experience-entry">
      <summary className="experience-entry__summary">
        {summary}
        <span className="experience-entry__marker" aria-hidden="true" />
      </summary>
      <div className="experience-entry__body">
        <ul className="editorial-description">
          {role.details.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
        <p className="editorial-meta">{role.details.tags.join(' · ')}</p>
      </div>
    </details>
  )
}

export function Experience() {
  return (
    <EditorialSection id="experience" title="Experience">
      <div className="editorial-rule-list">
        {ROLES.map((role) => <ExperienceEntry key={role.id} role={role} />)}
      </div>
    </EditorialSection>
  )
}
