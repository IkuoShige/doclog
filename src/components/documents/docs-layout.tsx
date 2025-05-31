import { ReactNode } from 'react';
import { Container } from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button';
import { TableOfContents } from '@/components/ui/table-of-contents';
import { DocPageNavigation } from '@/components/documents/doc-page-navigation';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Calendar, Tag, Clock, User } from 'lucide-react';
import { generateToc, TocItem } from '@/lib/toc';

interface DocsLayoutProps {
  title: string;
  description: string;
  category: string;
  tags: string[];
  lastUpdated: string;
  readTime?: number;
  author?: string;
  content: string; // MDXのraw content
  children: ReactNode;
  previousPage?: { title: string; href: string };
  nextPage?: { title: string; href: string };
}

export function DocsLayout({
  title,
  description,
  category,
  tags,
  lastUpdated,
  readTime = 5,
  author = 'Admin',
  content,
  children,
  previousPage,
  nextPage,
}: DocsLayoutProps) {
  // 目次を生成
  const toc: TocItem[] = generateToc(content);

  const breadcrumbItems = [
    { label: 'ドキュメント', href: '/doclog/documents' },
    { label: title }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <Container>
          <div className="py-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </Container>
      </div>

      <div className="flex">
        <div className="flex-1">
          <Container>
            <div className="flex gap-8 py-8">
              {/* メインコンテンツ */}
              <main className="flex-1 min-w-0">
                {/* ドキュメントヘッダー */}
                <header className="mb-8">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  </div>
                  
                  <h1 className="text-3xl font-bold tracking-tight mb-4">
                    {title}
                  </h1>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    {description}
                  </p>

                  {/* メタ情報 */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(lastUpdated).toLocaleDateString('ja-JP')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{readTime}分で読める</span>
                    </div>
                  </div>

                  {/* タグ */}
                  {tags.length > 0 && (
                    <div className="flex items-center gap-2 mt-4">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </header>

                <Separator className="mb-8" />

                {/* ドキュメントコンテンツ */}
                <article className="prose prose-lg dark:prose-invert max-w-none">
                  {children}
                </article>

                {/* ページナビゲーション */}
                <DocPageNavigation 
                  previousPage={previousPage} 
                  nextPage={nextPage} 
                />
              </main>

              {/* サイドバー（目次） */}
              <aside className="hidden xl:block w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-6">
                  {/* 目次 */}
                  {toc.length > 0 && (
                    <Card>
                      <CardContent className="p-4">
                        <TableOfContents toc={toc} />
                      </CardContent>
                    </Card>
                  )}

                  {/* ドキュメント情報 */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm mb-3">ドキュメント情報</h4>
                      <dl className="space-y-2 text-sm">
                        <div>
                          <dt className="text-muted-foreground">カテゴリ</dt>
                          <dd className="font-medium">{category}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">最終更新</dt>
                          <dd className="font-medium">
                            {new Date(lastUpdated).toLocaleDateString('ja-JP')}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">読了時間</dt>
                          <dd className="font-medium">{readTime}分</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">作成者</dt>
                          <dd className="font-medium">{author}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>
              </aside>
            </div>
          </Container>
        </div>
      </div>

      <ScrollToTopButton />
    </div>
  );
}
