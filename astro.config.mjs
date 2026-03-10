import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});