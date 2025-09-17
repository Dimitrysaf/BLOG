<template>
  <div class="comments-container">
    <div v-if="!hasLoaded" class="loading-container">
      <cdx-progress-indicator aria-label="Loading comments" />
    </div>

    <cdx-message v-if="error" type="error" inline>
      {{ error }}
    </cdx-message>

    <div v-if="hasLoaded && comments.length" class="comments-list">
      <cdx-card 
        v-for="comment in comments" 
        :key="comment.comment_id" 
        class="comment-card"
      >
        <template #title>
          {{ username }}
        </template>
        <template #description>
          {{ comment.comment_body }}
        </template>
        <template #supporting-text>
          <span>Σχόλιο στο </span>
          <router-link :to="`/p/${comment.post_slug}`">{{ comment.post_title }}</router-link>
          <span> στις {{ formatDate(comment.created_at) }}</span>
        </template>
      </cdx-card>
    </div>

    <div v-else-if="hasLoaded && !comments.length" class="no-comments-container">
      <cdx-icon :icon="cdxIconSpeechBubble" />
      <p>No comments yet.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { CdxCard, CdxMessage, CdxIcon, CdxProgressIndicator } from '@wikimedia/codex';
import { cdxIconSpeechBubble } from '@wikimedia/codex-icons';

const props = defineProps({
  username: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['loaded']);

const comments = ref([]);
const error = ref(null);
const hasLoaded = ref(false);

const fetchComments = async () => {
  hasLoaded.value = false;
  error.value = null;

  try {
    const response = await fetch(`/api/comments?username=${props.username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments.');
    }
    const data = await response.json();
    comments.value = data;
  } catch (e) {
    error.value = e.message;
  } finally {
    hasLoaded.value = true;
    emit('loaded');
  }
};

onMounted(fetchComments);

watch(() => props.username, fetchComments);

function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('el-GR', options);
}
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment-card {
  max-width: 100%;
}

.comment-meta {
  font-size: 0.875em;
  color: #54595d;
}

.no-comments-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #54595d;
  text-align: center;
}

.no-comments-container .cdx-icon {
  width: 96px;
  height: 96px;
  margin-bottom: 16px;
}

.no-comments-container p {
  font-size: 1.2em;
}
</style>
