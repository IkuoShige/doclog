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

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc'

interface DocumentSearchAndFilterProps {
  searchQuery?: string
  selectedCategory?: string
  selectedTags?: string[]
  sortBy?: SortOption
  allTags?: string[]
  allCategories?: string[]
  onSearch?: (query: string) => void
  onCategoryChange?: (category: string) => void
  onTagChange?: (tags: string[]) => void
  onSortChange?: (sort: SortOption) => void
  className?: string
}

export function DocumentSearchAndFilter({
  searchQuery: initialSearchQuery = '',
  selectedCategory: initialSelectedCategory = '',
  selectedTags: initialSelectedTags = [],
  sortBy: initialSortBy = 'newest',
  allTags = [],
  allCategories = [],
  onSearch,
  onCategoryChange,
  onTagChange,
  onSortChange,
  className
}: DocumentSearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialSelectedCategory || 'all')
  const [selectedTags, setSelectedTags] = useState<string[]>(initialSelectedTags)
  const [sortBy, setSortBy] = useState<SortOption>(initialSortBy)
  const [showFilters, setShowFilters] = useState(false)

  // 検索処理
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch?.(searchQuery)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, onSearch])

  // カテゴリ変更処理
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    onCategoryChange?.(category === 'all' ? '' : category)
  }

  // タグ選択/解除処理
  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    
    setSelectedTags(newTags)
    onTagChange?.(newTags)
  }

  // ソート変更処理
  const handleSortChange = (sort: string) => {
    const newSort = sort as SortOption
    setSortBy(newSort)
    onSortChange?.(newSort)
  }

  // フィルターをクリア
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

  // アクティブなフィルター数を計算
  const activeFiltersCount = [
    searchQuery && searchQuery.length > 0,
    selectedCategory && selectedCategory !== 'all',
    selectedTags.length > 0,
    sortBy !== 'newest'
  ].filter(Boolean).length

  const sortLabels = {
    newest: '新しい順',
    oldest: '古い順',
    'title-asc': 'タイトル昇順',
    'title-desc': 'タイトル降順'
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 検索バー */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="ドキュメントを検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* フィルター制御 */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          フィルター
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(sortLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* フィルターパネル */}
      {showFilters && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">フィルター設定</h3>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                すべてクリア
              </Button>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* カテゴリフィルター */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                カテゴリ
              </label>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  {allCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* ソート */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                並び順
              </label>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(sortLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* タグフィルター */}
          {allTags.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                タグ
              </label>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* 選択中のタグ表示 */}
          {selectedTags.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                選択中のタグ
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map(tag => (
                  <Badge
                    key={tag}
                    variant="default"
                    className="cursor-pointer"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
