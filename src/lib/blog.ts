import { BlogPost } from '@/types/mdx'

// サーバーサイドかどうかを判定
const isServerSide = typeof window === 'undefined'

// フォールバック用の静的データ
function getFallbackBlogPosts(): BlogPost[] {
  return [
    {
      slug: 'nextjs-15-features',
      title: 'Next.js 15の新機能とパフォーマンス向上',
      description: 'Next.js 15で追加された新機能とパフォーマンス改善について詳しく解説します。App Router、Server Components、そしてTurbopackの活用方法を学びましょう。',
      date: '2024-01-20',
      author: 'Developer',
      category: 'Next.js',
      tags: ['Next.js', 'React', 'フロントエンド'],
      featured: true,
      published: true,
      readingTime: { text: '5 min read', minutes: 5, words: 1000, time: 300000 },
      content: `
# Next.js 15の新機能とパフォーマンス向上

Next.js 15では多くの改善と新機能が追加されました。この記事では、主要なアップデート内容について詳しく説明します。

## 主要な新機能

### 1. パフォーマンスの改善
- バンドルサイズの最適化
- ビルド時間の短縮
- ランタイムパフォーマンスの向上

### 2. 開発者体験の向上
- より詳細なエラーメッセージ
- 改善されたHot Reload
- TypeScript サポートの強化

### 3. Turbopackの統合
Turbopackがより安定し、開発時のビルド時間が大幅に短縮されました。

\`\`\`javascript
// next.config.js
module.exports = {
  experimental: {
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack'],
      },
    },
  },
}
\`\`\`

## まとめ
Next.js 15は開発者とユーザーの両方にとって大きな改善をもたらします。
`
    },
    {
      slug: 'react-hooks-guide',
      title: 'React Hooksの実践ガイド',
      description: 'useEffect、useState、useCallbackなど、React Hooksの効果的な使い方とパフォーマンス最適化のテクニックを実例とともに学習します。',
      date: '2024-01-15',
      author: 'Developer',
      category: 'React',
      tags: ['React', 'Hooks', 'JavaScript'],
      featured: false,
      published: true,
      readingTime: { text: '8 min read', minutes: 8, words: 1600, time: 480000 },
      content: `
# React Hooksの実践ガイド

React Hooksは関数コンポーネントでステート管理やライフサイクルメソッドを使用するための機能です。

## useState の基本的な使い方

\`\`\`jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
\`\`\`

## useEffect でのライフサイクル管理

\`\`\`jsx
import { useEffect, useState } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(\`/api/users/\${userId}\`)
      const userData = await response.json()
      setUser(userData)
    }

    fetchUser()
  }, [userId]) // userIdが変わった時のみ実行

  return user ? <div>{user.name}</div> : <div>Loading...</div>
}
\`\`\`

## パフォーマンス最適化

### useCallback の活用
\`\`\`jsx
import { useCallback, useState } from 'react'

function ExpensiveComponent({ onCalculate }) {
  const [value, setValue] = useState(0)

  // 依存配列が変わらない限り、同じ関数インスタンスを返す
  const memoizedCallback = useCallback(() => {
    return onCalculate(value)
  }, [onCalculate, value])

  return (
    <button onClick={memoizedCallback}>
      Calculate
    </button>
  )
}
\`\`\`

React Hooksを効果的に使用することで、より保守性の高いコードを書くことができます。
`
    },
    {
      slug: 'typescript-performance',
      title: 'TypeScriptによるパフォーマンス最適化',
      description: 'TypeScriptプロジェクトでのコンパイル時間短縮、型チェックの最適化、そして効率的な開発環境の構築方法について詳しく解説します。',
      date: '2024-01-10',
      author: 'Developer',
      category: 'TypeScript',
      tags: ['TypeScript', 'パフォーマンス', '最適化'],
      featured: true,
      published: true,
      readingTime: { text: '7 min read', minutes: 7, words: 1400, time: 420000 },
      content: `
# TypeScriptによるパフォーマンス最適化

大規模なTypeScriptプロジェクトでは、コンパイル時間とパフォーマンスが重要な課題となります。

## tsconfig.json の最適化

\`\`\`json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./buildcache/main.tsbuildinfo",
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
\`\`\`

## 型定義の最適化

### ユニオン型より交差型を選ぶ
\`\`\`typescript
// 良い例: 交差型
interface BaseUser {
  id: string
  name: string
}

interface AdminUser extends BaseUser {
  permissions: string[]
}

// 避けるべき: 複雑なユニオン型
type User = 
  | { type: 'admin'; id: string; name: string; permissions: string[] }
  | { type: 'user'; id: string; name: string }
\`\`\`

### 条件付き型の効率的な使用
\`\`\`typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T }

// 使用例
const stringResponse: ApiResponse<string> = { message: "Hello" }
const dataResponse: ApiResponse<number[]> = { data: [1, 2, 3] }
\`\`\`

## コンパイル時間の改善

### Project References の活用
大きなプロジェクトを小さな単位に分割し、個別にコンパイルします。

\`\`\`json
// tsconfig.json
{
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/ui" },
    { "path": "./packages/utils" }
  ]
}
\`\`\`

これらの最適化により、開発効率を大幅に改善できます。
`
    }
  ]
}

