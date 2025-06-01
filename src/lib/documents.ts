import { Document } from '@/types/mdx'

// サーバーサイドかどうかを判定
const isServerSide = typeof window === 'undefined'

// MDXファイルからドキュメントデータを読み込む
function loadDocumentsFromMDX(): Document[] {
  if (!isServerSide) {
    return []
  }
  
  try {
    // Server-side modules are only imported when needed
    const fs = eval('require')('fs')
    const path = eval('require')('path')
    const matter = eval('require')('gray-matter')
    
    const documentsDir = path.join(process.cwd(), 'content/documents')
    
    if (!fs.existsSync(documentsDir)) {
      return []
    }

    const files = fs.readdirSync(documentsDir)
      .filter((file: string) => file.endsWith('.mdx'))

    return files.map((file: string) => {
      const slug = file.replace(/\.mdx$/, '')
      const filePath = path.join(documentsDir, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        category: data.category || 'その他',
        tags: data.tags || [],
        lastUpdated: data.lastUpdated || new Date().toISOString().split('T')[0],
        published: data.published !== false,
        author: data.author,
        readingTime: data.readingTime,
      }
    })
  } catch (error) {
    console.error('Error loading documents:', error)
    return []
  }
}

// フォールバック用の静的データ
function getFallbackDocuments(): Document[] {
  return [
    {
      slug: 'react-hooks-cheatsheet',
      title: 'React Hooks チートシート',
      description: 'React Hooksの基本的な使い方とパターンをまとめました',
      category: 'React',
      tags: ['React', 'Hooks', 'JavaScript'],
      lastUpdated: '2024-05-20',
      published: true,
    },
    {
      slug: 'typescript-utility-types',
      title: 'TypeScript ユーティリティ型 まとめ',
      description: 'TypeScriptの便利なユーティリティ型の使い方と実例',
      category: 'TypeScript',
      tags: ['TypeScript', '型システム'],
      lastUpdated: '2024-05-15',
      published: true,
    },
    {
      slug: 'nextjs-best-practices',
      title: 'Next.js ベストプラクティス',
      description: 'Next.js開発で知っておきたいベストプラクティス集',
      category: 'Next.js',
      tags: ['Next.js', 'React', 'ベストプラクティス'],
      lastUpdated: '2024-05-10',
      published: true,
    },
    {
      slug: 'git-commands-reference',
      title: 'Git コマンド リファレンス',
      description: 'よく使うGitコマンドと実行例をまとめました',
      category: 'Git',
      tags: ['Git', 'バージョン管理', 'CLI'],
      lastUpdated: '2024-05-05',
      published: true,
    },
    {
      slug: 'css-flexbox-grid',
      title: 'CSS Flexbox & Grid 完全ガイド',
      description: 'FlexboxとCSS Gridの使い分けと実装パターン',
      category: 'CSS',
      tags: ['CSS', 'レイアウト', 'Flexbox', 'Grid'],
      lastUpdated: '2024-04-30',
      published: true,
    },
    {
      slug: 'python-data-analysis',
      title: 'Python データ分析 基礎',
      description: 'Pandas、NumPy、Matplotlibを使ったデータ分析の基礎',
      category: 'Python',
      tags: ['Python', 'データ分析', 'Pandas', 'NumPy'],
      lastUpdated: '2024-04-25',
      published: true,
    },
    {
      slug: 'ros-basics',
      title: 'ROS 基礎概念まとめ',
      description: 'Robot Operating System (ROS) の基本概念とよく使う機能',
      category: 'Robotics',
      tags: ['ROS', 'ロボティクス', 'Python'],
      lastUpdated: '2024-04-20',
      published: true,
    },
    {
      slug: 'opencv-image-processing',
      title: 'OpenCV 画像処理 クックブック',
      description: 'OpenCVを使った基本的な画像処理のコード例集',
      category: 'Computer Vision',
      tags: ['OpenCV', 'Python', '画像処理', 'コンピュータビジョン'],
      lastUpdated: '2024-04-15',
      published: true,
    },
  ]
}

// ドキュメントを取得
export function getDocuments(): Document[] {
  if (!isServerSide) {
    // クライアントサイドでは静的データを返す
    return getFallbackDocuments()
  }

  try {
    // サーバーサイドでMDXファイルから読み込み
    const mdxDocuments = loadDocumentsFromMDX()
    
    if (mdxDocuments.length > 0) {
      console.log(`[Server] Loaded ${mdxDocuments.length} documents:`, mdxDocuments.map(d => d.slug))
      return mdxDocuments
    }
    
    // MDXファイルがない場合はフォールバックデータを返す
    return getFallbackDocuments()
  } catch (error) {
    console.error('Error loading documents:', error)
    return getFallbackDocuments()
  }
}

// 公開されたドキュメントのみを取得
export function getPublishedDocuments(): Document[] {
  return getDocuments().filter(doc => doc.published)
}

// カテゴリ別にドキュメントを取得
export function getDocumentsByCategory(category: string): Document[] {
  return getDocuments().filter(doc => 
    doc.category === category && doc.published
  )
}

// ドキュメントを slug で取得
export function getDocumentBySlug(slug: string): Document | undefined {
  return getDocuments().find(doc => doc.slug === slug)
}

// すべてのカテゴリを取得
export function getDocumentCategories(): string[] {
  const documents = getDocuments()
  const categories = [...new Set(documents.map(doc => doc.category))]
  return categories.sort()
}

// すべてのタグを取得
export function getDocumentTags(): string[] {
  const documents = getDocuments()
  const tags = [...new Set(documents.flatMap(doc => doc.tags))]
  return tags.sort()
}

// 最近更新されたドキュメントを取得
export function getRecentlyUpdatedDocuments(limit = 5): Document[] {
  return getDocuments()
    .filter(doc => doc.published)
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, limit)
}
