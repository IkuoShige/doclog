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
    <Card className={cn('h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700', className)}>
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

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          {/* カテゴリバッジ */}
          {post.category && (
            <Badge variant="outline" className="text-xs">
              {post.category}
            </Badge>
          )}
        </div>

        {/* タイトル */}
        <h3 className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        {/* 説明 */}
        <p className="text-sm line-clamp-2">
          {post.description}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        {/* タグ */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* メタ情報 */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
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
      </CardContent>
    </Card>
  )
}
