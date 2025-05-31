import { ReactNode } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { createHeadingComponent } from '@/lib/toc'
import { 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Lightbulb,
  Code2,
  Terminal,
  FileText,
  ExternalLink
} from 'lucide-react'

interface DocumentMDXProps {
  children: ReactNode
}

// MDXコンポーネントの共通props型
interface MDXComponentProps {
  children?: ReactNode
  className?: string
  [key: string]: unknown
}

// リンクコンポーネントの型
interface LinkProps extends MDXComponentProps {
  href?: string
  children: ReactNode
}

// 画像コンポーネントの型
interface ImageProps extends MDXComponentProps {
  src?: string
  alt?: string
}

// カスタムコンポーネント
const components = {
  // 見出し - 自動でIDを付与
  h1: createHeadingComponent(1),
  h2: createHeadingComponent(2),
  h3: createHeadingComponent(3),
  h4: createHeadingComponent(4),
  h5: createHeadingComponent(5),
  h6: createHeadingComponent(6),

  // 段落
  p: ({ children, ...props }: MDXComponentProps) => (
    <p className="mb-4 leading-7" {...props}>
      {children}
    </p>
  ),

  // リスト
  ul: ({ children, ...props }: MDXComponentProps) => (
    <ul className="mb-4 ml-6 list-disc space-y-1" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: MDXComponentProps) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: MDXComponentProps) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),

  // コードブロック
  pre: ({ children, ...props }: MDXComponentProps) => (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4" />
          <span className="text-sm font-medium">コード例</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <pre className="overflow-x-auto p-4 bg-muted rounded-md text-sm" {...props}>
          {children}
        </pre>
      </CardContent>
    </Card>
  ),

  // インラインコード
  code: ({ children, ...props }: MDXComponentProps) => (
    <code className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),

  // 引用
  blockquote: ({ children, ...props }: MDXComponentProps) => (
    <Card className="mb-4 border-l-4 border-l-primary">
      <CardContent className="p-4">
        <blockquote className="italic text-muted-foreground" {...props}>
          {children}
        </blockquote>
      </CardContent>
    </Card>
  ),

  // テーブル
  table: ({ children, ...props }: MDXComponentProps) => (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full" {...props}>
            {children}
          </table>
        </div>
      </CardContent>
    </Card>
  ),
  thead: ({ children, ...props }: MDXComponentProps) => (
    <thead className="bg-muted" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: MDXComponentProps) => (
    <tbody {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: MDXComponentProps) => (
    <tr className="border-b last:border-b-0" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: MDXComponentProps) => (
    <th className="p-3 text-left font-medium" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: MDXComponentProps) => (
    <td className="p-3" {...props}>
      {children}
    </td>
  ),

  // 水平線
  hr: ({ ...props }: MDXComponentProps) => (
    <Separator className="my-6" {...props} />
  ),

  // リンク
  a: ({ children, href, ...props }: LinkProps) => (
    <a 
      href={href}
      className="text-primary hover:underline inline-flex items-center gap-1"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
      {href?.startsWith('http') && <ExternalLink className="h-3 w-3" />}
    </a>
  ),

  // 画像
  img: ({ src, alt, ...props }: ImageProps) => (
    <Card className="mb-4">
      <CardContent className="p-0">
        {src ? (
          <Image 
            src={src} 
            alt={alt || ''} 
            width={800}
            height={600}
            className="w-full h-auto rounded-lg"
            {...props}
          />
        ) : (
          <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">画像が見つかりません</span>
          </div>
        )}
        {alt && (
          <div className="p-3 text-sm text-muted-foreground text-center border-t">
            {alt}
          </div>
        )}
      </CardContent>
    </Card>
  ),
}

// カスタムアラートコンポーネント
export const DocumentAlert = ({ 
  type = 'info', 
  title, 
  children 
}: { 
  type?: 'info' | 'warning' | 'success' | 'tip'
  title?: string
  children: ReactNode 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />
      case 'success':
        return <CheckCircle className="h-4 w-4" />
      case 'tip':
        return <Lightbulb className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getBorderColor = () => {
    switch (type) {
      case 'warning':
        return 'border-l-red-500'
      case 'success':
        return 'border-l-green-500'
      case 'tip':
        return 'border-l-yellow-500'
      default:
        return 'border-l-blue-500'
    }
  }

  return (
    <Card className={`mb-4 border-l-4 ${getBorderColor()}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-2">
          {getIcon()}
          <div className="flex-1">
            {title && <div className="font-medium mb-1">{title}</div>}
            <div>{children}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ステップガイドコンポーネント
export const DocumentSteps = ({ children }: { children: ReactNode }) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          実行手順
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {children}
      </CardContent>
    </Card>
  )
}

// コマンドラインコンポーネント
export const DocumentCommand = ({ children }: { children: ReactNode }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          <span className="text-sm font-medium">コマンド</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <pre className="p-3 bg-slate-900 text-green-400 rounded-md text-sm overflow-x-auto">
          <code>{children}</code>
        </pre>
      </CardContent>
    </Card>
  )
}

export function DocumentMDX({ children }: DocumentMDXProps) {
  return (
    <div className="document-mdx">
      {children}
    </div>
  )
}

export { components as documentComponents }
