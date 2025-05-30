// サーバーサイドでMDXファイルの数をカウントするユーティリティ
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// サーバーサイドかどうかを判定
const isServerSide = typeof window === 'undefined'

interface ContentCounts {
  totalBlogPosts: number
  publishedBlogPosts: number
  totalPortfolioProjects: number
  publishedPortfolioProjects: number
}

// MDXファイルから公開ステータスをチェック
function isPublishedMDX(filePath: string): boolean {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)
    return data.published !== false // デフォルトは公開
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return false
  }
}

// ブログMDXファイルの数を取得
export function getBlogPostCounts(): { total: number; published: number } {
  if (!isServerSide) {
    // クライアントサイドではフォールバック値を返す
    return { total: 4, published: 4 }
  }

  try {
    const blogDir = path.join(process.cwd(), 'content/blog')
    
    if (!fs.existsSync(blogDir)) {
      return { total: 0, published: 0 }
    }

    const files = fs.readdirSync(blogDir)
      .filter(file => file.endsWith('.mdx'))

    const total = files.length
    const published = files.filter(file => {
      const filePath = path.join(blogDir, file)
      return isPublishedMDX(filePath)
    }).length

    console.log(`Blog posts: ${published}/${total} published`)
    return { total, published }
  } catch (error) {
    console.error('Error counting blog posts:', error)
    return { total: 4, published: 4 } // フォールバック値
  }
}

// ポートフォリオMDXファイルの数を取得
export function getPortfolioProjectCounts(): { total: number; published: number } {
  if (!isServerSide) {
    // クライアントサイドではフォールバック値を返す
    return { total: 1, published: 1 }
  }

  try {
    const portfolioDir = path.join(process.cwd(), 'content/portfolio')
    
    if (!fs.existsSync(portfolioDir)) {
      return { total: 0, published: 0 }
    }

    const files = fs.readdirSync(portfolioDir)
      .filter(file => file.endsWith('.mdx'))

    const total = files.length
    const published = files.filter(file => {
      const filePath = path.join(portfolioDir, file)
      return isPublishedMDX(filePath)
    }).length

    console.log(`Portfolio projects: ${published}/${total} published`)
    return { total, published }
  } catch (error) {
    console.error('Error counting portfolio projects:', error)
    return { total: 1, published: 1 } // フォールバック値
  }
}

// 全コンテンツの数を取得
export function getAllContentCounts(): ContentCounts {
  const blogCounts = getBlogPostCounts()
  const portfolioCounts = getPortfolioProjectCounts()

  return {
    totalBlogPosts: blogCounts.total,
    publishedBlogPosts: blogCounts.published,
    totalPortfolioProjects: portfolioCounts.total,
    publishedPortfolioProjects: portfolioCounts.published
  }
}
