import { getPublishedDocuments, getDocumentCategories, getDocumentTags } from '@/lib/documents'
import { DocumentsPageClient } from '@/components/documents/documents-page-client'
import { DocumentsSidebar } from '@/components/documents/documents-sidebar'
import { BookOpen } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ドキュメント | Doclog',
  description: '技術ドキュメント・学習記録・ナレッジベース',
  keywords: ['ドキュメント', '技術資料', '学習記録', 'ナレッジベース'],
}

export default function DocumentsPage() {
  const documents = getPublishedDocuments()
  const allCategories = getDocumentCategories()
  const allTags = getDocumentTags()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* 左サイドバー - ナビゲーション */}
        <aside className="fixed left-0 top-0 z-40 h-screen w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                ドキュメント
              </h1>
            </div>
            <DocumentsSidebar documents={documents} />
          </div>
        </aside>

        {/* メインコンテンツ */}
        <main className="flex-1 ml-80">
          <div className="container mx-auto px-8 py-8">
            {/* ページヘッダー */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                ドキュメント一覧
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                技術ドキュメント、学習記録、ナレッジベースの集約サイトです。
                開発で学んだ知識やベストプラクティス、トラブルシューティングガイドなどを体系的にまとめています。
              </p>
            </div>

            {/* 検索とフィルター機能 */}
            <DocumentsPageClient
              documents={documents}
              allCategories={allCategories}
              allTags={allTags}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
