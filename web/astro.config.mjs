import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: 'ste8q9xb',
      dataset: 'production',
      useCdn: false, // Set to true for production, false for live previews
      apiVersion: '2023-05-03',
    }),
  ],
});
