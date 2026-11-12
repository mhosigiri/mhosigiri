import { EditorialSection } from './EditorialSection'

const SKILL_CATEGORIES = [
  {
    label: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C#', 'Swift', 'Java', 'C++'],
  },
  {
    label: 'Web & data',
    skills: ['React', 'Next.js', 'FastAPI', 'Node.js', 'PostgreSQL', 'Supabase', 'PostGIS', 'SpacetimeDB', 'Redis'],
  },
  {
    label: 'AI & signal processing',
    skills: ['PyTorch', 'scikit-learn', 'OpenCV', 'YOLOv8', 'PP-OCR', 'NumPy', 'SciPy', 'librosa', 'LangChain', 'Gemini'],
  },
  {
    label: 'XR & mobile',
    skills: ['Unity', 'XR Interaction Toolkit', 'Three.js', 'React Three Fiber', 'Motion capture', 'SwiftUI'],
  },
  {
    label: 'Infrastructure',
    skills: ['Linux', 'Git', 'Docker', 'Google Cloud', 'Firebase', 'TCP/IP', 'Layer 2/3', 'Cisco SD-WAN'],
  },
]

export function Skills() {
  return (
    <EditorialSection id="skills" title="Skills">
      <dl className="editorial-rule-list">
        {SKILL_CATEGORIES.map(({ label, skills }) => (
          <div key={label} className="editorial-definition">
            <dt>{label}</dt>
            <dd className="editorial-description">{skills.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </EditorialSection>
  )
}
