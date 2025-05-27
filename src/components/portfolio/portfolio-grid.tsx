'use client';

import { useState, useMemo } from 'react';
import { PortfolioCard } from './portfolio-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

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

interface PortfolioGridProps {
  projects: PortfolioProject[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTech, setSelectedTech] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  // カテゴリと技術の一覧を取得
  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map(p => p.category)));
    return cats.sort();
  }, [projects]);

  const technologies = useMemo(() => {
    const techs = Array.from(new Set(projects.flatMap(p => p.technologies)));
    return techs.sort();
  }, [projects]);

  // フィルタリングとソート
  const filteredAndSortedProjects = useMemo(() => {
    const filtered = projects.filter(project => {
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || project.category === selectedCategory;
      
      const matchesTech = selectedTech === '' || project.technologies.includes(selectedTech);

      return matchesSearch && matchesCategory && matchesTech;
    });

    // ソート
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [projects, searchTerm, selectedCategory, selectedTech, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedTech('');
  };

  return (
    <div className="space-y-6">
      {/* 検索・フィルター */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="プロジェクトを検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
          
          {/* カテゴリフィルター */}
          <div className="flex flex-wrap gap-1">
            <Button
              variant={selectedCategory === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('')}
            >
              すべて
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* 技術フィルター */}
        {selectedTech === '' ? (
          <div className="flex flex-wrap gap-1">
            <span className="text-sm text-muted-foreground mr-2">技術:</span>
            {technologies.slice(0, 8).map(tech => (
              <Badge
                key={tech}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => setSelectedTech(tech)}
              >
                {tech}
              </Badge>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">技術:</span>
            <Badge
              variant="default"
              className="cursor-pointer"
              onClick={() => setSelectedTech('')}
            >
              {selectedTech} ✕
            </Badge>
          </div>
        )}

        {/* ソート・クリアボタン */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'date' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('date')}
            >
              新しい順
            </Button>
            <Button
              variant={sortBy === 'title' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('title')}
            >
              名前順
            </Button>
          </div>
          
          {(searchTerm || selectedCategory || selectedTech) && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              フィルターをクリア
            </Button>
          )}
        </div>
      </div>

      {/* 結果表示 */}
      <div className="text-sm text-muted-foreground">
        {filteredAndSortedProjects.length} 件のプロジェクトが見つかりました
      </div>

      {/* プロジェクトグリッド */}
      {filteredAndSortedProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedProjects.map((project) => (
            <PortfolioCard
              key={project.slug}
              project={project}
              featured={project.featured}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">条件に一致するプロジェクトが見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
}
