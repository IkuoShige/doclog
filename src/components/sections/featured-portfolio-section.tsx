import { Container } from '@/components/layout/container'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { PortfolioCard } from '@/components/portfolio/portfolio-card'
import { getPortfolioProjects } from '@/lib/content'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function FeaturedPortfolioSection() {
  const featuredProjects = getPortfolioProjects()
    .filter(project => project.featured)
    .slice(0, 3) // 最新3件を取得
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            注目のプロジェクト
          </Typography>
          <Typography variant="large" className="text-muted-foreground max-w-2xl mx-auto">
            実際に開発した代表的なプロジェクトをご紹介します
          </Typography>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3 mb-12">
          {featuredProjects.map((project) => (
            <PortfolioCard
              key={project.slug}
              project={project}
            />
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/portfolio">
              すべてのプロジェクトを見る
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
