# DocLog GitHub Pages デプロイメント手順

## 前提条件
✅ Next.jsアプリケーションのビルドが成功している
✅ すべてのTypeScriptエラーが解決済み
✅ 静的サイト生成（SSG）が正常に動作している

## デプロイメント手順

### 1. GitHubでリポジトリを作成
1. GitHub（github.com）にログイン
2. 新しいリポジトリを作成
   - リポジトリ名: `doclog`
   - 公開リポジトリ（Public）にする
   - READMEファイルの初期化は**しない**

### 2. package.jsonのhomepage URLを更新
`package.json`の`homepage`フィールドをあなたのGitHubユーザー名に更新：
```json
"homepage": "https://YOUR_USERNAME.github.io/doclog",
```

### 3. リモートリポジトリを設定してプッシュ
```bash
cd /home/ikuo/SSG_play/doclog

# Gitリポジトリを初期化（まだの場合）
git init

# リモートリポジトリを追加（YOUR_USERNAMEを実際のユーザー名に変更）
git remote add origin https://github.com/YOUR_USERNAME/doclog.git

# すべてのファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: DocLog Next.js application"

# mainブランチにプッシュ
git push -u origin main
```

### 4. GitHub Pagesを有効化
1. GitHubのリポジトリページに移動
2. **Settings** タブをクリック
3. 左サイドバーの **Pages** をクリック
4. **Source** セクションで **GitHub Actions** を選択
5. 設定を保存

### 5. 自動デプロイの確認
1. プッシュ後、**Actions** タブでワークフローの実行状況を確認
2. ビルドとデプロイが成功したら、サイトが利用可能になります
3. サイトURL: `https://YOUR_USERNAME.github.io/doclog`

## 更新手順
ファイルを更新した後は、以下のコマンドでデプロイ：

```bash
git add .
git commit -m "Update content"
git push origin main
```

GitHub Actionsが自動的にビルドとデプロイを実行します。

## トラブルシューティング

### ビルドエラーが発生した場合
1. ローカルでビルドをテスト：
   ```bash
   npm run build
   ```
2. エラーメッセージを確認し、問題を修正
3. 修正後、再度プッシュ

### ページが表示されない場合
1. GitHub Pagesの設定を確認
2. ワークフローのログを確認
3. `next.config.ts`の`basePath`設定を確認

### アセット（画像、CSS）が読み込まれない場合
1. `next.config.ts`の以下の設定を確認：
   - `basePath: '/doclog'`
   - `output: 'export'`
   - `images: { unoptimized: true }`
2. 画像パスが正しく設定されているか確認

## 注意事項
- GitHub Pagesは静的サイトのみサポート
- サーバーサイド機能（API Routes、SSR）は使用不可
- 初回デプロイ後、サイトが利用可能になるまで数分かかる場合があります
