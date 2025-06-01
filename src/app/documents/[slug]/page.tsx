import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EnhancedDocumentationLayout } from '@/components/documents/enhanced-documentation-layout'
import { getDocumentBySlug, getPublishedDocuments } from '@/lib/documents'
import { getDocumentBySlug as getDocumentContentBySlug } from '@/lib/mdx-content'
import { DocumentMDXContent } from '@/components/documents/document-mdx-content'

interface DocumentPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const documents = getPublishedDocuments()
  return documents.map((doc) => ({
    slug: doc.slug,
  }))
}

export async function generateMetadata({ params }: DocumentPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const document = getDocumentBySlug(resolvedParams.slug)
  
  if (!document) {
    return {
      title: 'ドキュメントが見つかりません | Portfolio',
    }
  }

  return {
    title: `${document.title} | Documents`,
    description: document.description,
  }
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const resolvedParams = await params
  const document = getDocumentBySlug(resolvedParams.slug)

  if (!document || !document.published) {
    notFound()
  }

  // 実際のMDXコンテンツを取得
  const documentContent = getDocumentContentBySlug(resolvedParams.slug)
  
  if (!documentContent) {
    notFound()
  }

  // サイドバー用のドキュメントリストを取得
  const documents = getPublishedDocuments()

  return (
    <EnhancedDocumentationLayout
      title={document.title}
      description={document.description}
      category={document.category}
      tags={document.tags}
      lastUpdated={document.lastUpdated}
      readTime={documentContent.readingTime ? parseInt(documentContent.readingTime) : 5}
      author={documentContent.author || "Admin"}
      content={documentContent.content}
      documents={documents}
      currentSlug={document.slug}
    >
      <DocumentMDXContent content={documentContent.content} />
    </EnhancedDocumentationLayout>
  )
}
