'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, Tag, ArrowLeft, ExternalLink } from 'lucide-react'
import { EnhancedDocumentsSidebar } from './enhanced-documents-sidebar'
import { TableOfContents, extractHeadings } from './table-of-contents'
import { DocumentationSearch } from './documentation-search'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DocumentNavigation } from './document-navigation'

interface Document {
  slug: string
  title: string
  description?: string
  category: string
  tags: string[]
  published: boolean
  lastUpdated: string
}

interface EnhancedDocumentationLayoutProps {
  title: string
  description: string
  category: string
  tags: string[]
  lastUpdated: string
  readTime?: number
  author?: string
  content: string
  documents: Document[]
  relatedDocuments?: Document[]
  currentSlug?: string
  children: ReactNode
}

interface RelatedDocumentsProps {
  documents: Document[]
  currentSlug: string
}

function RelatedDocuments({ documents, currentSlug }: RelatedDocumentsProps) {
  // Filter out the current document from related documents
  const relatedDocs = documents.filter(doc => doc.slug !== currentSlug)
  
  if (relatedDocs.length === 0) return null

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          関連ドキュメント
        </h3>
        <div className="space-y-3">
          {relatedDocs.slice(0, 5).map(doc => (
            <Link
              key={doc.slug}
              href={`/documents/${doc.slug}`}
              className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="font-medium text-sm mb-1">{doc.title}</div>
              {doc.description && (
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {doc.description}
                </div>
              )}
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {doc.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {doc.lastUpdated}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function EnhancedDocumentationLayout({
  title,
  description,
  category,
  tags,
  lastUpdated,
  readTime = 5,
  author = 'Admin',
  content,
  documents,
  relatedDocuments = [],
  currentSlug,
  children,
}: EnhancedDocumentationLayoutProps) {
  const [headings, setHeadings] = useState<{ id: string; title: string; level: number }[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [showSearch, setShowSearch] = useState(false)
  const router = useRouter()

  // コンテンツから見出しを抽出
  useEffect(() => {
    const extractedHeadings = extractHeadings(content)
    setHeadings(extractedHeadings)
  }, [content])

  // スクロール位置に基づいてアクティブな見出しを更新
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0% 0% -80% 0%' }
    )

    // 見出し要素を監視
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  // 関連ドキュメントを取得（タグベース）
  const getRelatedDocuments = () => {
    if (relatedDocuments.length > 0) return relatedDocuments
    
    return documents
      .filter(doc => doc.tags.some(tag => tags.includes(tag)))
      .filter(doc => doc.title !== title)
      .slice(0, 5)
  }

  const allCategories = Array.from(new Set(documents.map(doc => doc.category)))
  const allTags = Array.from(new Set(documents.flatMap(doc => doc.tags)))

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* ヘッダー */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              戻る
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? '検索を閉じる' : 'ドキュメント検索'}
            </Button>
          </div>

          {/* 検索セクション（折りたたみ式） */}
          {showSearch && (
            <div className="mb-6">
              <DocumentationSearch 
                documents={documents}
                allCategories={allCategories}
                allTags={allTags}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左サイドバー - ドキュメントナビゲーション */}
          <aside className="lg:col-span-3">
            <div className="sticky top-4">
              <EnhancedDocumentsSidebar documents={documents} />
            </div>
          </aside>

          {/* メインコンテンツ */}
          <main className="lg:col-span-6">
            {/* ドキュメントヘッダー */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-sm">
                  {category}
                </Badge>
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-4">
                {title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                {description}
              </p>

              {/* メタ情報 */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">最終更新:</span>
                      <span>{lastUpdated}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">読了時間:</span>
                      <span>約{readTime}分</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">著者:</span>
                      <span>{author}</span>
                    </div>
                  </div>
                  
                  {tags.length > 0 && (
                    <>
                      <Separator className="my-4" />
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">タグ:</span>
                        <div className="flex flex-wrap gap-1">
                          {tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* ドキュメントコンテンツ */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <article className="prose prose-lg dark:prose-invert max-w-none">
                  {children}
                </article>
              </CardContent>
            </Card>

            {/* 関連ドキュメント */}
            <div className="mt-8">
              <RelatedDocuments 
                documents={getRelatedDocuments()} 
                currentSlug={title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              />
            </div>

            {/* ドキュメントナビゲーション */}
            <DocumentNavigation 
              currentSlug={currentSlug || documents.find(doc => doc.title === title)?.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
            />
          </main>

          {/* 右サイドバー - 目次 */}
          <aside className="lg:col-span-3">
            <div className="sticky top-4 space-y-6">
              {/* 目次 */}
              <TableOfContents 
                headings={headings} 
                activeId={activeId}
              />

              {/* ドキュメント統計 */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-sm mb-3">ドキュメント情報</h4>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="text-muted-foreground">カテゴリ</dt>
                      <dd className="font-medium">{category}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">タグ数</dt>
                      <dd className="font-medium">{tags.length}個</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">見出し数</dt>
                      <dd className="font-medium">{headings.length}個</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">関連ドキュメント</dt>
                      <dd className="font-medium">{getRelatedDocuments().length}件</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              {/* 目次からのクイックアクション */}
              {headings.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm mb-3">クイックナビゲーション</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-xs"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        ページトップに戻る
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-xs"
                        onClick={() => {
                          const lastHeading = headings[headings.length - 1]
                          if (lastHeading) {
                            document.getElementById(lastHeading.id)?.scrollIntoView({ behavior: 'smooth' })
                          }
                        }}
                      >
                        ページ末尾に移動
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
