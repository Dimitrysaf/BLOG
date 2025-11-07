
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import sitemap from 'vite-plugin-sitemap';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Function to fetch dynamic routes from Supabase
async function getDynamicRoutes() {
  // Ensure environment variables are loaded
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase environment variables are not set. Sitemap generation for dynamic routes will be skipped.");
    return [];
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: posts, error } = await supabase
      .from('posts')
      .select('slug')
      .eq('is_published', true);

    if (error) {
      console.error("Error fetching posts from Supabase:", error);
      return [];
    }

    // Map the post slugs to the route format /post/:slug
    return posts.map(post => `/post/${post.slug}`);
  } catch (error) {
    console.error("An unexpected error occurred during sitemap generation:", error);
    return [];
  }
}

// Vite configuration
export default defineConfig(async () => {
  const dynamicRoutes = await getDynamicRoutes();

  return {
    plugins: [
      vue(),
      sitemap({
        hostname: 'https://dimblog.vercel.app',
        dynamicRoutes: dynamicRoutes,
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
  };
});
