'use client'

import { Container } from '@/components/layout/container'
import { Typography } from '@/components/ui/typography'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, FolderOpen } from 'lucide-react'
import { getBlogPosts } from '@/lib/blog'
import { getPublishedPortfolioProjects } from '@/lib/portfolio'

export function DashboardStats() {
  const blogPosts = getBlogPosts()
  const publishedPosts = blogPosts.filter(post => post.published)
  const publishedProjects = getPublishedPortfolioProjects()
  
  const stats = [
    {
      title: 'ブログ投稿',
      value: publishedPosts.length,
      icon: FileText,
      description: '技術ブログ記事',
    },
    {
      title: 'プロジェクト',
      value: publishedProjects.length,
      icon: FolderOpen,
      description: '学習・研究プロジェクト',
    },
  ]

  return (
    <section className="py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-md bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Typography variant="h3" className="text-2xl font-bold">
                        {stat.value}
                      </Typography>
                    </div>
                  </div>
                  <Typography variant="small" className="font-medium mb-1">
                    {stat.title}
                  </Typography>
                  <Typography variant="muted" className="text-xs">
                    {stat.description}
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
