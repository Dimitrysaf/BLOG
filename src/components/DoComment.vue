
<template>
  <div class="comment-section">
    <!-- Show comment form if user is logged in -->
    <div v-if="user" class="comment-form">
      <CdxTextArea
        v-model="newComment"
        :placeholder="parentCommentId ? 'Γράψτε την απάντησή σας...' : 'Γράψτε το σχόλιό σας...'"
        aria-label="Νέο σχόλιο"
        :disabled="isSubmitting"
      />
      <CdxButton 
        weight="primary" 
        action="progressive" 
        @click="submitComment" 
        :disabled="isSubmitting || newComment.length < 5"
        class="submit-comment-button"
      >
        {{ parentCommentId ? 'Υποβολή απάντησης' : 'Υποβολή σχολίου' }}
      </CdxButton>
    </div>

    <!-- Show login prompt if user is not logged in -->
    <div v-else class="login-prompt">
        <p>Θέλετε να αφήσετε το σχόλιό σας;</p>
      <CdxButton 
        weight="primary" 
        action="progressive"
        @click="openAuthDialog"
      >
        Συνδεθείτε για να σχολιάσετε
      </CdxButton>
    </div>

    <CdxMessage v-if="feedbackMessage" :type="feedbackType" class="feedback-message">
        {{ feedbackMessage }}
    </CdxMessage>

  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { CdxTextArea, CdxButton, CdxMessage } from '@wikimedia/codex';
import { user, openAuthDialog } from '../auth';
import { supabase } from '../supabase';

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

const newComment = ref('');
const isSubmitting = ref(false);
const feedbackMessage = ref('');
const feedbackType = ref('success'); // 'success' or 'error'

async function submitComment() {
  if (newComment.value.trim().length < 5) {
    feedbackType.value = 'error';
    feedbackMessage.value = 'Το σχόλιο πρέπει να είναι τουλάχιστον 5 χαρακτήρες.';
    setTimeout(() => { feedbackMessage.value = ''; }, 5000);
    return;
  }

  isSubmitting.value = true;
  feedbackMessage.value = '';

  try {
    const commentData = {
      post_slug: props.postSlug,
      user_id: user.value.id,
      body: newComment.value,
      parent_comment_id: props.parentCommentId,
    };

    const { error } = await supabase.from('comments').insert([commentData]);

    if (error) throw error;

    feedbackType.value = 'success';
    if (props.parentCommentId) {
        feedbackMessage.value = 'Η απάντησή σας δημοσιεύτηκε!';
    } else {
        feedbackMessage.value = 'Το σχόλιό σας δημοσιεύτηκε με επιτυχία!';
    }
    newComment.value = ''; // Clear the textarea
    emit('comment-posted');

  } catch (error) {
    console.error('Error submitting comment:', error);
    feedbackType.value = 'error';
    feedbackMessage.value = `Παρουσιάστηκε σφάλμα: ${error.message}`;
  } finally {
    isSubmitting.value = false;
    // Hide the success/error message after a few seconds
    setTimeout(() => {
        feedbackMessage.value = '';
    }, 5000);
  }
}
</script>

<style scoped>
.comment-section {
  margin-top: 40px;
  padding: 24px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.comment-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.login-prompt {
  text-align: center;
  padding: 20px 0;
}

.login-prompt p {
    font-size: 1.1em;
    margin-bottom: 16px;
}

.submit-comment-button {
    align-self: flex-start; /* Align button to the left */
}

.feedback-message {
    margin-top: 16px;
}

</style>
