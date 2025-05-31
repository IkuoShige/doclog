import { getBlogPosts, getAllBlogTags, getAllBlogCategories } from '@/lib/blog'
import { PageHeader } from '@/components/ui/page-header'
import { Container } from '@/components/layout/container'
import { BlogPageClient } from '@/components/blog/blog-page-client'
import { Suspense } from 'react'

export default async function BlogPage() {
  // サーバーサイドで全ての記事、タグ、カテゴリを取得
  const allPosts = getBlogPosts().filter(post => post.published)
  const allTags = getAllBlogTags()
  const allCategories = getAllBlogCategories()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="py-12">
        <PageHeader
          title="ブログ"
          description="ソフトウェア開発やプログラミングに関する技術記事を公開しています"
        />
        
        <div className="mt-8">
          {/* クライアントコンポーネントに記事データ、タグ、カテゴリを渡す */}
          <Suspense fallback={<div>Loading...</div>}>
            <BlogPageClient 
              initialPosts={allPosts} 
              allTags={allTags}
              allCategories={allCategories}
            />
          </Suspense>
        </div>
        </div>
      </Container>
    </div>
  )
}
