import { ReactNode } from 'react'
import { Container } from '@/components/layout/container'
import { Typography } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button'
import { ArrowLeft, Calendar, Tag, BookOpen, Clock, User } from 'lucide-react'
import Link from 'next/link'

interface DocumentLayoutProps {
  title: string
  description: string
  category: string
  tags: string[]
  lastUpdated: string
  readTime?: number
  author?: string
  children: ReactNode
}

export function DocumentLayout({
  title,
  description,
  category,
  tags,
  lastUpdated,
  readTime = 5,
  author = 'Admin',
  children
}: DocumentLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <Container>
          <div className="flex items-center py-4">
            <Button asChild variant="ghost" size="sm" className="mr-4">
              <Link href="/doclog/documents" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                ドキュメント一覧
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>{category}</span>
              <span>/</span>
              <span className="text-foreground font-medium">{title}</span>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8">
          <div className="max-w-4xl mx-auto">
            {/* Document Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="outline">{category}</Badge>
              </div>
              
              <Typography variant="h1" className="text-3xl lg:text-4xl font-bold mb-4">
                {title}
              </Typography>
              
              <Typography variant="large" className="text-muted-foreground mb-6">
                {description}
              </Typography>

              {/* Document Meta */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">最終更新:</span>
                      <span>{new Date(lastUpdated).toLocaleDateString('ja-JP')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">読了時間:</span>
                      <span>約{readTime}分</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">著者:</span>
                      <span>{author}</span>
                    </div>
                  </div>
                  
                  {tags.length > 0 && (
                    <>
                      <Separator className="my-4" />
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">タグ:</span>
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Document Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="document-content bg-card border rounded-lg p-6 lg:p-8">
                {children}
              </div>
            </div>

            {/* Back to top / Navigation */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex justify-between items-center">
                <Button asChild variant="outline">
                  <Link href="/doclog/documents">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    ドキュメント一覧に戻る
                  </Link>
                </Button>
                <ScrollToTopButton />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
