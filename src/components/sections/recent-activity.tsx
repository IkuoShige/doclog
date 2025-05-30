import { Container } from '@/components/layout/container'
import { Typography } from '@/components/ui/typography'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { getRecentBlogPosts, getRecentPortfolioProjects } from '@/lib/mdx-content'

export function RecentActivity() {
  const recentPosts = getRecentBlogPosts(3)
  const recentProjects = getRecentPortfolioProjects(3)

  return (
    <section className="py-8">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Blog Posts */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h2" className="text-xl font-semibold">
                最近のブログ投稿
              </Typography>
              <Link 
                href="/blog" 
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                すべて見る
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <Card key={post.slug} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                          <Typography variant="h4" className="font-medium mb-1 line-clamp-1">
                            {post.title}
                          </Typography>
                        </Link>
                        <Typography variant="muted" className="text-sm mb-2 line-clamp-2">
                          {post.description}
                        </Typography>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(post.date).toLocaleDateString('ja-JP')}</span>
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h2" className="text-xl font-semibold">
                最近のプロジェクト
              </Typography>
              <Link 
                href="/portfolio" 
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                すべて見る
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <Card key={project.slug} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <Link href={`/portfolio/${project.slug}`} className="hover:text-primary transition-colors">
                      <Typography variant="h4" className="font-medium mb-1 line-clamp-1">
                        {project.title}
                      </Typography>
                    </Link>
                    <Typography variant="muted" className="text-sm mb-2 line-clamp-2">
                      {project.description}
                    </Typography>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 flex-wrap">
                        {project.technologies.slice(0, 2).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 2}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(project.date).toLocaleDateString('ja-JP')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
