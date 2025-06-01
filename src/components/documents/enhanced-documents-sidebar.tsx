'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { 
  BookOpen, 
  FileText, 
  ChevronRight, 
  ChevronDown,
  Folder, 
  Code,
  Zap,
  Database,
  Globe,
  Cpu,
  Layers
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface Document {
  slug: string
  title: string
  description?: string
  category: string
  tags: string[]
  published: boolean
  lastUpdated: string
}

interface EnhancedDocumentsSidebarProps {
  documents: Document[]
  className?: string
}

export function EnhancedDocumentsSidebar({ documents, className }: EnhancedDocumentsSidebarProps) {
  const pathname = usePathname()
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['プログラミング'])
  
  // カテゴリ別にドキュメントをグループ化
  const documentsByCategory = documents.reduce((acc: Record<string, Document[]>, doc: Document) => {
    const category = doc.category || 'その他'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(doc)
    return acc
  }, {} as Record<string, Document[]>)

  // カテゴリをアルファベット順にソート
  const sortedCategories = Object.keys(documentsByCategory).sort()

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'プログラミング':
      case 'programming':
        return <Code className="h-4 w-4" />
      case 'frontend':
      case 'フロントエンド':
        return <Globe className="h-4 w-4" />
      case 'backend':
      case 'バックエンド':
        return <Database className="h-4 w-4" />
      case 'react':
      case 'next.js':
        return <Zap className="h-4 w-4" />
      case '開発':
      case 'development':
        return <Cpu className="h-4 w-4" />
      case 'api':
        return <Layers className="h-4 w-4" />
      case 'ガイド':
      case 'guide':
        return <BookOpen className="h-4 w-4" />
      default:
        return <Folder className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'プログラミング':
      case 'programming':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
      case 'frontend':
      case 'フロントエンド':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
      case 'backend':
      case 'バックエンド':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
      case 'react':
      case 'next.js':
        return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300'
      case '開発':
      case 'development':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const isCurrentDocument = (slug: string) => {
    return pathname === `/documents/${slug}`
  }

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          ドキュメント一覧
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="space-y-2">
            {sortedCategories.map(category => {
              const categoryDocs = documentsByCategory[category]
              const isExpanded = expandedCategories.includes(category)
              const hasCurrentDoc = categoryDocs.some(doc => isCurrentDocument(doc.slug))

              return (
                <Collapsible 
                  key={category} 
                  open={isExpanded || hasCurrentDoc}
                  onOpenChange={() => toggleCategory(category)}
                >
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start p-2 h-auto group"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "p-1 rounded-md",
                            getCategoryColor(category)
                          )}>
                            {getCategoryIcon(category)}
                          </div>
                          <span className="font-medium text-sm">
                            {category}
                          </span>
                          <Badge variant="secondary" className="text-xs ml-1">
                            {categoryDocs.length}
                          </Badge>
                        </div>
                        {(isExpanded || hasCurrentDoc) ? (
                          <ChevronDown className="h-3 w-3 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="space-y-1 mt-1">
                    <div className="ml-6 space-y-1">
                      {categoryDocs
                        .sort((a, b) => a.title.localeCompare(b.title))
                        .map(doc => {
                          const isCurrent = isCurrentDocument(doc.slug)
                          
                          return (
                            <Link 
                              key={doc.slug}
                              href={`/documents/${doc.slug}`}
                              className={cn(
                                "block p-2 rounded-md text-sm transition-colors hover:bg-muted/50",
                                isCurrent 
                                  ? "bg-primary/10 text-primary border-l-2 border-primary font-medium" 
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              <div className="flex items-start gap-2">
                                <FileText className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <div className="font-medium leading-tight line-clamp-2">
                                    {doc.title}
                                  </div>
                                  {doc.description && (
                                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                      {doc.description}
                                    </div>
                                  )}
                                  <div className="text-xs text-muted-foreground mt-1">
                                    更新: {doc.lastUpdated}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          )
                        })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
