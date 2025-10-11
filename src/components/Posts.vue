<template>
  <div>
    <div v-if="loading" class="loading-container">
      <CdxProgressIndicator />
      <p>Loading posts...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <CdxMessage type="error">
        Failed to load posts. Please try again later.
      </CdxMessage>
    </div>
    
    <div v-else-if="posts.length > 0" class="posts-grid">
      <CdxCard
        v-for="post in posts"
        :key="post.id"
        class="post-card"
        :url="`/p/${post.slug}`"
      >
        <template #image>
          <img v-if="post.image_url" :src="post.image_url" :alt="post.title" />
        </template>
        <template #title>{{ post.title }}</template>
        <template #description>{{ post.content.substring(0, 150) }}...</template>
      </CdxCard>
    </div>

    <div v-else class="no-posts-container">
         <CdxIcon :icon="cdxIconInfo" />
        <p>No posts found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase'; 
// ΔΙΟΡΘΩΣΗ: Εισάγουμε το σωστό component από τη βιβλιοθήκη
import { CdxCard, CdxProgressIndicator, CdxMessage, CdxIcon } from '@wikimedia/codex'; 
import { cdxIconInfo } from '@wikimedia/codex-icons';

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

async function fetchPosts() {
  try {
    loading.value = true;
    const { data, error: fetchError } = await supabase
      .from('posts')
      .select('id, title, slug, content, image_url')
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;
    
    posts.value = data;
  } catch (err) {
    console.error('Error fetching posts:', err);
    error.value = err;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.post-card {
  text-decoration: none;
}

.loading-container, .error-container, .no-posts-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  gap: 16px;
  color: var(--color-subtle-text);
}
</style>