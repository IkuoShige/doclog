import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { List, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  headings: TocItem[]
  activeId?: string
  className?: string
}

export function TableOfContents({ headings, activeId, className }: TableOfContentsProps) {
  if (headings.length === 0) {
    return null
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Card className={cn("sticky top-4", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <List className="h-4 w-4" />
          目次
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <nav className="space-y-1">
            {headings.map((heading) => {
              const isActive = activeId === heading.id
              const paddingLeft = (heading.level - 1) * 12 + 8
              
              return (
                <button
                  key={heading.id}
                  onClick={() => scrollToHeading(heading.id)}
                  className={cn(
                    "block w-full text-left text-sm transition-colors hover:text-primary",
                    "py-1.5 px-2 rounded-md hover:bg-muted/50",
                    isActive && "text-primary bg-muted border-l-2 border-primary font-medium"
                  )}
                  style={{ paddingLeft }}
                >
                  <div className="flex items-center gap-1">
                    {isActive && <ChevronRight className="h-3 w-3 flex-shrink-0" />}
                    <span className="line-clamp-2">{heading.title}</span>
                  </div>
                </button>
              )
            })}
          </nav>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

// MDXコンテンツから見出しを抽出するユーティリティ関数
export function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: TocItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    
    // IDを生成（特殊文字を除去してケバブケースに変換）
    const id = title
      .toLowerCase()
      .replace(/[^\w\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '')
    
    headings.push({
      id,
      title,
      level
    })
  }

  return headings
}
