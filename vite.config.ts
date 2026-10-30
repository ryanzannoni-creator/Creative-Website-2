import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  base: '/Creative-Website-2/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: { home: 'index.html', pricing: 'pricing.html' },
      output: {
        manualChunks: {
          motion: ['gsap', 'lenis'],
        },
      },
    },
  },
});
