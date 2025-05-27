import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPortfolioProjects } from '@/lib/portfolio';
import { PortfolioCard } from '@/components/portfolio/portfolio-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Code2, TrendingUp, Users, Calendar } from 'lucide-react';
import Link from 'next/link';

interface TechPageProps {
  params: Promise<{
    tech: string;
  }>;
}

// 技術情報の定義
const techInfo: Record<string, {
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  website?: string;
  learningPath?: string[];
}> = {
  'React': {
    name: 'React',
    description: 'Meta（旧Facebook）が開発したユーザーインターフェース構築のためのJavaScriptライブラリ',
    category: 'フロントエンド',
    icon: '⚛️',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    website: 'https://react.dev/',
    learningPath: ['JavaScript基礎', 'ES6+', 'JSX', 'Hook', 'State管理']
  },
  'Next.js': {
    name: 'Next.js',
    description: 'React用のフルスタックフレームワーク。SSR、SSG、ルーティングなどの機能を提供',
    category: 'フロントエンド',
    icon: '▲',
    color: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
    website: 'https://nextjs.org/',
    learningPath: ['React基礎', 'ルーティング', 'SSR/SSG', 'API Routes', 'デプロイ']
  },
  'TypeScript': {
    name: 'TypeScript',
    description: 'Microsoftが開発したJavaScriptに静的型付けを追加したプログラミング言語',
    category: '言語',
    icon: '🔷',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    website: 'https://www.typescriptlang.org/',
    learningPath: ['JavaScript基礎', '型システム', 'インターフェース', 'ジェネリクス', '設定']
  },
  'Node.js': {
    name: 'Node.js',
    description: 'ChromeのV8エンジンを使用したサーバーサイドJavaScript実行環境',
    category: 'バックエンド',
    icon: '🟢',
    color: 'bg-green-500/10 text-green-600 dark:text-green-400',
    website: 'https://nodejs.org/',
    learningPath: ['JavaScript基礎', 'モジュールシステム', 'npm', 'Express', 'データベース']
  },
  'Vue.js': {
    name: 'Vue.js',
    description: 'プログレッシブなJavaScriptフレームワーク、学習しやすく柔軟性が高い',
    category: 'フロントエンド',
    icon: '🟢',
    color: 'bg-green-500/10 text-green-600 dark:text-green-400',
    website: 'https://vuejs.org/',
    learningPath: ['JavaScript基礎', 'テンプレート', 'コンポーネント', 'Vuex', 'Vue Router']
  },
  'Firebase': {
    name: 'Firebase',
    description: 'Googleが提供するモバイル・ウェブアプリケーション開発プラットフォーム',
    category: 'バックエンド',
    icon: '🔥',
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    website: 'https://firebase.google.com/',
    learningPath: ['認証', 'Firestore', 'Hosting', 'Functions', 'Storage']
  }
};

export async function generateStaticParams() {
  const projects = getPortfolioProjects();
  const technologies = [...new Set(projects.flatMap(project => project.technologies))];
  
  return technologies.map((tech) => ({
    tech: encodeURIComponent(tech),
  }));
}

export async function generateMetadata({ params }: TechPageProps): Promise<Metadata> {
  const { tech: techParam } = await params;
  const tech = decodeURIComponent(techParam);
  const techData = techInfo[tech];
  const projects = getPortfolioProjects().filter(project => 
    project.technologies.includes(tech)
  );
  
  return {
    title: `${tech} | 技術別プロジェクト | Doclog`,
    description: techData 
      ? `${techData.description} ${projects.length}件のプロジェクトで使用しています。`
      : `${tech}を使用した${projects.length}件のプロジェクトをご紹介します。`,
    keywords: [tech, '技術スタック', 'プロジェクト', '開発'],
  };
}

