import { EditorialSection } from './EditorialSection'

const LINKS = [
  { label: 'Email', value: 'anishkc2004@gmail.com', href: 'mailto:anishkc2004@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/arniskc', href: 'https://linkedin.com/in/arniskc' },
  { label: 'GitHub', value: 'github.com/mhosigiri', href: 'https://github.com/mhosigiri' },
  { label: 'Phone', value: '+1 (682) 372-5303', href: 'tel:+16823725303' },
]

export function Contact() {
  return (
    <EditorialSection id="contact" title="Contact">
      <p className="editorial-lead">Open to internships, research collaborations, and project inquiries.</p>
      <ul className="editorial-rule-list contact-links" role="list">
        {LINKS.map((link) => (
          <li key={link.label}>
            <a className="contact-link" href={link.href}>
              <span>{link.label}</span>
              <span className="editorial-meta">{link.value}</span>
            </a>
          </li>
        ))}
      </ul>
    </EditorialSection>
  )
}
