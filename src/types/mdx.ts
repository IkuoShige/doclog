import { ReadTimeResults } from 'reading-time'

// ブログ記事の型定義
export interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  content?: string
  date: string
  author: string
  category?: string
  tags?: string[]
  image?: string
  featured?: boolean
  readingTime: ReadTimeResults
  published: boolean
}

// ポートフォリオプロジェクトの型定義
export interface PortfolioProject {
  id: string
  slug: string
  title: string
  description: string
  date: string
  technologies: string[]
  category: string
  tags: string[]
  image?: string
  github?: string
  demo?: string
  featured: boolean
  status: 'completed' | 'in-progress' | 'planned'
  highlights: string[]
  published: boolean
}

// ガイドの型定義
export interface Guide {
  id: string
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  category: string
  published: boolean
}

// ドキュメントの型定義
export interface Document {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  lastUpdated: string
  published: boolean
  content?: string
}

// MDXコンポーネントプロパティ
export interface MDXProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: Record<string, any>
}
