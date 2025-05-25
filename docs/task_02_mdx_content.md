# タスク2: MDX設定とコンテンツ管理システム

## 🎯 目標
MDXベースのコンテンツ管理システムを構築し、ブログ・ポートフォリオ・ガイドコンテンツを効率的に管理できるようにする

## 📋 実行内容

### 1. MDX環境のセットアップ
- [ ] `@next/mdx` のインストールと設定
- [ ] MDXプラグインの導入
  - [ ] `remark-gfm` (GitHub Flavored Markdown)
  - [ ] `rehype-highlight` (シンタックスハイライト)
  - [ ] `rehype-slug` (見出しアンカー)
  - [ ] `rehype-autolink-headings` (見出しリンク)

### 2. フロントマター処理の実装
- [ ] `gray-matter` の導入
- [ ] メタデータ型定義の作成
- [ ] フロントマター解析ユーティリティの実装

### 3. コンテンツ型定義の作成
```typescript
// types/content.ts
export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  category: string
  author: string
  image?: string
  draft: boolean
  content: string
}

export interface PortfolioItem {
  slug: string
  title: string
  description: string
  technologies: string[]
  category: string
  image: string
  demoUrl?: string
  githubUrl?: string
  date: string
  featured: boolean
  content: string
}

export interface GuidePost {
  slug: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  tags: string[]
  lastUpdated: string
  prerequisites?: string[]
  content: string
}
```

### 4. コンテンツ読み込みユーティリティの実装
- [ ] ブログ記事取得関数
- [ ] ポートフォリオアイテム取得関数
- [ ] ガイド記事取得関数
- [ ] タグ・カテゴリ一覧取得関数
- [ ] 検索機能の基盤実装

### 5. サンプルコンテンツの作成
- [ ] ブログ記事サンプル（3記事）
- [ ] ポートフォリオアイテムサンプル（2項目）
- [ ] ガイド記事サンプル（1記事）

### 6. MDXコンポーネントのカスタマイズ
- [ ] カスタムMDXコンポーネントの作成
  - [ ] Code Block コンポーネント
  - [ ] Callout コンポーネント
  - [ ] Image コンポーネント
  - [ ] Link コンポーネント

## 🛠️ 技術詳細

### MDX設定例
```javascript
// next.config.js
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeHighlight,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
    ],
  },
})

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // ... その他の設定
}

export default withMDX(nextConfig)
```

### コンテンツ取得関数例
```typescript
// lib/content.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost } from '@/types/content'

export async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'src/content/blog')
  const filenames = fs.readdirSync(postsDirectory)
  
  const posts = filenames
    .filter(name => name.endsWith('.mdx'))
    .map(name => {
      const fullPath = path.join(postsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug: name.replace(/\.mdx$/, ''),
        content,
        ...data
      } as BlogPost
    })
    .filter(post => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return posts
}
```

### サンプルMDXファイル構造
```markdown
---
title: "Next.js 15の新機能について"
description: "Next.js 15で追加された新機能と変更点を詳しく解説します"
date: "2025-05-26"
tags: ["Next.js", "React", "Web開発"]
category: "技術"
author: "あなたの名前"
draft: false
---

# Next.js 15の新機能について

この記事では、Next.js 15で追加された新機能について解説します。

## 主な変更点

<Callout type="info">
Next.js 15では多くの改善が行われています。
</Callout>

```javascript
// サンプルコード
const nextConfig = {
  output: 'export'
}
```
```

## ✅ 完了条件
- [ ] MDXファイルが正常に処理される
- [ ] フロントマターが適切に解析される
- [ ] サンプルコンテンツが表示される
- [ ] シンタックスハイライトが機能する
- [ ] カスタムMDXコンポーネントが使用できる
- [ ] コンテンツ一覧の取得ができる

## 🔗 関連リソース
- [MDX ドキュメント](https://mdxjs.com/)
- [Next.js MDX ドキュメント](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)

## 📝 備考
- MDXファイルは `src/content/` 以下に配置
- 画像は `public/images/` 以下に配置
- シンタックスハイライトのテーマは後で調整可能
- 検索機能は基本的な実装にとどめ、後で拡張

---

**優先度**: 🔴 高
**所要時間**: 3-4時間
**前提タスク**: タスク1（プロジェクト基盤構築）
**次のタスク**: タスク3（UIコンポーネント設計）
