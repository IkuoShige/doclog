// 実際のMDXファイルを読み込むためのライブラリ
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  published: boolean
  content: string
}

export interface PortfolioProject {
  slug: string
  title: string
  description: string
  date: string
  category: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  published: boolean
  content: string
}

export interface DocumentContent {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  lastUpdated: string
  published: boolean
  author?: string
  readingTime?: string
  content: string
}

// ブログ投稿を取得
export function getBlogPostsFromMDX(): BlogPost[] {
  const isServerSide = typeof window === 'undefined'
  
  if (!isServerSide) {
    return []
  }

  try {
    const blogDir = path.join(process.cwd(), 'content/blog')
    
    if (!fs.existsSync(blogDir)) {
      return []
    }

    const files = fs.readdirSync(blogDir)
      .filter(file => file.endsWith('.mdx'))

    const posts = files.map(file => {
      const filePath = path.join(blogDir, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug: file.replace('.mdx', ''),
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        category: data.category || 'その他',
        tags: data.tags || [],
        published: data.published !== false,
        content
      }
    })

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

// ポートフォリオプロジェクトを取得
export function getPortfolioProjectsFromMDX(): PortfolioProject[] {
  const isServerSide = typeof window === 'undefined'
  
  if (!isServerSide) {
    return []
  }

  try {
    const portfolioDir = path.join(process.cwd(), 'content/portfolio')
    
    if (!fs.existsSync(portfolioDir)) {
      return []
    }

    const files = fs.readdirSync(portfolioDir)
      .filter(file => file.endsWith('.mdx'))

    const projects = files.map(file => {
      const filePath = path.join(portfolioDir, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug: file.replace('.mdx', ''),
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        category: data.category || 'その他',
        technologies: data.technologies || [],
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        imageUrl: data.imageUrl,
        published: data.published !== false,
        content
      }
    })

    return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading portfolio projects:', error)
    return []
  }
}

// ドキュメントコンテンツを取得
export function getDocumentsFromMDX(): DocumentContent[] {
  const isServerSide = typeof window === 'undefined'
  
  if (!isServerSide) {
    return []
  }

  try {
    const documentsDir = path.join(process.cwd(), 'content/documents')
    
    if (!fs.existsSync(documentsDir)) {
      return []
    }

    const files = fs.readdirSync(documentsDir)
      .filter(file => file.endsWith('.mdx'))

    const documents = files.map(file => {
      const filePath = path.join(documentsDir, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug: file.replace('.mdx', ''),
        title: data.title || 'Untitled',
        description: data.description || '',
        category: data.category || 'その他',
        tags: data.tags || [],
        lastUpdated: data.lastUpdated || new Date().toISOString().split('T')[0],
        published: data.published !== false,
        author: data.author,
        readingTime: data.readingTime,
        content
      }
    })

    return documents.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
  } catch (error) {
    console.error('Error reading documents:', error)
    return []
  }
}

// 公開されたブログ投稿のみを取得
export function getPublishedBlogPosts(): BlogPost[] {
  return getBlogPostsFromMDX().filter(post => post.published)
}

// 公開されたポートフォリオプロジェクトのみを取得
export function getPublishedPortfolioProjectsFromMDX(): PortfolioProject[] {
  return getPortfolioProjectsFromMDX().filter(project => project.published)
}

// 公開されたドキュメントのみを取得
export function getPublishedDocuments(): DocumentContent[] {
  return getDocumentsFromMDX().filter(doc => doc.published)
}

// 最近のブログ投稿を取得
export function getRecentBlogPosts(limit: number = 3): BlogPost[] {
  return getPublishedBlogPosts().slice(0, limit)
}

// 最近のポートフォリオプロジェクトを取得
export function getRecentPortfolioProjects(limit: number = 3): PortfolioProject[] {
  return getPublishedPortfolioProjectsFromMDX().slice(0, limit)
}

// ドキュメントを slug で取得
export function getDocumentBySlug(slug: string): DocumentContent | null {
  const documents = getDocumentsFromMDX()
  return documents.find(doc => doc.slug === slug) || null
}
