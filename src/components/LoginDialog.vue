<template>
    <cdx-dialog
      :open="authDialogsState.isLoginOpen"
      :title-icon="cdxIconLogIn"
      title="Σύνδεση"
      subtitle="Σύνδεση στον λογαριασμό σας"
      :primary-action="{ label: 'Σύνδεση', actionType: 'progressive' }"
      :default-action="{ label: 'Ακύρωση' }"
      @primary="onLogin"
      @default="onClose"
      @close="onClose"
    >
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
        :status="emailStatus"
        :messages="{ error: emailValidationMessage }"
        :label-icon="cdxIconMessage"
      >
        <template #label>
          Email
        </template>
        <cdx-text-input
          v-model="email"
          input-type="email"
          @update:model-value="emailStatus = 'default'"
        />
      </cdx-field>
      <cdx-field
        :status="passwordStatus"
        :messages="{ error: passwordValidationMessage }"
        :label-icon="cdxIconLock"
      >
        <template #label>
          Κωδικός πρόσβασης
        </template>
        <cdx-text-input
          v-model="password"
          input-type="password"
          @update:model-value="passwordStatus = 'default'"
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
  } from '@wikimedia/codex';
  import {
    cdxIconLogIn,
    cdxIconMessage,
    cdxIconLock
  } from '@wikimedia/codex-icons';
  import { authDialogsState, closeAuthDialog, signInWithPassword } from '../auth';
  import loadingService from '../loading';
  
  const errorMessage = ref(null);
  const email = ref('');
  const password = ref('');
  const emailStatus = ref('default');
  const passwordStatus = ref('default');
  const emailValidationMessage = ref('Πρέπει να δώσετε μια έγκυρη διεύθυνση email.');
  const passwordValidationMessage = ref('Ο κωδικός πρόσβασης είναι υποχρεωτικός.');
  
  watch(() => authDialogsState.isLoginOpen, (isOpen) => {
    if (!isOpen) {
      errorMessage.value = null;
      email.value = '';
      password.value = '';
      emailStatus.value = 'default';
      passwordStatus.value = 'default';
    }
  });
  
  async function onLogin() {
    errorMessage.value = null;
    const isEmailValid = email.value.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    const isPasswordValid = password.value.length > 0;
  
    emailStatus.value = isEmailValid ? 'default' : 'error';
    passwordStatus.value = isPasswordValid ? 'default' : 'error';
  
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
  
    loadingService.show();
    try {
      await signInWithPassword(email.value, password.value);
      // On success, the onAuthStateChange listener in auth.js will close the dialog
    } catch (error) {
      errorMessage.value = error.message;
      emailStatus.value = 'error';
      passwordStatus.value = 'error';
    } finally {
      loadingService.hide();
    }
  }
  
  function onClose() {
    closeAuthDialog();
  }
  </script>
