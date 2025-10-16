<template>
  <cdx-dialog
    v-if="!isConfirmingDeletion && !isEnteringCode"
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

    <div class="delete-section">
      <p>Η διαγραφή του λογαριασμού σας είναι οριστική και μη αναστρέψιμη.</p>
      <cdx-button
        :action-type="'destructive'"
        :disabled="isLoading"
        @click="isConfirmingDeletion = true"
      >
        Διαγραφή λογαριασμού
      </cdx-button>
    </div>
  </cdx-dialog>

  <cdx-dialog
    :open="isConfirmingDeletion"
    title="Επιβεβαίωση αποστολής email"
    :primary-action="{ label: 'Συνέχεια', actionType: 'progressive', disabled: isSendingEmail }"
    :default-action="{ label: 'Ακύρωση' }"
    @primary="onSendDeletionEmail"
    @default="onCloseConfirmDialog"
    @close="onCloseConfirmDialog"
  >
    <cdx-message v-if="emailError" type="error" inline>{{ emailError }}</cdx-message>
    <p v-else>Θα σταλεί ένα email στο <strong>{{ user.email }}</strong> για επιβεβαίωση. Είστε σίγουρος ότι θέλετε να συνεχίσετε;</p>
    <cdx-progress-bar v-if="isSendingEmail" inline />
  </cdx-dialog>

  <cdx-dialog
    :open="isEnteringCode"
    title="Εισαγωγή κωδικού"
    :primary-action="{ label: 'Διαγραφή', actionType: 'destructive', disabled: isDeleting || !otpCode }"
    :default-action="{ label: 'Ακύρωση' }"
    @primary="onDeleteAccount"
    @default="onCloseEnterCodeDialog"
    @close="onCloseEnterCodeDialog"
  >
    <cdx-message v-if="deleteError" type="error" inline>{{ deleteError }}</cdx-message>
    <p>Παρακαλώ εισάγετε τον κωδικό που λάβατε στο email σας για να ολοκληρώσετε τη διαγραφή του λογαριασμού σας.</p>
    <cdx-field>
      <template #label>Κωδικός</template>
      <cdx-text-input v-model="otpCode" :disabled="isDeleting" />
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
  CdxIcon,
  CdxProgressIndicator
} from '@wikimedia/codex';
import {
  cdxIconSettings,
  cdxIconAlert,
  cdxIconUserAvatar
} from '@wikimedia/codex-icons';
import { user, signOut, sendOtp } from '../auth';
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
const isImageLoading = ref(false);

const fullNameStatus = ref('default');
const fullNameValidationMessage = ref('');

const isConfirmingDeletion = ref(false);
const isEnteringCode = ref(false);
const isSendingEmail = ref(false);
const isDeleting = ref(false);
const otpCode = ref('');
const emailError = ref('');
const deleteError = ref('');

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

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    error.value = '';
    isConfirmingDeletion.value = false;
    isEnteringCode.value = false;
    otpCode.value = '';
    emailError.value = '';
    deleteError.value = '';
    imageError.value = false;
    isImageLoading.value = false;
    fullNameStatus.value = 'default';
    fullNameValidationMessage.value = '';
    
    if (user.value) {
        fetchProfile();
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

function onCloseConfirmDialog() {
  isConfirmingDeletion.value = false;
  emailError.value = '';
}

function onCloseEnterCodeDialog() {
  isEnteringCode.value = false;
  deleteError.value = '';
  otpCode.value = '';
}

async function onSendDeletionEmail() {
  isSendingEmail.value = true;
  emailError.value = '';
  try {
    await sendOtp();
    isConfirmingDeletion.value = false;
    isEnteringCode.value = true;
  } catch (error) {
    emailError.value = error.message;
  } finally {
    isSendingEmail.value = false;
  }
}

async function onDeleteAccount() {
  isDeleting.value = true;
  deleteError.value = '';

  try {
    const { error: functionError } = await supabase.functions.invoke('delete-user', {
      body: { otp: otpCode.value },
    });

    if (functionError) {
      throw new Error('Η διαγραφή απέτυχε. Ελέγξτε τον κωδικό σας ή δοκιμάστε ξανά.');
    }

    await signOut();
    onCloseEnterCodeDialog();
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

@media (max-width: 600px) {
  .image-url-field {
    flex-direction: column;
  }
}
</style>
