<template>
    <cdx-dialog
      :open="authDialogsState.isLoginOpen"
      :title-icon="cdxIconLogIn"
      title="Σύνδεση"
      subtitle="Σύνδεση στον λογαριασμό σας"
      :primary-action="{ label: 'Σύνδεση', actionType: 'progressive', disabled: isLoading }"
      :default-action="{ label: 'Ακύρωση' }"
      @primary="onLogin"
      @default="onClose"
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
          :disabled="isLoading"
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
          :disabled="isLoading"
          @update:model-value="passwordStatus = 'default'"
        />
      </cdx-field>

      <div class="divider">ή</div>

      <div class="google-button-container">
        <cdx-button
          @click="handleGoogleSignIn"
          :disabled="isLoading"
        >
          Συνεχίστε μέσω Google
        </cdx-button>
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
    CdxProgressBar,
    CdxButton
  } from '@wikimedia/codex';
  import {
    cdxIconLogIn,
    cdxIconMessage,
    cdxIconLock
  } from '@wikimedia/codex-icons';
  import { authDialogsState, closeAuthDialog, signInWithPassword, signInWithGoogle } from '../auth';
  
  const isLoading = ref(false);
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

  async function handleGoogleSignIn() {
    isLoading.value = true;
    errorMessage.value = null;
    try {
      await signInWithGoogle();
    } catch (error) {
      errorMessage.value = error.message;
    } finally {
      // Don't set isLoading to false here, page will redirect
    }
  }
  
  async function onLogin() {
    errorMessage.value = null;
    const isEmailValid = email.value.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    const isPasswordValid = password.value.length > 0;
  
    emailStatus.value = isEmailValid ? 'default' : 'error';
    passwordStatus.value = isPasswordValid ? 'default' : 'error';
  
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
  
    isLoading.value = true;
    try {
      await signInWithPassword(email.value, password.value);
      // On success, the onAuthStateChange listener in auth.js will close the dialog
    } catch (error) {
      errorMessage.value = error.message;
      emailStatus.value = 'error';
      passwordStatus.value = 'error';
    } finally {
      isLoading.value = false;
    }
  }
  
  function onClose() {
    closeAuthDialog();
  }
  </script>

<style scoped>
.divider {
  text-align: center;
  margin: 20px 0;
  border-bottom: 1px solid #ccc;
  line-height: 0.1em;
}

.divider span {
  background: #fff;
  padding: 0 10px;
}

.google-button-container {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}
</style>