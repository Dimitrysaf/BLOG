
<template>
  <div class="comment-section">
    <!-- Show comment form if user is logged in -->
    <div v-if="user" class="comment-form">
      <CdxTextArea
        v-model="newComment"
        placeholder="Γράψτε το σχόλιό σας..."
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
        Υποβολή σχολίου
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
import { ref, defineProps, defineEmits, watch } from 'vue';
import { CdxTextArea, CdxButton, CdxMessage } from '@wikimedia/codex';
import { user, openAuthDialog } from '../auth';
import { supabase } from '../supabase';

const props = defineProps({
  postSlug: {
    type: String,
    required: true,
  }
});

const emit = defineEmits(['comment-posted']);

const newComment = ref('');
const isSubmitting = ref(false);
const feedbackMessage = ref('');
const feedbackType = ref('success'); // 'success' or 'error'
const postId = ref(null);

async function fetchPostId() {
    if (!props.postSlug) return;
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('id')
            .eq('slug', props.postSlug)
            .single();
        if (error) throw error;
        postId.value = data.id;
    } catch (error) {
        console.error('Error fetching post ID:', error.message);
        feedbackType.value = 'error';
        feedbackMessage.value = 'Could not load post data to comment.';
    }
}

// Fetch post ID when the component is loaded
watch(() => props.postSlug, (newSlug) => {
    if (newSlug) {
        fetchPostId();
    }
}, { immediate: true });

async function submitComment() {
  if (newComment.value.trim().length < 5) {
    feedbackType.value = 'error';
    feedbackMessage.value = 'Το σχόλιο πρέπει να είναι τουλάχιστον 5 χαρακτήρες.';
    setTimeout(() => { feedbackMessage.value = ''; }, 5000);
    return;
  }

  if (!postId.value) {
    feedbackType.value = 'error';
    feedbackMessage.value = 'Δεν είναι δυνατή η υποβολή σχολίου χωρίς αναγνωριστικό ανάρτησης.';
    return;
  }

  isSubmitting.value = true;
  feedbackMessage.value = '';

  try {
    const commentData = {
      post_id: postId.value,
      user_id: user.value.id,
      content: newComment.value,
    };

    const { error } = await supabase.from('comments').insert([commentData]);

    if (error) throw error;

    feedbackType.value = 'success';
    feedbackMessage.value = 'Το σχόλιό σας δημοσιεύτηκε με επιτυχία!';
    
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
