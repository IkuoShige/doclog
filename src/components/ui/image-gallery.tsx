'use client'

import { useState, useCallback } from 'react'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { Button } from '@/components/ui/button'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { generateBlurDataURL, responsiveSizes } from '@/lib/image-utils'

interface ImageGalleryItem {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

interface ImageGalleryProps {
  images: ImageGalleryItem[]
  className?: string
  columns?: 2 | 3 | 4
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto'
  showLightbox?: boolean
}

export function ImageGallery({
  images,
  className,
  columns = 3,
  aspectRatio = 'auto',
  showLightbox = true
}: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((index: number) => {
    if (showLightbox) {
      setLightboxIndex(index)
    }
  }, [showLightbox])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length)
    }
  }, [lightboxIndex, images.length])

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? images.length - 1 : lightboxIndex - 1)
    }
  }, [lightboxIndex, images.length])

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: ''
  }

  return (
    <>
      <div
        className={cn(
          'grid gap-4',
          gridCols[columns],
          className
        )}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              'group relative overflow-hidden rounded-lg bg-muted',
              aspectRatio !== 'auto' && aspectRatioClasses[aspectRatio],
              showLightbox && 'cursor-pointer'
            )}
            onClick={() => openLightbox(index)}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              fill={aspectRatio !== 'auto'}
              width={aspectRatio === 'auto' ? image.width : undefined}
              height={aspectRatio === 'auto' ? image.height : undefined}
              sizes={responsiveSizes.card}
              className={cn(
                'transition-transform duration-300',
                showLightbox && 'group-hover:scale-105',
                aspectRatio === 'auto' && 'w-full h-auto'
              )}
              placeholder="blur"
              blurDataURL={generateBlurDataURL()}
            />
            {showLightbox && (
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            )}
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-sm text-white">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {showLightbox && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="relative max-h-full max-w-full p-4">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10 h-10 w-10 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Image */}
            <div className="relative max-h-[90vh] max-w-[90vw]">
              <OptimizedImage
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                width={images[lightboxIndex].width}
                height={images[lightboxIndex].height}
                className="max-h-full max-w-full object-contain"
                sizes="90vw"
                priority
              />
            </div>

            {/* Caption */}
            {images[lightboxIndex].caption && (
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-sm text-white bg-black/50 px-4 py-2 rounded">
                  {images[lightboxIndex].caption}
                </p>
              </div>
            )}

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute top-4 left-4 text-sm text-white bg-black/50 px-3 py-1 rounded">
                {lightboxIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
