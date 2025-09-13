<template>
  <cdx-dialog
    :open="modelValue"
    :title-icon="cdxIconUserAdd"
    title="Εγγραφή"
    subtitle="Δημιουργίστε έναν λογαριασμό"
    :primary-action="{ label: 'Εγγραφή', action: 'progressive' }"
    :default-action="{ label: 'Ακύρωση' }"
    :primary-action-disabled="isLoading"
    :default-action-disabled="isLoading"
    @primary="onSignIn"
    @default="onClose"
    @close="onClose"
  >
    <cdx-progress-bar v-if="isLoading" inline aria-label="Registering..." />
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
        type="email"
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
        type="password"
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
        type="password"
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
} from '@wikimedia/codex';
import {
  cdxIconUserAdd,
  cdxIconUserAvatarOutline,
  cdxIconLock,
  cdxIconMessage
} from '@wikimedia/codex-icons';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'signin']);

const isLoading = ref(false);
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

watch(() => props.modelValue, (isOpen) => {
  if (!isOpen) {
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
  } else {
    usernameStatus.value = 'success';
  }
}

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.length === 0 || !emailRegex.test(email.value)) {
    emailStatus.value = 'error';
  } else {
    emailStatus.value = 'success';
  }
}

function validatePassword() {
  if (password.value.length < 8) {
    passwordStatus.value = 'error';
  } else {
    passwordStatus.value = 'success';
  }
  validateConfirmPassword();
}

function validateConfirmPassword() {
  if (password.value !== confirmPassword.value) {
    confirmPasswordStatus.value = 'error';
  } else {
    confirmPasswordStatus.value = 'success';
  }
}

async function onSignIn() {
  validateUsername();
  validateEmail();
  validatePassword();
  validateConfirmPassword();

  if (
    usernameStatus.value !== 'success' ||
    emailStatus.value !== 'success' ||
    passwordStatus.value !== 'success' ||
    confirmPasswordStatus.value !== 'success'
  ) {
    return;
  }

  isLoading.value = true;
  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        username: username.value, 
        email: email.value, 
        password: password.value 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Sign-up failed');
    }

    const data = await response.json();
    emit('signin', data.user);
    onClose();

  } catch (error) {
    console.error('Sign-in error:', error);
    // Handle error display here if needed
  } finally {
    isLoading.value = false;
  }
}

function onClose() {
  emit('update:modelValue', false);
}
</script>
