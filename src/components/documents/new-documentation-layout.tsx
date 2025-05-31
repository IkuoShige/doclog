'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, User, Tag } from 'lucide-react'
import { DocumentsSidebar } from './documents-sidebar'
import { TableOfContents, extractHeadings } from './table-of-contents'
import { getPublishedDocuments } from '@/lib/documents'

interface DocumentationLayoutProps {
  title: string
  description: string
  category: string
  tags: string[]
  lastUpdated: string
  readTime?: number
  author?: string
  content: string
  children: ReactNode
}

export function DocumentationLayout({
  title,
  description,
  category,
  tags,
  lastUpdated,
  readTime = 5,
  author = 'Admin',
  content,
  children,
}: DocumentationLayoutProps) {
  const [headings, setHeadings] = useState<{ id: string; title: string; level: number }[]>([])
  const [activeId, setActiveId] = useState<string>('')
  
  // ドキュメントリストを取得
  const documents = getPublishedDocuments()

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左サイドバー - ドキュメントナビゲーション */}
          <aside className="lg:col-span-3">
            <div className="sticky top-4">
              <DocumentsSidebar documents={documents} />
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

              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                {description}
              </p>

              {/* メタ情報 */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">最終更新:</span>
                      <span>{new Date(lastUpdated).toLocaleDateString('ja-JP')}</span>
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
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* ドキュメントコンテンツ */}
            <div className="bg-card border rounded-lg p-6 lg:p-8">
              {children}
            </div>
          </main>

          {/* 右サイドバー - 目次 */}
          <aside className="lg:col-span-3">
            <div className="sticky top-4">
              <TableOfContents 
                headings={headings} 
                activeId={activeId}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
