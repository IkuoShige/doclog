# タスク5: ブログページ実装

## 🎯 目標
技術ブログのリスト表示、詳細表示、検索・フィルタリング機能を実装する

## 🚨 重要な修正履歴

### 2024/01/19 - Next.js 15 コンポーネント分離修正
**問題**: `/src/app/blog/page.tsx` で "use client" ディレクティブとメタデータエクスポートが競合し、500エラーが発生

**解決策**: 
1. **クライアントコンポーネントの分離**: `/src/components/blog/blog-page-client.tsx` を作成
2. **サーバーコンポーネントでのメタデータ管理**: `/src/app/blog/page.tsx` はサーバーサイドでメタデータを管理し、クライアントコンポーネントを呼び出す構造に変更

**変更されたファイル**:
- `/src/app/blog/page.tsx` - サーバーコンポーネントに変更
- `/src/components/blog/blog-page-client.tsx` - 新規作成（クライアントサイドロジック）

**修正後の構造**:
```typescript
// /src/app/blog/page.tsx (Server Component)
import { Metadata } from 'next'
import { BlogPageClient } from '@/components/blog/blog-page-client'

export const metadata: Metadata = { /* ... */ }
export default function BlogPage() {
  return <BlogPageClient />
}

// /src/components/blog/blog-page-client.tsx (Client Component)
'use client'
export function BlogPageClient() {
  // useState, useEffect など
}
```

**結果**: ✅ 500エラー解決、ブログページが正常に動作

---

## 📋 実行内容

### 1. ブログ一覧ページ（/blog）
- [x] 記事一覧の表示
- [x] ページネーション機能
- [x] カテゴリ・タグによるフィルタリング
- [x] 検索機能
- [x] 並び替え機能（日付、人気順等）

### 2. ブログ詳細ページ（/blog/[slug]）
- [x] MDXコンテンツの表示
- [x] 目次（Table of Contents）
- [x] 関連記事の表示
- [x] ソーシャルシェアボタン
- [x] 前後の記事ナビゲーション
- [x] 読了時間の表示

### 3. カテゴリページ（/blog/category/[category]）
- [x] カテゴリ別記事一覧
- [x] カテゴリ説明
- [x] ブレッドクラム

### 4. タグページ（/blog/tag/[tag]）
- [x] タグ別記事一覧
- [x] タグクラウド
- [x] 関連タグの表示

### 5. 検索・フィルタリング機能
- [x] 全文検索機能
- [x] 複数タグでのフィルタリング
- [x] 日付範囲でのフィルタリング
- [x] 検索結果ハイライト

## 🛠️ 技術詳細

### ディレクトリ構造
```
app/
├── blog/
│   ├── page.tsx                    # ブログ一覧
│   ├── [slug]/
│   │   └── page.tsx                # 記事詳細
│   ├── category/
│   │   └── [category]/
│   │       └── page.tsx            # カテゴリ別一覧
│   └── tag/
│       └── [tag]/
│           └── page.tsx            # タグ別一覧
```

### ブログ一覧ページ実装
```typescript
// app/blog/page.tsx
import { Suspense } from 'react'
import { getBlogPosts } from '@/lib/content'
import { BlogGrid } from '@/components/blog/blog-grid'
import { BlogSearchAndFilter } from '@/components/blog/blog-search-filter'
import { PageHeader } from '@/components/page-header'
import { BlogListSkeleton } from '@/components/blog/blog-list-skeleton'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ブログ | あなたの名前',
  description: 'Web開発、プログラミング、技術トレンドに関する記事を公開しています。',
}

interface BlogPageProps {
  searchParams: {
    q?: string
    category?: string
    tag?: string
    page?: string
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const posts = await getBlogPosts()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="ブログ"
        description="Web開発やプログラミングに関する技術記事を公開しています"
      />
      
      <div className="mt-8">
        <BlogSearchAndFilter />
      </div>
      
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogGrid posts={posts} searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
```

