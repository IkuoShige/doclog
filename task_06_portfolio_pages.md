# タスク6: ポートフォリオページ実装

## 🎯 目標
開発プロジェクトの作品集を魅力的に展示するポートフォリオページを実装する

## 📋 実行内容

### 1. ポートフォリオ一覧ページ（/portfolio）
- [ ] プロジェクト一覧のグリッド表示
- [ ] カテゴリによるフィルタリング
- [ ] 技術スタックによる絞り込み
- [ ] 注目プロジェクトの強調表示
- [ ] 並び替え機能（新しい順、人気順等）

### 2. プロジェクト詳細ページ（/portfolio/[slug]）
- [ ] プロジェクト概要とスクリーンショット
- [ ] 技術スタックの詳細説明
- [ ] 開発背景・課題・解決策
- [ ] デモリンク・GitHubリンク
- [ ] 学習・成長ポイント
- [ ] 関連プロジェクトの表示

### 3. カテゴリページ（/portfolio/category/[category]）
- [ ] カテゴリ別プロジェクト一覧
- [ ] カテゴリの説明・特徴
- [ ] 使用技術の傾向

### 4. 技術スタック別ページ（/portfolio/tech/[tech]）
- [ ] 特定技術を使用したプロジェクト一覧
- [ ] 技術の成長過程
- [ ] 関連技術の提案

### 5. 画像ギャラリー機能
- [ ] プロジェクトスクリーンショット表示
- [ ] ライトボックス機能
- [ ] レスポンシブ画像表示
- [ ] 画像最適化

## 🛠️ 技術詳細

### ディレクトリ構造
```
app/
├── portfolio/
│   ├── page.tsx                    # ポートフォリオ一覧
│   ├── [slug]/
│   │   └── page.tsx                # プロジェクト詳細
│   ├── category/
│   │   └── [category]/
│   │       └── page.tsx            # カテゴリ別一覧
│   └── tech/
│       └── [tech]/
│           └── page.tsx            # 技術別一覧

content/
└── portfolio/
    ├── project-1.mdx
    ├── project-2.mdx
    └── ...
```

### ポートフォリオ一覧ページ実装
```typescript
// app/portfolio/page.tsx
import { Suspense } from 'react'
import { getPortfolioItems } from '@/lib/content'
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid'
import { PortfolioFilter } from '@/components/portfolio/portfolio-filter'
import { PageHeader } from '@/components/page-header'
import { FeaturedSection } from '@/components/portfolio/featured-section'
import { PortfolioGridSkeleton } from '@/components/portfolio/portfolio-grid-skeleton'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ポートフォリオ | あなたの名前',
  description: 'Web開発プロジェクトの作品集です。React、Next.js、TypeScriptを使用した様々なアプリケーションをご紹介します。',
}

interface PortfolioPageProps {
  searchParams: {
    category?: string
    tech?: string
    sort?: string
  }
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const projects = await getPortfolioItems()
  const featuredProjects = projects.filter(project => project.featured)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="ポートフォリオ"
        description="これまでに開発したWebアプリケーションやプロジェクトをご紹介します"
      />
      
      {featuredProjects.length > 0 && (
        <FeaturedSection projects={featuredProjects} />
      )}
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">すべてのプロジェクト</h2>
        
        <div className="mb-8">
          <PortfolioFilter />
        </div>
        
        <Suspense fallback={<PortfolioGridSkeleton />}>
          <PortfolioGrid projects={projects} searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}
```

### プロジェクト詳細ページ実装
```typescript
// app/portfolio/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPortfolioItem, getPortfolioItems } from '@/lib/content'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/mdx-components'
import { ProjectHeader } from '@/components/portfolio/project-header'
import { ProjectGallery } from '@/components/portfolio/project-gallery'
import { TechStack } from '@/components/portfolio/tech-stack'
import { ProjectLinks } from '@/components/portfolio/project-links'
import { RelatedProjects } from '@/components/portfolio/related-projects'
import { Metadata } from 'next'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const projects = await getPortfolioItems()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getPortfolioItem(params.slug)
  
  if (!project) {
    return {}
  }

  return {
    title: `${project.title} | ポートフォリオ`,
    description: project.description,
    keywords: [...project.technologies, project.category],
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'website',
      images: project.images ? [{ url: project.images[0] }] : [],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getPortfolioItem(params.slug)
  
  if (!project) {
    notFound()
  }
  
  const allProjects = await getPortfolioItems()
  const relatedProjects = allProjects
    .filter(p => 
      p.slug !== project.slug && 
      (p.category === project.category || 
       p.technologies.some(tech => project.technologies.includes(tech)))
    )
    .slice(0, 3)

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <ProjectHeader project={project} />
        
        {project.images && project.images.length > 0 && (
          <div className="mt-8">
            <ProjectGallery images={project.images} title={project.title} />
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MDXRemote source={project.content} components={mdxComponents} />
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <TechStack technologies={project.technologies} />
            <ProjectLinks 
              demoUrl={project.demoUrl} 
              githubUrl={project.githubUrl}
              otherLinks={project.otherLinks}
            />
            
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-semibold mb-3">プロジェクト情報</h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-muted-foreground">カテゴリ</dt>
                  <dd>{project.category}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">開発期間</dt>
                  <dd>{project.duration || '約2-3週間'}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">チーム構成</dt>
                  <dd>{project.teamSize || '個人開発'}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">完成日</dt>
                  <dd>{new Date(project.date).toLocaleDateString('ja-JP')}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <RelatedProjects projects={relatedProjects} />
          </div>
        )}
      </div>
    </article>
  )
}
```

