'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getImageWithFallback } from '@/lib/image-utils';
import { useState } from 'react';

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
  const [imageError, setImageError] = useState(false);
  
  return (
    <Card className={`h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${
      featured ? 'ring-2 ring-primary dark:ring-primary' : ''
    }`}>
      {project.image && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-800">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <span className="text-gray-500 text-sm">画像を読み込めませんでした</span>
            </div>
          ) : (
            <Image
              src={getImageWithFallback(project.image)}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              unoptimized={true}
            />
          )}
          {featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="default" className="bg-primary">
                注目
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2 mb-2">
          <Badge variant="outline" className="text-xs whitespace-nowrap">
            {project.category}
          </Badge>
        </div>
        
        <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          <Link href={`/portfolio/${project.slug}`} className="hover:underline">
            {project.title}
          </Link>
        </CardTitle>
        
        <CardDescription className="text-sm line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1 mb-4">
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
          
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
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
