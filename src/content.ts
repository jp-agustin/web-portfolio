import { getCollection } from 'astro:content';

export const getWork = async () =>
  (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);

export const getWriting = async () =>
  (await getCollection('writing', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

// Topic filters (chips and /writing/<topic> pages) only help once the list is longer than a screen.
export const TOPIC_FILTER_MIN = 6;
