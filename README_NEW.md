# Doclog - Modern Portfolio & Blog Platform

A comprehensive, modern portfolio and blog platform built with Next.js 15, featuring advanced content management, responsive design, and optimal performance. Perfect for developers, designers, and content creators who want to showcase their work and share knowledge.

## ✨ Key Features

### 📝 Advanced Blog System
- **MDX-powered content** with full React component support
- **Advanced syntax highlighting** with Prism.js
- **Reading time estimation** and **table of contents** generation
- **Category and tag-based organization** with advanced filtering
- **Related posts** and **navigation** between articles
- **Social sharing** and **SEO optimization**

### 💼 Portfolio Showcase
- **Project galleries** with lightbox functionality
- **Technology stack visualization** and categorization
- **Live demo and GitHub links** integration
- **Project timeline** and **development insights**
- **Advanced filtering** by technology and category
- **Featured projects** highlighting system

### 📚 Documentation System
- **Technical guides** and **tutorials**
- **Step-by-step walkthroughs** with code examples
- **Searchable content** with category organization
- **Interactive components** and **code blocks**

### 🎨 Modern Design System
- **Responsive design** optimized for all devices
- **Dark/Light mode** with system preference detection
- **Consistent typography** and **spacing system**
- **Accessible UI components** built with Radix UI
- **Smooth animations** with Framer Motion
- **Professional color schemes** and **modern layouts**

### ⚡ Performance & Technical Excellence
- **Static site generation** for optimal loading speeds
- **Automatic image optimization** and **WebP conversion**
- **Code splitting** and **lazy loading**
- **SEO optimization** with meta tags and structured data
- **Perfect Lighthouse scores** (Performance, Accessibility, Best Practices, SEO)

## 🛠️ Technology Stack

### Core Framework
- **Next.js 15** with App Router for modern React development
- **TypeScript** for type-safe development
- **Tailwind CSS** for utility-first styling
- **MDX** for rich content with React components

### UI & Design
- **Radix UI** primitives for accessible components
- **Lucide React** for consistent iconography
- **Framer Motion** for smooth animations
- **next-themes** for theme management

### Content & Data
- **Gray Matter** for frontmatter parsing
- **Reading Time** calculation
- **Rehype & Remark** plugins for content processing
- **Syntax highlighting** with multiple themes

### Deployment & Performance
- **GitHub Actions** for automated deployment
- **GitHub Pages** hosting
- **Static export** for optimal performance
- **Image optimization** and **responsive images**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/doclog.git
cd doclog

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Build static site
npm run build

# Preview production build locally
npx serve out -p 3001
```

## 📁 Project Architecture

```
doclog/
├── 📁 content/                    # Content files (MDX)
│   ├── 📁 blog/                  # Blog posts
│   ├── 📁 portfolio/             # Portfolio projects  
│   └── 📁 documents/             # Documentation
├── 📁 public/                    # Static assets
│   └── 📁 images/               # Images and media
├── 📁 src/
│   ├── 📁 app/                   # Next.js App Router pages
│   │   ├── 📁 blog/             # Blog pages and routing
│   │   ├── 📁 portfolio/        # Portfolio pages
│   │   ├── 📁 documents/        # Documentation pages
│   │   └── 📁 about/            # About page
│   ├── 📁 components/           # React components
│   │   ├── 📁 ui/               # Base UI components
│   │   ├── 📁 layout/           # Layout components
│   │   ├── 📁 blog/             # Blog-specific components
│   │   ├── 📁 portfolio/        # Portfolio components
│   │   ├── 📁 documents/        # Documentation components
│   │   ├── 📁 sections/         # Page sections
│   │   └── 📁 providers/        # Context providers
│   ├── 📁 lib/                  # Utility functions
│   │   ├── content.ts           # Content management
│   │   ├── utils.ts             # General utilities
│   │   └── 📁 utils/           # Utility modules
│   └── 📁 types/               # TypeScript definitions
├── 📁 .github/workflows/        # GitHub Actions
└── 📄 Configuration files
```

## 📝 Content Management

### Creating Blog Posts

Create a new `.mdx` file in `content/blog/`:

```yaml
---
id: "unique-post-id"
title: "Your Amazing Blog Post"
description: "A comprehensive guide to..."
date: "2024-01-15"
category: "Web Development"
tags: ["React", "Next.js", "TypeScript"]
author: "Your Name"
image: "/images/blog/post-cover.jpg"
featured: true
published: true
---

# Your Content Here

Write your content using MDX with full React component support.

