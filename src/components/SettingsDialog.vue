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
    <cdx-field :status="error ? 'error' : null" :messages="error ? { error: error } : {}">
      <template #label>
        Ονοματεπώνυμο
      </template>
      <cdx-text-input
        v-model="fullName"
        :disabled="isLoading"
        aria-label="Ονοματεπώνυμο"
      />
    </cdx-field>

    <cdx-field>
      <template #label>
        User ID
      </template>
      <cdx-text-input
        :model-value="user ? user.id : 'Δεν υπάρχει συνδεδεμένος χρήστης'"
        disabled
        aria-label="User ID"
      />
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
import { ref, watch } from 'vue';
import {
  CdxDialog,
  CdxField,
  CdxTextInput,
  CdxButton,
  CdxProgressBar,
  CdxMessage
} from '@wikimedia/codex';
import {
  cdxIconSettings,
  cdxIconAlert
} from '@wikimedia/codex-icons';
import { user, signOut } from '../auth';
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
const fullName = ref('');
const error = ref('');

const isConfirmingDeletion = ref(false);
const isDeleting = ref(false);
const password = ref('');
const deleteError = ref('');

async function fetchProfile() {
  if (!user.value) return;

  isLoading.value = true;
  error.value = '';

  try {
    const { data, error: fetchError } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.value.id)
      .single();

    if (fetchError) throw fetchError;

    if (data) {
      fullName.value = data.full_name || '';
    }
  } catch (e) {
    notificationService.push('Αποτυχία φόρτωσης προφίλ.', 'error');
    console.error('Error fetching profile:', e.message);
  } finally {
    isLoading.value = false;
  }
}

watch([() => props.modelValue, user], ([isOpen, currentUser], [wasOpen, wasUser]) => {
  const dialogJustOpened = isOpen && !wasOpen;

  // Reset transient dialog state whenever it opens
  if (dialogJustOpened) {
    error.value = '';
    isConfirmingDeletion.value = false;
    password.value = '';
    deleteError.value = '';
    // Clear fullName to prevent showing stale data from another user
    fullName.value = '';
  }

  // Fetch profile if the dialog is open and we have a user.
  // This covers the case where the dialog opens before the user info is ready.
  if (isOpen && currentUser) {
    fetchProfile();
  }
});

async function onSave() {
  if (!fullName.value) {
      error.value = 'Το ονοματεπώνυμο δεν μπορεί να είναι κενό.';
      return;
  }
  isLoading.value = true;
  error.value = '';

  try {
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ full_name: fullName.value })
      .eq('id', user.value.id);

    if (profileError) throw profileError;

    notificationService.push('Οι ρυθμίσεις αποθηκεύτηκαν με επιτυχία.', 'success');
    emit('update:modelValue', false);

  } catch (e) {
    error.value = e.message || 'Η αποθήκευση απέτυχε.';
    notificationService.push('Η αποθήκευση απέτυχε.', 'error');
    console.error('Error saving settings:', e.message);
  } finally {
    isLoading.value = false;
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

function onClose() {
  if (!isLoading.value && !isDeleting.value) {
    emit('update:modelValue', false);
  }
}
</script>

<style scoped>
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
