
<template>
  <div class="comment-list-container">
    <div class="comments-header">
      <h3 class="comments-title">Σχόλια ({{ comments.length }})</h3>
      <CdxButton
        aria-label="Ανανέωση σχολίων"
        weight="quiet"
        :disabled="isRefreshing"
        @click="handleRefresh"
      >
        <CdxIcon :icon="cdxIconReload" />
      </CdxButton>
    </div>
    <div v-if="error" class="error-container">
      <CdxMessage type="error">Η φόρτωση των σχολίων απέτυχε.</CdxMessage>
    </div>
    <ul v-else-if="commentItems.length > 0" role="listbox" class="comment-list">
      <li v-for="item in commentItems" :key="item.value">
        <CdxMenuItem v-bind="item" :show-thumbnail="true" />
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
import { CdxMessage, CdxButton, CdxMenuItem, CdxIcon } from '@wikimedia/codex';
import { cdxIconUserAvatar, cdxIconReload } from '@wikimedia/codex-icons';
import loadingService from '../loading';

const props = defineProps({
  postId: {
    type: [Number, String],
    required: true,
  },
});

const comments = ref([]);
const error = ref(null);
const isRefreshing = ref(false);

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('el-GR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Athens'
  });
}

const commentItems = computed(() => {
  return comments.value.map(comment => ({
    id: `comment-${comment.id}`,
    value: comment.id,
    label: comment.profiles?.full_name || 'Ανώνυμος Χρήστηs',
    boldLabel: true,
    description: comment.content,
    thumbnail: comment.profiles?.avatar_url
        ? { url: comment.profiles.avatar_url }
        : { icon: cdxIconUserAvatar },
    supportingText: formatDate(comment.created_at)
  }));
});

async function fetchComments() {
  if (!props.postId) return;
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
  }
}

async function handleRefresh() {
  if (isRefreshing.value) return;

  isRefreshing.value = true;
  await initialFetch();

  setTimeout(() => {
    isRefreshing.value = false;
  }, 1500);
}

async function initialFetch() {
  loadingService.show();
  await fetchComments();
  loadingService.hide();
}

defineExpose({ fetchComments: handleRefresh });

onMounted(initialFetch);

watch(() => props.postId, initialFetch);

</script>

<style scoped>
.comment-list-container {
  margin-top: 2rem;
}

.comments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c8ccd1;
  margin-bottom: 1.5rem;
}

.comments-title {
    font-size: 1.5rem;
    font-weight: bold;
    padding-bottom: 1rem;
    border-bottom: none;
    margin-bottom: 0;
}

.error-container, .no-comments-container {
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
  gap: 0.5rem;
}

.comment-list :deep(.cdx-menu-item__thumbnail) {
  border-radius: 50%;
}

.comment-list :deep(.cdx-menu-item__content-wrapper) {
  flex: 1;
  min-width: 0;
}

.comment-list :deep(.cdx-menu-item) {
  display: flex;
  padding-left: 0;
}

.comment-list :deep(.cdx-menu-item__label),
.comment-list :deep(.cdx-menu-item__description) {
  overflow-wrap: break-word;
  white-space: normal;
}
</style>
