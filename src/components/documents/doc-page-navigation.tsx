import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface DocPageNavItem {
  title: string;
  href: string;
}

interface DocPageNavigationProps {
  previousPage?: DocPageNavItem;
  nextPage?: DocPageNavItem;
}

export function DocPageNavigation({ previousPage, nextPage }: DocPageNavigationProps) {
  if (!previousPage && !nextPage) return null;

  return (
    <div className="flex justify-between items-center gap-4 mt-12 pt-8 border-t">
      {previousPage ? (
        <Link href={previousPage.href} className="flex-1">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">前のページ</p>
                  <p className="font-medium text-sm">{previousPage.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {nextPage ? (
        <Link href={nextPage.href} className="flex-1">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-end space-x-2">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">次のページ</p>
                  <p className="font-medium text-sm">{nextPage.title}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
