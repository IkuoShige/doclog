'use client'

import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import { BlogPost } from '@/types/mdx'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface RelatedPostsProps {
  posts: BlogPost[]
  currentPostSlug: string
  className?: string
}

export function RelatedPosts({ posts, currentPostSlug, className }: RelatedPostsProps) {
  const relatedPosts = posts.filter(post => post.slug !== currentPostSlug).slice(0, 3)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className={cn("", className)}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        関連記事
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <article
            key={post.slug}
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {post.readingTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readingTime.text}
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {post.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {post.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {post.category && (
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                  )}
                  {post.tags?.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
