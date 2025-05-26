'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface SidebarProps {
  children: React.ReactNode
  isOpen?: boolean
  onToggle?: () => void
  side?: 'left' | 'right'
  overlay?: boolean
  collapsible?: boolean
  className?: string
}

export function Sidebar({ 
  children, 
  isOpen = false, 
  onToggle, 
  side = 'left',
  overlay = true,
  collapsible = false,
  className 
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* オーバーレイ */}
      {overlay && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* サイドバー */}
      <aside className={cn(
        'fixed top-0 z-50 flex h-screen flex-col border-r bg-background transition-all duration-300',
        side === 'left' ? 'left-0' : 'right-0',
        isOpen 
          ? 'translate-x-0' 
          : side === 'left' 
            ? '-translate-x-full' 
            : 'translate-x-full',
        isCollapsed ? 'w-16' : 'w-64',
        'lg:translate-x-0', // デスクトップでは常に表示
        className
      )}>
        {/* ヘッダー */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold">メニュー</h2>
            </div>
          )}
          
          <div className="flex items-center space-x-1">
            {collapsible && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleCollapse}
                className="h-8 w-8 p-0 lg:block hidden"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-8 w-8 p-0 lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* コンテンツ */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </aside>
    </>
  )
}

interface SidebarContentProps {
  children: React.ReactNode
  className?: string
}

export function SidebarContent({ children, className }: SidebarContentProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  )
}

interface SidebarSectionProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function SidebarSection({ title, children, className }: SidebarSectionProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {title && (
        <h3 className="text-sm font-medium text-muted-foreground px-2">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

interface SidebarItemProps {
  children: React.ReactNode
  icon?: React.ReactNode
  active?: boolean
  onClick?: () => void
  href?: string
  className?: string
}

export function SidebarItem({ 
  children, 
  icon, 
  active = false, 
  onClick, 
  href,
  className 
}: SidebarItemProps) {
  const Comp = href ? 'a' : 'button'
  
  return (
    <Comp
      href={href}
      onClick={onClick}
      className={cn(
        'flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors',
        active 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-1 text-left">{children}</span>
    </Comp>
  )
}
