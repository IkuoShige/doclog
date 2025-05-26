'use client'

import { BlogPost } from '@/types/mdx'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github-dark.css'

interface BlogContentProps {
  post: BlogPost
  className?: string
}

export function BlogContent({ post, className }: BlogContentProps) {
  return (
    <article 
      className={cn(
        "prose prose-gray dark:prose-invert max-w-none",
        "prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100",
        "prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl",
        "prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed",
        "prose-a:text-blue-600 hover:prose-a:text-blue-700 dark:prose-a:text-blue-400",
        "prose-strong:text-gray-900 dark:prose-strong:text-gray-100",
        "prose-code:text-pink-600 dark:prose-code:text-pink-400",
        "prose-code:bg-gray-100 dark:prose-code:bg-gray-800",
        "prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
        "prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950",
        "prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-800",
        "prose-blockquote:border-l-4 prose-blockquote:border-blue-500",
        "prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20",
        "prose-blockquote:py-2 prose-blockquote:px-4",
        "prose-ul:list-disc prose-ol:list-decimal",
        "prose-li:text-gray-700 dark:prose-li:text-gray-300",
        "prose-table:border-collapse prose-table:border prose-table:border-gray-300",
        "prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50 dark:prose-th:bg-gray-800",
        "prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // カスタムコンポーネントの定義
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 mt-8">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 mt-8">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 mt-6">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-4 space-y-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-700 dark:text-gray-300">
              {children}
            </li>
          ),
          a: ({ href, children }) => (
            <a 
              href={href} 
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          code: (props) => {
            const { children, className, ...rest } = props
            
            if (!className) {
              // インラインコード
              return (
                <code className="text-pink-600 dark:text-pink-400 bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                  {children}
                </code>
              )
            }
            
            // コードブロック
            return (
              <code {...rest} className={className}>
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="bg-gray-900 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4 overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 py-2 px-4 mb-4 italic">
              {children}
            </blockquote>
          ),
        } as Components}
      >
        {post.content}
      </ReactMarkdown>
    </article>
  )
}
