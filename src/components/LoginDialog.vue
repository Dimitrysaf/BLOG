<template>
  <cdx-dialog
    :open="modelValue"
    :title-icon="cdxIconLogIn"
    title="Σύνδεση"
    subtitle="Σύνδεση στον λογαριασμό σας"
    :primary-action="{ label: 'Σύνδεση', action: 'progressive' }"
    :default-action="{ label: 'Ακύρωση' }"
    @primary="onLogin"
    @default="onClose"
    @close="onClose"
  >
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

const email = ref('');
const password = ref('');
const emailStatus = ref('default');
const passwordStatus = ref('default');
const emailValidationMessage = ref('Πρέπει να δώσετε μια έγκυρη διεύθυνση email.');
const passwordValidationMessage = ref('Ο κωδικός πρόσβασης είναι υποχρεωτικός.');

watch(() => props.modelValue, (isOpen) => {
  if (!isOpen) {
    email.value = '';
    password.value = '';
    emailStatus.value = 'default';
    passwordStatus.value = 'default';
  }
});

function onLogin() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = email.value.length > 0 && emailRegex.test(email.value);
  const isPasswordValid = password.value.length > 0;

  emailStatus.value = isEmailValid ? 'success' : 'error';
  passwordStatus.value = isPasswordValid ? 'success' : 'error';

  if (isEmailValid && isPasswordValid) {
    // Replace this with your actual authentication logic
    if (email.value !== 'admin@example.com' || password.value !== 'password') {
      emailStatus.value = 'error';
      passwordStatus.value = 'error';
      emailValidationMessage.value = 'Μη έγκυρα διαπιστευτήρια.';
      passwordValidationMessage.value = 'Μη έγκυρα διαπιστευτήρια.';
    } else {
      emit('login', { email: email.value, password: password.value });
      onClose();
    }
  }
}

function onClose() {
  emit('update:modelValue', false);
}
</script>
