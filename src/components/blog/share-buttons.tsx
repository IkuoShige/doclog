'use client'

import { useState } from 'react'
import { Share2, Twitter, Facebook, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { BlogPost } from '@/types/mdx'
import { cn } from '@/lib/utils'

interface ShareButtonsProps {
  post: BlogPost
  className?: string
}

export function ShareButtons({ post, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const url = `/blog/${post.slug}`
  const fullUrl = typeof window !== 'undefined' ? window.location.origin + url : url
  const encodedTitle = encodeURIComponent(post.title)
  const encodedUrl = encodeURIComponent(fullUrl)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    line: `https://line.me/R/msg/text/?${encodedTitle}%20${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const openShareWindow = (url: string) => {
    window.open(
      url,
      'share',
      'width=600,height=400,scrollbars=yes,resizable=yes'
    )
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        シェア:
      </span>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            シェア
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={() => openShareWindow(shareLinks.twitter)}
            className="cursor-pointer"
          >
            <Twitter className="h-4 w-4 mr-2" />
            Twitterでシェア
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => openShareWindow(shareLinks.facebook)}
            className="cursor-pointer"
          >
            <Facebook className="h-4 w-4 mr-2" />
            Facebookでシェア
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => openShareWindow(shareLinks.line)}
            className="cursor-pointer"
          >
            <div className="h-4 w-4 mr-2 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">L</span>
            </div>
            LINEでシェア
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={copyToClipboard}
            className="cursor-pointer"
          >
            {copied ? (
              <Check className="h-4 w-4 mr-2 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            {copied ? 'コピー済み' : 'URLをコピー'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
