import { cn } from '@/lib/utils'

interface GridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  }
  className?: string
}

export function Grid({ 
  children, 
  cols = 1, 
  gap = 'md', 
  responsive,
  className 
}: GridProps) {
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    12: 'grid-cols-12'
  }
  
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  }

  const responsiveClasses = responsive ? [
    responsive.sm && `sm:grid-cols-${responsive.sm}`,
    responsive.md && `md:grid-cols-${responsive.md}`,
    responsive.lg && `lg:grid-cols-${responsive.lg}`,
    responsive.xl && `xl:grid-cols-${responsive.xl}`,
  ].filter(Boolean).join(' ') : ''

  return (
    <div className={cn(
      'grid',
      colsClasses[cols],
      gapClasses[gap],
      responsiveClasses,
      className
    )}>
      {children}
    </div>
  )
}

interface GridItemProps {
  children: React.ReactNode
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  start?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  responsive?: {
    sm?: { span?: 1 | 2 | 3 | 4 | 5 | 6 | 12; start?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 }
    md?: { span?: 1 | 2 | 3 | 4 | 5 | 6 | 12; start?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 }
    lg?: { span?: 1 | 2 | 3 | 4 | 5 | 6 | 12; start?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 }
    xl?: { span?: 1 | 2 | 3 | 4 | 5 | 6 | 12; start?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 }
  }
  className?: string
}

export function GridItem({ 
  children, 
  span, 
  start, 
  responsive,
  className 
}: GridItemProps) {
  const spanClasses = span ? {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    12: 'col-span-12'
  }[span] : ''

  const startClasses = start ? {
    1: 'col-start-1',
    2: 'col-start-2',
    3: 'col-start-3',
    4: 'col-start-4',
    5: 'col-start-5',
    6: 'col-start-6',
    7: 'col-start-7',
    8: 'col-start-8',
    9: 'col-start-9',
    10: 'col-start-10',
    11: 'col-start-11',
    12: 'col-start-12'
  }[start] : ''

  const responsiveClasses = responsive ? [
    responsive.sm?.span && `sm:col-span-${responsive.sm.span}`,
    responsive.sm?.start && `sm:col-start-${responsive.sm.start}`,
    responsive.md?.span && `md:col-span-${responsive.md.span}`,
    responsive.md?.start && `md:col-start-${responsive.md.start}`,
    responsive.lg?.span && `lg:col-span-${responsive.lg.span}`,
    responsive.lg?.start && `lg:col-start-${responsive.lg.start}`,
    responsive.xl?.span && `xl:col-span-${responsive.xl.span}`,
    responsive.xl?.start && `xl:col-start-${responsive.xl.start}`,
  ].filter(Boolean).join(' ') : ''

  return (
    <div className={cn(
      spanClasses,
      startClasses,
      responsiveClasses,
      className
    )}>
      {children}
    </div>
  )
}
