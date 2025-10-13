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

    <cdx-field>
      <template #label>Εικόνα Προφίλ</template>
      <div class="avatar-wrapper" :class="{ 'is-loading': isLoading }">
        <img
            v-if="avatarUrl && !imageError"
            :src="avatarUrl"
            alt="Εικόνα προφίλ"
            class="avatar-image"
            @error="onImageError"
        />
        <CdxIcon v-else :icon="cdxIconUserAvatar" class="fallback-icon" />
      </div>
    </cdx-field>

    <cdx-field>
        <template #label>
            URL Εικόνας Προφίλ
        </template>
        <cdx-text-input
            v-model="avatarUrl"
            :disabled="isLoading"
            aria-label="URL Εικόνας Προφίλ"
        />
    </cdx-field>

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
    :primary-action="{ label: 'Διαγραφή', actionType: 'destructive', disabled: isDeleting || !isConfirmationValid }"
    :default-action="{ label: 'Ακύρωση' }"
    @primary="onDeleteAccount"
    @default="onCloseConfirmDialog"
    @close="onCloseConfirmDialog"
  >
    <cdx-message type="warning" inline class="warning-message">
      Η ενέργεια αυτή είναι μη αναστρέψιμη. Ο λογαριασμός σας θα διαγραφεί οριστικά.
    </cdx-message>

    <!-- Dialog for users WITHOUT a password (e.g. Google Sign in) -->
    <cdx-field v-if="!hasPassword" :status="deleteError ? 'error' : null" :messages="deleteError ? { error: deleteError } : {}">
        <template #label>
            Για επιβεβαίωση, πληκτρολογήστε το email σας: <strong>{{ user.email }}</strong>
        </template>
        <cdx-text-input
            v-model="confirmationText"
            :disabled="isDeleting"
            aria-label="Επιβεβαίωση με email"
        />
    </cdx-field>

    <!-- Dialog for users WITH a password -->
    <cdx-field v-else :status="deleteError ? 'error' : null" :messages="deleteError ? { error: deleteError } : {}">
      <template #label>
        Εισαγάγετε τον κωδικό πρόσβασής σας για επιβεβαίωση
      </template>
      <cdx-text-input
        v-model="confirmationText"
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
  CdxProgressBar,
  CdxMessage,
  CdxIcon
} from '@wikimedia/codex';
import {
  cdxIconSettings,
  cdxIconAlert,
  cdxIconUserAvatar
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
const avatarUrl = ref('');
const error = ref('');
const imageError = ref(false);

const onImageError = () => {
    imageError.value = true;
};

const isConfirmingDeletion = ref(false);
const isDeleting = ref(false);
const confirmationText = ref('');
const deleteError = ref('');

const hasPassword = computed(() => {
  if (!user.value || !user.value.identities) {
    return false;
  }
  return user.value.identities.some(identity => identity.provider === 'email');
});

const isConfirmationValid = computed(() => {
    if (!hasPassword.value) {
        return user.value && confirmationText.value === user.value.email;
    }
    return confirmationText.value.length > 0;
});

async function fetchProfile() {
  if (!user.value) return;

  isLoading.value = true;
  error.value = '';

  try {
    const { data, error: fetchError } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', user.value.id)
      .single();

    if (fetchError) throw fetchError;

    if (data) {
      fullName.value = data.full_name || '';
      avatarUrl.value = data.avatar_url || '';
    }
  } catch (e) {
    notificationService.push('Αποτυχία φόρτωσης προφίλ.', 'error');
    console.error('Error fetching profile:', e.message);
  } finally {
    isLoading.value = false;
  }
}

watch(avatarUrl, (newUrl, oldUrl) => {
    if (newUrl !== oldUrl) {
        imageError.value = false;
    }
});

watch([() => props.modelValue, user], ([isOpen, currentUser]) => {
  const dialogJustOpened = isOpen && !props.modelValue;
  
  if (isOpen) {
    if (dialogJustOpened) {
      error.value = '';
      isConfirmingDeletion.value = false;
      confirmationText.value = '';
      deleteError.value = '';
      imageError.value = false;
    }
    
    if (currentUser) {
        fetchProfile();
    }
  }
}, { immediate: true });

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
      .update({ 
        full_name: fullName.value,
        avatar_url: avatarUrl.value
      })
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
  confirmationText.value = '';
  deleteError.value = '';
}

async function onDeleteAccount() {
  if (!isConfirmationValid.value) {
    deleteError.value = 'Η επιβεβαίωση δεν είναι σωστή.';
    return;
  }
  deleteError.value = '';
  isDeleting.value = true;

  try {
    const { error: functionError } = await supabase.functions.invoke('delete-user', {
      body: { 
        confirmation: confirmationText.value,
        hasPassword: hasPassword.value
      },
    });

    if (functionError) {
      throw new Error('Η διαγραφή απέτυχε. Ελέγξτε τα στοιχεία σας ή δοκιμάστε ξανά.');
    }

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
.avatar-wrapper {
  width: 80px;
  height: 80px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #c8ccd1;
}

.avatar-wrapper.is-loading {
  background-color: #e9ecef;
}

.avatar-wrapper.is-loading .avatar-image {
  opacity: 0.3;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fallback-icon {
    width: 50px;
    height: 50px;
    color: #54595d;
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
