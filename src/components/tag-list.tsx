'use client'

import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Hash, TrendingUp, X } from 'lucide-react'

interface Tag {
  name: string
  count?: number
  isSelected?: boolean
}

interface TagListProps {
  tags: Tag[]
  onTagClick?: (tag: string) => void
  onTagRemove?: (tag: string) => void
  variant?: 'default' | 'filter' | 'cloud'
  showCount?: boolean
  showTrending?: boolean
  maxTags?: number
  className?: string
}

export function TagList({
  tags,
  onTagClick,
  onTagRemove,
  variant = 'default',
  showCount = false,
  showTrending = false,
  maxTags,
  className
}: TagListProps) {
  const [showAll, setShowAll] = React.useState(false)
  
  const displayedTags = maxTags && !showAll 
    ? tags.slice(0, maxTags) 
    : tags

  const sortedTags = showTrending 
    ? [...displayedTags].sort((a, b) => (b.count || 0) - (a.count || 0))
    : displayedTags

  const getTagSize = (count?: number) => {
    if (!count || !showTrending) return 'text-sm'
    if (count > 10) return 'text-lg'
    if (count > 5) return 'text-base'
    return 'text-sm'
  }

  const getTagOpacity = (count?: number) => {
    if (!count || !showTrending) return 'opacity-100'
    if (count > 10) return 'opacity-100'
    if (count > 5) return 'opacity-80'
    return 'opacity-60'
  }

  if (variant === 'cloud') {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="flex flex-wrap gap-2 justify-center">
          {sortedTags.map((tag) => (
            <button
              key={tag.name}
              onClick={() => onTagClick?.(tag.name)}
              className={cn(
                "transition-all duration-200 hover:scale-110 font-medium",
                getTagSize(tag.count),
                getTagOpacity(tag.count),
                tag.isSelected 
                  ? "text-primary hover:text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              #{tag.name}
              {showCount && tag.count && (
                <span className="ml-1 text-xs opacity-70">({tag.count})</span>
              )}
            </button>
          ))}
        </div>
        
        {maxTags && tags.length > maxTags && (
          <div className="text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? '少なく表示' : `すべて表示 (${tags.length - maxTags}個)`}
            </Button>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'filter') {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Hash className="h-4 w-4" />
          選択中のタグ
        </div>
        <div className="flex flex-wrap gap-1">
          {sortedTags.map((tag) => (
            <Badge
              key={tag.name}
              variant={tag.isSelected ? "default" : "secondary"}
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
              onClick={() => onTagRemove?.(tag.name)}
            >
              {tag.name}
              {showCount && tag.count && (
                <span className="ml-1">({tag.count})</span>
              )}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-2", className)}>
      {showTrending && (
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          人気のタグ
        </div>
      )}
      
      <div className="flex flex-wrap gap-1">
        {sortedTags.map((tag) => (
          <Badge
            key={tag.name}
            variant={tag.isSelected ? "default" : "secondary"}
            className={cn(
              "cursor-pointer transition-colors",
              tag.isSelected 
                ? "hover:bg-primary/80" 
                : "hover:bg-muted-foreground/20"
            )}
            onClick={() => onTagClick?.(tag.name)}
          >
            #{tag.name}
            {showCount && tag.count && (
              <span className="ml-1 opacity-70">({tag.count})</span>
            )}
          </Badge>
        ))}
      </div>
      
      {maxTags && tags.length > maxTags && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="mt-2"
        >
          {showAll ? '少なく表示' : `+${tags.length - maxTags}個のタグを表示`}
        </Button>
      )}
    </div>
  )
}
