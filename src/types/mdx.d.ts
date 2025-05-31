// Blog Post Types
export interface Author {
  name: string;
  avatar?: string;
  bio?: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: Author;
  tags: string[];
  readingTime?: number;
  published: boolean;
  category?: string;
  image?: string;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  description: string;
  date: string;
  technologies: string[];
  category: string;
  featured: boolean;
  tags?: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  readingTime?: number;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  technologies?: string[];
  published: boolean;
  readingTime?: number;
  author?: Author;
  image?: string;
}

// 統一されたコンテンツ型
export type ContentItem = (BlogPost | PortfolioProject | Guide) & {
  type: 'blog' | 'portfolio' | 'guide';
}