### ブログ詳細ページ実装
```typescript
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getBlogPost, getBlogPosts } from '@/lib/content'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/mdx-components'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { BlogHeader } from '@/components/blog/blog-header'
import { RelatedPosts } from '@/components/blog/related-posts'
import { ShareButtons } from '@/components/blog/share-buttons'
import { BlogNavigation } from '@/components/blog/blog-navigation'
import { Metadata } from 'next'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// 静的パスの生成
export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// SEO最適化
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {}
  }

  return {
    title: `${post.title} | ブログ`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    publishedTime: post.date,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }
  
  const allPosts = await getBlogPosts()
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3)
  
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug)
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <BlogHeader post={post} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-3">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>
            
            <div className="mt-12 pt-8 border-t">
              <ShareButtons post={post} />
            </div>
            
            <BlogNavigation previous={previousPost} next={nextPost} />
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <TableOfContents content={post.content} />
            </div>
          </div>
        </div>
        
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <RelatedPosts posts={relatedPosts} />
          </div>
        )}
      </div>
    </article>
  )
}
```

### 検索・フィルタリングコンポーネント
```typescript
// components/blog/blog-search-filter.tsx
'use client'

import { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X, Filter } from 'lucide-react'
import { getAllTags, getAllCategories } from '@/lib/content'

export function BlogSearchAndFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tag')?.split(',').filter(Boolean) || []
  )

  const categories = getAllCategories()
  const tags = getAllTags()

  const updateSearchParams = (updates: Record<string, string | string[] | null>) => {
    const params = new URLSearchParams(searchParams)
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
        params.delete(key)
      } else if (Array.isArray(value)) {
        params.set(key, value.join(','))
      } else {
        params.set(key, value)
      }
    })
    
    // ページをリセット
    params.delete('page')
    
    router.push(`/blog?${params.toString()}`)
  }

  const handleSearch = () => {
    updateSearchParams({ q: searchQuery })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    updateSearchParams({ category: category === 'all' ? null : category })
  }

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    
    setSelectedTags(newTags)
    updateSearchParams({ tag: newTags })
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedTags([])
    router.push('/blog')
  }

  const hasActiveFilters = searchQuery || selectedCategory || selectedTags.length > 0

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="記事を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} className="sm:w-auto">
          検索
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="カテゴリを選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべてのカテゴリ</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" onClick={clearAllFilters} className="sm:w-auto">
            <X className="mr-2 h-4 w-4" />
            フィルタをクリア
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">タグで絞り込み:</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
```

### 目次コンポーネント
```typescript
// components/blog/table-of-contents.tsx
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // MDXコンテンツから見出しを抽出
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const extractedHeadings: Heading[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      
      extractedHeadings.push({ id, text, level })
    }

    setHeadings(extractedHeadings)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0% -80% 0%' }
    )

    const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean)
    headingElements.forEach(el => el && observer.observe(el))

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">目次</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block text-sm transition-colors hover:text-primary ${
                activeId === heading.id ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
              style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}
```

## ✅ 完了条件
- [x] ブログ一覧ページが正常に表示される
- [x] 記事詳細ページでMDXが適切にレンダリングされる
- [x] 検索・フィルタリング機能が動作する
- [x] ページネーションが実装されている
- [x] SEO最適化が完了している
- [x] レスポンシブデザインが適用されている
- [x] 目次機能が動作する
- [x] 関連記事が表示される

## 📦 追加パッケージ
```bash
npm install next-mdx-remote
npm install reading-time      # 読了時間計算
npm install fuse.js          # 高度な検索機能（任意）
```

## 🔗 関連リソース
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- [MDX Docs](https://mdxjs.com/)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

## 📝 備考
- 検索機能は最初はシンプルな実装とし、後で高度化
- 目次は自動生成とマニュアル指定の両方に対応
- ページネーションは無限スクロールも検討
- アクセシビリティを重視（キーボードナビゲーション等）
- パフォーマンスを考慮した実装

---

**優先度**: 🔴 高
**所要時間**: 6-8時間
**前提タスク**: タスク2（MDX設定）、タスク3（UIコンポーネント）
**次のタスク**: タスク6（ポートフォリオページ実装）
