import { Container } from '@/components/layout/container'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { BlogCard } from '@/components/blog/blog-card'
import { getBlogPosts } from '@/lib/content'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function LatestBlogSection() {
  const blogPosts = getBlogPosts().slice(0, 3) // 最新3件を取得

  return (
    <section className="py-16 bg-gray-50/50 dark:bg-gray-900/50">
      <Container>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            最新のブログ記事
          </Typography>
          <Typography variant="muted" className="text-lg max-w-2xl mx-auto">
            開発に関する最新の技術記事やチュートリアルをお届けします
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
            />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/blog">
              すべての記事を見る
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
