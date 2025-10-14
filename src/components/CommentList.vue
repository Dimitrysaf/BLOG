
<template>
  <div class="comment-list-container">
    <h3 class="comments-title">Σχόλια ({{ comments.length }})</h3>
    <div v-if="isLoading" class="loading-container">
        <cdx-progress-bar inline aria-label="Loading..."></cdx-progress-bar>
    </div>
    <div v-else-if="error" class="error-container">
      <CdxMessage type="error">Η φόρτωση των σχολίων απέτυχε.</CdxMessage>
    </div>
    <ul v-else-if="commentItems.length > 0" role="listbox" class="comment-list">
      <li v-for="item in commentItems" :key="item.value">
        <cdx-menu-item v-bind="item" :show-thumbnail="true" />
      </li>
    </ul>
    <div v-else class="no-comments-container">
      <p>Δεν υπάρχουν σχόλια ακόμα. Γίνε ο πρώτος που θα σχολιάσει!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { supabase } from '../supabase';
import { CdxMessage, CdxProgressBar } from '@wikimedia/codex';
import { cdxIconUserAvatar } from '@wikimedia/codex-icons';

const props = defineProps({
  postId: {
    type: [Number, String],
    required: true,
  },
});

const comments = ref([]);
const isLoading = ref(true);
const error = ref(null);

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('el-GR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// Computed property to transform comments data for CdxMenuItem
const commentItems = computed(() => {
  return comments.value.map(comment => ({
    value: comment.id,
    label: comment.profiles?.full_name || 'Ανώνυμος Χρήστης',
    description: comment.content,
    thumbnail: comment.profiles?.avatar_url
        ? { url: comment.profiles.avatar_url }
        : cdxIconUserAvatar,
    supportingText: formatDate(comment.created_at)
  }));
});

async function fetchComments() {
  if (!props.postId) return;
  isLoading.value = true;
  error.value = null;
  try {
    const { data, error: fetchError } = await supabase
      .from('comments')
      .select('*, profiles(full_name, avatar_url)')
      .eq('post_id', props.postId)
      .order('created_at', { ascending: false });

    if (fetchError) {
      throw fetchError;
    }
    comments.value = data;
  } catch (err) {
    console.error("Error fetching comments:", err);
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}

// Expose fetchComments to be called from parent
defineExpose({ fetchComments });

onMounted(fetchComments);

// Watch for postId changes, in case the component is reused for different posts
watch(() => props.postId, fetchComments);

</script>

<style scoped>
.comment-list-container {
  margin-top: 2rem;
}

.comments-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: bold;
    border-bottom: 1px solid #c8ccd1;
    padding-bottom: 1rem;
}

.loading-container, .error-container, .no-comments-container {
    padding: 2rem;
    text-align: center;
    color: #72777d;
}

.comment-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Add some space between comment items */
}

/* The CdxMenuItem takes care of its own styling, so we don't need much here.
   We can add overrides if needed. */
.comment-list .cdx-menu-item {
    width: 100%;
}

.comment-list :deep(.cdx-menu-item__thumbnail) {
  border-radius: 50%;
}
</style>
