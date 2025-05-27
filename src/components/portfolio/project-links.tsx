'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Github, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

interface ProjectLinksProps {
  demoUrl?: string;
  githubUrl?: string;
  otherLinks?: Array<{
    label: string;
    url: string;
  }>;
}

export function ProjectLinks({ demoUrl, githubUrl, otherLinks }: ProjectLinksProps) {
  const hasAnyLinks = demoUrl || githubUrl || (otherLinks && otherLinks.length > 0);

  if (!hasAnyLinks) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">プロジェクトリンク</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {demoUrl && (
          <Button asChild className="w-full justify-start" variant="outline">
            <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              ライブデモを見る
            </Link>
          </Button>
        )}
        
        {githubUrl && (
          <Button asChild className="w-full justify-start" variant="outline">
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              ソースコードを見る
            </Link>
          </Button>
        )}
        
        {otherLinks && otherLinks.map((link, index) => (
          <Button 
            key={index} 
            asChild 
            className="w-full justify-start" 
            variant="outline"
          >
            <Link href={link.url} target="_blank" rel="noopener noreferrer">
              <LinkIcon className="mr-2 h-4 w-4" />
              {link.label}
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
