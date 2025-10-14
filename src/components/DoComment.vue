
<template>
  <Container class="do-comment-container">
    <div v-if="user">
      <CdxField>
        <template #label>Προσθήκη σχολίου</template>
        <CdxTextInput
          v-model="newComment"
          :multiline="true"
          aria-label="Προσθήκη σχολίου"
          placeholder="Γράψτε το σχόλιό σας..."
          :disabled="isSubmitting"
        />
      </CdxField>
      <CdxButton
        class="comment-submit-button"
        :disabled="!newComment.trim() || isSubmitting"
        @click="submitComment"
        action="progressive"
      >
        {{ isSubmitting ? 'Υποβολή...' : 'Υποβολή σχολίου' }}
      </CdxButton>
      <CdxMessage v-if="error" type="error" class="error-message">
        {{ error }}
      </CdxMessage>
    </div>
    <div v-else>
      <CdxMessage type="warning">
        Πρέπει να είστε <a href="#" @click.prevent="openAuthDialog">συνδεδεμένοι</a> για να σχολιάσετε.
      </CdxMessage>
    </div>
  </Container>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { user, openAuthDialog } from '../auth';
import { CdxField, CdxTextInput, CdxButton, CdxMessage } from '@wikimedia/codex';
import notificationService from '../notification';
import Container from './Container.vue';

const props = defineProps({
  postId: {
    type: [Number, String],
    required: true,
  },
});

const emit = defineEmits(['comment-added']);

const newComment = ref('');
const isSubmitting = ref(false);
const error = ref(null);

async function submitComment() {
  if (!newComment.value.trim()) return;

  isSubmitting.value = true;
  error.value = null;

  try {
    const { error: insertError } = await supabase.from('comments').insert({
      post_id: props.postId,
      user_id: user.value.id,
      content: newComment.value.trim(),
    });

    if (insertError) {
      throw insertError;
    }

    newComment.value = '';
    notificationService.push('Το σχόλιό σας δημοσιεύτηκε με επιτυχία!', 'success');
    emit('comment-added');
  } catch (e) {
    error.value = 'Η υποβολή του σχολίου απέτυχε. Παρακαλώ δοκιμάστε ξανά.';
    console.error('Error submitting comment:', e);
    notificationService.push('Η υποβολή του σχολίου απέτυχε.', 'error');
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>

.comment-submit-button {
  margin-top: 1rem;
}

.error-message {
  margin-top: 1rem;
}
</style>
