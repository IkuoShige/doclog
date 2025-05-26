# Next.js Portfolio Site

This is a modern portfolio website built with Next.js 15, TypeScript, and Tailwind CSS, featuring a blog, project showcase, and documentation. The site is configured for static site generation (SSG) and deployment to GitHub Pages.

## ✨ Features

- **📝 Blog System**: MDX-powered blog with categories, tags, and syntax highlighting
- **💼 Portfolio Showcase**: Project gallery with detailed case studies
- **📚 Documentation**: Technical guides and references
- **🎨 Modern UI**: Responsive design with Tailwind CSS and custom components
- **⚡ Performance**: Static site generation for optimal loading speeds
- **🔍 Search & Filter**: Advanced filtering by categories and tags
- **📱 Mobile First**: Fully responsive across all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX with frontmatter
- **UI Components**: Radix UI primitives
- **Deployment**: GitHub Pages via GitHub Actions

## 🚀 Getting Started

### Development Server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site in development mode.

### Build for Production

```bash
npm run build
```

This generates a static site in the `out/` directory, ready for deployment.

### Local Production Preview

```bash
npm run build
npx serve out -p 3001
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── content/            # MDX content files
│   ├── blog/           # Blog posts
│   ├── portfolio/      # Portfolio projects
│   └── documents/      # Documentation
├── lib/                # Utility functions and data
└── types/              # TypeScript type definitions
```

## 🔧 Configuration

### Static Site Generation
The site is configured for static export in `next.config.ts`:
- `output: 'export'` - Enables static site generation
- `images: { unoptimized: true }` - Required for static export
- `trailingSlash: true` - Ensures proper routing

### GitHub Pages Deployment
Automated deployment is handled by GitHub Actions (`.github/workflows/deploy.yml`):
- Triggers on push to main branch
- Builds the site using Node.js 18
- Deploys to `gh-pages` branch
- Serves from GitHub Pages

## 📝 Content Management

### Adding Blog Posts
Create new `.mdx` files in `src/content/blog/` with frontmatter:

```yaml
---
title: "Your Post Title"
description: "Post description"
publishedAt: "2024-01-01"
category: "Technology"
tags: ["React", "Next.js"]
---
```

### Adding Portfolio Projects
Create new `.mdx` files in `src/content/portfolio/` with frontmatter:

```yaml
---
title: "Project Name"
description: "Project description"
techStack: ["React", "Node.js"]
githubUrl: "https://github.com/..."
liveUrl: "https://..."
---
```

## 🚦 Deployment Status

✅ **Type System**: All TypeScript errors resolved
✅ **Build Process**: Static site generation working
✅ **GitHub Actions**: Workflow configured
✅ **Local Testing**: Production build verified

Ready for GitHub Pages deployment!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
