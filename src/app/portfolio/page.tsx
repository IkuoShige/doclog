import { getPortfolioProjects } from '@/lib/content';
import Link from 'next/link';

export default function PortfolioPage() {
  const projects = getPortfolioProjects();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            ポートフォリオ
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            実際に開発したプロジェクトやアプリケーションを紹介
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {project.image && (
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-xs font-medium">
                    {project.category}
                  </span>
                  <span className="mx-2">•</span>
                  <time dateTime={project.date}>
                    {new Date(project.date).toLocaleDateString('ja-JP')}
                  </time>
                  {project.featured && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium">
                        Featured
                      </span>
                    </>
                  )}
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  <Link 
                    href={`/portfolio/${project.slug}`}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    {project.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="text-indigo-600 font-medium hover:text-indigo-500 transition-colors"
                  >
                    詳細を見る →
                  </Link>
                  
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">まだプロジェクトがありません。</p>
          </div>
        )}
      </div>
    </div>
  );
}
