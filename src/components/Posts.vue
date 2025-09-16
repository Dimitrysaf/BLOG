<template>
  <div class="posts-container">
    <cdx-message v-if="error" type="error" inline>
      {{ error }}
    </cdx-message>
    
    <div v-if="posts.length" class="posts-grid">
      <cdx-card 
        v-for="post in posts" 
        :key="post.post_id" 
        class="post-card"
        :url="`/posts/${post.slug}`"
      >
        <template #title>
          {{ post.title }}
        </template>
        <template #description>
          {{ post.body }}
        </template>
        <template #supporting-text>
          Από {{ post.author_username }} στις {{ formatDate(post.created_at) }}
        </template>
      </cdx-card>
    </div>

    <div v-else-if="hasLoaded && !posts.length" class="no-posts-container">
      <cdx-icon :icon="cdxIconArticleNotFound" />
      <p>No posts yet.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { CdxCard, CdxMessage, CdxIcon } from '@wikimedia/codex';
import { cdxIconArticleNotFound } from '@wikimedia/codex-icons';

const props = defineProps({
  username: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['loaded']);

const posts = ref([]);
const error = ref(null);
const hasLoaded = ref(false);

const fetchPosts = async () => {
  hasLoaded.value = false;
  error.value = null;

  let apiUrl = '/api/posts';
  if (props.username) {
    apiUrl = `${apiUrl}?username=${props.username}`;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch posts.');
    }
    const data = await response.json();
    posts.value = data;
  } catch (e) {
    error.value = e.message;
  } finally {
    hasLoaded.value = true;
    emit('loaded');
  }
};

onMounted(fetchPosts);

watch(() => props.username, fetchPosts);

function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('el-GR', options);
}
</script>

<style scoped>
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.post-card {
  max-width: 100%;
}

.no-posts-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #54595d;
  text-align: center;
}

.no-posts-container .cdx-icon {
  width: 96px;
  height: 96px;
  margin-bottom: 16px;
}

.no-posts-container p {
  font-size: 1.2em;
}
</style>
