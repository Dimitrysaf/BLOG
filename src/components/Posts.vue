
<template>
  <div>
    <div v-if="error" class="error-container">
      <CdxMessage type="error">
        Η φόρτωση των αναρτήσεων απέτυχε. Παρακαλώ δοκιμάστε ξανά αργότερα.
      </CdxMessage>
    </div>
    
    <div v-else-if="posts.length > 0" class="posts-grid">
      <CdxCard
        v-for="post in posts"
        :key="post.id"
        class="post-card"
        :url="`/p/${post.slug}`"
        :thumbnail="post.image_url ? { url: post.image_url } : null"
      >
        <template #title>{{ post.title }}</template>
        <template #description>
            <div class="card-footer">
                <span>{{ post.profiles.full_name }}</span>
                <span class="separator">·</span>
                <span>{{ formatDate(post.created_at) }}</span>
            </div>
        </template>
      </CdxCard>
    </div>

    <div v-else class="no-posts-container">
         <CdxIcon :icon="cdxIconArticle" />
         <p>Δεν βρέθηκαν αναρτήσεις.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase'; 
import { CdxCard, CdxMessage, CdxIcon } from '@wikimedia/codex'; 
import { cdxIconArticle } from '@wikimedia/codex-icons';
import loadingService from '../loading.js';

const posts = ref([]);
const error = ref(null);

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('el-GR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

async function fetchPosts() {
  loadingService.show();
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
    loadingService.hide();
  }
}

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.error-container,
.no-posts-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  text-align: center;
  color: #72777d; 
}

.no-posts-container .cdx-icon {
  width: 128px;  
  height: 128px; 
  margin-bottom: 16px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.post-card {
  max-width: 100%;
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
