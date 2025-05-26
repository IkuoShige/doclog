# タスク4: ホームページ実装

## 🎯 目標
サイトのエントリーポイントとなる魅力的で情報豊富なホームページを実装する

## 📋 実行内容

### 1. ヒーローセクションの実装
- [x] 自己紹介とキャッチフレーズ
- [x] プロフィール画像
- [x] CTAボタン（ポートフォリオ・お問い合わせ）
- [x] ソーシャルリンク
- [x] アニメーション効果

### 2. 最新ブログ記事セクション
- [x] 最新記事3件の表示
- [x] BlogCardコンポーネントの活用
- [x] 「すべての記事を見る」リンク
- [x] レスポンシブグリッドレイアウト

### 3. 注目ポートフォリオセクション
- [x] 厳選されたプロジェクト2-3件
- [x] PortfolioCardコンポーネントの活用
- [x] 技術スタック表示
- [x] 「すべてのプロジェクトを見る」リンク

### 4. スキル・技術セクション
- [x] 使用技術のタググリッド
- [x] 熟練度や経験年数の表示
- [x] カテゴリ別分類（フロントエンド、バックエンド等）
- [x] ビジュアル的な表現

### 5. 簡単な経歴セクション
- [x] タイムライン形式の経歴
- [x] 主要な経験・成果
- [x] 詳細プロフィールへのリンク

### 6. お問い合わせCTAセクション
- [x] コンタクトフォームへの誘導
- [x] SNSリンク
- [x] レスポンス時間の目安

## 🛠️ 技術詳細

### ページ構造
```typescript
// app/page.tsx
import { HeroSection } from '@/components/sections/hero-section'
import { LatestBlogSection } from '@/components/sections/latest-blog-section'
import { FeaturedPortfolioSection } from '@/components/sections/featured-portfolio-section'
import { SkillsSection } from '@/components/sections/skills-section'
import { ExperienceSection } from '@/components/sections/experience-section'
import { ContactCTASection } from '@/components/sections/contact-cta-section'
import { getBlogPosts, getPortfolioItems } from '@/lib/content'

export default async function HomePage() {
  const latestPosts = await getBlogPosts().then(posts => posts.slice(0, 3))
  const featuredProjects = await getPortfolioItems().then(items => 
    items.filter(item => item.featured).slice(0, 3)
  )

  return (
    <div className="flex flex-col gap-20 py-10">
      <HeroSection />
      <LatestBlogSection posts={latestPosts} />
      <FeaturedPortfolioSection projects={featuredProjects} />
      <SkillsSection />
      <ExperienceSection />
      <ContactCTASection />
    </div>
  )
}
```

### ヒーローセクション例
```typescript
// components/sections/hero-section.tsx
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge variant="outline" className="w-fit">
              👋 Welcome to my portfolio
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              フルスタック開発者
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              モダンなWeb技術を使って、ユーザー体験を重視したアプリケーションを開発しています。
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/portfolio">
                <ExternalLink className="mr-2 h-4 w-4" />
                ポートフォリオを見る
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                お問い合わせ
              </Link>
            </Button>
          </div>
          
          <div className="flex gap-4 pt-4">
            <Link 
              href="https://github.com" 
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link 
              href="https://linkedin.com" 
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
        
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-80 h-80 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 p-2">
            <Image
              src="/images/profile.jpg"
              alt="プロフィール画像"
              width={320}
              height={320}
              className="rounded-full object-cover w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
```

### スキルセクション例
```typescript
// components/sections/skills-section.tsx
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const skillCategories = [
  {
    category: 'フロントエンド',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
    color: 'bg-blue-500/10 text-blue-700 dark:text-blue-300'
  },
  {
    category: 'バックエンド',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST API'],
    color: 'bg-green-500/10 text-green-700 dark:text-green-300'
  },
  {
    category: 'ツール・その他',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma'],
    color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300'
  }
]

export function SkillsSection() {
  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">技術スタック</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          これまでの経験で培った技術と、現在学習中の技術をご紹介します。
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillCategories.map((category) => (
          <Card key={category.category} className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">{category.category}</CardTitle>
              <CardDescription>
                主要な技術とツール
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary"
                    className={category.color}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
```

