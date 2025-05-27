import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPortfolioProjectsByCategory, getPortfolioProjects } from '@/lib/portfolio';
import { PortfolioCard } from '@/components/portfolio/portfolio-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FolderOpen } from 'lucide-react';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// カテゴリ情報の定義
const categoryInfo: Record<string, { 
  title: string; 
  description: string; 
  icon: string;
  color: string;
}> = {
  'ウェブアプリ': {
    title: 'ウェブアプリケーション',
    description: 'React、Next.js、Vue.jsなどのモダンなフレームワークを使用したウェブアプリケーション開発プロジェクトです。',
    icon: '🌐',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
  },
  'モバイルアプリ': {
    title: 'モバイルアプリケーション',
    description: 'React Native、Flutter、iOS/Androidネイティブアプリの開発プロジェクトです。',
    icon: '📱',
    color: 'bg-green-500/10 text-green-600 dark:text-green-400'
  },
  'API・バックエンド': {
    title: 'API・バックエンド',
    description: 'Node.js、Express、FastAPI、GraphQLなどのバックエンド技術を使用したプロジェクトです。',
    icon: '⚡',
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
  },
  'ツール・ライブラリ': {
    title: 'ツール・ライブラリ',
    description: '開発効率化ツール、オープンソースライブラリ、CLIツールなどの開発プロジェクトです。',
    icon: '🛠️',
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
  },
  'デスクトップアプリ': {
    title: 'デスクトップアプリケーション',
    description: 'Electron、Tauri、.NETなどのデスクトップアプリケーション開発プロジェクトです。',
    icon: '💻',
    color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
  }
};

export async function generateStaticParams() {
  const projects = getPortfolioProjects();
  const categories = [...new Set(projects.map(project => project.category))];
  
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categoryParam } = await params;
  const category = decodeURIComponent(categoryParam);
  const categoryData = categoryInfo[category];
  const projects = getPortfolioProjectsByCategory(category);
  
  if (!categoryData || projects.length === 0) {
    return {};
  }

  return {
    title: `${categoryData.title} | ポートフォリオ | Doclog`,
    description: `${categoryData.description} ${projects.length}件のプロジェクトをご紹介します。`,
    keywords: [category, 'ポートフォリオ', '開発プロジェクト'],
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryParam } = await params;
  const category = decodeURIComponent(categoryParam);
  const projects = getPortfolioProjectsByCategory(category);
  const categoryData = categoryInfo[category];

  if (!categoryData || projects.length === 0) {
    notFound();
  }

  // カテゴリ内で使用されている技術スタックを集計
  const technologies = [...new Set(projects.flatMap(project => project.technologies))];

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
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${categoryData.color} text-2xl`}>
            {categoryData.icon}
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {categoryData.title}
            </h1>
            <Badge variant="outline" className="mt-2">
              <FolderOpen className="h-3 w-3 mr-1" />
              {projects.length}件のプロジェクト
            </Badge>
          </div>
        </div>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          {categoryData.description}
        </p>

        {/* 使用技術の概要 */}
        <div className="bg-muted/50 dark:bg-muted/20 rounded-lg p-6 max-w-4xl mx-auto">
          <h3 className="font-semibold mb-3 text-left">このカテゴリで使用している主な技術</h3>
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 10).map((tech) => (
              <Badge key={tech} variant="secondary" asChild>
                <Link 
                  href={`/portfolio/tech/${encodeURIComponent(tech)}`}
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tech}
                </Link>
              </Badge>
            ))}
            {technologies.length > 10 && (
              <Badge variant="outline">
                +{technologies.length - 10}個の技術
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* プロジェクト一覧 */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">プロジェクト一覧</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <PortfolioCard 
              key={project.slug} 
              project={project}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-xl font-semibold mb-2">プロジェクトが見つかりません</h3>
            <p className="text-muted-foreground">
              このカテゴリにはまだプロジェクトがありません。
            </p>
          </div>
        )}
      </div>

      {/* 関連カテゴリ */}
      <div className="mt-16 pt-8 border-t border-border">
        <h3 className="text-xl font-semibold mb-6">他のカテゴリも見る</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(categoryInfo)
            .filter(([cat]) => cat !== category)
            .slice(0, 3)
            .map(([cat, info]) => {
              const catProjects = getPortfolioProjectsByCategory(cat);
              return (
                <Link
                  key={cat}
                  href={`/portfolio/category/${encodeURIComponent(cat)}`}
                  className="block p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${info.color} text-sm`}>
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{info.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {catProjects.length}件のプロジェクト
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
