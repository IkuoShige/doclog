import { BlogPost } from '@/types/mdx'
import { Badge } from '@/components/ui/badge'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface BlogHeaderProps {
  post: BlogPost
}

export function BlogHeader({ post }: BlogHeaderProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="space-y-6">
      {/* ブログ一覧に戻るボタン */}
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            ブログ一覧に戻る
          </Link>
        </Button>
      </div>

      {/* カテゴリとフィーチャーバッジ */}
      <div className="flex items-center gap-2">
        {post.category && (
          <Badge variant="secondary">{post.category}</Badge>
        )}
        {post.featured && (
          <Badge>Featured</Badge>
        )}
      </div>

      {/* タイトル */}
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
        {post.title}
      </h1>

      {/* 説明 */}
      <p className="text-xl text-muted-foreground leading-relaxed">
        {post.description}
      </p>

      {/* メタ情報 */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{post.author}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.date}>{formattedDate}</time>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{post.readingTime.text}</span>
        </div>
      </div>

      {/* タグ */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* アイキャッチ画像 */}
      {post.image && (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <OptimizedImage
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
    </header>
  )
}
