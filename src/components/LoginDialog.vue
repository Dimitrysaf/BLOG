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
      :status="usernameStatus"
      :messages="{ error: usernameValidationMessage }"
      :label-icon="cdxIconUserAvatarOutline"
    >
      <template #label>
        Όνομα χρήστη
      </template>
      <cdx-text-input
        v-model="username"
        @update:model-value="usernameStatus = 'default'"
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
  cdxIconUserAvatarOutline,
  cdxIconLock
} from '@wikimedia/codex-icons';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'login']);

const username = ref('');
const password = ref('');
const usernameStatus = ref('default');
const passwordStatus = ref('default');
const usernameValidationMessage = ref('Το όνομα χρήστη είναι υποχρεωτικό.');
const passwordValidationMessage = ref('Ο κωδικός πρόσβασης είναι υποχρεωτικός.');

watch(() => props.modelValue, (isOpen) => {
  if (!isOpen) {
    username.value = '';
    password.value = '';
    usernameStatus.value = 'default';
    passwordStatus.value = 'default';
  }
});

function onLogin() {
  const isUsernameValid = username.value.length > 0;
  const isPasswordValid = password.value.length > 0;

  usernameStatus.value = isUsernameValid ? 'success' : 'error';
  passwordStatus.value = isPasswordValid ? 'success' : 'error';

  if (isUsernameValid && isPasswordValid) {
    if (username.value !== 'admin' || password.value !== 'password') {
      usernameStatus.value = 'error';
      passwordStatus.value = 'error';
      usernameValidationMessage.value = 'Μη έγκυρα διαπιστευτήρια.';
      passwordValidationMessage.value = 'Μη έγκυρα διαπιστευτήρια.';
    } else {
      emit('login', { username: username.value, password: password.value });
      onClose();
    }
  }
}

function onClose() {
  emit('update:modelValue', false);
}
</script>
