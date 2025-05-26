import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from './mdx/MDXComponents';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

interface MDXContentProps {
  content: string;
  className?: string;
}

export function MDXContent({ content, className = '' }: MDXContentProps) {
  return (
    <div className={`prose prose-slate max-w-none ${className}`}>
      <MDXRemote
        source={content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeHighlight,
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: 'wrap',
                  properties: {
                    className: ['anchor'],
                  },
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
