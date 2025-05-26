import { BlogPost } from '@/types/mdx'

// サンプルブログデータ（実際のプロダクションでは、これらのデータはCMSやMarkdownファイルから取得）
const sampleBlogPosts: BlogPost[] = [
  {
    slug: 'nextjs-15-features',
    title: 'Next.js 15の新機能を徹底解説',
    description: 'Next.js 15で追加された新機能について詳しく解説します。React 19のサポート、新しいキャッシング機能、パフォーマンス改善について説明します。',
    content: 'Next.js 15の新機能について...',
    date: '2024-12-15',
    author: 'Developer',
    category: 'Frontend',
    tags: ['Next.js', 'React', 'JavaScript'],
    featured: true,
    readingTime: { text: '5分', minutes: 5, time: 300000, words: 1000 },
    published: true,
  },
  {
    slug: 'typescript-performance',
    title: 'TypeScriptのパフォーマンス最適化テクニック',
    description: 'TypeScriptプロジェクトのコンパイル時間を短縮し、開発効率を向上させるための実践的なテクニックを紹介します。',
    content: 'TypeScriptのパフォーマンス最適化について...',
    date: '2024-12-10',
    author: 'Developer',
    category: 'TypeScript',
    tags: ['TypeScript', 'Performance', 'Development'],
    featured: false,
    readingTime: { text: '8分', minutes: 8, time: 480000, words: 1600 },
    published: true,
  },
  {
    slug: 'react-hooks-guide',
    title: 'React Hooks完全ガイド: 実践的な使い方とベストプラクティス',
    description: 'React Hooksの基本から応用まで、実際のプロジェクトで使える実践的なテクニックとベストプラクティスを解説します。',
    content: 'React Hooksの完全ガイド...',
    date: '2024-12-05',
    author: 'Developer',
    category: 'React',
    tags: ['React', 'Hooks', 'JavaScript'],
    featured: true,
    readingTime: { text: '12分', minutes: 12, time: 720000, words: 2400 },
    published: true,
  },
]

// すべてのブログ記事を取得
export function getBlogPosts(): BlogPost[] {
  return sampleBlogPosts.filter(post => post.published)
}

// スラッグで特定のブログ記事を取得
export function getBlogPost(slug: string): BlogPost | null {
  return sampleBlogPosts.find(post => post.slug === slug && post.published) || null
}

// 関連記事を取得
export async function getRelatedBlogPosts(currentSlug: string, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = getBlogPosts()
  const currentPost = getBlogPost(currentSlug)
  
  if (!currentPost) return []
  
  // 現在の記事以外を取得
  const otherPosts = allPosts.filter(post => post.slug !== currentSlug)
  
  // 同じカテゴリまたは共通タグを持つ記事をスコア化
  const scoredPosts = otherPosts.map(post => {
    let score = 0
    
    // 同じカテゴリなら +3
    if (post.category === currentPost.category) {
      score += 3
    }
    
    // 共通タグ数に応じてスコア加算
    const commonTags = post.tags?.filter(tag => 
      currentPost.tags?.includes(tag)
    ).length || 0
    score += commonTags
    
    return { post, score }
  })
  
  // スコアでソートして指定数返す
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)
}

// カテゴリ別の記事を取得
export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getBlogPosts().filter(post => 
    post.category?.toLowerCase() === category.toLowerCase()
  )
}

// タグ別の記事を取得
export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getBlogPosts().filter(post => 
    post.tags?.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  )
}

// 検索機能
export function searchBlogPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase()
  return getBlogPosts().filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    post.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.category?.toLowerCase().includes(lowercaseQuery)
  )
}

// 注目記事を取得
export function getFeaturedPosts(limit: number = 3): BlogPost[] {
  return getBlogPosts()
    .filter(post => post.featured)
    .slice(0, limit)
}

// 最新記事を取得
export function getLatestPosts(limit: number = 3): BlogPost[] {
  return getBlogPosts()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

// すべてのカテゴリを取得
export function getAllCategories(): string[] {
  const categories = getBlogPosts()
    .map(post => post.category)
    .filter((category): category is string => Boolean(category))
  return Array.from(new Set(categories))
}

// すべてのタグを取得
export function getAllTags(): string[] {
  const tags = getBlogPosts()
    .flatMap(post => post.tags || [])
  return Array.from(new Set(tags))
}
