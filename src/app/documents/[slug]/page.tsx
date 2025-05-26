import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/container'
import { Typography } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, Tag, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { getDocumentBySlug, getPublishedDocuments } from '@/lib/documents'

interface DocumentPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const documents = getPublishedDocuments()
  return documents.map((doc) => ({
    slug: doc.slug,
  }))
}

export async function generateMetadata({ params }: DocumentPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const document = getDocumentBySlug(resolvedParams.slug)
  
  if (!document) {
    return {
      title: 'ドキュメントが見つかりません | Portfolio',
    }
  }

  return {
    title: `${document.title} | Documents`,
    description: document.description,
  }
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const resolvedParams = await params
  const document = getDocumentBySlug(resolvedParams.slug)

  if (!document || !document.published) {
    notFound()
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '初級'
      case 'intermediate':
        return '中級'
      case 'advanced':
        return '上級'
      default:
        return difficulty
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Container>
        <div className="py-8 lg:py-12">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/documents">
                <ArrowLeft className="mr-2 h-4 w-4" />
                ドキュメント一覧に戻る
              </Link>
            </Button>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="outline">
                {document.category}
              </Badge>
              <Badge 
                variant="outline" 
                className={getDifficultyColor(document.difficulty)}
              >
                {getDifficultyLabel(document.difficulty)}
              </Badge>
            </div>

            <Typography variant="h1" className="text-3xl lg:text-4xl font-bold mb-4">
              {document.title}
            </Typography>

            <Typography variant="large" className="text-muted-foreground mb-6">
              {document.description}
            </Typography>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>最終更新: {new Date(document.lastUpdated).toLocaleDateString('ja-JP')}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {document.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Content Placeholder */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <Typography variant="large" className="mb-2">
                    ドキュメント内容
                  </Typography>
                  <Typography variant="muted">
                    このドキュメントの詳細内容がここに表示されます。<br />
                    実際の実装では MDX コンテンツがレンダリングされます。
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  )
}
