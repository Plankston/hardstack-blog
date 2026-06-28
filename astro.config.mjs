// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { visit } from 'unist-util-visit';

import tailwindcss from '@tailwindcss/vite';

// Rehype plugin: auto-add loading="lazy" to all <img> tags
function rehypeLazyLoadImages() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img' && !node.properties.loading) {
        node.properties.loading = 'lazy';
      }
    });
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://hardstack.org',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],

  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
    },
    rehypePlugins: [rehypeLazyLoadImages],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
