<template>
  <cdx-dialog
    v-if="!isConfirmingDeletion"
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

    <div class="delete-section">
      <p>Η διαγραφή του λογαριασμού σας είναι οριστική και μη αναστρέψιμη.</p>
      <cdx-button
        :action-type="'destructive'"
        :disabled="isLoading"
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
    :primary-action="{ label: 'Διαγραφή', actionType: 'destructive', disabled: isDeleting }"
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
        :disabled="isDeleting"
        aria-label="Κωδικός πρόσβασης"
      />
    </cdx-field>
    <cdx-progress-bar v-if="isDeleting" inline />
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
  CdxProgressBar, // Θα το χρειαστούμε πάλι
  CdxMessage
} from '@wikimedia/codex';
import {
  cdxIconSettings,
  cdxIconEdit,
  cdxIconCheck,
  cdxIconAlert
} from '@wikimedia/codex-icons';
// Διορθωμένο import
import { user, updateUser, signOut } from '../auth'; 
import loadingService from '../loading';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const isLoading = ref(false); // Θα το χρησιμοποιήσουμε για την τοπική πρόοδο
const isEditingUsername = ref(false);
const username = ref('');
const error = ref('');

const isConfirmingDeletion = ref(false);
const isDeleting = ref(false);
const password = ref('');
const deleteError = ref('');

const fieldStatus = computed(() => error.value ? 'error' : null);
const fieldMessages = computed(() => error.value ? { error: error.value } : {});
const editIcon = computed(() => isEditingUsername.value ? cdxIconCheck : cdxIconEdit);

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    username.value = user.value?.user_metadata?.username || '';
    isEditingUsername.value = false;
    error.value = '';
    isLoading.value = false;
    isConfirmingDeletion.value = false;
    isDeleting.value = false;
    password.value = '';
    deleteError.value = '';
  }
});

async function handleUpdateUsername() {
  if (username.value === user.value?.user_metadata?.username) {
    isEditingUsername.value = false;
    return;
  }

  isLoading.value = true;
  error.value = '';

  try {
    // Καλούμε απευθείας τη νέα updateUser function
    await updateUser({ username: username.value });
    isEditingUsername.value = false;
  } catch (e) {
    error.value = e.message || 'Αποτυχία ενημέρωσης ονόματος χρήστη.';
  } finally {
    isLoading.value = false;
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
  isDeleting.value = true;

  try {
    // Αυτή η λογική παραμένει η ίδια, καθώς απαιτεί ξεχωριστό API call
    const response = await fetch('/api/user', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Η διαγραφή απέτυχε.');

    await signOut();
    onCloseConfirmDialog();
    emit('update:modelValue', false);
    window.location.reload();

  } catch (e) {
    deleteError.value = e.message;
  } finally {
    isDeleting.value = false;
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
  if (!isLoading.value && !isDeleting.value) {
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
