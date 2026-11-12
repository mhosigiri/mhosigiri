import { EditorialSection } from './EditorialSection'

const DOMAINS = [
  { label: 'VR/XR',       desc: 'Unity · XR Toolkit · Motion Capture' },
  { label: 'AI/ML',       desc: 'PyTorch · RAG · Gemini · OCR' },
  { label: 'Full-Stack',  desc: 'React · FastAPI · Spring Boot' },
  { label: 'Networking',  desc: 'Cisco SD-WAN · Layer 2/3' },
]

export function About() {
  return (
    <EditorialSection id="about" title="About">
      <p className="editorial-lead">
        I develop immersive training simulations and real-time telemetry at UT Arlington's
        Human Factors Lab. I'm studying computer science and expect to graduate in December 2026.
      </p>
      <dl className="editorial-rule-list">
        {DOMAINS.map(({ label, desc }) => (
          <div key={label} className="editorial-definition">
            <dt>{label}</dt>
            <dd className="editorial-meta">{desc}</dd>
          </div>
        ))}
      </dl>
    </EditorialSection>
  )
}
