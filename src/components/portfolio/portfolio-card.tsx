'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface PortfolioProject {
  slug: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image?: string;
  date: string;
  featured?: boolean;
  demo?: string;
  github?: string;
}

interface PortfolioCardProps {
  project: PortfolioProject;
  featured?: boolean;
}

export function PortfolioCard({ project, featured = false }: PortfolioCardProps) {
  return (
    <Card className={`h-full hover:shadow-lg transition-all duration-300 dark:hover:shadow-xl ${
      featured ? 'ring-2 ring-primary dark:ring-primary' : ''
    }`}>
      {project.image && (
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="default" className="bg-primary">
                注目
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="line-clamp-2">
            <Link href={`/portfolio/${project.slug}`} className="hover:underline">
              {project.title}
            </Link>
          </CardTitle>
          <Badge variant="outline" className="text-xs whitespace-nowrap">
            {project.category}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {new Date(project.date).toLocaleDateString('ja-JP', { 
                year: 'numeric', 
                month: 'short' 
              })}
            </div>
            
            <div className="flex gap-2">
              {project.demo && (
                <Button asChild size="sm" variant="outline">
                  <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </Button>
              )}
              {project.github && (
                <Button asChild size="sm" variant="outline">
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-3 w-3" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
