import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

type Category = 'All' | 'VR/XR' | 'AI/ML' | 'Full-Stack'

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  category: Exclude<Category, 'All'>
  link?: string
  year: string
}

const PROJECTS: Project[] = [
  {
    id: 'fwpd',
    title: 'FWPD VR De-Escalation',
    subtitle: 'Lead VR Developer · Motion Capture',
    description:
      'Immersive training simulation for Fort Worth Police Department — real-time biometric telemetry, motion-captured avatars, and branching scenario logic for de-escalation.',
    tags: ['Unity', 'C#', 'XR Toolkit', 'Python', 'Telemetry'],
    category: 'VR/XR',
    year: '2025',
  },
  {
    id: 'imse',
    title: 'Multiplayer 3D Hybrid Machine',
    subtitle: 'UTA IMSE Department',
    description:
      'Multi-user virtual manufacturing environment for industrial systems engineering research. Action logging, real-time sync, and performance analytics for engineering students.',
    tags: ['Unity', 'Multiplayer', 'C#', 'Manufacturing'],
    category: 'VR/XR',
    year: '2025',
  },
  {
    id: 'feedbackai',
    title: 'FeedBackAI',
    subtitle: 'feedbackai.us',
    description:
      'AI-powered support ticket routing and feedback analysis platform. NLP-driven categorization routes tickets to the right team automatically, cutting response time in half.',
    tags: ['Python', 'FastAPI', 'NLP', 'React'],
    category: 'AI/ML',
    link: 'https://feedbackai.us',
    year: '2025',
  },
  {
    id: 'docuextract',
    title: 'DocuExtract',
    subtitle: 'Mortgage Document Intelligence',
    description:
      'AI-powered document extraction system that lets users upload mortgage documents and instantly query them against official lending policies using RAG with LangChain and Gemini.',
    tags: ['FastAPI', 'Gemini', 'LangChain', 'ChromaDB', 'React'],
    category: 'AI/ML',
    link: 'https://github.com/mhosigiri/DocuExtract',
    year: '2025',
  },
  {
    id: 'gemini-alert',
    title: 'Gemini Alert',
    subtitle: 'Real-Time Emergency Platform',
    description:
      'Emergency platform where users broadcast distress signals and connect with nearby helpers on a live map. Integrates AI-powered guidance from Groq for crisis support.',
    tags: ['Vue 3', 'Flask', 'Firebase', 'Google Maps', 'Groq'],
    category: 'Full-Stack',
    link: 'https://github.com/mhosigiri/gemini-alert-app',
    year: '2025',
  },
  {
    id: 'chhayaai',
    title: 'ChhayaAI',
    subtitle: 'iOS Emergency Response App',
    description:
      'Native iOS emergency app — one-tap SOS, real-time operator tracking, and a multi-agent AI assistant that routes queries to specialized agents for intelligent crisis response.',
    tags: ['SwiftUI', 'Firebase', 'FastAPI', 'Groq', 'Google Maps'],
    category: 'Full-Stack',
    link: 'https://github.com/mhosigiri/ChhayaAI',
    year: '2026',
  },
  {
    id: 'trafficai',
    title: 'TrafficAI',
    subtitle: 'Computer Vision · Traffic Monitoring',
    description:
      'Traffic monitoring system using YOLOv8 for real-time violation detection — helmet infractions, lane violations, and license plate OCR. Supports live feeds and batch video.',
    tags: ['YOLOv8', 'OpenCV', 'Tesseract', 'Flask', 'PyTorch'],
    category: 'AI/ML',
    link: 'https://github.com/mhosigiri/TrafficAI',
    year: '2025',
  },
]

const CATEGORIES: Category[] = ['All', 'VR/XR', 'AI/ML', 'Full-Stack']

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '1.75rem 0',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '1.5rem',
        alignItems: 'start',
        cursor: project.link ? 'pointer' : 'default',
        transition: 'opacity 0.2s',
        opacity: hovered ? 1 : 0.85,
      }}
      onClick={() => project.link && window.open(project.link, '_blank', 'noopener')}
    >
      {/* Left: content */}
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <h3
            style={{
              font: 'var(--font-title2)',
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-text)',
              fontWeight: 500,
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              font: 'var(--font-small)',
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-text-muted)',
            }}
          >
            {project.subtitle}
          </span>
        </div>

        <p
          style={{
            font: 'var(--font-small)',
            fontFamily: 'var(--font-sans)',
            color: 'var(--color-text-muted)',
            maxWidth: 620,
            marginBottom: '1rem',
            lineHeight: 1.65,
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                font: 'var(--font-label)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-muted)',
                padding: '2px 8px',
                border: '1px solid var(--color-border)',
                letterSpacing: '0.04em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right: year + link icon */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 8,
          paddingTop: 2,
        }}
      >
        <span
          style={{
            font: 'var(--font-label)',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.06em',
          }}
        >
          {project.year}
        </span>
        {project.link && (
          <ArrowUpRight
            size={18}
            style={{
              color: 'var(--color-text)',
              opacity: hovered ? 1 : 0.3,
              transition: 'opacity 0.2s',
            }}
          />
        )}
      </div>
    </motion.div>
  )
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>('All')
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true })

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter)

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'var(--section-pad-y) var(--section-pad-x)',
      }}
      aria-label="Projects section"
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        {/* Header */}
        <div ref={titleRef} style={{ marginBottom: '2.5rem' }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="section-label"
            style={{ marginBottom: '0.75rem' }}
          >
            Projects
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <h2 style={{ font: 'var(--font-title1)', fontFamily: 'var(--font-sans)', color: 'var(--color-text)' }}>
              Selected work
            </h2>

            {/* Filter row */}
            <div
              style={{ display: 'flex', gap: 4 }}
              role="group"
              aria-label="Filter projects by category"
            >
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    background: 'none',
                    border: activeFilter === cat
                      ? '1px solid var(--color-text)'
                      : '1px solid var(--color-border)',
                    color: activeFilter === cat
                      ? 'var(--color-text)'
                      : 'var(--color-text-muted)',
                    fontSize: '0.8125rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: activeFilter === cat ? 500 : 400,
                    padding: '5px 14px',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    borderRadius: 0,
                    letterSpacing: '0.01em',
                  }}
                  aria-pressed={activeFilter === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Project rows */}
        <div>
          {filtered.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
          {/* Close last row */}
          <div style={{ borderTop: '1px solid var(--color-border)' }} />
        </div>
      </div>
    </section>
  )
}
