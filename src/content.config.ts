import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Admin'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.yml', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['undangan', 'cetak-foto', 'banner']),
    description: z.string(),
    images: z.array(z.string()).optional(),
    client: z.string().optional(),
    date: z.date().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, portfolio };
