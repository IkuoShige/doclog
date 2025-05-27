'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Home, BookOpen, Briefcase, User, Menu, X, Book } from 'lucide-react'// Enable ポートフォリオ
// import { Home, BookOpen, User, Menu, X, Book } from 'lucide-react'// Disable ポートフォリオ

interface NavigationItem {
  href: string
  label: string
  icon: React.ReactNode
  description?: string
}

const navigationItems: NavigationItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: <Home className="h-4 w-4" />,
    description: 'トップページ'
  },
  {
    href: '/blog',
    label: 'Blog',
    icon: <BookOpen className="h-4 w-4" />,
    description: '技術記事やコラム'
  },
  // Enable ポートフォリオ
  {
    href: '/portfolio',
    label: 'Projects',
    icon: <Briefcase className="h-4 w-4" />,
    description: '制作物や実績'
  },
  {
    href: '/documents',
    label: 'Documents',
    icon: <Book className="h-4 w-4" />,
    description: '技術ドキュメントと学習記録'
  },
  {
    href: '/about',
    label: 'About',
    icon: <User className="h-4 w-4" />,
    description: '自己紹介'
  }
]

interface NavigationProps {
  variant?: 'horizontal' | 'vertical'
  showIcons?: boolean
  showDescriptions?: boolean
  className?: string
}

export function Navigation({ 
  variant = 'horizontal', 
  showIcons = true,
  showDescriptions = false,
  className 
}: NavigationProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  if (variant === 'vertical') {
    return (
      <nav className={cn("space-y-1", className)}>
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActive(item.href)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {showIcons && item.icon}
            <div className="flex-1">
              <div>{item.label}</div>
              {showDescriptions && item.description && (
                <div className="text-xs opacity-70">{item.description}</div>
              )}
            </div>
          </Link>
        ))}
      </nav>
    )
  }

  return (
    <>
      {/* デスクトップナビゲーション */}
      <nav className={cn("hidden md:flex items-center space-x-1", className)}>
        {navigationItems.map((item) => (
          <Button
            key={item.href}
            variant={isActive(item.href) ? "default" : "ghost"}
            size="sm"
            asChild
            className="h-9"
          >
            <Link href={item.href} className="flex items-center gap-2">
              {showIcons && item.icon}
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>

      {/* モバイルナビゲーション */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="h-9 w-9 p-0"
        >
          {isMobileMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
          <span className="sr-only">メニューを開く</span>
        </Button>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b shadow-lg z-50">
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {showIcons && item.icon}
                  <div className="flex-1">
                    <div>{item.label}</div>
                    {showDescriptions && item.description && (
                      <div className="text-xs opacity-70">{item.description}</div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
