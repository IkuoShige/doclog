import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export async function serializeMDX(content: string): Promise<MDXRemoteSerializeResult> {
  try {
    const serialized = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [rehypeAutolinkHeadings, { 
            behavior: 'wrap',
            properties: {
              className: ['hash-link']
            }
          }]
        ],
        development: process.env.NODE_ENV === 'development',
      },
    });
    
    return serialized;
  } catch (error) {
    console.error('Error serializing MDX:', error);
    throw error;
  }
}
