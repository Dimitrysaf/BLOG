<template>
    <cdx-dialog
      :open="isRegisterDialogOpen"
      :title-icon="cdxIconUserAdd"
      title="Εγγραφή"
      subtitle="Δημιουργίστε έναν λογαριασμό"
      :primary-action="{ label: 'Εγγραφή', actionType: 'progressive' }"
      :default-action="{ label: 'Ακύρωση' }"
      :primary-action-disabled="isLoading"
      :default-action-disabled="isLoading"
      @primary="onSignIn"
      @default="onClose"
      @close="onClose"
    >
      <cdx-progress-bar v-if="isLoading" inline aria-label="Γίνεται εγγραφή..." />
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
        :status="usernameStatus"
        :messages="{ error: usernameValidationMessage }"
        :label-icon="cdxIconUserAvatarOutline"
      >
        <template #label>
          Όνομα χρήστη
        </template>
        <cdx-text-input
          v-model="username"
          :disabled="isLoading"
          @update:model-value="validateUsername"
        />
      </cdx-field>
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
          @update:model-value="validateEmail"
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
          @update:model-value="validatePassword"
        />
      </cdx-field>
      <cdx-field
        :status="confirmPasswordStatus"
        :messages="{ error: confirmPasswordValidationMessage }"
        :label-icon="cdxIconLock"
      >
        <template #label>
          Επιβεβαίωση κωδικού πρόσβασης
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
    CdxProgressBar,
    CdxMessage,
  } from '@wikimedia/codex';
  import {
    cdxIconUserAdd,
    cdxIconUserAvatarOutline,
    cdxIconLock,
    cdxIconMessage
  } from '@wikimedia/codex-icons';
  import { isRegisterDialogOpen, closeRegisterDialog, signUp } from '../auth';
  import loadingService from '../loading';
  
  const isLoading = ref(false);
  const errorMessage = ref(null);
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  const usernameStatus = ref('default');
  const emailStatus = ref('default');
  const passwordStatus = ref('default');
  const confirmPasswordStatus = ref('default');
  
  const usernameValidationMessage = ref('Το όνομα χρήστη είναι υποχρεωτικό.');
  const emailValidationMessage = ref('Πρέπει να δώσετε μια έγκυρη διεύθυνση email.');
  const passwordValidationMessage = ref('Ο κωδικός πρόσβασης πρέπει να περιέχει τουλάχιστον 8 χαρακτήρες.');
  const confirmPasswordValidationMessage = ref('Οι κωδικοί πρόσβασης δεν ταιριάζουν.');
  
  watch(isRegisterDialogOpen, (isOpen) => {
    if (!isOpen) {
      errorMessage.value = null;
      username.value = '';
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
      usernameStatus.value = 'default';
      emailStatus.value = 'default';
      passwordStatus.value = 'default';
      confirmPasswordStatus.value = 'default';
    }
  });
  
  function validateUsername() {
    if (username.value.length === 0) {
      usernameStatus.value = 'error';
      return false;
    } else {
      usernameStatus.value = 'success';
      return true;
    }
  }
  
  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.length === 0 || !emailRegex.test(email.value)) {
      emailStatus.value = 'error';
      return false;
    } else {
      emailStatus.value = 'success';
      return true;
    }
  }
  
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
  
  async function onSignIn() {
    errorMessage.value = null;
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
  
    if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }
  
    isLoading.value = true;
    loadingService.show();
    try {
        await signUp(email.value, password.value, username.value);
        onClose(); // Close dialog on successful signup
    } catch (error) {
      errorMessage.value = error.message;
      if (error.message.includes('email address is already taken')) {
        emailStatus.value = 'error';
        emailValidationMessage.value = 'Το email υπάρχει ήδη';
      } else if (error.message.includes('Username is already taken')) {
        usernameStatus.value = 'error';
        usernameValidationMessage.value = 'Το όνομα χρήστη υπάρχει ήδη';
      }
    } finally {
      isLoading.value = false;
      loadingService.hide();
    }
  }
  
  function onClose() {
    closeRegisterDialog();
  }
  </script>