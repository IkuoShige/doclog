'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BookOpen, FileText, ChevronRight, Folder } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Document {
  slug: string
  title: string
  description?: string
  category: string
  tags: string[]
  published: boolean
  lastUpdated: string
}

interface DocumentsSidebarProps {
  documents: Document[]
  className?: string
}

export function DocumentsSidebar({ documents, className }: DocumentsSidebarProps) {
  const pathname = usePathname()
  
  // カテゴリ別にドキュメントをグループ化
  const documentsByCategory = documents.reduce((acc: Record<string, Document[]>, doc: Document) => {
    const category = doc.category || 'その他'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(doc)
    return acc
  }, {} as Record<string, Document[]>)

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
      case 'react':
      case 'next.js':
        return <FileText className="h-4 w-4" />
      case 'backend':
      case 'api':
        return <BookOpen className="h-4 w-4" />
      default:
        return <Folder className="h-4 w-4" />
    }
  }

  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            ドキュメント
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            技術ドキュメントとガイド
          </p>
        </div>
        
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="p-4 space-y-4">
            {Object.entries(documentsByCategory).map(([category, docs]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  {getCategoryIcon(category)}
                  {category}
                </div>
                
                <div className="ml-6 space-y-1">
                  {docs.map((doc: Document) => {
                    const isActive = pathname === `/doclog/documents/${doc.slug}`
                    
                    return (
                      <Link
                        key={doc.slug}
                        href={`/doclog/documents/${doc.slug}`}
                        className={`
                          block p-2 rounded-md text-sm transition-colors hover:bg-muted/50
                          ${isActive ? 'bg-muted border-l-2 border-primary' : ''}
                        `}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className={`font-medium ${isActive ? 'text-primary' : ''}`}>
                            {doc.title}
                          </span>
                          {isActive && <ChevronRight className="h-3 w-3 text-primary" />}
                        </div>
                        
                        {doc.description && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {doc.description}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-2 mt-2">
                          {doc.tags?.slice(0, 2).map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <Button asChild variant="outline" className="w-full">
            <Link href="/doclog/documents">
              <BookOpen className="h-4 w-4 mr-2" />
              全てのドキュメント
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
