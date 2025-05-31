'use client'

import { Button } from '@/components/ui/button'

interface ScrollToTopButtonProps {
  className?: string
}

export function ScrollToTopButton({ className }: ScrollToTopButtonProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={handleScrollToTop}
      className={className}
    >
      ページトップへ
    </Button>
  )
}
