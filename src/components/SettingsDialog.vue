<template>
  <cdx-dialog
    :open="modelValue"
    :title-icon="cdxIconSettings"
    title="Ρυθμίσεις"
    :primary-action="{ label: 'Αποθήκευση', actionType: 'progressive', disabled: isLoading }"
    :default-action="{ label: 'Ακύρωση' }"
    @primary="onSave"
    @default="onClose"
    @close="onClose"
  >
    <cdx-progress-bar v-if="isLoading" inline />
    <cdx-field :status="fieldStatus" :messages="fieldMessages">
      <template #label>
        Αλλαγή ονόματος χρήστη
      </template>
      <div class="username-input-container">
        <cdx-text-input
          v-model="username"
          :disabled="!isEditingUsername || isLoading"
          aria-label="Όνομα χρήστη"
        />
        <cdx-button
          weight="quiet"
          aria-label="Επεξεργασία ονόματος χρήστη"
          :disabled="isLoading"
          @click="toggleEditMode"
        >
          <cdx-icon :icon="editIcon" />
        </cdx-button>
      </div>
    </cdx-field>
  </cdx-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import {
  CdxDialog,
  CdxField,
  CdxTextInput,
  CdxButton,
  CdxIcon,
  CdxProgressBar
} from '@wikimedia/codex';
import {
  cdxIconSettings,
  cdxIconEdit,
  cdxIconCheck
} from '@wikimedia/codex-icons';
import auth from '../auth';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const isLoading = ref(false);
const isEditingUsername = ref(false);
const username = ref('');
const error = ref('');

const fieldStatus = computed(() => error.value ? 'error' : null);
const fieldMessages = computed(() => error.value ? { error: error.value } : {});
const editIcon = computed(() => isEditingUsername.value ? cdxIconCheck : cdxIconEdit);

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    // Reset state when dialog opens
    username.value = auth.state.user?.username || '';
    isEditingUsername.value = false;
    error.value = '';
    isLoading.value = false;
  }
});

async function updateUsername() {
  error.value = '';
  if (username.value === auth.state.user?.username) {
    isEditingUsername.value = false;
    return;
  }

  isLoading.value = true;

  try {
    const response = await fetch('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Αποτυχία ενημέρωσης ονόματος χρήστη.');
    }

    // Update the auth state with the new user data from the response
    auth.updateUser(data);
    isEditingUsername.value = false;

  } catch (e) {
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
}

function toggleEditMode() {
  if (isEditingUsername.value) {
    updateUsername();
  } else {
    isEditingUsername.value = true;
  }
}

function onSave() {
  if (isEditingUsername.value) {
    updateUsername().then(() => {
      if (!error.value) {
        emit('update:modelValue', false);
      }
    });
  } else {
    emit('update:modelValue', false);
  }
}

function onClose() {
  if (!isLoading.value) {
    emit('update:modelValue', false);
  }
}
</script>

<style scoped>
.username-input-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.username-input-container .cdx-text-input {
  flex-grow: 1;
}
</style>
