'use client'

import { useState, useMemo } from 'react'
import { Document } from '@/types/mdx'
import { DocumentSearchAndFilter } from './document-search-filter'
import { BookOpen } from 'lucide-react'

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc'

interface DocumentsPageClientProps {
  documents: Document[]
  allCategories: string[]
  allTags: string[]
}

export function DocumentsPageClient({
  documents,
  allCategories,
  allTags
}: DocumentsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('newest')

  // フィルタリングとソート処理
  const filteredAndSortedDocuments = useMemo(() => {
    let filtered = documents

    // 検索クエリでフィルタリング
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query) ||
        doc.category.toLowerCase().includes(query) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // カテゴリでフィルタリング
    if (selectedCategory) {
      filtered = filtered.filter(doc => doc.category === selectedCategory)
    }

    // タグでフィルタリング
    if (selectedTags.length > 0) {
      filtered = filtered.filter(doc => 
        selectedTags.every(tag => doc.tags.includes(tag))
      )
    }

    // ソート処理
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        case 'oldest':
          return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
        case 'title-asc':
          return a.title.localeCompare(b.title, 'ja')
        case 'title-desc':
          return b.title.localeCompare(a.title, 'ja')
        default:
          return 0
      }
    })

    return sorted
  }, [documents, searchQuery, selectedCategory, selectedTags, sortBy])

  return (
    <div className="space-y-6">
      {/* 検索・フィルター */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <DocumentSearchAndFilter
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedTags={selectedTags}
          sortBy={sortBy}
          allCategories={allCategories}
          allTags={allTags}
          onSearch={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onTagChange={setSelectedTags}
          onSortChange={setSortBy}
        />
      </div>

      {/* 検索結果の表示 */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {filteredAndSortedDocuments.length}件のドキュメント
          {searchQuery && (
            <span className="ml-1">
              「{searchQuery}」の検索結果
            </span>
          )}
        </div>
      </div>

      {/* ドキュメントグリッド - 2カラム版 */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredAndSortedDocuments.map((document) => (
          <div key={document.slug} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                  <a href={`/doclog/documents/${document.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {document.title}
                  </a>
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {document.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                  {document.category}
                </span>
                <span>
                  {new Date(document.lastUpdated).toLocaleDateString('ja-JP')}
                </span>
              </div>
              
              {document.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {document.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                  {document.tags.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{document.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedDocuments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 mb-2">
            <BookOpen className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            ドキュメントが見つかりませんでした
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            検索条件を変更してもう一度お試しください。
          </p>
        </div>
      )}
    </div>
  )
}
