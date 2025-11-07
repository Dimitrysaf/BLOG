import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import sitemap from 'vite-plugin-sitemap';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const dynamicRoutes = async () => {
    // These are just examples, you'll need to fetch these from your API
    const posts = await Promise.resolve([
        { slug: 'post-1' },
        { slug: 'post-2' },
    ]);

    return posts.map((post) => `/p/${post.slug}`);
};

export default defineConfig({
  plugins: [
    vue(),
    sitemap({
        hostname: 'https://dimblog.vercel.app',
        dynamicRoutes: dynamicRoutes(),
    }),
    ViteImageOptimizer({
      /* pass your config */
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
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
