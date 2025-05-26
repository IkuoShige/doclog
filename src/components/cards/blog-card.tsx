import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BlogPost } from '@/types/mdx'
import Link from 'next/link'
import { formatDate, formatRelativeDate } from '@/lib/utils'
import { Calendar, Clock } from 'lucide-react'

interface BlogCardProps {
  post: BlogPost
  showAuthor?: boolean
  showReadingTime?: boolean
}

export function BlogCard({ post, showAuthor = true, showReadingTime = true }: BlogCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </CardTitle>
          <time 
            className="text-sm text-muted-foreground whitespace-nowrap flex items-center gap-1"
            title={formatDate(post.date)}
          >
            <Calendar className="h-3 w-3" />
            {formatRelativeDate(post.date)}
          </time>
        </div>
        <CardDescription className="line-clamp-2 text-sm">
          {post.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {post.tags && post.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {post.tags && post.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {showAuthor && post.author && (
            <div className="flex items-center gap-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src="" alt={post.author} />
                <AvatarFallback className="text-xs">
                  {post.author.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs">{post.author}</span>
            </div>
          )}
          
          {showReadingTime && post.readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="text-xs">{post.readingTime.text}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
