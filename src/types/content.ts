// Content type definitions

export interface ContentItem {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  date: string
  slug: string
  published: boolean
  featured?: boolean
  content?: string
  readingTime?: number
  technologies?: string[]
  image?: string
  demoUrl?: string
  githubUrl?: string
}

export interface ContentMetadata {
  title: string
  description: string
  category: string
  tags: string[]
  date: string
  published: boolean
  featured?: boolean
}
