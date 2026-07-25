# HardStack

> 每个开源项目都值得被认真选、认真用。

**HardStack** 是一个中文技术博客，聚焦**开源、自建、AI 工具**。内容不只是安装教程——对比评测、长期体验、性能调优、踩坑实录，帮你做出选择、用好工具。

[![Deploy to Cloudflare Pages](https://github.com/Plankston/hardstack-blog/actions/workflows/deploy.yml/badge.svg)](https://github.com/Plankston/hardstack-blog/actions/workflows/deploy.yml)

## Features

- 📝 **MDX blog posts** with structured frontmatter (tags, category, articleType, difficulty, reading time)
- 🔍 **Full-text search** powered by [Pagefind](https://pagefind.app/)
- 📡 **RSS feed** & **Sitemap**
- 🎨 **Tailwind CSS 4** styling with custom typography
- ✨ **Shiki** syntax highlighting (GitHub Light theme)
- 🚀 **Static site generation** via [Astro](https://astro.build)

## Content Types

| 类型 | 说明 | 目标占比 |
|------|------|----------|
| comparison | A vs B 对比评测 | 30% |
| experience | 长期使用体验、踩坑实录 | 25% |
| optimization | 性能调优、进阶配置 | 20% |
| troubleshooting | 问题排查、故障修复 | 15% |
| installation | 安装部署教程（仅限高热度工具） | 10% |

## Tech Stack

| Category       | Choice                        |
| -------------- | ----------------------------- |
| Framework      | Astro 6                       |
| Styling        | Tailwind CSS 4                |
| Content        | MDX with Astro Content Collections |
| Search         | Pagefind                      |
| Syntax Highlighting | Shiki                    |
| Deployment     | Cloudflare Pages              |
| CI/CD          | GitHub Actions + Wrangler     |

## Getting Started

```bash
# Prerequisites: Node.js >= 22.12.0
npm install
npm run dev
```

Open `http://localhost:4321` in your browser.

### Available Commands

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start dev server at `localhost:4321` |
| `npm run build`     | Build static site to `dist/`       |
| `npm run preview`   | Preview production build           |
| `npm run astro`     | Run Astro CLI                      |

> `npm run build` runs `astro build` followed by `npx pagefind --site dist` for search indexing.

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Astro components (Header, Footer, Search, etc.)
├── content/
│   ├── blog/        # MDX blog posts (Chinese-first)
│   └── config.ts    # Content collection schema
├── i18n/            # Internationalization (translations, utils)
├── layouts/         # Page layouts
├── pages/           # Route pages
│   ├── [locale]/    # Locale-prefixed routes (en, zh-CN)
│   └── rss.xml.js   # RSS feed
└── styles/          # Global CSS
```

### Writing a Post

Create an MDX file in `src/content/blog/` with the following frontmatter:

```yaml
---
title: "文章标题"
description: "简短描述，用于列表和 SEO"
pubDate: 2026-01-01
updatedDate: 2026-06-01  # optional
tags: ["tag1", "tag2"]
category: "ai-tools"
articleType: "comparison"  # comparison / experience / optimization / troubleshooting / installation
difficulty: "beginner"    # optional: beginner / intermediate / advanced
timeToRead: 10            # optional, minutes
postLang: "zh-CN"         # 中文优先
groupKey: "guide-group"   # optional, for grouping related articles
---
```

## Deployment

The site is automatically deployed to Cloudflare Pages on every push to `main` via GitHub Actions.

Manual deploy:
```bash
npx wrangler pages deploy dist --project-name hardstack-blog
```

## License

MIT
