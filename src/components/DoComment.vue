<template>
  <div class="comment-section">
    <div v-if="auth.state.isLoggedIn" class="comment-form">
      <p>Σχολιάζετε ως <strong>{{ auth.state.user.username }}</strong></p>
      <cdx-field>
        <cdx-text-area
          v-model="commentBody"
          placeholder="Γράψτε το σχόλιό σας..."
          :rows="3"
          autosize
          :start-icon="cdxIconSpeechBubbleAdd"
        />
      </cdx-field>
      <div class="form-actions">
        <cdx-button
          :action-type="'progressive'"
          :disabled="isPosting || !commentBody.trim()"
          @click="postComment"
        >
          Αποστολή
        </cdx-button>
      </div>
      <cdx-message v-if="error" type="error" inline>
        {{ error }}
      </cdx-message>
    </div>

    <div v-else class="login-prompt">
      <p>Συνδεθείτε για να σχολιάσετε</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import auth from '../auth';
import {
  CdxField,
  CdxTextArea,
  CdxButton,
  CdxMessage
} from '@wikimedia/codex';
import { cdxIconSpeechBubbleAdd } from '@wikimedia/codex-icons';

const props = defineProps({
  postSlug: {
    type: String,
    required: true,
  },
  parentCommentId: {
    type: [Number, String],
    default: null,
  },
});

const emit = defineEmits(['comment-posted']);

const commentBody = ref('');
const isPosting = ref(false);
const error = ref('');

async function postComment() {
  if (!commentBody.value.trim()) {
    return;
  }

  isPosting.value = true;
  error.value = '';

  try {
    const response = await fetch(`/api/posts/${props.postSlug}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment_body: commentBody.value,
        parent_comment_id: props.parentCommentId, // This was missing
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Αποτυχία αποστολής σχολίου.');
    }

    commentBody.value = '';
    emit('comment-posted', data);
  } catch (e) {
    error.value = e.message;
  } finally {
    isPosting.value = false;
  }
}
</script>

<style scoped>
.comment-section {
  margin-top: 40px;
}

.comment-form p {
  margin-bottom: 8px;
}

.form-actions {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.login-prompt {
  text-align: center;
  padding: 40px 0;
  color: #54595d;
  font-size: 1.1em;
  border: 1px dashed #c8ccd1;
  border-radius: 4px;
}
</style>
