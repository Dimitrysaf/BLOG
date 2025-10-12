<template>
    <cdx-dialog
      :open="authDialogsState.isRegisterOpen"
      :title-icon="cdxIconUserAdd"
      title="Εγγραφή"
      subtitle="Δημιουργίστε έναν λογαριασμό"
      :primary-action="{ label: 'Εγγραφή', actionType: 'progressive', disabled: isLoading }"
      :default-action="{ label: 'Ακύρωση' }"
      @primary="onSignUp"
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
    CdxMessage,
    CdxProgressBar,
  } from '@wikimedia/codex';
  import {
    cdxIconUserAdd,
    cdxIconLock,
    cdxIconMessage
  } from '@wikimedia/codex-icons';
  import { authDialogsState, closeRegisterDialog, signUp } from '../auth';
  import notificationService from '../notification';
  
  const isLoading = ref(false);
  const errorMessage = ref(null);
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  const emailStatus = ref('default');
  const passwordStatus = ref('default');
  const confirmPasswordStatus = ref('default');
  
  const emailValidationMessage = ref('Πρέπει να δώσετε μια έγκυρη διεύθυνση email.');
  const passwordValidationMessage = ref('Ο κωδικός πρόσβασης πρέπει να περιέχει τουλάχιστον 8 χαρακτήρες.');
  const confirmPasswordValidationMessage = ref('Οι κωδικοί πρόσβασης δεν ταιριάζουν.');
  
  watch(() => authDialogsState.isRegisterOpen, (isOpen) => {
    if (!isOpen) {
      errorMessage.value = null;
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
      emailStatus.value = 'default';
      passwordStatus.value = 'default';
      confirmPasswordStatus.value = 'default';
    }
  });
    
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
  
  async function onSignUp() {
    errorMessage.value = null;
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
  
    if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }
  
    isLoading.value = true;
    try {
        await signUp({
            email: email.value,
            password: password.value,
        });
        onClose(); // Close dialog on successful signup
        notificationService.push('Επιτυχής εγγραφή! Παρακαλώ ελέγξτε το email σας για να επιβεβαιώσετε τον λογαριασμό σας.', 'success');
    } catch (error) {
      errorMessage.value = error.message;
      if (error.message.includes('email address is already taken')) {
        emailStatus.value = 'error';
        emailValidationMessage.value = 'Το email υπάρχει ήδη';
      }
    } finally {
      isLoading.value = false;
    }
  }
  
  function onClose() {
    closeRegisterDialog();
  }
  </script>