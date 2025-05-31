import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import { Document } from '@/types/mdx'

interface DocumentCardProps {
  document: Document
  className?: string
}

export function DocumentCard({ document, className }: DocumentCardProps) {
  return (
    <Link href={`/doclog/documents/${document.slug}`} className={className}>
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {document.category}
            </Badge>
          </div>
          
          <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {document.title}
          </CardTitle>
          
          <CardDescription className="text-sm line-clamp-2">
            {document.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          {/* タグ */}
          {document.tags && document.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {document.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {document.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{document.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* メタ情報 */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{document.lastUpdated}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
