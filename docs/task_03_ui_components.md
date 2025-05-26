# タスク3: UIコンポーネントとデザインシステム

## 🎯 目標
shadcn/uiを基盤としたデザインシステムを構築し、サイト全体で使用する共通UIコンポーネントを実装する

## 📋 実行内容

### 1. shadcn/ui の初期設定
- [x] shadcn/ui CLIのインストール
- [x] 初期設定の実行
- [x] components.jsonの設定
- [x] 基本的なUIコンポーネントの追加

### 2. 基本UIコンポーネントの導入
- [x] Button コンポーネント
- [x] Card コンポーネント
- [x] Badge コンポーネント
- [x] Input コンポーネント
- [x] Separator コンポーネント
- [x] Avatar コンポーネント
- [ ] Typography コンポーネント

### 3. レイアウトコンポーネントの実装
- [x] Header コンポーネント
- [x] Navigation コンポーネント
- [x] Footer コンポーネント
- [ ] Sidebar コンポーネント
- [x] Container コンポーネント
- [ ] Grid コンポーネント

### 4. カスタムコンポーネントの作成
- [x] BlogCard コンポーネント
- [x] PortfolioCard コンポーネント
- [x] GuideCard コンポーネント
- [x] TagList コンポーネント
- [x] SearchBox コンポーネント
- [x] ThemeToggle コンポーネント

### 5. ダークモード対応
- [x] next-themes の導入
- [x] テーマプロバイダーの設定
- [x] ダークモード用カラーパレット
- [x] テーマ切り替えボタンの実装

### 6. レスポンシブデザインの実装
- [x] モバイルファーストのアプローチ
- [x] ブレークポイントの設定
- [x] フレックス・グリッドレイアウト
- [ ] 画像の最適化

## 🛠️ 技術詳細

### shadcn/ui 初期設定
```bash
npx shadcn@latest init
```

```json
// components.json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### テーマプロバイダー設定
```typescript
// providers/theme-provider.tsx
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### BlogCard コンポーネント例
```typescript
// components/blog-card.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BlogPost } from '@/types/content'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="line-clamp-2">
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </CardTitle>
          <time className="text-sm text-muted-foreground whitespace-nowrap">
            {formatDate(post.date)}
          </time>
        </div>
        <CardDescription className="line-clamp-2">
          {post.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
```

### カスタムCSSテーマ
```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... ダークモードのカラー設定 */
  }
}

@layer utilities {
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

## ✅ 完了条件
- [ ] shadcn/ui コンポーネントが正常に動作する
- [ ] ダークモード切り替えが機能する
- [ ] レスポンシブデザインが適切に動作する
- [ ] 全コンポーネントがTypeScript対応済み
- [ ] アクセシビリティが確保されている
- [ ] ストーリーブック（任意）での確認完了

## 📦 インストールパッケージ
```bash
# shadcn/ui関連
npx shadcn@latest add button card badge input separator avatar

# テーマ関連
npm install next-themes

# ユーティリティ
npm install clsx tailwind-merge
npm install lucide-react  # アイコン
```

## 🔗 関連リソース
- [shadcn/ui ドキュメント](https://ui.shadcn.com/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Lucide React Icons](https://lucide.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📝 備考
- コンポーネントの命名は明確で一貫性を保つ
- propsの型定義を必須とする
- 再利用性を重視した設計
- パフォーマンスを考慮した実装
- アクセシビリティを最優先に

---

**優先度**: 🔴 高
**所要時間**: 4-5時間
**前提タスク**: タスク1（プロジェクト基盤構築）
**次のタスク**: タスク4（ページ実装 - ホーム）
