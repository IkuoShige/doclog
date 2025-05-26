'use client'

import Image from 'next/image'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  fill?: boolean
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  loading?: 'lazy' | 'eager'
}

const OptimizedImage = forwardRef<
  HTMLDivElement,
  OptimizedImageProps
>(({
  src,
  alt,
  width,
  height,
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  fill = false,
  objectFit = 'cover',
  loading = 'lazy',
  ...props
}, ref) => {
  const imageProps = {
    src,
    alt,
    sizes,
    priority,
    quality,
    placeholder,
    loading: priority ? 'eager' : loading,
    className: cn(
      'transition-opacity duration-300',
      fill && 'object-cover',
      className
    ),
    ...(blurDataURL && { blurDataURL }),
    ...(fill ? { fill: true } : { width, height }),
    style: fill ? { objectFit } : undefined,
  }

  if (fill) {
    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        {...props}
      >
        <Image {...imageProps} alt={alt} />
      </div>
    )
  }

  return <Image {...imageProps} alt={alt} {...props} />
})

OptimizedImage.displayName = 'OptimizedImage'

export { OptimizedImage }
export type { OptimizedImageProps }
