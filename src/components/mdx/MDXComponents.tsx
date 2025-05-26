import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CalloutProps {
  children: ReactNode;
  type?: 'info' | 'warning' | 'error' | 'success';
}

export function Callout({ children, type = 'info' }: CalloutProps) {
  const typeStyles = {
    info: 'border-blue-500 bg-blue-50 text-blue-900',
    warning: 'border-yellow-500 bg-yellow-50 text-yellow-900',
    error: 'border-red-500 bg-red-50 text-red-900',
    success: 'border-green-500 bg-green-50 text-green-900',
  };

  return (
    <div className={cn(
      'border-l-4 p-4 my-6 rounded-r-lg',
      typeStyles[type]
    )}>
      {children}
    </div>
  );
}

interface CodeBlockProps {
  children: ReactNode;
  filename?: string;
  language?: string;
}

export function CodeBlock({ children, filename, language }: CodeBlockProps) {
  return (
    <div className="my-6">
      {filename && (
        <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono rounded-t-lg border-b border-gray-600">
          {filename}
        </div>
      )}
      <div className={cn(
        "bg-gray-900 text-gray-100 p-4 overflow-x-auto",
        filename ? "rounded-b-lg" : "rounded-lg"
      )}>
        <pre><code className={language ? `language-${language}` : ''}>{children}</code></pre>
      </div>
    </div>
  );
}

interface StepProps {
  children: ReactNode;
  number: number;
}

export function Step({ children, number }: StepProps) {
  return (
    <div className="flex gap-4 my-6">
      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
        {number}
      </div>
      <div className="flex-1 pt-1">
        {children}
      </div>
    </div>
  );
}

interface TabsProps {
  children: ReactNode;
  defaultValue?: string;
}

interface TabsListProps {
  children: ReactNode;
}

interface TabsTriggerProps {
  children: ReactNode;
  value: string;
}

interface TabsContentProps {
  children: ReactNode;
  value: string;
}

export function Tabs({ children, defaultValue }: TabsProps) {
  return (
    <div className="my-6" data-default-value={defaultValue}>
      {children}
    </div>
  );
}

export function TabsList({ children }: TabsListProps) {
  return (
    <div className="flex border-b border-gray-200 mb-4">
      {children}
    </div>
  );
}

export function TabsTrigger({ children, value }: TabsTriggerProps) {
  return (
    <button 
      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-colors"
      data-value={value}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value }: TabsContentProps) {
  return (
    <div data-value={value}>
      {children}
    </div>
  );
}

interface ImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function Image({ src, alt, caption, width, height }: ImageProps) {
  return (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={src} 
        alt={alt} 
        width={width}
        height={height}
        className="rounded-lg shadow-lg mx-auto max-w-full h-auto"
      />
      {caption && (
        <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// よく使われるMDXコンポーネントをエクスポート
export const mdxComponents = {
  Callout,
  CodeBlock,
  Step,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Image,
  // HTMLタグのカスタマイズ
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-4xl font-bold mb-6 text-gray-900">{children}</h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-3xl font-semibold mb-4 mt-8 text-gray-900">{children}</h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-2xl font-semibold mb-3 mt-6 text-gray-900">{children}</h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
  ),
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <a 
      href={href} 
      className="text-blue-600 hover:text-blue-800 underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 my-6 italic text-gray-600">
      {children}
    </blockquote>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  code: ({ children }: { children: ReactNode }) => (
    <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
      {children}
    </pre>
  ),
  table: ({ children }: { children: ReactNode }) => (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="border border-gray-300 bg-gray-50 px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="border border-gray-300 px-4 py-2">{children}</td>
  ),
};
