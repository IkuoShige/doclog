import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="パンくずリスト"
      className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}
    >
      {/* ホームアイコン */}
      <Link
        href="/"
        className="flex items-center hover:text-foreground transition-colors"
        aria-label="ホーム"
      >
        <Home className="h-4 w-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors truncate"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground truncate" aria-current="page">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
