
<template>
  <Container class="do-comment-container">
    <div v-if="user">
      <CdxField
        :status="status"
        :messages="messages"
        class="comment-field"
      >
        <template #label>Προσθήκη σχολίου</template>
        <CdxTextArea
          v-model="newComment"
          placeholder="Γράψτε το σχόλιό σας..."
          :autosize="true"
          :disabled="isSubmitting"
          maxlength="1000"
        />
        <template #help-text>
          <div class="help-text-wrapper" :class="{ 'error-text': status === 'error' }">
            <span>Το σχόλιό σου δεν μπορεί να ξεπερνά τους 1000 χαρακτήρες.</span>
            <span class="char-counter">{{ charsRemaining }}</span>
          </div>
        </template>
      </CdxField>

      <CdxButton
        class="comment-submit-button"
        :disabled="isSubmitting"
        @click="submitComment"
        action="progressive"
      >
        {{ isSubmitting ? 'Υποβολή...' : 'Υποβολή σχολίου' }}
      </CdxButton>
    </div>
    <div v-else>
      <CdxMessage type="warning">
        Πρέπει να είστε <a href="#" @click.prevent="openAuthDialog">συνδεδεμένοι</a> για να σχολιάσετε.
      </CdxMessage>
    </div>
  </Container>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { supabase } from '../supabase';
import { user, openAuthDialog } from '../auth';
import { CdxField, CdxTextArea, CdxButton, CdxMessage } from '@wikimedia/codex';
import notificationService from '../notification';
import Container from './Container.vue';

const MAX_CHARS = 1000;

const props = defineProps({
  postId: {
    type: [Number, String],
    required: true,
  },
});

const emit = defineEmits(['comment-added']);

const newComment = ref('');
const isSubmitting = ref(false);
const submitError = ref(null);

const charsRemaining = computed(() => MAX_CHARS - newComment.value.length);

const status = computed(() => {
  if (charsRemaining.value < 0 || submitError.value) {
    return 'error';
  }
  return null;
});

const messages = computed(() => {
  if (submitError.value) {
    return { error: submitError.value };
  }
  return {};
});

watch(newComment, () => {
  if (submitError.value) {
    submitError.value = null;
  }
});

async function submitComment() {
  const trimmedComment = newComment.value.trim();

  if (charsRemaining.value < 0) {
    // This case should not be hit due to maxlength, but as a safeguard.
    return;
  }

  if (!trimmedComment) {
    submitError.value = 'Το σχόλιο δεν μπορεί να είναι κενό.';
    return;
  }

  submitError.value = null;
  isSubmitting.value = true;

  try {
    const { error: insertError } = await supabase.from('comments').insert({
      post_id: props.postId,
      user_id: user.value.id,
      content: trimmedComment,
    });

    if (insertError) {
      throw insertError;
    }

    newComment.value = '';
    notificationService.push('Το σχόλιό σας δημοσιεύτηκε με επιτυχία!', 'success');
    emit('comment-added');
  } catch (e) {
    submitError.value = 'Η υποβολή του σχολίου απέτυχε. Παρακαλώ δοκιμάστε ξανά.';
    console.error('Error submitting comment:', e);
    notificationService.push('Η υποβολή του σχολίου απέτυχε.', 'error');
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.comment-field :deep(.cdx-field__help-text) {
    width: 100%;
}
.help-text-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
}

.error-text .char-counter {
  color: var(--color-error);
  font-weight: bold;
}

.comment-submit-button {
  margin-top: 1rem;
}
</style>
