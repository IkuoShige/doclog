'use client';

import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

interface CodeBlockProps {
  children: string;
  className?: string;
}

export function CodeBlock({ children, className = '' }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const { theme } = useTheme();
  
  // 言語を抽出（例: "language-javascript" -> "javascript"）
  const language = className.replace('language-', '') || 'text';
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative group">
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={copyToClipboard}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      
      <Highlight
        theme={theme === 'dark' ? themes.vsDark : themes.vsLight}
        code={children.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto p-4 rounded-lg text-sm leading-relaxed`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="select-none text-gray-500 mr-4 text-xs">
                  {String(i + 1).padStart(2, ' ')}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

// インラインコード用のコンポーネント
export function InlineCode({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-foreground"
      {...props}
    >
      {children}
    </code>
  );
}
