<template>
  <div class="comments-list-section">
    <div class="divider">
      <span class="divider-text">Σχόλια</span>
    </div>
    <cdx-progress-bar v-if="loading" inline />
    <cdx-message v-if="error" type="error" inline>
      {{ error }}
    </cdx-message>
    <div v-if="flattenedComments.length > 0" class="comments-list">
      <div
        v-for="comment in flattenedComments"
        :key="comment.comment_id"
        class="comment-wrapper"
        :style="{ 'margin-left': comment.level * 40 + 'px' }"
      >
        <cdx-menu-item
          :id="`comment-${comment.comment_id}`"
          :value="comment.comment_id"
          :label="comment.author_username"
          :description="comment.comment_body"
          :supporting-text="formatDate(comment.created_at)"
        >
        </cdx-menu-item>
        <div class="comment-actions">
          <cdx-button
            weight="quiet"
            @click="replyingTo = (replyingTo === comment.comment_id ? null : comment.comment_id)"
          >
            Απάντηση
          </cdx-button>
        </div>

        <div v-if="replyingTo === comment.comment_id" class="reply-form">
          <DoComment
            :post-slug="postSlug"
            :parent-comment-id="comment.comment_id"
            @comment-posted="handleReplyPosted"
          />
        </div>
      </div>
    </div>
    <div v-else-if="!loading" class="no-comments">
      <p>Δεν υπάρχουν σχόλια ακόμα.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '../supabase';
import {
  CdxMenuItem,
  CdxProgressBar,
  CdxMessage,
  CdxButton
} from '@wikimedia/codex';
import DoComment from './DoComment.vue';

const props = defineProps({
  postSlug: {
    type: String,
    required: true,
  },
});

const comments = ref([]);
const loading = ref(false);
const error = ref('');
const replyingTo = ref(null);

const flattenedComments = computed(() => {
  const flatten = (comments, level = 0) => {
    let result = [];
    for (const comment of comments) {
      result.push({ ...comment, level });
      if (comment.replies && comment.replies.length > 0) {
        const reversedReplies = [...comment.replies].reverse();
        result = result.concat(flatten(reversedReplies, level + 1));
      }
    }
    return result;
  };
  return flatten(comments.value);
});

const fetchComments = async () => {
  loading.value = true;
  error.value = '';
  try {
    const { data, error: fetchError } = await supabase
      .from('comments')
      .select('comment_id, body, created_at, parent_comment_id, author:profiles(username)')
      .eq('post_slug', props.postSlug)
      .order('created_at', { ascending: true });

    if (fetchError) {
      throw fetchError;
    }

    const commentsById = {};
    const processedData = data.map(comment => ({
        comment_id: comment.comment_id,
        comment_body: comment.body,
        created_at: comment.created_at,
        parent_comment_id: comment.parent_comment_id,
        author_username: comment.author ? comment.author.username : 'Anonymous',
        replies: []
    }));

    processedData.forEach(comment => {
        commentsById[comment.comment_id] = comment;
    });

    const rootComments = [];
    processedData.forEach(comment => {
      if (comment.parent_comment_id) {
        const parent = commentsById[comment.parent_comment_id];
        if (parent) {
          parent.replies.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    comments.value = rootComments.reverse();

  } catch (e) {
    error.value = e.message || 'Failed to load comments.';
  } finally {
    loading.value = false;
  }
};

async function handleReplyPosted() {
  replyingTo.value = null; // Hide the form
  await fetchComments(); // Refresh the entire comment list
}

onMounted(fetchComments);

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
