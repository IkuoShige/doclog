'use client';

import { useEffect, useState } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ComponentPropsWithoutRef } from 'react';

interface PortfolioMDXContentProps {
  source: MDXRemoteSerializeResult;
  className?: string;
}

// 基本的なMDXコンポーネント（フックを使わない）
const components = {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => <h1 className="text-3xl font-bold mb-4" {...props} />,
  h2: (props: ComponentPropsWithoutRef<'h2'>) => <h2 className="text-2xl font-semibold mb-3 mt-6" {...props} />,
  h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 className="text-xl font-semibold mb-2 mt-4" {...props} />,
  p: (props: ComponentPropsWithoutRef<'p'>) => <p className="mb-4 leading-7" {...props} />,
  ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul className="list-disc pl-6 mb-4" {...props} />,
  ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol className="list-decimal pl-6 mb-4" {...props} />,
  li: (props: ComponentPropsWithoutRef<'li'>) => <li className="mb-1" {...props} />,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => <strong className="font-bold" {...props} />,
  code: (props: ComponentPropsWithoutRef<'code'>) => <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props} />,
  pre: (props: ComponentPropsWithoutRef<'pre'>) => <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4" {...props} />,
};

export function PortfolioMDXContent({ source, className = '' }: PortfolioMDXContentProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <MDXRemote {...source} components={components} />
    </div>
  );
}