### ポートフォリオカードコンポーネント
```typescript
// components/portfolio/portfolio-card.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PortfolioItem } from '@/types/content'
import { ExternalLink, Github, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface PortfolioCardProps {
  project: PortfolioItem
  featured?: boolean
}

export function PortfolioCard({ project, featured = false }: PortfolioCardProps) {
  return (
    <Card className={`h-full hover:shadow-lg transition-all duration-300 ${featured ? 'ring-2 ring-primary' : ''}`}>
      {project.image && (
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="default" className="bg-primary">
                注目
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="line-clamp-2">
            <Link href={`/portfolio/${project.slug}`} className="hover:underline">
              {project.title}
            </Link>
          </CardTitle>
          <Badge variant="outline" className="text-xs whitespace-nowrap">
            {project.category}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {new Date(project.date).toLocaleDateString('ja-JP', { 
                year: 'numeric', 
                month: 'short' 
              })}
            </div>
            
            <div className="flex gap-2">
              {project.demoUrl && (
                <Button asChild size="sm" variant="outline">
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild size="sm" variant="outline">
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-3 w-3" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

### プロジェクトギャラリーコンポーネント
```typescript
// components/portfolio/project-gallery.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface ProjectGalleryProps {
  images: string[]
  title: string
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">プロジェクト画像</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Dialog key={index} open={isOpen && selectedImage === index} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <div 
                className="relative aspect-video cursor-pointer overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
                onClick={() => {
                  setSelectedImage(index)
                  setIsOpen(true)
                }}
              >
                <Image
                  src={image}
                  alt={`${title} - 画像 ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </DialogTrigger>
            
            <DialogContent className="max-w-5xl w-full h-full max-h-[90vh] p-0">
              <div className="relative w-full h-full flex items-center justify-center bg-black/90">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
                
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}
                
                <div className="relative w-full h-full">
                  <Image
                    src={images[selectedImage]}
                    alt={`${title} - 画像 ${selectedImage + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                  {selectedImage + 1} / {images.length}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}
```

### サンプルMDXプロジェクトファイル
```markdown
---
title: "Eコマースダッシュボード"
description: "Next.js + TypeScript + Prismaで構築した管理者向けEコマースダッシュボード"
category: "Webアプリケーション"
technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Chart.js"]
image: "/images/portfolio/ecommerce-dashboard/main.jpg"
images: [
  "/images/portfolio/ecommerce-dashboard/main.jpg",
  "/images/portfolio/ecommerce-dashboard/analytics.jpg",
  "/images/portfolio/ecommerce-dashboard/products.jpg"
]
demoUrl: "https://demo.example.com"
githubUrl: "https://github.com/yourusername/ecommerce-dashboard"
date: "2025-05-01"
featured: true
duration: "3週間"
teamSize: "個人開発"
---

# Eコマースダッシュボード

## 概要

このプロジェクトは、オンラインストアの管理者向けに開発したダッシュボードアプリケーションです。売上分析、商品管理、注文管理などの機能を提供し、ビジネスの成長をサポートします。

## 開発背景

### 課題
- 既存の管理システムが古く、モバイル対応が不十分
- 複数のツールを使い分ける必要があり、効率が悪い
- リアルタイムでの売上把握が困難

### 解決策
- モダンなWebテクノロジーを使用したSPA
- レスポンシブデザインによるマルチデバイス対応
- リアルタイムデータ更新機能

## 主な機能

### 📊 分析・レポート機能
- 売上推移グラフ
- 商品別売上ランキング
- 地域別売上分析
- カスタム期間での分析

### 🛍️ 商品管理
- 商品の追加・編集・削除
- 在庫管理
- カテゴリ管理
- 商品画像のアップロード

### 📦 注文管理
- 注文一覧・詳細表示
- 注文ステータス管理
- 出荷管理
- 顧客管理

## 技術的な特徴

### パフォーマンス最適化
- Server Componentsによる高速レンダリング
- データベースクエリの最適化
- 画像最適化とキャッシュ戦略

### ユーザビリティ
- 直感的なUI/UX設計
- アクセシビリティ対応
- ダークモード対応

### セキュリティ
- JWT認証
- RBAC（Role-Based Access Control）
- API Rate Limiting

## 学習・成長ポイント

このプロジェクトを通じて以下の技術やスキルを習得しました：

- **データベース設計**: 複雑なリレーションを持つDBスキーマの設計
- **状態管理**: Zustandを使用したグローバル状態管理
- **テスト**: Jest + Testing Libraryでのコンポーネントテスト
- **パフォーマンス**: React.memoやuseMemoを活用した最適化

## 今後の改善点

- [ ] PWA対応
- [ ] より詳細な分析機能
- [ ] 多言語対応
- [ ] モバイルアプリ版の開発
```

## ✅ 完了条件
- [ ] ポートフォリオ一覧ページが正常に表示される
- [ ] プロジェクト詳細ページでMDXが適切にレンダリングされる
- [ ] 画像ギャラリーが機能する
- [ ] フィルタリング機能が動作する
- [ ] レスポンシブデザインが適用されている
- [ ] SEO最適化が完了している
- [ ] 関連プロジェクトが表示される

## 📦 追加パッケージ
```bash
npm install @radix-ui/react-dialog  # ライトボックス用
npm install embla-carousel-react    # カルーセル（任意）
```

## 📝 備考
- 画像は適切なサイズと形式で準備
- プロジェクトの説明は具体的で分かりやすく
- 技術選定の理由も記載
- モバイルでの操作性を重視
- アクセシビリティ対応必須

---

**優先度**: 🔴 高
**所要時間**: 5-7時間
**前提タスク**: タスク2（MDX設定）、タスク3（UIコンポーネント）
**次のタスク**: タスク7（ガイドページ実装）
