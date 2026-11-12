export interface Role {
  id: string
  company: string
  role?: string
  period?: string
  details?: {
    bullets: string[]
    tags: string[]
  }
}

export const ROLES: Role[] = [
  {
    id: 'harvey',
    company: 'Harvey',
    period: 'Aug – Dec 2026',
  },
  {
    id: 'fifa',
    company: 'HBS / FIFA World Cup 2026',
    role: 'Network Operations Intern',
    period: 'Summer 2026',
    details: {
      bullets: [
        'Supporting network operations for 2,500+ endpoints across live match venues',
        'Configuring and monitoring Cisco SD-WAN infrastructure for real-time broadcast',
        'Collaborating with international teams on Layer 2/3 network architecture',
        'Implementing redundancy protocols to ensure zero-downtime during match events',
      ],
      tags: ['Cisco SD-WAN', 'Layer 2/3', 'Enterprise Networking'],
    },
  },
  {
    id: 'break-through-tech',
    company: 'Break Through Tech',
    role: 'AI/ML Program',
    period: 'May 2026 – May 2027',
  },
  {
    id: 'hackuta',
    company: 'HackUTA',
    role: 'Director',
    period: 'Mar – Nov 2026',
  },
  {
    id: 'dkfw',
    company: 'DKFW Roofing & Restoration',
    role: 'Full-Stack Developer',
    period: 'Jan – May 2026',
    details: {
      bullets: [
        'Built and refined the public roofing and restoration website and customer quote workflow.',
        'Developed CRM workflows for lead intake, search, and quote management.',
        'Updated backend pagination, quote pricing logic, and authentication behavior.',
      ],
      tags: ['React', 'TypeScript', 'Node.js', 'Supabase'],
    },
  },
  {
    id: 'hfl',
    company: 'Human Factors Lab · UTA',
    role: 'VR Developer & Research Assistant',
    period: 'May 2025 – Present',
    details: {
      bullets: [
        'Developed VR de-escalation training for Fort Worth Police Department using Unity XR Toolkit',
        'Built real-time telemetry pipeline capturing officer biometrics and decision-making patterns',
        'Integrated motion capture system for realistic avatar animation in training scenarios',
        'Authored research on user performance metrics in immersive law enforcement simulations',
      ],
      tags: ['Unity', 'C#', 'Python', 'XR Toolkit', 'Motion Capture'],
    },
  },
]

