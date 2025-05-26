import { PortfolioProject } from '@/types/mdx'

// サーバーサイドかどうかを判定
const isServerSide = typeof window === 'undefined'

// フォールバック用の静的データ
function getFallbackPortfolioProjects(): PortfolioProject[] {
  return [
    {
      id: 'realtime-chat-app',
      slug: 'realtime-chat-app',
      title: 'リアルタイム チャットアプリケーション',
      description: 'Socket.ioを使用したリアルタイムチャットアプリケーション。React + Node.js + TypeScript',
      date: '2024-01-15',
      category: 'ウェブアプリ',
      tags: ['リアルタイム', 'チャット', 'Socket.io'],
      technologies: ['React', 'Socket.io', 'Node.js', 'TypeScript', 'Express'],
      featured: true,
      status: 'completed',
      highlights: ['リアルタイム通信', 'ユーザー認証', 'レスポンシブデザイン'],
      published: true,
      image: '/images/projects/realtime-chat.jpg',
      github: 'https://github.com/example/repo',
      demo: 'https://demo.example.com',
    },
    {
      id: 'ecommerce-platform',
      slug: 'ecommerce-platform',
      title: 'E-commerce プラットフォーム',
      description: 'Next.js と Stripe を使用したフル機能の E-commerce プラットフォーム',
      date: '2024-01-10',
      category: 'ウェブアプリ',
      tags: ['Ecommerce', 'Stripe', '決済'],
      technologies: ['Next.js', 'Stripe', 'TypeScript', 'Prisma', 'PostgreSQL'],
      featured: true,
      status: 'completed',
      highlights: ['決済システム統合', 'データベース設計', 'SEO最適化'],
      published: true,
      image: '/images/projects/ecommerce.jpg',
      github: 'https://github.com/example/repo',
      demo: 'https://demo.example.com',
    },
    {
      id: 'task-dashboard',
      slug: 'task-dashboard',
      title: 'タスク管理ダッシュボード',
      description: 'Vue.js と Firebase を使用したタスク管理アプリケーション',
      date: '2024-01-05',
      category: 'ウェブアプリ',
      tags: ['タスク管理', 'Vue.js', 'Firebase'],
      technologies: ['Vue.js', 'Firebase', 'TypeScript', 'Vuetify'],
      featured: false,
      status: 'completed',
      highlights: ['状態管理', 'リアルタイム同期', 'PWA対応'],
      published: true,
      image: '/images/projects/task-dashboard.jpg',
      github: 'https://github.com/example/repo',
      demo: 'https://demo.example.com',
    },
    {
      id: 'chat-app',
      slug: 'chat-app',
      title: 'チャットアプリケーション',
      description: 'React Native を使用したモバイルチャットアプリ',
      date: '2023-12-20',
      category: 'モバイルアプリ',
      tags: ['モバイル', 'React Native', 'チャット'],
      technologies: ['React Native', 'Firebase', 'TypeScript', 'Expo'],
      featured: false,
      status: 'in-progress',
      highlights: ['モバイル最適化', 'プッシュ通知', 'オフライン対応'],
      published: true,
      image: '/images/projects/chat-app.jpg',
      github: 'https://github.com/example/repo',
    },
  ]
}

// ポートフォリオプロジェクトを取得
export function getPortfolioProjects(): PortfolioProject[] {
  if (!isServerSide) {
    // クライアントサイドでは静的データを返す
    return getFallbackPortfolioProjects()
  }

  try {
    // サーバーサイドでの処理（現在は静的データを返す）
    return getFallbackPortfolioProjects()
  } catch (error) {
    console.error('Error loading portfolio projects:', error)
    return getFallbackPortfolioProjects()
  }
}

// 公開されたプロジェクトのみを取得
export function getPublishedPortfolioProjects(): PortfolioProject[] {
  return getPortfolioProjects().filter(project => project.published)
}

// おすすめプロジェクトを取得
export function getFeaturedPortfolioProjects(): PortfolioProject[] {
  return getPortfolioProjects().filter(project => project.featured && project.published)
}

// プロジェクトを slug で取得
export function getPortfolioProjectBySlug(slug: string): PortfolioProject | undefined {
  return getPortfolioProjects().find(project => project.slug === slug)
}

// カテゴリ別にプロジェクトを取得
export function getPortfolioProjectsByCategory(category: string): PortfolioProject[] {
  return getPortfolioProjects().filter(project => 
    project.category === category && project.published
  )
}

// すべてのカテゴリを取得
export function getPortfolioCategories(): string[] {
  const projects = getPortfolioProjects()
  const categories = [...new Set(projects.map(project => project.category))]
  return categories.sort()
}

// すべての技術を取得
export function getPortfolioTechnologies(): string[] {
  const projects = getPortfolioProjects()
  const technologies = [...new Set(projects.flatMap(project => project.technologies))]
  return technologies.sort()
}
