import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ContentItem } from '@/types/content'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { ExternalLink, Github, Calendar, Layers } from 'lucide-react'
import Image from 'next/image'

interface PortfolioCardProps {
  project: ContentItem
  showDate?: boolean
}

export function PortfolioCard({ project, showDate = true }: PortfolioCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group overflow-hidden">
      {project.image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
            <Link href={`/portfolio/${project.slug}`} className="hover:underline">
              {project.title}
            </Link>
          </CardTitle>
          {showDate && (
            <time 
              className="text-sm text-muted-foreground whitespace-nowrap flex items-center gap-1"
              title={formatDate(project.date)}
            >
              <Calendar className="h-3 w-3" />
              {new Date(project.date).getFullYear()}
            </time>
          )}
        </div>
        <CardDescription className="line-clamp-2 text-sm">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 技術スタック */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
              <Layers className="h-3 w-3" />
              技術スタック
            </div>
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{project.technologies.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {/* カテゴリタグ */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {/* アクションボタン */}
        <div className="flex gap-2 pt-2">
          {project.demoUrl && (
            <Button size="sm" variant="outline" asChild className="flex-1">
              <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                デモ
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button size="sm" variant="outline" asChild className="flex-1">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-3 w-3 mr-1" />
                コード
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
