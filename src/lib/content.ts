import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, PortfolioProject, Guide } from '@/types/mdx';
import { generateExcerpt } from './content-utils';

const contentDirectory = path.join(process.cwd(), 'content');

// ファイルの存在チェック
function checkDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ブログ記事の取得（拡張版）
export function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(contentDirectory, 'blog');
  checkDirectoryExists(blogDir);
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  
  const filenames = fs.readdirSync(blogDir);
  const posts = filenames
    .filter((name) => name.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(blogDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // 読了時間を自動計算
      const readingTimeData = readingTime(content);
      
      return {
        slug: filename.replace(/\.mdx$/, ''),
        title: data.title || '',
        description: data.description || generateExcerpt(content),
        content,
        date: data.date || '',
        author: data.author || 'Developer',
        category: data.category,
        tags: data.tags || [],
        image: data.image,
        featured: data.featured || false,
        readingTime: readingTimeData,
        published: data.published !== false,
      } as BlogPost;
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return posts;
}

// 単一のブログ記事を取得（拡張版）
export function getBlogPost(slug: string): BlogPost | null {
  const blogDir = path.join(contentDirectory, 'blog');
  const filePath = path.join(blogDir, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const readingTimeData = readingTime(content);
  
  const post: BlogPost = {
    id: data.id || slug,
    slug,
    title: data.title || '',
    description: data.description || generateExcerpt(content),
    content,
    date: data.date || '',
    author: data.author || 'Developer',
    category: data.category,
    tags: data.tags || [],
    image: data.image,
    featured: data.featured || false,
    readingTime: readingTimeData,
    published: data.published !== false,
  };
  
  return post;
}

// カテゴリ別のブログ投稿を取得
export function getBlogPostsByCategory(category: string): BlogPost[] {
  const allPosts = getBlogPosts();
  return allPosts.filter((post) => 
    post.category?.toLowerCase() === category.toLowerCase()
  );
}

// タグ別のブログ投稿を取得
export function getBlogPostsByTag(tag: string): BlogPost[] {
  const allPosts = getBlogPosts();
  return allPosts.filter((post) => 
    post.tags?.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  );
}

// 関連記事を取得
export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = getBlogPosts();
  
  // 現在の記事以外を取得
  const otherPosts = allPosts.filter((post) => post.slug !== currentPost.slug);
  
  // 同じカテゴリまたは共通タグを持つ記事をスコア化
  const scoredPosts = otherPosts.map((post) => {
    let score = 0;
    
    // 同じカテゴリの場合はスコア+2
    if (post.category === currentPost.category) {
      score += 2;
    }
    
    // 共通タグの数だけスコア+1
    const commonTags = post.tags?.filter((tag) => 
      currentPost.tags?.includes(tag)
    ) || [];
    score += commonTags.length;
    
    return { post, score };
  });
  
  // スコアでソートして上位を返す
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

// 全カテゴリを取得
export function getAllCategories(): string[] {
  const allPosts = getBlogPosts();
  const categories = allPosts.map((post) => post.category).filter((cat): cat is string => Boolean(cat));
  return Array.from(new Set(categories));
}

// 全タグを取得
export function getAllTags(): string[] {
  const allPosts = getBlogPosts();
  const tags = allPosts.flatMap((post) => post.tags || []);
  return Array.from(new Set(tags));
}

// 検索機能
export function searchBlogPosts(query: string): BlogPost[] {
  const allPosts = getBlogPosts();
  const searchQuery = query.toLowerCase();
  
  return allPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchQuery) ||
      post.description.toLowerCase().includes(searchQuery) ||
      (post.content && post.content.toLowerCase().includes(searchQuery)) ||
      (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchQuery))) ||
      (post.category && post.category.toLowerCase().includes(searchQuery))
    );
  });
}

// フィーチャー記事を取得
export function getFeaturedPosts(limit: number = 3): BlogPost[] {
  const allPosts = getBlogPosts();
  return allPosts
    .filter((post) => post.featured === true)
    .slice(0, limit);
}

// 最新記事を取得
export function getLatestPosts(limit: number = 3): BlogPost[] {
  const allPosts = getBlogPosts();
  return allPosts.slice(0, limit);
}

