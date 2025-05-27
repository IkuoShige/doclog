import { notFound } from 'next/navigation';
import { getPortfolioProject, getPortfolioProjects } from '@/lib/content';
import { ProjectHeader } from '@/components/portfolio/project-header';
import { ProjectGallery } from '@/components/portfolio/project-gallery';
import { TechStack } from '@/components/portfolio/tech-stack';
import { ProjectLinks } from '@/components/portfolio/project-links';
import { RelatedProjects } from '@/components/portfolio/related-projects';
import { PortfolioMDXContent } from '@/components/portfolio/portfolio-mdx-content';
import { serializeMDX } from '@/components/MDXContent';
import { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = getPortfolioProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = getPortfolioProject(slug);
  
  if (!result) {
    return {};
  }

  const { project } = result;

  return {
    title: `${project.title} | ポートフォリオ`,
    description: project.description,
    keywords: [...project.technologies, project.category],
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'website',
      images: project.image ? [{ url: project.image }] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const result = getPortfolioProject(slug);
  
  if (!result) {
    notFound();
  }

  const { project, content } = result;
  
  // MDXコンテンツを準備
  const mdxSource = await serializeMDX(content);
  
  const allProjects = getPortfolioProjects();
  const relatedProjects = allProjects
    .filter(p => 
      p.slug !== project.slug && 
      (p.category === project.category || 
       p.technologies.some((tech: string) => project.technologies.includes(tech)))
    )
    .slice(0, 3);

  // プロジェクトの画像配列を準備
  const projectImages = project.images || (project.image ? [project.image] : []);

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <ProjectHeader project={project} />
        
        {projectImages.length > 0 && (
          <div className="mt-8">
            <ProjectGallery images={projectImages} title={project.title} />
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* MDXコンテンツを表示 */}
              <PortfolioMDXContent source={mdxSource} />
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <TechStack technologies={project.technologies} />
            
            <ProjectLinks 
              demoUrl={project.demo} 
              githubUrl={project.github}
            />
            
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-semibold mb-3">プロジェクト情報</h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-muted-foreground">カテゴリ</dt>
                  <dd>{project.category}</dd>
                </div>
                {project.duration && (
                  <div>
                    <dt className="text-muted-foreground">開発期間</dt>
                    <dd>{project.duration}</dd>
                  </div>
                )}
                {project.teamSize && (
                  <div>
                    <dt className="text-muted-foreground">チーム構成</dt>
                    <dd>{project.teamSize}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-muted-foreground">完成日</dt>
                  <dd>{new Date(project.date).toLocaleDateString('ja-JP')}</dd>
                </div>
                {project.status && (
                  <div>
                    <dt className="text-muted-foreground">ステータス</dt>
                    <dd>{project.status}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
        
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <RelatedProjects projects={relatedProjects} />
          </div>
        )}
      </div>
    </article>
  );
}
