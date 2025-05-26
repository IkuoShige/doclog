import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getBlogPosts } from '@/lib/blog'
import { Container } from '@/components/layout/container'
import { PageHeader } from '@/components/ui/page-header'
import { BlogGrid } from '@/components/blog/blog-grid'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateStaticParams() {
  const posts = getBlogPosts()
  const categories = Array.from(new Set(posts.map(post => post.category).filter(Boolean))) as string[]
  
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const decodedCategory = decodeURIComponent(resolvedParams.category)
  
  return {
    title: `${decodedCategory} - カテゴリ | ブログ`,
    description: `${decodedCategory}カテゴリの記事一覧です。`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params
  const decodedCategory = decodeURIComponent(resolvedParams.category)
  const allPosts = getBlogPosts()
  const posts = allPosts.filter(post => post.category === decodedCategory)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <Container>
      <div className="py-8">
        <PageHeader
          title={`カテゴリ: ${decodedCategory}`}
          description={`${decodedCategory}に関連する記事の一覧です。`}
        />
        
        <div className="mt-8">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {posts.length}件の記事が見つかりました
          </p>
          
          <BlogGrid posts={posts} />
        </div>
      </div>
    </Container>
  )
}
