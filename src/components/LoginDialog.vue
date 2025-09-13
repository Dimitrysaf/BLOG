<template>
  <cdx-dialog
    :open="modelValue"
    :title-icon="cdxIconLogIn"
    title="Σύνδεση"
    subtitle="Σύνδεση στον λογαριασμό σας"
    :primary-action="{ label: 'Σύνδεση', action: 'progressive' }"
    :default-action="{ label: 'Ακύρωση' }"
    :primary-action-disabled="isLoading"
    :default-action-disabled="isLoading"
    @primary="onLogin"
    @default="onClose"
    @close="onClose"
  >
    <cdx-progress-bar v-if="isLoading" inline aria-label="Logging in..." />
    <cdx-message 
      v-if="errorMessage"
      type="error" 
      allow-user-dismiss
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
        type="email"
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
        type="password"
        :disabled="isLoading"
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
  CdxProgressBar,
  CdxMessage,
} from '@wikimedia/codex';
import {
  cdxIconLogIn,
  cdxIconMessage,
  cdxIconLock
} from '@wikimedia/codex-icons';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'login']);

const isLoading = ref(false);
const errorMessage = ref(null);
const email = ref('');
const password = ref('');
const emailStatus = ref('default');
const passwordStatus = ref('default');
const emailValidationMessage = ref('Πρέπει να δώσετε μια έγκυρη διεύθυνση email.');
const passwordValidationMessage = ref('Ο κωδικός πρόσβασης είναι υποχρεωτικός.');

watch(() => props.modelValue, (isOpen) => {
  if (!isOpen) {
    errorMessage.value = null; // Clear error on close
    email.value = '';
    password.value = '';
    emailStatus.value = 'default';
    passwordStatus.value = 'default';
  }
});

async function onLogin() {
  errorMessage.value = null; // Clear previous error
  const isEmailValid = email.value.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  const isPasswordValid = password.value.length > 0;

  emailStatus.value = isEmailValid ? 'default' : 'error';
  passwordStatus.value = isPasswordValid ? 'default' : 'error';

  if (!isEmailValid || !isPasswordValid) {
    return;
  }

  isLoading.value = true;
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: email.value, 
        password: password.value 
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Use the error message from the API, or a default one
      throw new Error(data.message || 'Login failed. Please check your credentials.');
    }

    localStorage.setItem('authToken', data.token);

    emit('login', data.user);
    onClose();

  } catch (error) {
    errorMessage.value = error.message;
    // We can also reset the field statuses if we want them to re-validate
    emailStatus.value = 'error';
    passwordStatus.value = 'error';
  } finally {
    isLoading.value = false;
  }
}

function onClose() {
  emit('update:modelValue', false);
}
</script>
