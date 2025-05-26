'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, X, ArrowUpDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getAllBlogCategories, getAllBlogTags } from '@/lib/blog'
import { BlogPost } from '@/types/mdx'

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc'

interface BlogSearchAndFilterProps {
  searchQuery?: string
  selectedCategory?: string
  selectedTags?: string[]
  sortBy?: SortOption
  allPosts?: BlogPost[]
  allTags?: string[]
  allCategories?: string[]
  onSearch?: (query: string) => void
  onCategoryChange?: (category: string) => void
  onTagChange?: (tags: string[]) => void
  onSortChange?: (sort: SortOption) => void
  className?: string
}

export function BlogSearchAndFilter({
  searchQuery: initialSearchQuery = '',
  selectedCategory: initialSelectedCategory = '',
  selectedTags: initialSelectedTags = [],
  sortBy: initialSortBy = 'newest',
  allTags,
  allCategories,
  onSearch,
  onCategoryChange,
  onTagChange,
  onSortChange,
  className
}: BlogSearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialSelectedCategory || 'all')
  const [selectedTags, setSelectedTags] = useState<string[]>(initialSelectedTags)
  const [sortBy, setSortBy] = useState<SortOption>(initialSortBy)
  const [showFilters, setShowFilters] = useState(false)

  // プロパティの変更を監視して内部状態を更新
  useEffect(() => {
    setSearchQuery(initialSearchQuery)
  }, [initialSearchQuery])

  useEffect(() => {
    setSelectedCategory(initialSelectedCategory || 'all')
  }, [initialSelectedCategory])

  useEffect(() => {
    setSelectedTags(initialSelectedTags)
  }, [initialSelectedTags])

  useEffect(() => {
    setSortBy(initialSortBy)
  }, [initialSortBy])

  // propsから受け取ったデータを使用、フォールバックとして従来の関数を使用
  const categories = allCategories || getAllBlogCategories()
  const tags = allTags || getAllBlogTags()

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch?.(value)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    onCategoryChange?.(value === 'all' ? '' : value)
  }

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    
    setSelectedTags(newTags)
    onTagChange?.(newTags)
  }

  const handleSortChange = (value: SortOption) => {
    setSortBy(value)
    onSortChange?.(value)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedTags([])
    setSortBy('newest')
    onSearch?.('')
    onCategoryChange?.('')
    onTagChange?.([])
    onSortChange?.('newest')
  }

  const hasActiveFilters = searchQuery || (selectedCategory && selectedCategory !== 'all') || selectedTags.length > 0

  return (
    <div className={className}>
      {/* 検索バー */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="記事を検索..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* フィルターボタンと並び替え */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            フィルター
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              クリア
            </Button>
          )}
        </div>

        {/* 並び替え */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">新しい順</SelectItem>
              <SelectItem value="oldest">古い順</SelectItem>
              <SelectItem value="title-asc">タイトル昇順</SelectItem>
              <SelectItem value="title-desc">タイトル降順</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* アクティブなフィルターの表示 */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCategory && selectedCategory !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              カテゴリ: {selectedCategory}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleCategoryChange('all')}
              />
            </Badge>
          )}
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleTagToggle(tag)}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* フィルターパネル */}
      {showFilters && (
        <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
          {/* カテゴリ選択 */}
          <div>
            <label className="text-sm font-medium mb-2 block">カテゴリ</label>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger>
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
          </div>

          {/* タグ選択 */}
          <div>
            <label className="text-sm font-medium mb-2 block">タグ</label>
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
      )}
    </div>
  )
}
