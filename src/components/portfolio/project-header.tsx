'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PortfolioProject {
  slug: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  date: string;
  featured?: boolean;
}

interface ProjectHeaderProps {
  project: PortfolioProject;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ポートフォリオに戻る
          </Link>
        </Button>
        
        {project.featured && (
          <Badge variant="default">注目プロジェクト</Badge>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <time dateTime={project.date}>
            {new Date(project.date).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <Badge variant="outline">{project.category}</Badge>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