export default async function TechPage({ params }: TechPageProps) {
  const { tech: techParam } = await params;
  const tech = decodeURIComponent(techParam);
  const projects = getPortfolioProjects().filter(project => 
    project.technologies.includes(tech)
  );

  if (projects.length === 0) {
    notFound();
  }

  const techData = techInfo[tech];
  
  // この技術と一緒に使われることが多い技術を分析
  const relatedTechs = projects
    .flatMap(project => project.technologies)
    .filter(t => t !== tech)
    .reduce((acc, t) => {
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const topRelatedTechs = Object.entries(relatedTechs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tech, count]) => ({ tech, count }));

  // プロジェクトを時系列で分析
  const projectsByYear = projects.reduce((acc, project) => {
    const year = new Date(project.date).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const timeline = Object.entries(projectsByYear)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .map(([year, count]) => ({ year: parseInt(year), count }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ナビゲーション */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/portfolio" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            ポートフォリオに戻る
          </Link>
        </Button>
      </div>

      {/* ページヘッダー */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${techData?.color || 'bg-gray-500/10 text-gray-600 dark:text-gray-400'} text-2xl`}>
            {techData?.icon || '⚡'}
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {techData?.name || tech}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">
                <Code2 className="h-3 w-3 mr-1" />
                {projects.length}件のプロジェクト
              </Badge>
              {techData?.category && (
                <Badge variant="secondary">
                  {techData.category}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {techData?.description && (
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {techData.description}
          </p>
        )}

        {techData?.website && (
          <div className="mt-4">
            <Button variant="outline" asChild>
              <Link href={techData.website} target="_blank" rel="noopener noreferrer">
                公式サイト
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* 技術情報と統計 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {/* 使用実績 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5" />
              使用実績
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">総プロジェクト数</span>
                <span className="font-semibold">{projects.length}件</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">最新使用</span>
                <span className="font-semibold">
                  {new Date(Math.max(...projects.map(p => new Date(p.date).getTime())))
                    .toLocaleDateString('ja-JP', { year: 'numeric', month: 'short' })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">初回使用</span>
                <span className="font-semibold">
                  {new Date(Math.min(...projects.map(p => new Date(p.date).getTime())))
                    .toLocaleDateString('ja-JP', { year: 'numeric', month: 'short' })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 関連技術 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5" />
              よく組み合わせる技術
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topRelatedTechs.map(({ tech: relatedTech, count }) => (
                <div key={relatedTech} className="flex justify-between items-center">
                  <Link 
                    href={`/portfolio/tech/${encodeURIComponent(relatedTech)}`}
                    className="text-sm hover:text-primary hover:underline"
                  >
                    {relatedTech}
                  </Link>
                  <Badge variant="outline" className="text-xs">
                    {count}回
                  </Badge>
                </div>
              ))}
              {topRelatedTechs.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  他の技術との組み合わせデータがありません
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 使用履歴 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5" />
              年別使用回数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {timeline.map(({ year, count }) => (
                <div key={year} className="flex justify-between items-center">
                  <span className="text-sm">{year}年</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ 
                          width: `${(count / Math.max(...timeline.map(t => t.count))) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 学習パス（技術情報がある場合） */}
      {techData?.learningPath && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">学習パス</h2>
          <Card>
            <CardHeader>
              <CardTitle>{techData.name}の習得ステップ</CardTitle>
              <CardDescription>
                効率的な学習のための推奨ステップです
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techData.learningPath.map((step, index) => (
                  <div key={step} className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      {step}
                    </Badge>
                    {index < (techData.learningPath?.length || 0) - 1 && (
                      <span className="text-muted-foreground">→</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* プロジェクト一覧 */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">{tech}を使用したプロジェクト</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <PortfolioCard 
              key={project.slug} 
              project={project}
            />
          ))}
        </div>
      </div>

      {/* 関連技術への誘導 */}
      {topRelatedTechs.length > 0 && (
        <div className="mt-16 pt-8 border-t border-border">
          <h3 className="text-xl font-semibold mb-6">関連技術を見る</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topRelatedTechs.slice(0, 3).map(({ tech: relatedTech }) => {
              const relatedProjects = getPortfolioProjects().filter(p => 
                p.technologies.includes(relatedTech)
              );
              const relatedTechData = techInfo[relatedTech];
              
              return (
                <Link
                  key={relatedTech}
                  href={`/portfolio/tech/${encodeURIComponent(relatedTech)}`}
                  className="block p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${relatedTechData?.color || 'bg-gray-500/10 text-gray-600 dark:text-gray-400'} text-sm`}>
                      {relatedTechData?.icon || '⚡'}
                    </div>
                    <div>
                      <h4 className="font-medium">{relatedTech}</h4>
                      <p className="text-sm text-muted-foreground">
                        {relatedProjects.length}件のプロジェクト
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
