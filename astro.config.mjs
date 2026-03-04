import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  image: {
    domains: ['images.unsplash.com'],
  },

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});