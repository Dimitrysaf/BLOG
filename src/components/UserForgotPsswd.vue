
<template>
  <cdx-dialog
    :open="authDialogsState.isForgotPasswordOpen"
    title="Επαναφορά Κωδικού Πρόσβασης"
    :primary-action="{ label: emailSent ? 'Κλείσιμο' : 'Αποστολή Email', actionType: 'progressive', disabled: isLoading }"
    :default-action="emailSent ? null : { label: 'Ακύρωση' }"
    @primary="handlePrimaryAction"
    @default="onClose"
    @close="onClose"
  >
    <cdx-progress-bar v-if="isLoading" inline />
    
    <div v-if="!emailSent">
      <p>Παρακαλώ εισάγετε το email σας για να σας στείλουμε έναν σύνδεσμο επαναφοράς του κωδικού σας.</p>
      <cdx-field
        :status="emailStatus"
        :messages="{ error: 'Πρέπει να δώσετε μια έγκυρη διεύθυνση email.' }"
        :label-icon="cdxIconMessage"
      >
        <template #label>
          Email
        </template>
        <cdx-text-input
          v-model="email"
          input-type="email"
          :disabled="isLoading"
          @update:model-value="emailStatus = 'default'"
        />
      </cdx-field>
    </div>

    <div v-else>
      <cdx-message type="success" inline>
        Σας στείλαμε email στο <strong>{{ email }}</strong> με έναν σύνδεσμο για την επαναφορά του κωδικού σας. 
        Εαν δεν υπάρχει αυτό το email στην βάση δεδομένων μας, δεν θα σταλεί κανένα email.
      </cdx-message>
    </div>
  </cdx-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import {
  CdxDialog,
  CdxField,
  CdxTextInput,
  CdxMessage,
  CdxProgressBar
} from '@wikimedia/codex';
import { cdxIconMessage } from '@wikimedia/codex-icons';
import { authDialogsState, closeForgotPasswordDialog, sendPasswordReset } from '../auth';

const isLoading = ref(false);
const email = ref('');
const emailSent = ref(false);
const emailStatus = ref('default');

watch(() => authDialogsState.isForgotPasswordOpen, (isOpen) => {
  if (isOpen) {
    // Reset state when dialog opens
    email.value = '';
    emailSent.value = false;
    isLoading.value = false;
    emailStatus.value = 'default';
  }
});

async function handlePrimaryAction() {
  if (emailSent.value) {
    onClose();
  } else {
    await handleSendResetEmail();
  }
}

async function handleSendResetEmail() {
  const isEmailValid = email.value.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  if (!isEmailValid) {
    emailStatus.value = 'error';
    return;
  }

  isLoading.value = true;
  
  // We call the function but don't expose the result to the user
  // to prevent email enumeration attacks.
  try {
    await sendPasswordReset(email.value);
  } catch (error) {
    // We can log the error for debugging, but we won't show it to the user.
    console.error("Password reset error:", error);
  } finally {
    isLoading.value = false;
    emailSent.value = true;
  }
}

function onClose() {
  closeForgotPasswordDialog();
}
</script>

<style scoped>
p {
    margin-bottom: 1rem;
    font-family: sans-serif;
    font-size: 1em;
    line-height: 1.6;
}
strong {
    font-weight: bold;
}
</style>
