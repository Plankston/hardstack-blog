import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    difficulty: z.string().optional(),
    timeToRead: z.number().optional(),
    postLang: z.string().default('en'),
    groupKey: z.string().optional(),
    template: z.enum(['paper', 'clean', 'dark']).default('paper'),
  }),
});

export const collections = { blog };
