# タスク1: プロジェクト基盤構築

## 🎯 目標
Next.js 15プロジェクトの基盤を構築し、基本的な開発環境を整える

## 📋 実行内容

### 1. プロジェクト初期化
- [x] Next.js 15プロジェクトの作成（App Router使用）
- [x] TypeScriptの設定
- [x] 基本的なプロジェクト構造の確立
- [x] Git初期化とignore設定

### 2. 依存関係のインストール
- [x] Tailwind CSS v4のセットアップ
- [x] shadcn/uiの導入
- [x] MDXサポートの追加
- [x] 必要なDevDependenciesの追加

### 3. 基本設定ファイルの作成
- [x] `next.config.js` の設定
- [x] `tailwind.config.js` の設定
- [x] `tsconfig.json` の調整
- [x] ESLint/Prettierの設定

### 4. 基本ディレクトリ構造の作成
```
src/
├── app/                    # App Router
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/             # 共通コンポーネント
│   ├── ui/                # shadcn/ui コンポーネント
│   └── layout/            # レイアウトコンポーネント
├── lib/                   # ユーティリティ関数
├── content/               # MDXコンテンツ
│   ├── blog/
│   ├── portfolio/
│   └── guides/
└── types/                 # TypeScript型定義
```

### 5. 基本レイアウトの実装
- [x] ルートレイアウト（`app/layout.tsx`）
- [x] ヘッダーコンポーネント
- [x] フッターコンポーネント
- [x] ナビゲーションコンポーネント

## 🛠️ 技術詳細

### Next.js設定
```javascript
// next.config.js
const nextConfig = {
  output: 'export',  // 静的エクスポート
  experimental: {
    mdxRs: true,     // MDX高速化
  },
  images: {
    unoptimized: true  // 静的エクスポート用
  }
}
```

### Tailwind CSS設定
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // カスタムテーマ設定
    },
  },
  plugins: [],
}
```

## ✅ 完了条件
- [x] `npm run dev` でローカル開発サーバーが起動する
- [x] Tailwind CSSのスタイルが適用される
- [x] TypeScriptエラーがない状態
- [x] 基本的なページ構造が表示される
- [x] Gitリポジトリが適切に設定されている

## ✅ タスク1完了状況

### 実装済み機能
- [x] Next.js 15プロジェクトの作成（App Router、TypeScript、Tailwind CSS v4、ESLint付き）
- [x] shadcn/uiの初期化とセットアップ（Slateカラーテーマ）
- [x] MDX基本サポートの追加（@next/mdx、gray-matter、reading-time）
- [x] 基本ディレクトリ構造の作成（components、content、types）
- [x] レイアウトシステムの実装（Header、Footer、RootLayout）
- [x] サンプルコンテンツの作成（ブログ記事2件、ポートフォリオ1件）
- [x] 開発サーバーの起動確認（localhost:3000で稼働中）

**タスク1完了** ✅

## 🔗 関連リソース
- [Next.js 15 ドキュメント](https://nextjs.org/docs)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [shadcn/ui ドキュメント](https://ui.shadcn.com/)

## 📝 備考
- プロジェクト名は `portfolio-site` とする
- TypeScriptの厳密モードを有効化
- パッケージマネージャーはnpmを使用
- Node.js 18以上を前提とする

---

**優先度**: 🔴 高
**所要時間**: 2-3時間
**前提タスク**: なし
**次のタスク**: タスク2（MDX設定とコンテンツ管理）
