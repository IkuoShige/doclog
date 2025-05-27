'use client';

import { PortfolioCard } from './portfolio-card';

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

interface RelatedProjectsProps {
  projects: PortfolioProject[];
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">関連プロジェクト</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <PortfolioCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
