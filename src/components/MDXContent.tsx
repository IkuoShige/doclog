'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { mdxComponents } from './mdx/MDXComponents';
import dynamic from 'next/dynamic';

function MDXContentInner({ source, className = '' }: { source: MDXRemoteSerializeResult; className?: string }) {
  return (
    <div className={`prose prose-slate max-w-none ${className}`}>
      <MDXRemote {...source} components={mdxComponents} />
    </div>
  );
}

const DynamicMDXContent = dynamic(() => Promise.resolve(MDXContentInner), {
  ssr: false,
  loading: () => (
    <div className="prose prose-slate max-w-none">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
      </div>
    </div>
  ),
});

export function MDXContent({ source, className = '' }: { source: MDXRemoteSerializeResult; className?: string }) {
  return <DynamicMDXContent source={source} className={className} />;
}
