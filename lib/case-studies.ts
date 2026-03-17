export interface CaseStudy {
  slug: string
  title: string
  stage: 'MVP' | 'Concept' | 'Production'
  stageNote?: string
  category: 'ai-agents' | 'infrastructure' | 'automation' | 'interfaces'
  summary: string
  purpose: string
  features: string[]
  futureUpgrade?: string
  tags: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ai-resume-builder',
    title: 'AI Resume Builder',
    stage: 'MVP',
    stageNote: 'Coming soon to Google Playstore & App Store',
    category: 'ai-agents',
    summary: 'AI-powered resume optimization built to beat ATS filters and land more interviews.',
    purpose: 'Most resumes get rejected before a human ever sees them. ATS software scans for keywords, formatting, and relevance — and silently filters out candidates who don\'t match. This app solves that by letting users tailor their resume to specific job descriptions, maximizing ATS compatibility and match score so their application actually reaches a recruiter.',
    features: [
      'Job description analysis & keyword extraction',
      'AI-powered resume tailoring per job',
      'ATS match score & optimization suggestions',
      'Clean, ATS-friendly template output',
      'Subscription-based download',
    ],
    futureUpgrade: 'Agentic Job Applying Engine — automatically apply to matching jobs on behalf of the user.',
    tags: ['AI', 'Resume Parsing', 'NLP', 'Mobile App'],
  },
  {
    slug: 'ai-companion-app',
    title: 'AI Companion App',
    stage: 'MVP',
    category: 'ai-agents',
    summary: 'AI assistant for daily use — conversational and functional.',
    purpose: 'Build a versatile AI companion that serves as a personal assistant, emotional companion, and productivity tool — designed for everyday use with a natural conversational interface.',
    features: [
      'Personal assistant',
      'Emotional companion',
      'Productivity assistant',
    ],
    tags: ['AI', 'Conversational AI', 'Mobile App'],
  },
  {
    slug: 'neet-jee-ai-app',
    title: 'NEET / JEE AI App',
    stage: 'Concept',
    category: 'ai-agents',
    summary: 'AI-powered education assistant targeting Indian students preparing for NEET & JEE.',
    purpose: 'Help Indian students with AI-driven exam preparation — solving doubts instantly, adapting to individual learning patterns, and providing structured exam prep for two of India\'s most competitive entrance exams.',
    features: [
      'Doubt solving',
      'Adaptive learning',
      'Exam preparation',
    ],
    tags: ['AI', 'EdTech', 'Adaptive Learning'],
  },
]