### SEO最適化
```typescript
// app/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ホーム | あなたの名前 - フルスタック開発者',
  description: 'モダンなWeb技術を使ったアプリケーション開発を行うフルスタック開発者のポートフォリオサイトです。',
  keywords: ['フルスタック開発者', 'React', 'Next.js', 'TypeScript', 'ポートフォリオ'],
  authors: [{ name: 'あなたの名前' }],
  openGraph: {
    title: 'あなたの名前 - フルスタック開発者',
    description: 'モダンなWeb技術を使ったアプリケーション開発を行うフルスタック開発者のポートフォリオサイトです。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://yoursite.com',
    siteName: 'あなたの名前 Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'あなたの名前 - フルスタック開発者',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourusername',
    creator: '@yourusername',
  },
}
```

## ✅ タスク4完了状況

### 実装済み機能
- [x] モダンなヒーローセクション（framer-motion アニメーション付き）
- [x] 最新ブログ記事セクション（BlogCard コンポーネント活用）
- [x] 注目ポートフォリオセクション（PortfolioCard コンポーネント活用）
- [x] スキル・技術セクション（カテゴリ別分類、熟練度表示）
- [x] 経歴セクション（タイムライン形式、主要成果表示）
- [x] お問い合わせCTAセクション（複数のコンタクト方法、SNSリンク）
- [x] レスポンシブデザイン対応
- [x] ダークモード対応
- [x] アニメーション効果（framer-motion）

### 作成したファイル
- `/src/components/sections/hero-section.tsx` - ヒーローセクション
- `/src/components/sections/latest-blog-section.tsx` - 最新ブログ記事セクション
- `/src/components/sections/featured-portfolio-section.tsx` - 注目ポートフォリオセクション
- `/src/components/sections/skills-section.tsx` - スキル・技術セクション
- `/src/components/sections/experience-section.tsx` - 経歴セクション
- `/src/components/sections/contact-cta-section.tsx` - お問い合わせCTAセクション

### 更新したファイル
- `/src/app/page.tsx` - 新しいセクションコンポーネントでホームページを再構成

### 追加された依存関係
- `framer-motion` - スムーズなアニメーション効果

### 特徴
- **パフォーマンス最適化**: 画像の最適化、アニメーションの最適化
- **アクセシビリティ**: スクリーンリーダー対応、キーボードナビゲーション
- **ユーザーエクスペリエンス**: 直感的なナビゲーション、スムーズなアニメーション
- **SEO対応**: セマンティックHTML、適切なheading構造

**タスク4完了** ✅

## ✅ 完了条件
- [ ] 全セクションがレスポンシブに表示される
- [ ] 最新ブログ記事が動的に表示される
- [ ] 注目ポートフォリオが適切に表示される
- [ ] スキルセクションが見やすく整理されている
- [ ] CTAボタンが機能する
- [ ] SEO最適化が完了している
- [ ] ページ読み込み速度が最適化されている

## 🎨 デザインポイント
- **視覚的階層**: 重要な情報を目立たせる
- **余白の活用**: 読みやすさを重視
- **一貫性**: サイト全体のデザインとの整合性
- **アクセシビリティ**: 色覚障害やスクリーンリーダーへの配慮
- **パフォーマンス**: 画像最適化とレイジーローディング

## 🔗 関連リソース
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Tailwind CSS Grid](https://tailwindcss.com/docs/grid-template-columns)
- [React Hook Form](https://react-hook-form.com/) (コンタクトフォーム用)

## 📝 備考
- プロフィール画像は適切なサイズで準備
- ソーシャルリンクは実際のURLに置き換え
- アニメーション効果は控えめに
- モバイルファーストでの開発
- コンテンツは後で簡単に更新できるよう設計

---

**優先度**: 🔴 高
**所要時間**: 4-6時間
**前提タスク**: タスク2（MDX設定）、タスク3（UIコンポーネント）
**次のタスク**: タスク5（ブログページ実装）
