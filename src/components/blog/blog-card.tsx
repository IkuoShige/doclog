import Link from 'next/link'
import { BlogPost } from '@/types/mdx'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { Calendar, Clock, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
  className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Card className={cn('group hover:shadow-lg transition-all duration-300', className)}>
      {/* アイキャッチ画像 */}
      {post.image && (
        <div className="relative overflow-hidden rounded-t-lg">
          <OptimizedImage
            src={post.image}
            alt={post.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {post.featured && (
            <Badge className="absolute top-2 left-2">Featured</Badge>
          )}
        </div>
      )}

      <CardHeader className="space-y-2">
        {/* カテゴリバッジ */}
        {post.category && (
          <Badge variant="secondary" className="w-fit">
            {post.category}
          </Badge>
        )}

        {/* タイトル */}
        <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        {/* 説明 */}
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {post.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* タグ */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* メタ情報 */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            {/* 投稿日 */}
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <time dateTime={post.date}>{formattedDate}</time>
            </div>

            {/* 読了時間 */}
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readingTime.text}</span>
            </div>
          </div>

          {/* 著者 */}
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{post.author}</span>
          </div>
        </div>

        {/* 続きを読むリンク */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          続きを読む →
        </Link>
      </CardContent>
    </Card>
  )
}
