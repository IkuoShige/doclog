'use client'

import { Container } from '@/components/layout/container'
import { Typography } from '@/components/ui/typography'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, FileText, FolderOpen, User, Mail, Book } from 'lucide-react'
import Link from 'next/link'

export function QuickAccess() {
  const quickLinks = [
    {
      title: 'プロジェクト',
      description: '学習・研究プロジェクトの一覧',
      href: '/portfolio',
      icon: FolderOpen,
      color: 'bg-blue-500',
    },
    {
      title: 'ブログ',
      description: '技術ブログとノウハウまとめ',
      href: '/blog',
      icon: FileText,
      color: 'bg-green-500',
    },
    {
      title: 'ドキュメント',
      description: '技術ドキュメントと学習記録',
      href: '/documents',
      icon: Book,
      color: 'bg-indigo-500',
    },
    {
      title: 'プロフィール',
      description: '詳細な自己紹介とスキル',
      href: '/about',
      icon: User,
      color: 'bg-purple-500',
    },
    {
      title: 'お問い合わせ',
      description: '連絡先とコンタクトフォーム',
      href: '/contact',
      icon: Mail,
      color: 'bg-orange-500',
    },
  ]

  return (
    <section className="py-8">
      <Container>
        <Typography variant="h2" className="text-xl font-semibold mb-6">
          クイックアクセス
        </Typography>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Card key={link.href} className="hover:shadow-md transition-all duration-200 hover:scale-105">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-md ${link.color}/10`}>
                      <Icon className={`h-5 w-5 ${link.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Typography variant="h4" className="font-semibold mb-1">
                        {link.title}
                      </Typography>
                      <Typography variant="muted" className="text-sm mb-3">
                        {link.description}
                      </Typography>
                    </div>
                  </div>
                  
                  <Button asChild size="sm" variant="outline" className="w-full">
                    <Link href={link.href}>
                      <ExternalLink className="mr-2 h-3 w-3" />
                      開く
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
