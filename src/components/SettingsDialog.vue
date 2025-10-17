<template>
  <!-- Main Settings Dialog -->
  <cdx-dialog
    :open="modelValue"
    :title-icon="cdxIconSettings"
    title="Ρυθμίσεις"
    :primary-action="{ label: 'Αποθήκευση', actionType: 'progressive', disabled: isLoading || isImageLoading }"
    :default-action="{ label: 'Ακύρωση' }"
    @primary="onSave"
    @default="onClose"
    @close="onClose"
  >
    <cdx-progress-bar v-if="isLoading" inline />

    <div class="image-url-field">
      <div class="avatar-preview">
        <cdx-progress-indicator v-if="isImageLoading" />
        <img
          v-else-if="avatarUrl && !imageError"
          :src="avatarUrl"
          alt="Εικόνα προφίλ"
          class="avatar-image"
        />
        <CdxIcon v-else :icon="cdxIconUserAvatar" class="fallback-icon" />
      </div>

      <cdx-field class="url-input-field">
        <template #label>
          URL Εικόνας Προφίλ
        </template>
        <cdx-text-input
          ref="urlInput"
          v-model="avatarUrl"
          :disabled="isLoading"
          :placeholder="avatarUrl ? '' : '(κενό)'"
          aria-label="URL Εικόνας Προφίλ"
        />
      </cdx-field>
    </div>

    <cdx-field :status="fullNameStatus" :messages="{ error: fullNameValidationMessage }">
      <template #label>
        Ονοματεπώνυμο
      </template>
      <cdx-text-input
        v-model="fullName"
        :disabled="isLoading"
        aria-label="Ονοματεπώνυμο"
        maxlength="35"
        @update:model-value="validateFullName"
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

    <cdx-field>
      <template #label>
        Email
      </template>
      <cdx-text-input
        :model-value="user ? user.email : ''"
        disabled
        aria-label="Email"
      />
    </cdx-field>

    <div class="danger-zone">
      <p class="danger-zone-label">Επικίνδυνη Ζώνη</p>
      <p>Η διαγραφή του λογαριασμού σας είναι οριστική και μη αναστρέψιμη.</p>
      <div class="danger-zone-buttons">
        <cdx-button @click="openUserPasswordResetDialog">
          Αλλαγή Κωδικού Πρόσβασης
        </cdx-button>
        <cdx-button @click="openUserMailChangeDialog">
          Αλλαγή Email
        </cdx-button>
        <cdx-button
          action="destructive"
          weight="primary"
          @click="openUserDeleteDialog"
        >
          Διαγραφή λογαριασμού
        </cdx-button>
      </div>
    </div>
  </cdx-dialog>
  <user-delete-dialog v-model="isUserDeleteDialogVisible" />
  <user-mail-change-dialog v-model="isUserMailChangeDialogVisible" />
  <user-forgot-psswd-dialog v-model="isUserPasswordResetDialogVisible" />
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import {
  CdxDialog,
  CdxField,
  CdxTextInput,
  CdxProgressBar,
  CdxIcon,
  CdxProgressIndicator,
  CdxButton
} from '@wikimedia/codex';
import {
  cdxIconSettings,
  cdxIconUserAvatar
} from '@wikimedia/codex-icons';
import { user } from '../auth';
import { supabase } from '../supabase';
import notificationService from '../notification';
import UserDeleteDialog from './UserDeleteDialog.vue';
import UserMailChangeDialog from './UserMailChange.vue';
import UserForgotPsswdDialog from './UserForgotPsswd.vue';

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
const isImageLoading = ref(false);
const urlInput = ref(null);
const isUserDeleteDialogVisible = ref(false);
const isUserMailChangeDialogVisible = ref(false);
const isUserPasswordResetDialogVisible = ref(false);

const fullNameStatus = ref('default');
const fullNameValidationMessage = ref('');


function validateFullName() {
  if (!fullName.value) {
    fullNameStatus.value = 'error';
    fullNameValidationMessage.value = 'Το ονοματεπώνυμο δεν μπορεί να είναι κενό.';
    return false;
  }

  if (fullName.value.length > 35) {
    fullNameStatus.value = 'error';
    fullNameValidationMessage.value = 'Το όνομα δεν πρέπει να υπερβαίνει τους 35 χαρακτήρες.';
    return false;
  }
  
  const nameRegex = /^[A-Za-zΑ-Ωα-ωίϊΐόάέύϋΰήώ\s_-]+$/;
  if (!nameRegex.test(fullName.value)) {
    fullNameStatus.value = 'error';
    fullNameValidationMessage.value = 'Επιτρέπονται μόνο ελληνικοί/αγγλικοί χαρακτήρες, παύλες και κενά.';
    return false;
  }
  
  fullNameStatus.value = 'default';
  fullNameValidationMessage.value = '';
  return true;
}

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

watch(avatarUrl, (newUrl) => {
  if (newUrl) {
    isImageLoading.value = true;
    imageError.value = false;

    const img = new Image();
    img.onload = () => {
      isImageLoading.value = false;
      imageError.value = false;
    };
    img.onerror = () => {
      isImageLoading.value = false;
      imageError.value = true;
    };
    img.src = newUrl;

  } else {
    isImageLoading.value = false;
    imageError.value = false;
  }
});

watch(() => props.modelValue, async (isOpen) => {
  if (isOpen) {
    error.value = '';
    imageError.value = false;
    isImageLoading.value = false;
    fullNameStatus.value = 'default';
    fullNameValidationMessage.value = '';
    
    if (user.value) {
      await fetchProfile();
    }

    await nextTick();

    const inputElement = urlInput.value?.$el.querySelector('input');
    if (inputElement) {
      inputElement.focus();
    }
  }
}, { immediate: true });

async function onSave() {
  if (!validateFullName()) {
      return;
  }
  isLoading.value = true;
  error.value = '';

  try {
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ 
        full_name: fullName.value,
        avatar_url: avatarUrl.value && !imageError.value ? avatarUrl.value : ''
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

function onClose() {
  if (!isLoading.value) {
    emit('update:modelValue', false);
  }
}

function openUserDeleteDialog() {
  isUserDeleteDialogVisible.value = true;
}

function openUserMailChangeDialog() {
  isUserMailChangeDialogVisible.value = true;
}

function openUserPasswordResetDialog() {
  isUserPasswordResetDialogVisible.value = true;
}
</script>

<style scoped>
.image-url-field {
  display: flex;
  align-items: flex-start;
  column-gap: 20px;
  margin-bottom: 20px;
}

.avatar-preview {
  width: 82px;
  height: 82px;
  flex-shrink: 0;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #c8ccd1;
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

.url-input-field {
  flex-grow: 1;
}

.danger-zone {
  margin-top: 24px;
  padding-top: 8px;
  border-top: 1px solid #c8ccd1;
}

.danger-zone-label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #d33;
}

.danger-zone-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

@media (max-width: 600px) {
  .image-url-field {
    flex-direction: column;
  }
}
</style>