// ポートフォリオプロジェクトの取得
export function getPortfolioProjects(): PortfolioProject[] {
  const portfolioDir = path.join(contentDirectory, 'portfolio');
  checkDirectoryExists(portfolioDir);
  
  if (!fs.existsSync(portfolioDir)) {
    return [];
  }
  
  const filenames = fs.readdirSync(portfolioDir);
  const projects = filenames
    .filter((name) => name.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(portfolioDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      const slug = filename.replace(/\.mdx$/, '');
      return {
        id: data.id || slug,
        slug: slug,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        technologies: data.technologies || [],
        category: data.category || '',
        tags: data.tags || [],
        featured: data.featured || false,
        status: data.status || 'completed',
        highlights: data.highlights || [],
        duration: data.duration,
        teamSize: data.teamSize,
        published: data.published !== false,
        github: data.github,
        demo: data.demo,
        image: data.image,
        images: data.images,
      } as PortfolioProject;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return projects;
}

// 単一のポートフォリオプロジェクトを取得
export function getPortfolioProject(slug: string): { project: PortfolioProject; content: string } | null {
  const portfolioDir = path.join(contentDirectory, 'portfolio');
  const filePath = path.join(portfolioDir, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const project: PortfolioProject = {
    id: data.id || slug,
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    technologies: data.technologies || [],
    category: data.category || '',
    tags: data.tags || [],
    featured: data.featured || false,
    status: data.status || 'completed',
    highlights: data.highlights || [],
    duration: data.duration,
    teamSize: data.teamSize,
    published: data.published !== false,
    github: data.github,
    demo: data.demo,
    image: data.image,
    images: data.images,
  };
  
  return { project, content };
}

// ガイドの取得
export function getGuides(): Guide[] {
  const guidesDir = path.join(contentDirectory, 'guides');
  checkDirectoryExists(guidesDir);
  
  if (!fs.existsSync(guidesDir)) {
    return [];
  }
  
  const filenames = fs.readdirSync(guidesDir);
  const guides = filenames
    .filter((name) => name.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(guidesDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: filename.replace(/\.mdx$/, ''),
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        category: data.category || '',
        tags: data.tags || [],
        published: data.published !== false,
      } as Guide;
    })
    .filter((guide) => guide.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return guides;
}

// 単一のガイドを取得
export function getGuide(slug: string): { guide: Guide; content: string } | null {
  const guidesDir = path.join(contentDirectory, 'guides');
  const filePath = path.join(guidesDir, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const guide: Guide = {
    id: data.id || slug,
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    author: data.author || 'Developer',
    category: data.category || '',
    estimatedTime: data.estimatedTime || '5分',
    tags: data.tags || [],
    published: data.published !== false,
  };
  
  return { guide, content };
}



// カテゴリでポートフォリオプロジェクトをフィルタ
export function getPortfolioProjectsByCategory(category: string): PortfolioProject[] {
  const projects = getPortfolioProjects();
  return projects.filter(project => project.category === category);
}

// カテゴリでガイドをフィルタ
export function getGuidesByCategory(category: string): Guide[] {
  const guides = getGuides();
  return guides.filter(guide => guide.category === category);
}

// タグでガイドをフィルタ
export function getGuidesByTag(tag: string): Guide[] {
  const guides = getGuides();
  return guides.filter(guide => guide.tags?.includes(tag));
}

// 検索機能（タイトル、説明、タグで検索）
export function searchContent(query: string): {
  blogs: BlogPost[];
  portfolio: PortfolioProject[];
  guides: Guide[];
} {
  const searchTerm = query.toLowerCase();
  
  const blogs = getBlogPosts().filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.description.toLowerCase().includes(searchTerm) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  );
  
  const portfolio = getPortfolioProjects().filter(project =>
    project.title.toLowerCase().includes(searchTerm) ||
    project.description.toLowerCase().includes(searchTerm) ||
    project.technologies?.some(tech => tech.toLowerCase().includes(searchTerm)) ||
    project.category.toLowerCase().includes(searchTerm)
  );
  
  const guides = getGuides().filter(guide =>
    guide.title.toLowerCase().includes(searchTerm) ||
    guide.description.toLowerCase().includes(searchTerm) ||
    guide.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    guide.category.toLowerCase().includes(searchTerm)
  );
  
  return { blogs, portfolio, guides };
}

// 関連コンテンツを取得（タグベース）
export function getRelatedContent(
  contentType: 'blog' | 'portfolio' | 'guide',
  slug: string,
  limit: number = 3
): (BlogPost | PortfolioProject | Guide)[] {
  let currentTags: string[] = [];
  let currentCategory = '';
  
  // 現在のコンテンツのタグとカテゴリを取得
  if (contentType === 'blog') {
    const currentPost = getBlogPost(slug);
    if (currentPost) {
      currentTags = currentPost.tags || [];
    }
  } else if (contentType === 'portfolio') {
    const currentProject = getPortfolioProject(slug);
    if (currentProject) {
      currentCategory = currentProject.project.category;
    }
  } else if (contentType === 'guide') {
    const currentGuide = getGuide(slug);
    if (currentGuide) {
      currentTags = currentGuide.guide.tags || [];
      currentCategory = currentGuide.guide.category;
    }
  }
  
  // 関連コンテンツを検索
  let relatedContent: (BlogPost | PortfolioProject | Guide)[] = [];
  
  if (contentType === 'blog' || contentType === 'guide') {
    // タグベースで関連コンテンツを検索
    const allContent = [
      ...getBlogPosts(),
      ...getGuides()
    ].filter(content => content.slug !== slug);
    
    relatedContent = allContent
      .map(content => ({
        content,
        score: currentTags.filter(tag => 
          'tags' in content ? content.tags?.includes(tag) : false
        ).length
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.content);
  } else if (contentType === 'portfolio') {
    // カテゴリベースで関連プロジェクトを検索
    relatedContent = getPortfolioProjects()
      .filter(project => project.slug !== slug && project.category === currentCategory);
  }
  
  return relatedContent.slice(0, limit);
}

// 人気のタグを取得（使用頻度順）
export function getPopularTags(limit: number = 10): { tag: string; count: number }[] {
  const tagCounts = new Map<string, number>();
  
  // ブログ記事のタグをカウント
  getBlogPosts().forEach(post => {
    post.tags?.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  
  // ガイドのタグをカウント
  getGuides().forEach(guide => {
    guide.tags?.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

// 最新のコンテンツを取得（すべてのタイプから）
export function getRecentContent(limit: number = 5): {
  type: 'blog' | 'portfolio' | 'guide';
  content: BlogPost | PortfolioProject | Guide;
}[] {
  const allContent: {
    type: 'blog' | 'portfolio' | 'guide';
    content: BlogPost | PortfolioProject | Guide;
    date: Date;
  }[] = [
    ...getBlogPosts().map(post => ({
      type: 'blog' as const,
      content: post,
      date: new Date(post.date)
    })),
    ...getPortfolioProjects().map(project => ({
      type: 'portfolio' as const,
      content: project,
      date: new Date(project.date)
    })),
    ...getGuides().map(guide => ({
      type: 'guide' as const,
      content: guide,
      date: new Date(guide.date)
    }))
  ];
  
  return allContent
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit)
    .map(({ type, content }) => ({ type, content }));
}



// ポートフォリオプロジェクトの検索
export function searchPortfolioProjects(query: string, technologies?: string[], category?: string): PortfolioProject[] {
  const projects = getPortfolioProjects();
  
  return projects.filter(project => {
    const matchesQuery = !query ||
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase());
    
    const matchesTechnologies = !technologies || technologies.length === 0 ||
      technologies.some(tech => project.technologies.includes(tech));
    
    const matchesCategory = !category || project.category === category;
    
    return matchesQuery && matchesTechnologies && matchesCategory;
  });
}

// ガイドの検索
export function searchGuides(query: string, tags?: string[], category?: string): Guide[] {
  const guides = getGuides();
  
  return guides.filter(guide => {
    const matchesQuery = !query ||
      guide.title.toLowerCase().includes(query.toLowerCase()) ||
      guide.description.toLowerCase().includes(query.toLowerCase());
    
    const matchesTags = !tags || tags.length === 0 ||
      tags.some(tag => guide.tags.includes(tag));
    
    const matchesCategory = !category || guide.category === category;
    
    return matchesQuery && matchesTags && matchesCategory;
  });
}

// 関連コンテンツ機能

// 関連ブログ記事を取得
export function getRelatedBlogPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const posts = getBlogPosts();
  const currentPost = posts.find(post => post.slug === currentSlug);
  
  if (!currentPost) return [];
  
  const relatedPosts = posts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      let score = 0;
      
      // タグの一致で点数付け
      const postTags = post.tags || [];
      const currentTags = currentPost.tags || [];
      const sharedTags = postTags.filter(tag => currentTags.includes(tag));
      score += sharedTags.length * 3;
      
      // 作成者が同じ場合
      if (post.author === currentPost.author) {
        score += 1;
      }
      
      // 日付が近い場合（30日以内）
      const daysDiff = Math.abs(
        new Date(post.date).getTime() - new Date(currentPost.date).getTime()
      ) / (1000 * 60 * 60 * 24);
      
      if (daysDiff <= 30) {
        score += 2;
      }
      
      return { post, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
  
  return relatedPosts;
}

// 関連ポートフォリオプロジェクトを取得
export function getRelatedPortfolioProjects(currentSlug: string, limit: number = 3): PortfolioProject[] {
  const projects = getPortfolioProjects();
  const currentProject = projects.find(project => project.slug === currentSlug);
  
  if (!currentProject) return [];
  
  const relatedProjects = projects
    .filter(project => project.slug !== currentSlug)
    .map(project => {
      let score = 0;
      
      // 技術スタックの一致で点数付け
      const sharedTechnologies = project.technologies.filter(tech => 
        currentProject.technologies.includes(tech)
      );
      score += sharedTechnologies.length * 3;
      
      // カテゴリが同じ場合
      if (project.category === currentProject.category) {
        score += 2;
      }
      
      return { project, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.project);
  
  return relatedProjects;
}

// 関連ガイドを取得
export function getRelatedGuides(currentSlug: string, limit: number = 3): Guide[] {
  const guides = getGuides();
  const currentGuide = guides.find(guide => guide.slug === currentSlug);
  
  if (!currentGuide) return [];
  
  const relatedGuides = guides
    .filter(guide => guide.slug !== currentSlug)
    .map(guide => {
      let score = 0;
      
      // タグの一致で点数付け
      const sharedTags = guide.tags.filter(tag => currentGuide.tags.includes(tag));
      score += sharedTags.length * 3;
      
      // カテゴリが同じ場合
      if (guide.category === currentGuide.category) {
        score += 2;
      }
      
      return { guide, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.guide);
  
  return relatedGuides;
}

// タグとカテゴリの取得

// 全ブログ記事のタグを取得
export function getAllBlogTags(): string[] {
  const posts = getBlogPosts();
  const allTags = posts.flatMap(post => post.tags || []);
  return [...new Set(allTags)].sort();
}

// 全ポートフォリオの技術スタックを取得
export function getAllTechnologies(): string[] {
  const projects = getPortfolioProjects();
  const allTechnologies = projects.flatMap(project => project.technologies || []);
  return [...new Set(allTechnologies)].sort();
}

// 全ポートフォリオのカテゴリを取得
export function getAllPortfolioCategories(): string[] {
  const projects = getPortfolioProjects();
  const allCategories = projects.map(project => project.category).filter(Boolean);
  return [...new Set(allCategories)].sort();
}

// 全ガイドのタグを取得
export function getAllGuideTags(): string[] {
  const guides = getGuides();
  const allTags = guides.flatMap(guide => guide.tags);
  return [...new Set(allTags)].sort();
}

// 全ガイドのカテゴリを取得
export function getAllGuideCategories(): string[] {
  const guides = getGuides();
  const allCategories = guides.map(guide => guide.category).filter(Boolean);
  return [...new Set(allCategories)].sort();
}

// 統計情報の取得
export function getContentStats() {
  const blogPosts = getBlogPosts();
  const portfolioProjects = getPortfolioProjects();
  const guides = getGuides();
  
  return {
    totalBlogPosts: blogPosts.length,
    totalPortfolioProjects: portfolioProjects.length,
    totalGuides: guides.length,
    totalTags: getAllBlogTags().length + getAllGuideTags().length,
    featuredProjects: portfolioProjects.filter(p => p.featured).length,
    recentPosts: blogPosts.slice(0, 5),
    recentProjects: portfolioProjects.slice(0, 3),
  };
}
