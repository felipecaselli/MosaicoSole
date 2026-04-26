import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';

import cloudflare from '@astrojs/cloudflare';

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

  adapter: cloudflare(),
});