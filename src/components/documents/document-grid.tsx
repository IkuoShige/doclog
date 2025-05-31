import { Document } from '@/types/mdx'
import { DocumentCard } from './document-card'

interface DocumentGridProps {
  documents: Document[]
  className?: string
}

export function DocumentGrid({ documents, className }: DocumentGridProps) {
  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 text-lg">
          該当するドキュメントが見つかりませんでした。
        </div>
        <div className="text-gray-400 dark:text-gray-500 text-sm mt-2">
          検索条件を変更してお試しください。
        </div>
      </div>
    )
  }

  return (
    <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {documents.map(document => (
        <DocumentCard key={document.slug} document={document} />
      ))}
    </div>
  )
}
