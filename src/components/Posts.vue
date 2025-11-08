<template>
  <div>
    <!-- Loading State: Show a spinner in the content area -->
    <div v-if="loading" class="placeholder-container">
      <CdxProgressIndicator aria-label="Φόρτωση αναρτήσεων..." />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="placeholder-container">
      <CdxMessage type="error">
        Η φόρτωση των αναρτήσεων απέτυχε. Παρακαλώ δοκιμάστε ξανά αργότερα.
      </CdxMessage>
    </div>
    
    <!-- Content: Posts Grid (uses cached data) -->
    <div v-else-if="posts.length > 0" class="posts-grid">
      <CdxCard
        v-for="post in posts"
        :key="post.id"
        class="post-card post-card--blog"
        :thumbnail="post.image_url ? { url: post.image_url } : null"
        :force-thumbnail="true"
        @click="navigateToPost(post.slug)"
      >
        <template #title>{{ post.title }}</template>
        <template #description>
            <div class="card-footer">
                <span>{{ post.profiles?.full_name || 'Ανώνυμος' }}</span>
                <span class="separator">·</span>
                <span>{{ formatDate(post.created_at) }}</span>
            </div>
        </template>
      </CdxCard>
    </div>

    <!-- Empty State: Show only if not loading and no posts exist -->
    <div v-else class="placeholder-container">
         <CdxIcon :icon="cdxIconArticle" />
         <p>Δεν βρέθηκαν αναρτήσεις.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabase'; 
import { CdxCard, CdxMessage, CdxIcon, CdxProgressIndicator } from '@wikimedia/codex'; 
import { cdxIconArticle } from '@wikimedia/codex-icons';
import loadingService from '../loading.js';

// These refs are defined at the module level.
// They are created once and persist, acting as our cache.
const posts = ref([]);
const error = ref(null);
const loading = ref(false); // Initially not loading

const router = useRouter();

function navigateToPost(slug) {
  router.push(`/p/${slug}`);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('el-GR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

async function fetchPosts() {
  if (loading.value) return; // Prevent concurrent fetches

  loading.value = true;
  error.value = null;
  loadingService.show(); // Show global top-level loading bar

  try {
    const { data, error: fetchError } = await supabase
      .from('posts')
      .select('id, title, slug, image_url, created_at, profiles(full_name)')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (fetchError) {
      throw fetchError;
    }
    posts.value = data;
  } catch (err) {
    error.value = err.message;
    console.error('Error fetching posts:', err);
  } finally {
    loading.value = false;
    loadingService.hide(); // Hide global loading bar
  }
}

onMounted(() => {
  // Only fetch if the cache is empty.
  if (posts.value.length === 0) {
    fetchPosts();
  }
});
</script>

<style scoped>
.post-card {
  cursor: pointer;
}

/* A single container for loading, error, and empty states */
.placeholder-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  text-align: center;
  color: #72777d; 
}

.placeholder-container .cdx-icon {
  width: 128px;  
  height: 128px; 
  margin-bottom: 16px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.card-footer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #54595d;
    padding-top: 8px;
}
</style>
