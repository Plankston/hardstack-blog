// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
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

  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Atkinson',
      cssVariable: '--font-atkinson',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/atkinson-regular.woff'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/atkinson-bold.woff'],
            weight: 700,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],

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
    build: {
      rollupOptions: {
        external: [/\/pagefind\/pagefind\.js$/],
      },
    },
  },
});
