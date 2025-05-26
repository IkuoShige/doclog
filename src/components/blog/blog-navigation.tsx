'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BlogPost } from '@/types/mdx'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BlogNavigationProps {
  prevPost?: BlogPost | null
  nextPost?: BlogPost | null
  className?: string
}

export function BlogNavigation({ prevPost, nextPost, className }: BlogNavigationProps) {
  if (!prevPost && !nextPost) {
    return null
  }

  return (
    <nav className={cn("flex justify-between items-center gap-4", className)}>
      <div className="flex-1">
        {prevPost && (
          <Link href={`/blog/${prevPost.slug}`}>
            <Button
              variant="outline"
              className="h-auto p-4 w-full justify-start text-left group"
            >
              <div className="flex items-start gap-3">
                <ChevronLeft className="h-5 w-5 mt-0.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    前の記事
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                    {prevPost.title}
                  </p>
                </div>
              </div>
            </Button>
          </Link>
        )}
      </div>

      <div className="flex-1">
        {nextPost && (
          <Link href={`/blog/${nextPost.slug}`}>
            <Button
              variant="outline"
              className="h-auto p-4 w-full justify-end text-right group"
            >
              <div className="flex items-start gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    次の記事
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                    {nextPost.title}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 mt-0.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </Button>
          </Link>
        )}
      </div>
    </nav>
  )
}
