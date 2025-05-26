import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
  className
}: BlogPaginationProps) {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = []
    const delta = 2 // 現在のページの前後に表示するページ数

    // 常に最初のページを表示
    pages.push(1)

    // 現在のページの前後のページを計算
    const start = Math.max(2, currentPage - delta)
    const end = Math.min(totalPages - 1, currentPage + delta)

    // 最初のページと開始ページの間に省略記号が必要かチェック
    if (start > 2) {
      pages.push('...')
    }

    // 中間のページを追加
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // 終了ページと最後のページの間に省略記号が必要かチェック
    if (end < totalPages - 1) {
      pages.push('...')
    }

    // 常に最後のページを表示（ただし、最初のページと同じでない場合のみ）
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pages = generatePageNumbers()

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {/* 前のページボタン */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        前へ
      </Button>

      {/* ページ番号 */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 py-1 text-muted-foreground">
                ...
              </span>
            )
          }

          const pageNumber = page as number
          const isCurrentPage = pageNumber === currentPage

          return (
            <Button
              key={pageNumber}
              variant={isCurrentPage ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(pageNumber)}
              className={cn(
                'min-w-[2.25rem]',
                isCurrentPage && 'pointer-events-none'
              )}
            >
              {pageNumber}
            </Button>
          )
        })}
      </div>

      {/* 次のページボタン */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1"
      >
        次へ
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
