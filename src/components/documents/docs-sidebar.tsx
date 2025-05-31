'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, FileText, BookOpen, Code, Wrench } from 'lucide-react';

interface DocsSidebarProps {
  documents: Array<{
    slug: string;
    title: string;
    category: string;
  }>;
}

// カテゴリーごとのアイコンマッピング
const categoryIcons = {
  '開発': Code,
  'Web開発': Globe,
  'フロントエンド': Monitor,
  'プログラミング': Code,
  'ツール': Wrench,
  'その他': FileText,
} as const;

export function DocsSidebar({ documents }: DocsSidebarProps) {
  const pathname = usePathname();
  
  // カテゴリーごとにドキュメントをグループ化
  const groupedDocs = documents.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, typeof documents>);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <Link href="/documents" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="font-semibold text-lg">ドキュメント</span>
        </Link>
      </div>
      
      <ScrollArea className="flex-1 px-3">
        <div className="py-4">
          {Object.entries(groupedDocs).map(([category, docs]) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons] || FileText;
            
            return (
              <div key={category} className="mb-6">
                <div className="flex items-center space-x-2 px-3 mb-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                    {category}
                  </h3>
                </div>
                
                <div className="space-y-1">
                  {docs.map((doc) => {
                    const isActive = pathname === `/documents/${doc.slug}`;
                    
                    return (
                      <Link
                        key={doc.slug}
                        href={`/documents/${doc.slug}`}
                        className={cn(
                          'block px-3 py-2 rounded-md text-sm transition-colors',
                          'hover:bg-accent hover:text-accent-foreground',
                          isActive 
                            ? 'bg-accent text-accent-foreground font-medium' 
                            : 'text-muted-foreground'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate">{doc.title}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {/* デスクトップサイドバー */}
      <aside className="hidden lg:block w-80 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <SidebarContent />
      </aside>

      {/* モバイルサイドバー */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}

// 必要なアイコンを追加で定義
function Globe({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9-3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}

function Monitor({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
