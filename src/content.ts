import { getCollection } from 'astro:content';

export const getWork = async () =>
  (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);

export const getWriting = async () =>
  (await getCollection('writing', ({ data }) => import.meta.env.DEV || !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
