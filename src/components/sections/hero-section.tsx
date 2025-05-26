'use client'

import { Container } from '@/components/layout/container'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { generateBlurDataURL } from '@/lib/image-utils'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:hello@example.com',
    icon: Mail,
  },
]

export function HeroSection() {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          {/* Profile */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-muted">
              <OptimizedImage
                src="/images/profile.jpg"
                alt="プロフィール画像"
                width={128}
                height={128}
                className="rounded-full object-cover w-full h-full"
                placeholder="blur"
                blurDataURL={generateBlurDataURL()}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <Typography variant="h1" className="text-3xl lg:text-4xl font-bold mb-4">
              ロボティクス修士学生
            </Typography>
            <Typography variant="large" className="text-muted-foreground mb-6 max-w-2xl">
              ソフトウェア開発、機械学習、ウェブ開発を学習中。
              研究活動や個人プロジェクトの記録を公開しています。
            </Typography>
            
            {/* Quick Actions */}
            <div className="flex gap-3">
              <Button asChild size="sm">
                <Link href="/portfolio">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  プロジェクト
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/blog">
                  ブログ
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  連絡先
                </Link>
              </Button>
            </div>
          </div>

          {/* Social Links - Compact */}
          <div className="flex lg:flex-col gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
