import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getBlogPosts } from '@/lib/blog'
import { Container } from '@/components/layout/container'
import { PageHeader } from '@/components/ui/page-header'
import { BlogGrid } from '@/components/blog/blog-grid'

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

export async function generateStaticParams() {
  const posts = getBlogPosts()
  const tags = Array.from(new Set(posts.flatMap(post => post.tags || [])))
  
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const decodedTag = decodeURIComponent(resolvedParams.tag)
  
  return {
    title: `${decodedTag} - タグ | ブログ`,
    description: `${decodedTag}タグの記事一覧です。`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params
  const decodedTag = decodeURIComponent(resolvedParams.tag)
  const allPosts = getBlogPosts()
  const posts = allPosts.filter(post => post.tags?.includes(decodedTag))

  if (posts.length === 0) {
    notFound()
  }

  return (
    <Container>
      <div className="py-8">
        <PageHeader
          title={`タグ: ${decodedTag}`}
          description={`${decodedTag}に関連する記事の一覧です。`}
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
