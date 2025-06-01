'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight, Home, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getPublishedDocuments } from '@/lib/documents'
import { cn } from '@/lib/utils'

interface DocumentNavigationProps {
  currentSlug: string
  className?: string
}

export function DocumentNavigation({ currentSlug, className }: DocumentNavigationProps) {
  const documents = getPublishedDocuments()
  const currentIndex = documents.findIndex(doc => doc.slug === currentSlug)
  
  if (currentIndex === -1) return null

  const prevDocument = currentIndex > 0 ? documents[currentIndex - 1] : null
  const nextDocument = currentIndex < documents.length - 1 ? documents[currentIndex + 1] : null

  return (
    <div className={cn("border-t border-gray-200 pt-6 mt-8", className)}>
      {/* Quick Actions */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/documents">
            <Home className="h-4 w-4 mr-2" />
            ドキュメント一覧
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/documents#search">
            <List className="h-4 w-4 mr-2" />
            検索
          </Link>
        </Button>
      </div>

      {/* Previous/Next Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous Document */}
        <div className="flex justify-start">
          {prevDocument ? (
            <Link 
              href={`/documents/${prevDocument.slug}`}
              className="group flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 max-w-full"
            >
              <div className="flex-shrink-0">
                <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <ChevronLeft className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 mb-1">前のドキュメント</p>
                <p className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                  {prevDocument.title}
                </p>
                {prevDocument.category && (
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {prevDocument.category}
                  </p>
                )}
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-3 p-4 text-gray-400">
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm">最初のドキュメントです</span>
            </div>
          )}
        </div>

        {/* Next Document */}
        <div className="flex justify-end">
          {nextDocument ? (
            <Link 
              href={`/documents/${nextDocument.slug}`}
              className="group flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 max-w-full"
            >
              <div className="min-w-0 flex-1 text-right">
                <p className="text-xs text-gray-500 mb-1">次のドキュメント</p>
                <p className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                  {nextDocument.title}
                </p>
                {nextDocument.category && (
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {nextDocument.category}
                  </p>
                )}
              </div>
              <div className="flex-shrink-0">
                <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-3 p-4 text-gray-400">
              <span className="text-sm">最後のドキュメントです</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Compact navigation for smaller spaces
interface CompactDocumentNavigationProps {
  currentSlug: string
  showLabels?: boolean
  className?: string
}

export function CompactDocumentNavigation({ 
  currentSlug, 
  showLabels = false,
  className 
}: CompactDocumentNavigationProps) {
  const documents = getPublishedDocuments()
  const currentIndex = documents.findIndex(doc => doc.slug === currentSlug)
  
  if (currentIndex === -1) return null

  const prevDocument = currentIndex > 0 ? documents[currentIndex - 1] : null
  const nextDocument = currentIndex < documents.length - 1 ? documents[currentIndex + 1] : null

  return (
    <div className={cn("flex items-center justify-between", className)}>
      {prevDocument ? (
        <Button variant="outline" size="sm" asChild>
          <Link href={`/documents/${prevDocument.slug}`}>
            <ChevronLeft className="h-4 w-4" />
            {showLabels && <span className="ml-2">前へ</span>}
          </Link>
        </Button>
      ) : (
        <div /> // Empty div for spacing
      )}

      <Button variant="outline" size="sm" asChild>
        <Link href="/documents">
          <List className="h-4 w-4" />
          {showLabels && <span className="ml-2">一覧</span>}
        </Link>
      </Button>

      {nextDocument ? (
        <Button variant="outline" size="sm" asChild>
          <Link href={`/documents/${nextDocument.slug}`}>
            {showLabels && <span className="mr-2">次へ</span>}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <div /> // Empty div for spacing
      )}
    </div>
  )
}
