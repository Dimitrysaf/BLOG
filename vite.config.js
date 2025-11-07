import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    vue(),
    sitemap({
        hostname: 'https://dimblog.vercel.app',
        // Temporarily disabling dynamic routes to fix the build
        dynamicRoutes: [],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
