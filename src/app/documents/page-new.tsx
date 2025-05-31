import { getPublishedDocuments, getDocumentCategories, getDocumentTags } from '@/lib/documents';
import { DocumentsPageClient } from '@/components/documents/documents-page-client';
import { BookOpen } from 'lucide-react';
import { Metadata } from 'next';

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
    <div className="container mx-auto px-4 py-8">
      {/* ページヘッダー */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            ドキュメント
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          技術ドキュメント、学習記録、ナレッジベースの集約サイトです。
          <br />
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
  )
}
