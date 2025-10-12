<template>
  <div class="comments-list-section">
    <div class="divider">
      <span class="divider-text">Σχόλια</span>
    </div>
    <cdx-progress-bar v-if="loading" inline />
    <cdx-message v-if="error" type="error" inline>
      {{ error }}
    </cdx-message>
    <div v-if="comments.length > 0" class="comments-list">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="comment-wrapper"
      >
        <cdx-menu-item
          :id="`comment-${comment.id}`"
          :value="comment.id"
          :label="comment.author_full_name"
          :description="comment.content"
          :supporting-text="formatDate(comment.created_at)"
        >
        </cdx-menu-item>
      </div>
    </div>
    <div v-else-if="!loading" class="no-comments">
      <p>Δεν υπάρχουν σχόλια ακόμα.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { supabase } from '../supabase';
import {
  CdxMenuItem,
  CdxProgressBar,
  CdxMessage
} from '@wikimedia/codex';

const props = defineProps({
  postSlug: {
    type: String,
    required: true,
  },
});

const comments = ref([]);
const loading = ref(false);
const error = ref('');
const postId = ref(null);

async function fetchPostId() {
    if (!props.postSlug) return;
    const { data, error: postError } = await supabase
        .from('posts')
        .select('id')
        .eq('slug', props.postSlug)
        .single();
    if (postError) {
        throw new Error('Could not fetch post ID: ' + postError.message);
    }
    postId.value = data.id;
}

const fetchComments = async () => {
  if (!postId.value) return;

  loading.value = true;
  error.value = '';
  try {
    const { data, error: fetchError } = await supabase
      .from('comments')
      .select('id, content, created_at, author:profiles(full_name)')
      .eq('post_id', postId.value)
      .order('created_at', { ascending: false });

    if (fetchError) {
      throw fetchError;
    }

    comments.value = data.map(comment => ({
        id: comment.id,
        content: comment.content,
        created_at: comment.created_at,
        author_full_name: comment.author ? comment.author.full_name : 'Anonymous',
    }));

  } catch (e) {
    error.value = e.message || 'Failed to load comments.';
  } finally {
    loading.value = false;
  }
};

// Watch for changes in postSlug and fetch the post ID, then fetch comments
watch(() => props.postSlug, async (newSlug) => {
    if (newSlug) {
        try {
            await fetchPostId();
            await fetchComments();
        } catch (e) {
            error.value = e.message;
        }
    }
}, { immediate: true });


onMounted(async () => {
    if (props.postSlug) {
        try {
            await fetchPostId();
            await fetchComments();
        } catch (e) {
            error.value = e.message;
        }
    }
});

defineExpose({
  refresh: fetchComments
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const rtf = new Intl.RelativeTimeFormat('el', { numeric: 'auto' });

  const diffInSeconds = Math.floor((new Date() - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) return rtf.format(-diffInSeconds, 'second');
  if (diffInMinutes < 60) return rtf.format(-diffInMinutes, 'minute');
  if (diffInHours < 24) return rtf.format(-diffInHours, 'hour');
  if (diffInDays < 7) return rtf.format(-diffInDays, 'day');

  return date.toLocaleDateString('el-GR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
</script>

<style scoped>
/* ... existing styles ... */

.comment-wrapper {
  transition: margin-left 0.3s ease;
}

.comments-list .cdx-menu-item {
  border-top: 1px solid #c8ccd1;
  padding-top: 16px;
  padding-bottom: 16px;
}

.comment-wrapper:first-child .cdx-menu-item {
    border-top: none;
}

.comment-actions {
  padding: 0 16px 8px;
  text-align: right;
}

.reply-form {
  padding: 0 16px 16px;
}

.comments-list-section {
  margin-top: 24px;
  margin-bottom: 24px;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #54595d;
  margin-bottom: 24px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #c8ccd1;
}

.divider:not(:empty)::before {
  margin-right: 0.5em;
}

.divider:not(:empty)::after {
  margin-left: 0.5em;
}

.divider-text {
  font-size: 1.5em;
  font-weight: bold;
}

:deep(.cdx-menu-item__label) {
  font-weight: bold;
}

:deep(.cdx-menu-item__description) {
  white-space: pre-wrap;
  line-height: 1.5;
  font-size: 1em;
}

:deep(.cdx-menu-item__supporting-text) {
  font-style: italic;
}

.no-comments {
  text-align: center;
  padding: 20px;
  color: #54595d;
  border-top: 1px solid #c8ccd1;
  margin-top: 24px;
}
</style>
