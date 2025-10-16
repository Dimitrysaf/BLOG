<template>
  <cdx-dialog
    :open="authDialogsState.isResetPasswordOpen"
    title="Ορισμός Νέου Κωδικού"
    subtitle="Εισάγετε τον νέο σας κωδικό πρόσβασης."
    :primary-action="{ label: 'Αποθήκευση', actionType: 'progressive', disabled: isLoading }"
    :secondary-actions="[{ label: 'Άκυρο', actionType: 'default', disabled: isLoading }]"
    @primary="onResetPassword"
    @secondary="onClose"
    @close="onClose"
  >
    <cdx-progress-bar v-if="isLoading" inline />
    <cdx-message 
      v-if="errorMessage"
      type="error" 
      allow-user-dismiss
      inline
      @user-dismissed="errorMessage = null"
    >
      {{ errorMessage }}
    </cdx-message>

    <cdx-field
      :status="passwordStatus"
      :messages="{ error: passwordValidationMessage }"
      :label-icon="cdxIconLock"
    >
      <template #label>
        Νέος Κωδικός Πρόσβασης
      </template>
      <cdx-text-input
        v-model="password"
        input-type="password"
        :disabled="isLoading"
        @update:model-value="validatePassword"
      />
    </cdx-field>
    <cdx-field
      :status="confirmPasswordStatus"
      :messages="{ error: confirmPasswordValidationMessage }"
      :label-icon="cdxIconLock"
    >
      <template #label>
        Επιβεβαίωση Κωδικού
      </template>
      <cdx-text-input
        v-model="confirmPassword"
        input-type="password"
        :disabled="isLoading"
        @update:model-value="validateConfirmPassword"
      />
    </cdx-field>
  </cdx-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import {
  CdxDialog,
  CdxField,
  CdxTextInput,
  CdxMessage,
  CdxProgressBar,
} from '@wikimedia/codex';
import { cdxIconLock } from '@wikimedia/codex-icons';
import { authDialogsState, closeResetPasswordDialog, updateUserPassword } from '../auth';
import notificationService from '../notification';

const isLoading = ref(false);
const errorMessage = ref(null);
const password = ref('');
const confirmPassword = ref('');

const passwordStatus = ref('default');
const confirmPasswordStatus = ref('default');

const passwordValidationMessage = ref('Ο κωδικός πρόσβασης πρέπει να περιέχει τουλάχιστον 8 χαρακτήρες.');
const confirmPasswordValidationMessage = ref('Οι κωδικοί πρόσβασης δεν ταιριάζουν.');

watch(() => authDialogsState.isResetPasswordOpen, (isOpen) => {
  if (!isOpen) {
    errorMessage.value = null;
    password.value = '';
    confirmPassword.value = '';
    passwordStatus.value = 'default';
    confirmPasswordStatus.value = 'default';
  }
});

function validatePassword() {
  if (password.value.length < 8) {
    passwordStatus.value = 'error';
    return false;
  } else {
    passwordStatus.value = 'success';
    return true;
  }
}

function validateConfirmPassword() {
  if (password.value !== confirmPassword.value || confirmPassword.value.length === 0) {
    confirmPasswordStatus.value = 'error';
    return false;
  } else {
    confirmPasswordStatus.value = 'success';
    return true;
  }
}

async function onResetPassword() {
  errorMessage.value = null;
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  if (!isPasswordValid || !isConfirmPasswordValid) {
    return;
  }

  isLoading.value = true;
  try {
    await updateUserPassword(password.value);
    onClose();
    notificationService.push('Ο κωδικός πρόσβασής σας ενημερώθηκε με επιτυχία.', 'success');
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
}

function onClose() {
  closeResetPasswordDialog();
}
</script>
