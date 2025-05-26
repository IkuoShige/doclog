'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { getAllTags, getBlogPosts } from '@/lib/blog'
import { cn } from '@/lib/utils'

interface TagCloudProps {
  className?: string
  maxTags?: number
}

export function TagCloud({ className, maxTags = 20 }: TagCloudProps) {
  const allPosts = getBlogPosts()
  const allTags = getAllTags()

  // タグごとの使用回数を計算
  const tagCounts = allTags.map(tag => {
    const count = allPosts.filter(post => 
      post.tags?.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
    ).length
    return { tag, count }
  })

  // 使用回数でソートして上位を取得
  const sortedTags = tagCounts
    .sort((a, b) => b.count - a.count)
    .slice(0, maxTags)

  // フォントサイズを計算（最小: 0.75rem, 最大: 1.25rem）
  const maxCount = Math.max(...sortedTags.map(t => t.count))
  const minCount = Math.min(...sortedTags.map(t => t.count))
  
  const getFontSize = (count: number) => {
    if (maxCount === minCount) return 'text-sm'
    const ratio = (count - minCount) / (maxCount - minCount)
    if (ratio > 0.8) return 'text-lg'
    if (ratio > 0.6) return 'text-base'
    if (ratio > 0.4) return 'text-sm'
    return 'text-xs'
  }

  const getOpacity = (count: number) => {
    if (maxCount === minCount) return 'opacity-100'
    const ratio = (count - minCount) / (maxCount - minCount)
    if (ratio > 0.8) return 'opacity-100'
    if (ratio > 0.6) return 'opacity-90'
    if (ratio > 0.4) return 'opacity-80'
    return 'opacity-70'
  }

  if (sortedTags.length === 0) {
    return null
  }

  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="text-lg font-semibold">タグ</h3>
      <div className="flex flex-wrap gap-2">
        {sortedTags.map(({ tag, count }) => (
          <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`}>
            <Badge
              variant="outline"
              className={cn(
                'cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors',
                getFontSize(count),
                getOpacity(count)
              )}
            >
              {tag}
              <span className="ml-1 text-xs opacity-70">({count})</span>
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}
