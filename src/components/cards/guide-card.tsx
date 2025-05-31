import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ContentItem } from '@/types/content'
import Link from 'next/link'
import { formatDate, formatRelativeDate } from '@/lib/utils'
import { BookOpen, Clock, Users } from 'lucide-react'

interface GuideCardProps {
  guide: ContentItem
  showReadingTime?: boolean
}

export function GuideCard({ guide, showReadingTime = true }: GuideCardProps) {

  return (
    <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            <Link href={`/guides/${guide.slug}`} className="hover:underline flex items-start gap-2">
              <BookOpen className="h-5 w-5 mt-0.5 flex-shrink-0" />
              {guide.title}
            </Link>
          </CardTitle>
          <time 
            className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap"
            title={formatDate(guide.date)}
          >
            {formatRelativeDate(guide.date)}
          </time>
        </div>
        <CardDescription className="text-sm line-clamp-2">
          {guide.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* メタ情報 */}
        <div className="flex items-center justify-between text-sm mb-4">
          {showReadingTime && guide.readingTime && (
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3" />
              <span className="text-xs">{guide.readingTime}分</span>
            </div>
          )}
        </div>
        
        {/* タグ */}
        <div className="flex flex-wrap gap-1 mb-4">
          {guide.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {guide.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{guide.tags.length - 3}
            </Badge>
          )}
        </div>
        
        {/* 技術スタック（もしある場合） */}
        {guide.technologies && guide.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {guide.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs bg-primary/10 text-primary">
                {tech}
              </Badge>
            ))}
          </div>
        )}
        
        {/* 人気度指標（仮想的な指標） */}
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-2 border-t">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{Math.floor(Math.random() * 1000) + 100}人が読了</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
