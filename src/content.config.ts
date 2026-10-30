import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    outcome: z.string(),
    figure: z.string(),
    figureLabel: z.string(),
    company: z.string(),
    year: z.coerce.string(),
    role: z.string(),
    team: z.string(),
    stack: z.array(z.string()),
    duration: z.string(),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    pillar: z.enum(['Engineering', 'Decisions', 'AI', 'Business']),
    type: z.enum(['article', 'note']).default('article'),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, writing };
