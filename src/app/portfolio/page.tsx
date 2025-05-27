import { Suspense } from 'react';
import { getPortfolioProjects } from '@/lib/content';
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid';
import { PortfolioCard } from '@/components/portfolio/portfolio-card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ポートフォリオ | Doclog',
  description: 'Web開発プロジェクトの作品集です。React、Next.js、TypeScriptを使用した様々なアプリケーションをご紹介します。',
  keywords: ['ポートフォリオ', 'Web開発', 'React', 'Next.js', 'TypeScript'],
};

function PortfolioGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
      ))}
    </div>
  );
}

export default function PortfolioPage() {
  const projects = getPortfolioProjects();
  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ページヘッダー */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          プロジェクト
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          これまでに開発したソフトウェアやプロジェクトをご紹介します
          {/* これまでに開発したWebアプリケーションやプロジェクトをご紹介します */}
        </p>
      </div>

      {/* 注目プロジェクトセクション */}
      {featuredProjects.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">注目プロジェクト</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <PortfolioCard 
                key={project.slug} 
                project={project} 
                featured={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* すべてのプロジェクト */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">すべてのプロジェクト</h2>
        
        <Suspense fallback={<PortfolioGridSkeleton />}>
          <PortfolioGrid projects={projects} />
        </Suspense>
      </div>
    </div>
  );
}