export type Category = 'VR/XR' | 'AI/ML' | 'Full-Stack' | 'Systems'

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  category: Category
  link?: string
  year: string
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    id: 'dialevac',
    title: 'DialEvac',
    subtitle: 'HackUTD 2026 · Disaster response',
    description:
      'Prototype incident command console that contacts households in a hazard zone by voice and text, collects mobility and assistance needs, and proposes evacuation routes using street graphs and vehicle capacity.',
    tags: ['TypeScript', 'SpacetimeDB', 'Photon', 'ElevenLabs', 'OSMnx', 'OR-Tools'],
    category: 'Full-Stack',
    link: 'https://github.com/mhosigiri/DialEvac',
    year: '2026',
    featured: true,
  },
  {
    id: 'biointerphase',
    title: 'Forecasting red tide risk',
    subtitle: 'Biointerphase · Break Through Tech AI Studio',
    description:
      'A team study of next-week red tide risk near Sarasota. I worked on data exploration, visualization, and coordination. We combined cell counts, weather, water measurements, and satellite chlorophyll into regional and site-level modeling tables.',
    tags: ['Python', 'Jupyter', 'Pandas', 'Geospatial data', 'Time-series validation'],
    category: 'AI/ML',
    link: 'https://github.com/Break-Through-Tech/Biointerphase-1B-forecasting-harmful-algal-bloom-risk',
    year: '2026',
    featured: true,
  },
  {
    id: 'tell-me-more',
    title: 'Tell Me More',
    subtitle: 'HackTX 2026 · Family storytelling',
    description:
      'Turns a photo of an heirloom into a guided voice interview and a shareable family story. The app links story claims to transcript timestamps, photo observations, or research sources, so relatives can hear the original account.',
    tags: ['React', 'FastAPI', 'Supabase', 'Meta Muse', 'Three.js', 'FFmpeg'],
    category: 'Full-Stack',
    link: 'https://github.com/mhosigiri/Tell-Me-More',
    year: '2026',
    featured: true,
  },
  {
    id: 'tollgate',
    title: 'Tollgate',
    subtitle: 'Automated trading research',
    description:
      'A Python system for researching automated order execution. Separates signal collection from approval and uses deterministic risk checks, independent order audits, and broker reconciliation.',
    tags: ['Python', 'MCP', 'SQLite', 'Linux'],
    category: 'Systems',
    year: '2026',
  },
  {
    id: 'routine',
    title: 'Routine',
    subtitle: 'Personal planning app',
    description:
      'A single-user planning app with a native SwiftUI client and a FastAPI backend. The initial build establishes authentication, database migrations, and an API contract for future scheduling and integrations.',
    tags: ['SwiftUI', 'FastAPI', 'PostgreSQL', 'Alembic', 'Docker'],
    category: 'Full-Stack',
    year: '2026',
  },
  {
    id: 'xpense',
    title: 'XPense',
    subtitle: 'HackRice 16 · Financial education',
    description:
      'Gamified budgeting and investing practice using sandbox bank data and paper trades. Spending patterns feed a weekly heatmap, and a Gemini assistant explains results calculated by validated financial engines.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Gemini', 'Alpaca'],
    category: 'Full-Stack',
    link: 'https://devpost.com/software/xpense-86hqbx',
    year: '2026',
    featured: true,
  },
  {
    id: 'docextract',
    title: 'DocExtract',
    subtitle: 'Local mortgage document extraction',
    description:
      'Local-first processing for mortgage PDFs and scans. Combines embedded text, OCR, and geometric field linking to return normalized fields, confidence, and page-level evidence for review.',
    tags: ['Python', 'FastAPI', 'OpenCV', 'PP-OCR', 'Tesseract', 'React'],
    category: 'AI/ML',
    link: 'https://github.com/mhosigiri/DocExtract',
    year: '2026',
    featured: true,
  },
  {
    id: 'interview-duo',
    title: 'InterviewDuo',
    subtitle: 'Technical interview practice',
    description:
      'A web and iOS learning project for practicing algorithms, object-oriented programming, databases, system design, and frontend development. Uses adaptive exercises and spaced repetition to guide practice.',
    tags: ['React', 'SwiftUI', 'FastAPI', 'Supabase'],
    category: 'Full-Stack',
    year: '2026',
  },
  {
    id: 'it-support',
    title: 'IT Support Handbook',
    subtitle: 'Troubleshooting documentation',
    description:
      'A shared reference for IT interns with repeatable troubleshooting steps for Windows device resets, network connectivity, Microsoft Company Portal sync, display setup, and contacts.',
    tags: ['Technical writing', 'IT operations', 'Windows', 'Networking'],
    category: 'Systems',
    link: 'https://github.com/mhosigiri/IT_Support',
    year: '2026',
  },
  {
    id: 'herdsignal',
    title: 'HerdSignal',
    subtitle: 'HackSMU VII · 1st place overall',
    description:
      'Separates low-frequency elephant calls from noisy recordings using non-negative matrix factorization. Pairs reconstructed audio and spectrograms with a conservation map of habitats and threats.',
    tags: ['Next.js', 'FastAPI', 'NumPy', 'SciPy', 'librosa', 'PostGIS'],
    category: 'AI/ML',
    link: 'https://github.com/mhosigiri/HerdSignal',
    year: '2026',
    featured: true,
  },
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
    subtitle: 'Customer feedback analysis',
    description:
      'Customer feedback analysis prototype for a T-Mobile use case. Combines sentiment analysis, employee and customer dashboards, and a chat assistant for support.',
    tags: ['Python', 'FastAPI', 'React', 'Firebase', 'NVIDIA Nemotron'],
    category: 'AI/ML',
    link: 'https://github.com/mhosigiri/FeedbackAI',
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