// メイン関数: サーバーサイドとクライアントサイドを適切に分離
export function getBlogPosts(): BlogPost[] {
  if (isServerSide) {
    try {
      // サーバーサイドでのみ動的インポート
      console.log('[Server] Loading MDX blog posts...')
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const posts = require('./mdx').getBlogPostsFromMDX()
      console.log(`[Server] Loaded ${posts.length} blog posts:`, posts.map((p: BlogPost) => p.slug))
      return posts
    } catch (error) {
      console.error('MDXファイルの読み込みに失敗しました:', error)
      console.log('[Server] Falling back to static data')
      return getFallbackBlogPosts()
    }
  } else {
    // クライアントサイドではフォールバックデータを返す
    console.log('[Client] Using fallback blog posts')
    return getFallbackBlogPosts()
  }
}

export function getBlogPost(slug: string): BlogPost | null {
  if (isServerSide) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const post = require('./mdx').getBlogPostFromMDX(slug)
      return post
    } catch (error) {
      console.error(`[Server] MDXファイル ${slug} の読み込みに失敗しました:`, error)
      // フォールバックとして静的データから検索
      const fallbackPost = getFallbackBlogPosts().find(post => post.slug === slug) || null
      return fallbackPost
    }
  } else {
    // クライアントサイドではフォールバックデータから検索
    return getFallbackBlogPosts().find(post => post.slug === slug) || null
  }
}

// カテゴリ別の記事を取得
export function getBlogPostsByCategory(category: string): BlogPost[] {
  const allPosts = getBlogPosts()
  return allPosts.filter((post) => 
    post.category?.toLowerCase() === category.toLowerCase()
  )
}

// タグ別の記事を取得
export function getBlogPostsByTag(tag: string): BlogPost[] {
  const allPosts = getBlogPosts()
  return allPosts.filter((post) => 
    post.tags?.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  )
}

// 関連記事を取得
export function getRelatedBlogPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = getBlogPosts()
  
  // 現在の記事以外を取得
  const otherPosts = allPosts.filter((post) => post.slug !== currentPost.slug)
  
  // 同じカテゴリまたは共通タグを持つ記事をスコア化
  const scoredPosts = otherPosts.map((post) => {
    let score = 0
    
    // 同じカテゴリの場合はスコア+2
    if (post.category === currentPost.category) {
      score += 2
    }
    
    // 共通タグの数だけスコア+1
    const commonTags = post.tags?.filter((tag) => 
      currentPost.tags?.includes(tag)
    ) || []
    score += commonTags.length
    
    return { post, score }
  })
  
  // スコアでソートして上位を返す
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post)
}

// 全カテゴリを取得
export function getAllBlogCategories(): string[] {
  const allPosts = getBlogPosts()
  const categories = allPosts
    .map((post) => post.category)
    .filter((category): category is string => Boolean(category))
  return Array.from(new Set(categories))
}

// 全タグを取得
export function getAllBlogTags(): string[] {
  const allPosts = getBlogPosts()
  const tags = allPosts.flatMap((post) => post.tags || [])
  return Array.from(new Set(tags))
}

// 検索機能（基本版）
export function searchBlogPosts(query: string): BlogPost[] {
  const allPosts = getBlogPosts()
  const searchQuery = query.toLowerCase()
  
  return allPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchQuery) ||
      post.description.toLowerCase().includes(searchQuery) ||
      (post.content && post.content.toLowerCase().includes(searchQuery)) ||
      (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchQuery))) ||
      (post.category && post.category.toLowerCase().includes(searchQuery))
    )
  })
}

// 検索オプションの型定義
export interface BlogSearchOptions {
  query?: string
  category?: string
  tag?: string
  author?: string
  featured?: boolean
}

// 高度な検索機能
export function advancedSearchBlogPosts(options: BlogSearchOptions): BlogPost[] {
  let posts = getBlogPosts()

  if (options.query) {
    posts = searchBlogPosts(options.query)
  }

  if (options.category) {
    posts = posts.filter(post => 
      post.category?.toLowerCase() === options.category!.toLowerCase()
    )
  }

  if (options.tag) {
    posts = posts.filter(post =>
      post.tags?.some(tag => tag.toLowerCase() === options.tag!.toLowerCase())
    )
  }

  if (options.author) {
    posts = posts.filter(post =>
      post.author?.toLowerCase() === options.author!.toLowerCase()
    )
  }

  if (options.featured !== undefined) {
    posts = posts.filter(post => post.featured === options.featured)
  }

  return posts
}

// フィーチャー記事を取得
export function getFeaturedBlogPosts(limit: number = 3): BlogPost[] {
  const allPosts = getBlogPosts()
  return allPosts
    .filter((post) => post.featured)
    .slice(0, limit)
}

// 最新記事を取得
export function getLatestBlogPosts(limit: number = 3): BlogPost[] {
  const allPosts = getBlogPosts()
  return allPosts.slice(0, limit)
}

// ページング対応の記事取得
export function getPaginatedBlogPosts(page: number = 1, limit: number = 6) {
  const allPosts = getBlogPosts()
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const posts = allPosts.slice(startIndex, endIndex)

  return {
    posts,
    currentPage: page,
    totalPages,
    totalPosts,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  }
}

// エイリアス関数（後方互換性のため）
export function getAllCategories(): string[] {
  return getAllBlogCategories()
}

export function getAllTags(): string[] {
  return getAllBlogTags()
}
