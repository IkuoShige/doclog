'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BlogPost } from '@/types/mdx'
import { BlogGrid } from '@/components/blog/blog-grid'
import { BlogSearchAndFilter } from '@/components/blog/blog-search-filter'

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc'

interface BlogPageClientProps {
  initialPosts: BlogPost[]
  allTags: string[]
  allCategories: string[]
}

export function BlogPageClient({ initialPosts, allTags, allCategories }: BlogPageClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // 状態管理
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  
  // URLパラメータから初期値を設定
  useEffect(() => {
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || ''
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || []
    const sort = (searchParams.get('sort') as SortOption) || 'newest'
    
    setSearchQuery(query)
    setSelectedCategory(category)
    setSelectedTags(tags)
    setSortBy(sort)
  }, [searchParams])
  
  // URLパラメータを更新
  const updateURL = (params: {
    q?: string
    category?: string
    tags?: string[]
    sort?: SortOption
  }) => {
    const newParams = new URLSearchParams()
    
    if (params.q) newParams.set('q', params.q)
    if (params.category) newParams.set('category', params.category)
    if (params.tags && params.tags.length > 0) newParams.set('tags', params.tags.join(','))
    if (params.sort && params.sort !== 'newest') newParams.set('sort', params.sort)
    
    const paramString = newParams.toString()
    const newURL = paramString ? `/blog?${paramString}` : '/blog'
    router.replace(newURL, { scroll: false })
  }
  
  // フィルタリングと並び替えされた投稿
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = initialPosts
    
    // 検索フィルタ
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    // カテゴリフィルタ
    if (selectedCategory) {
      filtered = filtered.filter(post =>
        post.category?.toLowerCase() === selectedCategory.toLowerCase()
      )
    }
    
    // タグフィルタ
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        selectedTags.some(selectedTag =>
          post.tags?.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
        )
      )
    }
    
    // 並び替え
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'title-asc':
          return a.title.localeCompare(b.title, 'ja')
        case 'title-desc':
          return b.title.localeCompare(a.title, 'ja')
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })
  }, [initialPosts, searchQuery, selectedCategory, selectedTags, sortBy])
  
  // ハンドラー関数
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    updateURL({ q: query, category: selectedCategory, tags: selectedTags, sort: sortBy })
  }
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    updateURL({ q: searchQuery, category, tags: selectedTags, sort: sortBy })
  }
  
  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags)
    updateURL({ q: searchQuery, category: selectedCategory, tags, sort: sortBy })
  }
  
  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort)
    updateURL({ q: searchQuery, category: selectedCategory, tags: selectedTags, sort })
  }

  return (
    <>
      <BlogSearchAndFilter
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedTags={selectedTags}
        sortBy={sortBy}
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onTagChange={handleTagChange}
        onSortChange={handleSortChange}
        allPosts={initialPosts}
        allTags={allTags}
        allCategories={allCategories}
      />
      
      <div className="mt-12">
        <BlogGrid posts={filteredAndSortedPosts} />
      </div>
    </>
  )
}
