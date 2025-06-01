'use client'

import { useState, useMemo } from 'react'
import { Search, FileText, Tag, Calendar } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Document {
  slug: string
  title: string
  description?: string
  category: string
  tags: string[]
  published: boolean
  lastUpdated: string
}

interface DocumentationSearchProps {
  documents: Document[]
  allCategories: string[]
  allTags: string[]
}

export function DocumentationSearch({ 
  documents, 
  allCategories, 
  allTags 
}: DocumentationSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'updated' | 'title'>('updated')

  // フィルター済みドキュメント
  const filteredDocuments = useMemo(() => {
    let filtered = documents.filter(doc => {
      // テキスト検索
      const matchesSearch = !searchQuery || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // カテゴリフィルター
      const matchesCategory = !selectedCategory || doc.category === selectedCategory

      // タグフィルター
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => doc.tags.includes(tag))

      return matchesSearch && matchesCategory && matchesTags
    })

    // ソート
    if (sortBy === 'updated') {
      filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    } else {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    }

    return filtered
  }, [documents, searchQuery, selectedCategory, selectedTags, sortBy])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="space-y-6">
      {/* 検索とフィルターコントロール */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            ドキュメント検索
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 検索入力 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="ドキュメントを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* カテゴリフィルター */}
          <div>
            <h4 className="font-medium mb-2">カテゴリ</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                すべて
              </Button>
              {allCategories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* タグフィルター */}
          <div>
            <h4 className="font-medium mb-2">タグ</h4>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* ソート */}
          <div>
            <h4 className="font-medium mb-2">並び替え</h4>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'updated' ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy('updated')}
              >
                更新日順
              </Button>
              <Button
                variant={sortBy === 'title' ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy('title')}
              >
                タイトル順
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 検索結果 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            検索結果 ({filteredDocuments.length}件)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDocuments.map(doc => (
            <Card key={doc.slug} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge variant="outline" className="mb-2">
                    {doc.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">
                  <Link
                    href={`/documents/${doc.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {doc.title}
                  </Link>
                </CardTitle>
                {doc.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {doc.description}
                  </p>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* タグ */}
                  {doc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {doc.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{doc.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* メタ情報 */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>ドキュメント</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{doc.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">ドキュメントが見つかりません</h3>
              <p className="text-muted-foreground">
                検索条件を変更してお試しください。
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
