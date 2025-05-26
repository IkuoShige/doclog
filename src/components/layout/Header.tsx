import Link from 'next/link'
import { Container } from './container'
import { Navigation } from './navigation'
import { ThemeToggle } from '../theme-toggle'
import { Code2 } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* ロゴ */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Code2 className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                Portfolio
              </span>
            </Link>
          </div>

          {/* ナビゲーション */}
          <div className="flex items-center space-x-4">
            <Navigation />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  )
}
