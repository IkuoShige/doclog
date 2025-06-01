'use client'

import Link from 'next/link'
import { ExternalLink, FileText, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getDocumentBySlug } from '@/lib/documents'
import { cn } from '@/lib/utils'

interface DocumentLinkProps {
  slug: string
  children?: React.ReactNode
  className?: string
  variant?: 'inline' | 'card' | 'banner'
  showCategory?: boolean
  showDescription?: boolean
  external?: boolean
}

export function DocumentLink({ 
  slug, 
  children, 
  className,
  variant = 'inline',
  showCategory = false,
  showDescription = false,
  external = false
}: DocumentLinkProps) {
  const document = getDocumentBySlug(slug)

  if (!document) {
    return (
      <span className="text-red-500 italic">
        [リンク切れ: {slug}]
      </span>
    )
  }

  const linkUrl = `/documents/${slug}`
  const linkContent = children || document.title

  if (variant === 'inline') {
    return (
      <Link 
        href={linkUrl}
        className={cn(
          "inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-500 transition-colors",
          className
        )}
      >
        <FileText className="h-3 w-3" />
        {linkContent}
        {external && <ExternalLink className="h-3 w-3" />}
      </Link>
    )
  }

  if (variant === 'banner') {
    return (
      <Link href={linkUrl} className={cn("block", className)}>
        <div className="border border-blue-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 group">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <h4 className="font-medium text-gray-900 group-hover:text-blue-700">
                  {linkContent}
                </h4>
                {showCategory && (
                  <Badge variant="secondary" className="text-xs">
                    {document.category}
                  </Badge>
                )}
              </div>
              {showDescription && document.description && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {document.description}
                </p>
              )}
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
          </div>
        </div>
      </Link>
    )
  }

  // Card variant
  return (
    <Link href={linkUrl} className={cn("block", className)}>
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 group">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
            <FileText className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
              {linkContent}
            </h4>
            {showCategory && (
              <Badge variant="outline" className="text-xs mt-1">
                {document.category}
              </Badge>
            )}
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
        </div>
        {showDescription && document.description && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {document.description}
          </p>
        )}
        {document.tags && document.tags.length > 0 && (
          <div className="flex gap-1 mt-2">
            {document.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {document.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{document.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

// Collection component for showing multiple related documents
interface DocumentLinksProps {
  documents: string[]
  title?: string
  variant?: 'grid' | 'list'
  className?: string
}

export function DocumentLinks({ 
  documents, 
  title = "関連ドキュメント",
  variant = 'grid',
  className 
}: DocumentLinksProps) {
  const validDocuments = documents
    .map(slug => getDocumentBySlug(slug))
    .filter(Boolean)

  if (validDocuments.length === 0) {
    return null
  }

  return (
    <div className={cn("mt-6", className)}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-blue-600" />
        {title}
      </h3>
      <div className={cn(
        variant === 'grid' 
          ? "grid gap-4 md:grid-cols-2" 
          : "space-y-3"
      )}>
        {documents.map((slug) => (
          <DocumentLink
            key={slug}
            slug={slug}
            variant={variant === 'grid' ? 'card' : 'banner'}
            showCategory={true}
            showDescription={true}
          />
        ))}
      </div>
    </div>
  )
}
