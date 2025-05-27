import Link from 'next/link'
import { Container } from './container'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Github, Twitter, Linkedin, Mail, Code2, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: Github,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: Linkedin,
    },
    {
      name: 'Email',
      href: 'mailto:contact@example.com',
      icon: Mail,
    },
  ]

  const footerLinks = {
    コンテンツ: [
      { name: 'ブログ', href: '/blog' },
      { name: 'ポートフォリオ', href: '/portfolio' },
      { name: 'ドキュメント', href: '/documents' },
      { name: 'ガイド', href: '/guides' },
    ],
    情報: [
      { name: 'About', href: '/about' },
      { name: 'プライバシーポリシー', href: '/privacy' },
      { name: 'お問い合わせ', href: '/contact' },
    ],
  }

  return (
    <footer className="border-t bg-muted/50">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* ブランド情報 */}
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Code2 className="h-6 w-6" />
                <span className="font-bold text-lg">Portfolio</span>
              </Link>
              <p className="text-muted-foreground text-sm mb-4 max-w-md">
                学生生活中に書き留めておきたいこと（技術系）をまとめたものです。
                {/* モダンなWebテクノロジーを使った開発・技術記事・ポートフォリオを公開しています。 */}
                {/* 継続的な学習と実践を通じて、価値あるコンテンツをお届けします。 */}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="text-xs">
                  Next.js 15
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  TypeScript
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Tailwind CSS
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  shadcn/ui
                </Badge>
              </div>
            </div>

            {/* リンクセクション */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold text-sm mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <span>© {currentYear} Portfolio. Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500" />
              <span>by Developer</span>
            </div>
            
            {/* ソーシャルリンク */}
            <div className="flex space-x-4">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
