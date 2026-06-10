# HardStack

> 每个开源项目都值得被认真装一遍 — Every open-source project deserves a proper setup.

**HardStack** is a bilingual (English / 中文) technical blog focused on **open-source, self-hosted, and AI tools**. Each post is a deep-dive installation guide with real-world troubleshooting, comparisons, and logs — not just a copy-paste of the README.

[![Deploy to Cloudflare Pages](https://github.com/hardstack/blog/actions/workflows/deploy.yml/badge.svg)](https://github.com/hardstack/blog/actions/workflows/deploy.yml)

## Features

- 🌐 **Bilingual** — EN / zh-CN with locale-based routing (`/[locale]/blog/...`)
- 📝 **MDX blog posts** with structured frontmatter (tags, category, difficulty, reading time)
- 🔍 **Full-text search** powered by [Pagefind](https://pagefind.app/)
- 📡 **RSS feed** & **Sitemap**
- 💬 **Comment system** via [Giscus](https://giscus.app/)
- 🎨 **Tailwind CSS 4** styling with custom typography (Atkinson font)
- ✨ **Shiki** syntax highlighting (GitHub Light theme)
- 🚀 **Static site generation** via [Astro](https://astro.build)

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
│   ├── blog/        # MDX blog posts (English & Chinese)
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
title: "Your Post Title"
description: "Short description for listing and SEO"
pubDate: 2026-01-01
updatedDate: 2026-06-01  # optional
tags: ["tag1", "tag2"]
category: "ai-tools"      # optional
difficulty: "beginner"    # optional: beginner / intermediate / advanced
timeToRead: 10            # optional, minutes
postLang: "en"            # "en" or "zh-CN"
groupKey: "guide-group"   # optional, for grouping bilingual versions
---
```

For bilingual posts, create two files with the same `groupKey` but different `postLang` and locale in filename.

## Deployment

The site is automatically deployed to Cloudflare Pages on every push to `main` via GitHub Actions.

Manual deploy:
```bash
npx wrangler pages deploy dist --project-name hardstack-blog
```

## License

MIT
