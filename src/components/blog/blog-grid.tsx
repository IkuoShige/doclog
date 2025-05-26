'use client'

import { useState } from 'react'
import { BlogPost } from '@/types/mdx'
import { BlogCard } from './blog-card'
import { BlogPagination } from './blog-pagination'

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // ページング処理
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = posts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // スクロールトップ
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium text-foreground mb-2">
            記事が見つかりませんでした
          </h3>
          <p className="text-muted-foreground">
            検索条件を変更して再度お試しください。
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 記事グリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* ページング */}
      {totalPages > 1 && (
        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* 結果統計 */}
      <div className="text-center text-sm text-muted-foreground">
        {posts.length}件の記事が見つかりました
      </div>
    </div>
  )
}
