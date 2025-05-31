import React from 'react';

export interface TocItem {
  id: string;
  title: string;
  level: number;
  children?: TocItem[];
}

// MDXコンテンツから目次を生成する関数
export function generateToc(content: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    headings.push({
      id,
      title,
      level,
    });
  }

  return buildTocTree(headings);
}

// フラットな見出しリストを階層構造に変換
function buildTocTree(headings: TocItem[]): TocItem[] {
  const tree: TocItem[] = [];
  const stack: TocItem[] = [];

  headings.forEach((heading) => {
    // スタックから現在の見出しレベル以上のものを削除
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      // ルートレベル
      tree.push(heading);
    } else {
      // 親の子として追加
      const parent = stack[stack.length - 1];
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(heading);
    }

    stack.push(heading);
  });

  return tree;
}

// 見出しにIDを自動追加するMDXコンポーネント用のヘルパー
export function createHeadingComponent(level: number) {
  return function Heading({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
    const text = typeof children === 'string' ? children : children?.toString() || '';
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const tagName = `h${level}`;
    
    // レベルに応じたCSSクラス
    const classNames = {
      1: 'text-2xl font-bold mt-8 mb-4 pb-2 border-b first:mt-0',
      2: 'text-xl font-semibold mt-6 mb-3',
      3: 'text-lg font-medium mt-4 mb-2',
      4: 'text-base font-medium mt-3 mb-2',
      5: 'text-sm font-medium mt-3 mb-2',
      6: 'text-xs font-medium mt-3 mb-2',
    };

    return React.createElement(
      tagName,
      { id, className: classNames[level as keyof typeof classNames], ...props },
      children
    );
  };
}
