<template>
  <cdx-dialog
    :open="modelValue"
    title="Επιβεβαίωση Διαγραφής"
    :primary-action="{ label: 'Διαγραφή', actionType: 'destructive', disabled: isDeleting }"
    :default-action="{ label: 'Άκυρο' }"
    @primary="onConfirmDelete"
    @default="onCancel"
    @close="onCancel"
  >
    <p>Είστε σίγουροι ότι θέλετε να διαγράψετε οριστικά τον λογαριασμό σας; Αυτή η ενέργεια είναι μη αναστρέψιμη.</p>
    <cdx-progress-bar v-if="isDeleting" inline />
  </cdx-dialog>
</template>

<script setup>
import { ref } from 'vue';
import {
  CdxDialog,
  CdxProgressBar
} from '@wikimedia/codex';
import { supabase } from '../supabase';
import notificationService from '../notification';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const isDeleting = ref(false);

async function onConfirmDelete() {
  isDeleting.value = true;
  try {
    const { error } = await supabase.rpc('delete_user');
    if (error) throw error;

    notificationService.push('Ο λογαριασμός σας διαγράφηκε με επιτυχία.', 'success');
    // Αυτό θα προκαλέσει ανανέωση της σελίδας και θα στείλει τον χρήστη στη σελίδα σύνδεσης
    window.location.reload();
  } catch (e) {
    notificationService.push('Η διαγραφή του λογαριασμού απέτυχε.', 'error');
    console.error('Error deleting account:', e.message);
  } finally {
    isDeleting.value = false;
    emit('update:modelValue', false);
  }
}

function onCancel() {
  if (!isDeleting.value) {
    emit('update:modelValue', false);
  }
}
</script>