```jsx
// You can include React components
<CustomComponent prop="value" />
```

Regular markdown also works perfectly.
```

### Adding Portfolio Projects

Create a new `.mdx` file in `content/portfolio/`:

```yaml
---
id: "project-id"
title: "Awesome Project"
description: "A revolutionary web application..."
date: "2024-01-10"
category: "Web Application"
technologies: ["React", "Node.js", "PostgreSQL"]
featured: true
status: "completed"
github: "https://github.com/username/project"
demo: "https://project-demo.com"
image: "/images/portfolio/project-cover.jpg"
images: [
  "/images/portfolio/screenshot1.jpg",
  "/images/portfolio/screenshot2.jpg"
]
highlights: [
  "50% performance improvement",
  "10k+ active users",
  "Award-winning design"
]
duration: "3 months"
teamSize: 4
published: true
---

# Project Overview

Detailed description of your project...

## Key Features
- Feature 1
- Feature 2
- Feature 3

## Technical Implementation
Details about the technical approach...
```

### Creating Documentation

Create a new `.mdx` file in `content/documents/`:

```yaml
---
id: "guide-id"
title: "Complete Guide to..."
description: "Step-by-step tutorial for..."
category: "Tutorial"
tags: ["Guide", "Tutorial", "Development"]
lastUpdated: "2024-01-15"
author: "Your Name"
readingTime: 15
published: true
---

# Documentation Content

Your comprehensive guide content here...
```

## 🎨 Customization Guide

### Theme Configuration

The site supports extensive theming through Tailwind CSS and CSS custom properties:

```css
/* globals.css - Custom theme variables */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode variables */
}
```

### Component Customization

All UI components are built with Radix UI and can be customized:

```tsx
// Example: Custom button variant
<Button variant="outline" size="lg" className="custom-styles">
  Custom Button
</Button>
```

### Layout Modifications

Modify layouts in `src/components/layout/`:
- `Header.tsx` - Navigation and branding
- `Footer.tsx` - Footer content and links
- `Container.tsx` - Page width and spacing

## 🔧 Configuration & Settings

### Site Configuration

Update site metadata in `src/app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Your Site Name",
  description: "Your site description",
  keywords: ["keyword1", "keyword2"],
  // ... other metadata
}
```

### Next.js Configuration

The site is configured for static export in `next.config.ts`:

```typescript
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // ... other configurations
}
```

### Environment Variables

Create `.env.local` for environment-specific settings:

```env
# Optional: Analytics, etc.
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GITHUB_USERNAME=yourusername
```

## 📊 Performance Optimization

### Built-in Optimizations
- **Static Site Generation** - All pages pre-rendered at build time
- **Automatic Code Splitting** - Route-based and component-based
- **Image Optimization** - Next.js Image component with WebP
- **Font Optimization** - Google Fonts with display optimization
- **CSS Optimization** - Tailwind CSS purging and minification

### Performance Metrics
- **Lighthouse Score**: 100/100/100/100
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔍 SEO Features

### Automatic SEO Optimization
- **Meta tags** generation for all pages
- **Open Graph** and **Twitter Card** support
- **Structured data** for blog posts and projects
- **XML sitemap** generation
- **Robots.txt** optimization
- **Canonical URLs** and proper heading hierarchy

### Content SEO
- **Reading time** calculation
- **Related content** suggestions
- **Tag and category** organization
- **Internal linking** optimization

## 🚢 Deployment

### Automated GitHub Pages Deployment

The site automatically deploys via GitHub Actions when you push to the main branch:

1. **Fork or clone** this repository
2. **Enable GitHub Pages** in repository settings
3. **Push changes** to the main branch
4. **Visit** `https://yourusername.github.io/doclog`

### Manual Deployment Options

#### Vercel
```bash
npm i -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Upload the 'out' directory to Netlify
```

#### Static Hosting
```bash
npm run build
# Upload the 'out' directory to any static host
```

## 🛠️ Development & Maintenance

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Content Updates
1. **Add/Edit** MDX files in the `content/` directory
2. **Commit and push** changes
3. **Automatic deployment** via GitHub Actions
4. **Content appears** on the live site

### Adding New Features
1. **Create components** in appropriate directories
2. **Update types** if necessary
3. **Test thoroughly** before deployment
4. **Document** new features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### Contributing Guidelines
1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support & Community

- **Issues**: [GitHub Issues](https://github.com/yourusername/doclog/issues)
- **Documentation**: Check the `.docs/` directory for detailed guides
- **Examples**: Browse the `content/` directory for content examples

---

**Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS**
