export interface Project {
  id: string
  title: string
  slug: string
  summary: string
  description: string
  tags: string[]
  year: number
  links?: {
    github?: string
    demo?: string
    slides?: string
  }
  featured?: boolean
}

export interface ResearchItem {
  id: string
  title: string
  slug: string
  summary: string
  description: string
  tags: string[]
  year: number
  status: 'in-progress' | 'published' | 'draft'
  links?: {
    paper?: string
    slides?: string
    lessonPlan?: string
    supplementary?: string
  }
}

export interface ContactFormPayload {
  name: string
  email: string
  subject: string
  message: string
}

export interface ApiResponse<T = void> {
  success: boolean
  data?: T
  error?: string
}
