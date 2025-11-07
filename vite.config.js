
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import sitemap from 'vite-plugin-sitemap';
import { createClient } from '@supabase/supabase-js';

// Function to fetch dynamic routes from Supabase
async function getDynamicRoutes(env) {
  // Ensure environment variables are loaded
  const supabaseUrl = env.VITE_SUPABASE_URL;
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

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
    
    // Log the fetched posts to confirm data is received
    console.log('Fetched posts for sitemap:', posts);

    // Map the post slugs to the correct route format /p/:slug
    return posts.map(post => `/p/${post.slug}`);
  } catch (error) {
    console.error("An unexpected error occurred during sitemap generation:", error);
    return [];
  }
}

// Vite configuration
export default defineConfig(async ({ mode }) => {
  // Load env file based on the build mode
  const env = loadEnv(mode, process.cwd(), '');

  const dynamicRoutes = await getDynamicRoutes(env);
  console.log('Dynamic routes for sitemap:', dynamicRoutes);

  return {
    plugins: [
      vue(),
      sitemap({
        hostname: 'https://dimblog.vercel.app',
        dynamicRoutes: dynamicRoutes,
        fileName: 'sitemap.xml',
        lastmod: new Date(), 
        changefreq: 'daily', 
        priority: 0.7 
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
