// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // Exclude Three.js libraries from SSR
      external: ['three', '@react-three/fiber', '@react-three/drei']
    }
  },

  integrations: [react()]
});
