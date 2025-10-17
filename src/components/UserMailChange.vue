<template>
  <cdx-dialog
    :open="modelValue"
    title="Αλλαγή Email"
    :primary-action="{ label: emailSent ? 'Κλείσιμο' : 'Αποστολή Email Επιβεβαίωσης', actionType: 'progressive', disabled: isLoading }"
    :default-action="emailSent ? null : { label: 'Ακύρωση' }"
    @primary="handlePrimaryAction"
    @default="onClose"
    @close="onClose"
  >
    <cdx-progress-bar v-if="isLoading" inline />
    
    <div v-if="!emailSent">
      <p>Εισάγετε τη νέα σας διεύθυνση email. Θα σας στείλουμε συνδέσμους επιβεβαίωσης τόσο στην παλιά όσο και στη νέα σας διεύθυνση email.</p>
      <cdx-field
        :status="emailStatus"
        :messages="{ error: emailValidationMessage }"
      >
        <template #label>
          Νέο Email
        </template>
        <cdx-text-input
          v-model="newEmail"
          input-type="email"
          :disabled="isLoading"
          @update:model-value="validateEmail"
        />
      </cdx-field>
    </div>

    <div v-else>
      <cdx-message type="success" inline>
        Σας στείλαμε emails επιβεβαίωσης. Παρακαλώ ακολουθήστε τις οδηγίες για να ολοκληρώσετε την αλλαγή του email σας.
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
import { supabase } from '../supabase';
import notificationService from '../notification';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const isLoading = ref(false);
const newEmail = ref('');
const emailSent = ref(false);
const emailStatus = ref('default');
const emailValidationMessage = ref('Πρέπει να δώσετε μια έγκυρη διεύθυνση email.');

// Reset state when dialog opens
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    newEmail.value = '';
    emailSent.value = false;
    isLoading.value = false;
    emailStatus.value = 'default';
  }
});

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (newEmail.value && emailRegex.test(newEmail.value)) {
    emailStatus.value = 'default';
    return true;
  } else {
    emailStatus.value = 'error';
    return false;
  }
}

async function handlePrimaryAction() {
  if (emailSent.value) {
    onClose();
    return;
  }

  if (!validateEmail()) {
    return;
  }

  isLoading.value = true;
  try {
    const { error } = await supabase.auth.updateUser({ email: newEmail.value });

    if (error) {
      throw error;
    }

    emailSent.value = true;
  } catch (e) {
    notificationService.push(`Η αλλαγή του email απέτυχε: ${e.message}`, 'error');
    console.error('Error updating email:', e.message);
  } finally {
    isLoading.value = false;
  }
}

function onClose() {
  if (!isLoading.value) {
    emit('update:modelValue', false);
  }
}
</script>
