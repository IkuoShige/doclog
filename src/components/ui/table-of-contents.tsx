'use client'

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { TocItem } from '@/lib/toc';

interface TableOfContentsProps {
  toc: TocItem[];
  className?: string;
}

export function TableOfContents({ toc, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    );

    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderTocItem = (item: TocItem) => (
    <li key={item.id}>
      <button
        onClick={() => handleClick(item.id)}
        className={cn(
          'block w-full text-left py-1 text-sm transition-colors hover:text-foreground',
          item.level === 1 && 'font-medium',
          item.level === 2 && 'pl-3',
          item.level === 3 && 'pl-6 text-xs',
          item.level >= 4 && 'pl-9 text-xs',
          activeId === item.id
            ? 'text-foreground border-l-2 border-primary pl-3'
            : 'text-muted-foreground'
        )}
      >
        {item.title}
      </button>
      {item.children && (
        <ul className="mt-1">
          {item.children.map(renderTocItem)}
        </ul>
      )}
    </li>
  );

  if (toc.length === 0) return null;

  return (
    <nav className={cn('space-y-1', className)}>
      <h4 className="font-medium text-sm mb-3">目次</h4>
      <ul className="space-y-1">
        {toc.map(renderTocItem)}
      </ul>
    </nav>
  );
}
