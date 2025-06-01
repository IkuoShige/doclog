import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import Image from 'next/image'
import { mdxComponents } from '@/components/mdx/mdx-components'
import 'highlight.js/styles/github-dark.css'

interface DocumentMDXContentProps {
  content: string
  className?: string
}

// 見出しテキストからIDを生成するヘルパー関数
const generateHeadingId = (children: React.ReactNode): string => {
  const text = typeof children === 'string' ? children : 
    Array.isArray(children) ? children.join('') :
    children?.toString() || ''
  
  return text
    .toLowerCase()
    .replace(/[^\w\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// ReactMarkdown用のカスタムコンポーネント
const markdownComponents: Components = {
  h1: ({ children, ...props }) => {
    const id = generateHeadingId(children)
    return (
      <h1 id={id} className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 border-b pb-4 scroll-mt-16" {...props}>
        {children}
      </h1>
    )
  },
  h2: ({ children, ...props }) => {
    const id = generateHeadingId(children)
    return (
      <h2 id={id} className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 mt-8 scroll-mt-16" {...props}>
        {children}
      </h2>
    )
  },
  h3: ({ children, ...props }) => {
    const id = generateHeadingId(children)
    return (
      <h3 id={id} className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 mt-6 scroll-mt-16" {...props}>
        {children}
      </h3>
    )
  },
  h4: ({ children, ...props }) => {
    const id = generateHeadingId(children)
    return (
      <h4 id={id} className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 mt-4 scroll-mt-16" {...props}>
        {children}
      </h4>
    )
  },
  h5: ({ children, ...props }) => {
    const id = generateHeadingId(children)
    return (
      <h5 id={id} className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 mt-3 scroll-mt-16" {...props}>
        {children}
      </h5>
    )
  },
  h6: ({ children, ...props }) => {
    const id = generateHeadingId(children)
    return (
      <h6 id={id} className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2 mt-3 scroll-mt-16" {...props}>
        {children}
      </h6>
    )
  },
  p: ({ children, ...props }) => (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-6 mb-4 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-6 mb-4 space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-gray-700 dark:text-gray-300 leading-relaxed" {...props}>
      {children}
    </li>
  ),
  a: ({ children, href, ...props }) => (
    <a 
      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2 transition-colors" 
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ children, className, ...props }) => {
    // コードブロック内のcodeタグかインラインのcodeタグかを判断
    if (className?.includes('language-')) {
      // コードブロック内のcode（propsをそのまま渡す）
      return <code className={className} {...props}>{children}</code>
    }
    // インラインコード
    return (
      <code 
        className="text-pink-600 dark:text-pink-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" 
        {...props}
      >
        {children}
      </code>
    )
  },
  pre: ({ children, ...props }) => (
    <pre className="bg-gray-900 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4 overflow-x-auto mb-6 text-gray-100" {...props}>
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 py-3 px-4 mb-6 italic" {...props}>
      {children}
    </blockquote>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-bold text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </em>
  ),
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </td>
  ),
  hr: ({ ...props }) => (
    <hr className="my-8 border-gray-300 dark:border-gray-600" {...props} />
  ),
  img: ({ alt, src }) => {
    if (!src) return null
    return (
      <Image 
        className="rounded-lg shadow-lg mx-auto max-w-full h-auto my-6" 
        alt={alt || ''}
        src={src as string}
        width={800}
        height={400}
        style={{ width: 'auto', height: 'auto' }}
      />
    )
  },
}

export function DocumentMDXContent({ content, className }: DocumentMDXContentProps) {
  return (
    <article 
      className={cn(
        "prose prose-gray dark:prose-invert max-w-none",
        "prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100",
        "prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl",
        "prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed",
        "prose-a:text-blue-600 hover:prose-a:text-blue-700 dark:prose-a:text-blue-400",
        "prose-strong:text-gray-900 dark:prose-strong:text-gray-100",
        "prose-code:text-pink-600 dark:prose-code:text-pink-400",
        "prose-code:bg-gray-100 dark:prose-code:bg-gray-800",
        "prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
        "prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950",
        "prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-800",
        "prose-blockquote:border-l-4 prose-blockquote:border-blue-500",
        "prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20",
        "prose-blockquote:py-3 prose-blockquote:px-4",
        "prose-ul:list-disc prose-ol:list-decimal",
        "prose-li:text-gray-700 dark:prose-li:text-gray-300",
        "prose-table:border-collapse prose-table:border prose-table:border-gray-300",
        "prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50 dark:prose-th:bg-gray-800",
        "prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2",
        "prose-img:rounded-lg prose-img:shadow-lg",
        "prose-hr:border-gray-300 dark:prose-hr:border-gray-600",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{...markdownComponents, ...mdxComponents}}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
