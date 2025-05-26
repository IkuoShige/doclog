import { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { Typography } from '@/components/ui/typography'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Book, Calendar } from 'lucide-react'
import Link from 'next/link'
import { getPublishedDocuments, getDocumentCategories } from '@/lib/documents'

export const metadata: Metadata = {
  title: 'ドキュメント | Portfolio',
  description: '学習記録とナレッジベース - 技術ドキュメントのまとめ',
}

export default function DocumentsPage() {
  const documents = getPublishedDocuments()
  const categories = getDocumentCategories()

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
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <Typography variant="h1" className="text-3xl lg:text-4xl font-bold">
                ドキュメント
              </Typography>
            </div>
            <Typography variant="large" className="text-muted-foreground max-w-2xl">
              学習過程で作成した技術ドキュメントとナレッジベース。
              実装方法、ベストプラクティス、よく使うコマンドなどをまとめています。
            </Typography>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <Typography variant="h3" className="text-2xl font-bold text-primary mb-1">
                  {documents.length}
                </Typography>
                <Typography variant="small" className="text-muted-foreground">
                  ドキュメント
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Typography variant="h3" className="text-2xl font-bold text-primary mb-1">
                  {categories.length}
                </Typography>
                <Typography variant="small" className="text-muted-foreground">
                  カテゴリ
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Typography variant="h3" className="text-2xl font-bold text-primary mb-1">
                  {documents.filter(doc => doc.difficulty === 'beginner').length}
                </Typography>
                <Typography variant="small" className="text-muted-foreground">
                  初級レベル
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Typography variant="h3" className="text-2xl font-bold text-primary mb-1">
                  {documents.filter(doc => new Date(doc.lastUpdated) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                </Typography>
                <Typography variant="small" className="text-muted-foreground">
                  最近更新
                </Typography>
              </CardContent>
            </Card>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <Typography variant="h2" className="text-xl font-semibold mb-4">
              カテゴリ
            </Typography>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const count = documents.filter(doc => doc.category === category).length
                return (
                  <Badge key={category} variant="secondary" className="px-3 py-1">
                    {category} ({count})
                  </Badge>
                )
              })}
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <Card key={doc.slug} className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="outline" className="shrink-0">
                      {doc.category}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`shrink-0 ${getDifficultyColor(doc.difficulty)}`}
                    >
                      {getDifficultyLabel(doc.difficulty)}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {doc.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col flex-1">
                  <Typography variant="muted" className="text-sm mb-4 line-clamp-3 flex-1">
                    {doc.description}
                  </Typography>
                  
                  <div className="space-y-3">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {doc.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{doc.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(doc.lastUpdated).toLocaleDateString('ja-JP')}</span>
                      </div>
                      <Button asChild size="sm" variant="ghost">
                        <Link href={`/documents/${doc.slug}`}>
                          読む
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </main>
  )
}
