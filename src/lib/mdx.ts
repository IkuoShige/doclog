// ⚠️ このファイルはサーバーサイドでのみ使用可能です
// Next.js 15では、fsモジュールはクライアントサイドで使用できません

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { BlogPost } from '@/types/mdx'

const contentDirectory = path.join(process.cwd(), 'content/blog')

// サーバーサイドでのみ実行される関数の型チェック
function isServerSide(): boolean {
  return typeof window === 'undefined'
}

// MDXファイルからメタデータとコンテンツを抽出（サーバーサイド専用）
export function getMDXData(filePath: string) {
  if (!isServerSide()) {
    throw new Error('getMDXData can only be called on the server side')
  }
  
  const fullPath = path.join(contentDirectory, filePath)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    frontMatter: data,
    content,
    readingTime: readingTime(content)
  }
}

// すべてのMDXファイルを取得（サーバーサイド専用）
export function getAllMDXFiles(): string[] {
  if (!isServerSide()) {
    return []
  }
  
  if (!fs.existsSync(contentDirectory)) {
    return []
  }
  
  return fs.readdirSync(contentDirectory)
    .filter(file => file.endsWith('.mdx'))
}

// MDXファイルからブログポストを生成（サーバーサイド専用）
export function createBlogPostFromMDX(fileName: string): BlogPost {
  if (!isServerSide()) {
    throw new Error('createBlogPostFromMDX can only be called on the server side')
  }
  
  const slug = fileName.replace(/\.mdx$/, '')
  const { frontMatter, content, readingTime: rt } = getMDXData(fileName)
  
  return {
    id: frontMatter.id || slug,
    slug,
    title: frontMatter.title || '',
    description: frontMatter.description || '',
    content,
    date: frontMatter.date || '',
    author: frontMatter.author || 'Developer',
    category: frontMatter.category || '',
    tags: frontMatter.tags || [],
    image: frontMatter.image,
    featured: frontMatter.featured || false,
    published: frontMatter.published !== false, // デフォルトは公開
    readingTime: rt
  }
}

// すべてのブログポストを取得（サーバーサイド専用）
export function getBlogPostsFromMDX(): BlogPost[] {
  if (!isServerSide()) {
    return []
  }
  
  const files = getAllMDXFiles()
  
  return files
    .map(createBlogPostFromMDX)
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// 特定のブログポストを取得（サーバーサイド専用）
export function getBlogPostFromMDX(slug: string): BlogPost | null {
  if (!isServerSide()) {
    return null
  }
  
  const fileName = `${slug}.mdx`
  const files = getAllMDXFiles()
  
  if (!files.includes(fileName)) {
    return null
  }
  
  return createBlogPostFromMDX(fileName)
}
