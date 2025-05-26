import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getBlogPost, getBlogPosts, getRelatedBlogPosts } from '@/lib/blog'
import { BlogHeader } from '@/components/blog/blog-header'
import { BlogContent } from '@/components/blog/blog-content'
import { RelatedPosts } from '@/components/blog/related-posts'
import { ShareButtons } from '@/components/blog/share-buttons'
import { BlogNavigation } from '@/components/blog/blog-navigation'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { Container } from '@/components/layout/container'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// 静的パスの生成
export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// SEO最適化
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | ブログ`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    notFound()
  }

  const allPosts = getBlogPosts()
  const relatedPosts = getRelatedBlogPosts(post, 3)
  
  // 前後の記事を取得
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return (
    <Container>
      <div className="py-8">
        <article className="max-w-4xl mx-auto">
          {/* ブログヘッダー */}
          <BlogHeader post={post} />

          <div className="mt-8 lg:grid lg:grid-cols-4 lg:gap-8">
            {/* メインコンテンツ */}
            <div className="lg:col-span-3">
              <BlogContent post={post} />
              
              {/* シェアボタン */}
              <div className="mt-8 pt-8 border-t">
                <ShareButtons post={post} />
              </div>
            </div>

            {/* サイドバー */}
            <div className="mt-8 lg:mt-0 lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <TableOfContents />
              </div>
            </div>
          </div>

          {/* 前後のナビゲーション */}
          <div className="mt-12 pt-8 border-t">
            <BlogNavigation prevPost={prevPost} nextPost={nextPost} />
          </div>
        </article>

        {/* 関連記事 */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t">
            <RelatedPosts posts={relatedPosts} currentPostSlug={post.slug} />
          </div>
        )}
      </div>
    </Container>
  )
}
