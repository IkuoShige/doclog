# GitHub Pagesデプロイメント手順

## 前提条件
✅ Next.jsアプリケーションのビルドが成功している
✅ すべてのTypeScriptエラーが解決済み
✅ 静的サイト生成（SSG）が正常に動作している

## デプロイメント手順

### 1. GitHubでリポジトリを作成
1. GitHub（github.com）にログイン
2. 新しいリポジトリを作成
   - リポジトリ名: `portfolio-site`（または任意の名前）
   - 公開リポジトリ（Private でも可）
   - READMEファイルの初期化は**しない**

### 2. リモートリポジトリを設定してプッシュ
```bash
cd /home/ikuo/SSG_play/portfolio

# リモートリポジトリを追加（YOURUSERNAMEを実際のGitHubユーザー名に変更）
git remote add origin https://github.com/YOURUSERNAME/portfolio-site.git

# メインブランチに変更をプッシュ
git push -u origin main
```

### 3. GitHub Pagesを有効にする
1. GitHub上で作成したリポジトリのページに移動
2. **Settings** タブをクリック
3. 左サイドバーで **Pages** をクリック
4. **Source** で **GitHub Actions** を選択

### 4. GitHub Actionsワークフローの確認
リポジトリにプッシュすると、`.github/workflows/deploy.yml` ファイルにより自動的にビルドとデプロイが開始されます。

**ワークフローの内容:**
- Node.js 18環境でビルド実行
- `npm ci` で依存関係をインストール
- `npm run build` で静的サイトを生成
- `./out` ディレクトリの内容を `gh-pages` ブランチにデプロイ

### 5. デプロイメントの確認
1. リポジトリの **Actions** タブでワークフローの実行状況を確認
2. 成功したら **Settings > Pages** でサイトのURLを確認
3. 通常は `https://YOURUSERNAME.github.io/portfolio-site/` でアクセス可能

## トラブルシューティング

### ベースパスの問題
もしサイトのリンクやアセットが正しく読み込まれない場合は、`next.config.ts` にベースパスを追加：

```typescript
const nextConfig: NextConfig = {
  basePath: '/portfolio-site', // リポジトリ名と同じに設定
  // ... 他の設定
};
```

### パーミッションエラー
GitHub Actionsでパーミッションエラーが発生した場合：
1. **Settings > Actions > General**
2. **Workflow permissions** で **Read and write permissions** を選択

## 現在の状態
✅ TypeScriptコンパイレーションエラー解決済み
✅ 静的サイト生成が正常に動作
✅ GitHub Actionsワークフロー設定済み
✅ 必要なファイル（.nojekyll等）配置済み
✅ ローカルでの動作確認完了

アプリケーションはデプロイ準備が完了しています！
