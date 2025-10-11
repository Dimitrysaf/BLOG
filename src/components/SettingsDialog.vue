<template>
  <cdx-dialog
    v-if="!isConfirmingDeletion"
    :open="modelValue"
    :title-icon="cdxIconSettings"
    title="Ρυθμίσεις"
    :primary-action="{ label: 'Αποθήκευση', actionType: 'progressive' }"
    :default-action="{ label: 'Ακύρωση' }"
    @primary="onSave"
    @default="onClose"
    @close="onClose"
  >
    <cdx-field :status="fieldStatus" :messages="fieldMessages">
      <template #label>
        Αλλαγή ονόματος χρήστη
      </template>
      <div class="username-input-container">
        <cdx-text-input
          v-model="username"
          :disabled="!isEditingUsername"
          aria-label="Όνομα χρήστη"
        />
        <cdx-button
          weight="quiet"
          aria-label="Επεξεργασία ονόματος χρήστη"
          @click="toggleEditMode"
        >
          <cdx-icon :icon="editIcon" />
        </cdx-button>
      </div>
    </cdx-field>

    <div class="delete-section">
      <p>Η διαγραφή του λογαριασμού σας είναι οριστική και μη αναστρέψιμη.</p>
      <cdx-button
        :action-type="'destructive'"
        @click="onOpenConfirmDialog"
      >
        Διαγραφή λογαριασμού
      </cdx-button>
    </div>
  </cdx-dialog>

  <cdx-dialog
    :open="isConfirmingDeletion"
    :title-icon="cdxIconAlert"
    title="Επιβεβαίωση διαγραφής"
    :primary-action="{ label: 'Διαγραφή', actionType: 'destructive' }"
    :default-action="{ label: 'Ακύρωση' }"
    @primary="onDeleteAccount"
    @default="onCloseConfirmDialog"
    @close="onCloseConfirmDialog"
  >
    <cdx-message type="warning" inline class="warning-message">
      Η ενέργεια αυτή είναι μη αναστρέψιμη. Ο λογαριασμός σας θα διαγραφεί οριστικά.
    </cdx-message>
    <cdx-field :status="deleteError ? 'error' : null" :messages="deleteError ? { error: deleteError } : {}">
      <template #label>
        Εισαγάγετε τον κωδικό πρόσβασής σας για επιβεβαίωση
      </template>
      <cdx-text-input
        v-model="password"
        input-type="password"
        aria-label="Κωδικός πρόσβασης"
      />
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
  CdxMessage
} from '@wikimedia/codex';
import {
  cdxIconSettings,
  cdxIconEdit,
  cdxIconCheck,
  cdxIconAlert
} from '@wikimedia/codex-icons';
import { user, updateUser, signOut } from '../auth';
import loadingService from '../loading';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const isEditingUsername = ref(false);
const username = ref('');
const error = ref('');

const isConfirmingDeletion = ref(false);
const password = ref('');
const deleteError = ref('');

const fieldStatus = computed(() => error.value ? 'error' : null);
const fieldMessages = computed(() => error.value ? { error: error.value } : {});
const editIcon = computed(() => isEditingUsername.value ? cdxIconCheck : cdxIconEdit);

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    // Reset state when dialog opens
    username.value = user.value?.user_metadata?.username || '';
    isEditingUsername.value = false;
    error.value = '';
    isConfirmingDeletion.value = false;
    password.value = '';
    deleteError.value = '';
  }
});

async function handleUpdateUsername() {
  error.value = '';
  if (username.value === user.value?.user_metadata?.username) {
    isEditingUsername.value = false;
    return;
  }

  loadingService.show();

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
    updateUser(data);
    isEditingUsername.value = false;

  } catch (e) {
    error.value = e.message;
  } finally {
    loadingService.hide();
  }
}

function toggleEditMode() {
  if (isEditingUsername.value) {
    handleUpdateUsername();
  } else {
    isEditingUsername.value = true;
  }
}

function onOpenConfirmDialog() {
  isConfirmingDeletion.value = true;
}

function onCloseConfirmDialog() {
  isConfirmingDeletion.value = false;
  password.value = '';
  deleteError.value = '';
}

async function onDeleteAccount() {
  deleteError.value = '';
  loadingService.show();

  try {
    const response = await fetch('/api/user', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Η διαγραφή του λογαριασμού απέτυχε.');
    }

    await signOut();
    onCloseConfirmDialog();
    emit('update:modelValue', false);
    window.location.reload();

  } catch (e) {
    deleteError.value = e.message;
  } finally {
    loadingService.hide();
  }
}

function onSave() {
  if (isEditingUsername.value) {
    handleUpdateUsername().then(() => {
      if (!error.value) {
        emit('update:modelValue', false);
      }
    });
  } else {
    emit('update:modelValue', false);
  }
}

function onClose() {
  emit('update:modelValue', false);
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

.delete-section {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #c8ccd1;
}

.delete-section p {
  margin-bottom: 8px;
}

.warning-message {
  margin-bottom: 16px;
}
</style>
