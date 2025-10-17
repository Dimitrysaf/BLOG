<template>
  <cdx-dialog
    :open="modelValue"
    :title="dialogTitle"
    :primary-action="primaryAction"
    :default-action="defaultAction"
    @primary="handlePrimaryAction"
    @default="onCancel"
    @close="onCancel"
  >
    <div v-if="step === 'initial'">
      <p>Είστε σίγουροι ότι θέλετε να διαγράψετε οριστικά τον λογαριασμό σας; Αυτή η ενέργεια είναι μη αναστρέψιμη. Θα σας σταλεί ένας κωδικός στο email σας για επιβεβαίωση.</p>
      <cdx-message v-if="errorMessage" type="error" inline allow-user-dismiss @user-dismissed="errorMessage = ''">{{ errorMessage }}</cdx-message>
    </div>

    <div v-if="step === 'verify'">
      <p>Εισάγετε τον εξαψήφιο κωδικό που σας στάλθηκε στο email σας για να επιβεβαιώσετε τη διαγραφή του λογαριασμού σας.</p>
      <cdx-field
        :status="tokenStatus"
        :messages="{ error: 'Ο κωδικός δεν είναι έγκυρος.' }"
      >
        <template #label>
          Κωδικός επιβεβαίωσης
        </template>
        <cdx-text-input
          v-model="token"
          maxlength="6"
          @update:model-value="tokenStatus = 'default'"
        />
      </cdx-field>
      <cdx-message v-if="errorMessage" type="error" inline allow-user-dismiss @user-dismissed="errorMessage = ''">{{ errorMessage }}</cdx-message>
    </div>

    <cdx-progress-bar v-if="isProcessing" inline />
  </cdx-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import {
  CdxDialog,
  CdxProgressBar,
  CdxField,
  CdxTextInput,
  CdxMessage
} from '@wikimedia/codex';
import { user } from '../auth';
import { supabase } from '../supabase';
import notificationService from '../notification';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const isProcessing = ref(false);
const step = ref('initial'); // 'initial', 'verify'
const token = ref('');
const tokenStatus = ref('default');
const errorMessage = ref('');

const dialogTitle = computed(() => {
  return step.value === 'initial' ? 'Επιβεβαίωση Διαγραφής' : 'Επαλήθευση Κωδικού';
});

const primaryAction = computed(() => {
  if (step.value === 'initial') {
    return { label: 'Αποστολή Κωδικού', actionType: 'progressive', disabled: isProcessing.value };
  }
  return { label: 'Διαγραφή', actionType: 'destructive', disabled: isProcessing.value || !token.value };
});

const defaultAction = computed(() => {
  return { label: 'Άκυρο', disabled: isProcessing.value };
});

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    // Reset state when dialog opens
    step.value = 'initial';
    isProcessing.value = false;
    token.value = '';
    tokenStatus.value = 'default';
    errorMessage.value = '';
  }
});

async function handlePrimaryAction() {
  errorMessage.value = '';
  if (step.value === 'initial') {
    await requestReauthentication();
  } else if (step.value === 'verify') {
    await confirmDeleteWithReauth();
  }
}

async function requestReauthentication() {
  if (!user.value?.email) {
    errorMessage.value = 'Δεν βρέθηκε email χρήστη.';
    return;
  }

  isProcessing.value = true;
  try {
    // Send OTP to user's email using signInWithOtp
    // This works for both regular users and OAuth users
    const { error } = await supabase.auth.signInWithOtp({
      email: user.value.email,
      options: {
        shouldCreateUser: false, // Don't create new user
      }
    });

    if (error) {
      throw error;
    }

    step.value = 'verify';
    notificationService.push('Σας έχει σταλεί ένας κωδικός στο email σας.', 'success');
  } catch (e) {
    errorMessage.value = e.message || 'Η αποστολή του κωδικού απέτυχε.';
    console.error('OTP request error:', e);
  } finally {
    isProcessing.value = false;
  }
}

async function confirmDeleteWithReauth() {
  if (token.value.length !== 6) {
    tokenStatus.value = 'error';
    return;
  }

  isProcessing.value = true;
  try {
    // Call the Edge Function with the OTP
    // The Edge Function will verify the OTP and delete the user
    const { error } = await supabase.functions.invoke('delete-user', {
      body: { otp: token.value }
    });

    if (error) {
      throw error;
    }

    notificationService.push('Ο λογαριασμός σας διαγράφηκε με επιτυχία.', 'success');
    
    // Sign out and reload
    await supabase.auth.signOut();
    window.location.reload();

  } catch (e) {
    const errorMsg = e.message || 'Η διαγραφή του λογαριασμού απέτυχε.';
    errorMessage.value = errorMsg;
    notificationService.push(`Η διαγραφή του λογαριασμού απέτυχε: ${errorMsg}`, 'error');
    console.error('Error deleting account:', e);
    tokenStatus.value = 'error';
  } finally {
    isProcessing.value = false;
  }
}

function onCancel() {
  if (!isProcessing.value) {
    emit('update:modelValue', false);
  }
}
</script>