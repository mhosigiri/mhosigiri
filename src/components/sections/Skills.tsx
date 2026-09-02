import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILL_CATEGORIES = [
  {
    label: 'Languages & Frameworks',
    skills: ['Python', 'Java', 'C#', 'JavaScript', 'TypeScript', 'SQL', 'Node.js', 'FastAPI', 'React', 'Next.js', 'Spring Boot', '.NET', 'C++', 'Unity XR Toolkit', 'Vue 3'],
  },
  {
    label: 'Cloud, APIs & Data',
    skills: ['AWS Cloud', 'AWS Lambda', 'Amazon S3', 'Amazon DynamoDB', 'Amazon EventBridge', 'Amazon ECS', 'Amazon Kinesis', 'Apache Kafka (Confluent)', 'REST APIs', 'SOAP APIs', 'XML', 'XSLT', 'XPath', 'JSON', 'ETL', 'Data Transformation', 'Google Cloud', 'Firebase'],
  },
  {
    label: 'AI / ML',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'LangChain', 'Gemini', 'YOLOv8', 'ChromaDB', 'Groq'],
  },
  {
    label: 'DevOps & Delivery',
    skills: ['Git', 'GitHub Actions', 'Docker', 'Linux', 'CI/CD', 'DevOps', 'DevSecOps', 'Software Testing', 'Automated Testing', 'Jira', 'Xray', 'Agile', 'Scaled Agile (SAFe)', 'Workday Integration Fundamentals', 'Tesseract OCR'],
  },
  {
    label: 'Networking',
    skills: ['TCP/IP', 'DNS', 'SSH', 'Layer 2/3', 'Cisco SD-WAN'],
  },
]

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="Skills section"
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        <div ref={titleRef} style={{ marginBottom: '2.5rem' }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="section-label"
            style={{ marginBottom: '0.75rem' }}
          >
            Skills
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ font: 'var(--font-title1)', fontFamily: 'var(--font-sans)', color: 'var(--color-text)' }}
          >
            Tech stack
          </motion.h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIdx * 0.08 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: '1.5rem',
                padding: '1.25rem 0',
                borderTop: '1px solid var(--color-border)',
                alignItems: 'start',
              }}
            >
              <span
                style={{
                  font: 'var(--font-label)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  paddingTop: 2,
                }}
              >
                {category.label}
              </span>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.25rem' }}>
                {category.skills.map(skill => (
                  <span
                    key={skill}
                    style={{
                      font: 'var(--font-small)',
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--color-text)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid var(--color-border)' }} />
        </div>
      </div>
    </section>
  )
}
