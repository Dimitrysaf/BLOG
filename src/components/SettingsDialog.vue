<template>
  <!-- Main Settings Dialog -->
  <cdx-dialog
    v-if="!isConfirmingDeletion && !isEnteringCode && !isChangingEmail && !isChangingPassword"
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

    <cdx-field>
      <template #label>
        Email
      </template>
      <div style="display: flex; gap: 8px; align-items: flex-start;">
        <cdx-text-input
          :model-value="user ? user.email : ''"
          disabled
          aria-label="Email"
          style="flex: 1;"
        />
        <cdx-button
          @click="isChangingEmail = true"
          :disabled="isLoading"
        >
          Αλλαγή
        </cdx-button>
      </div>
    </cdx-field>

    <div class="password-section">
      <cdx-button
        @click="isChangingPassword = true"
        :disabled="isLoading"
        weight="quiet"
      >
        Αλλαγή Κωδικού Πρόσβασης
      </cdx-button>
    </div>

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

  <!-- Email Change Dialog -->
  <cdx-dialog
    :open="isChangingEmail"
    title="Αλλαγή Email"
    :primary-action="{ label: 'Αποστολή', actionType: 'progressive', disabled: isSendingEmailChange || !newEmail }"
    :default-action="{ label: 'Ακύρωση' }"
    @primary="onSendEmailChange"
    @default="onCloseEmailChange"
    @close="onCloseEmailChange"
  >
    <cdx-message v-if="emailChangeError" type="error" inline>{{ emailChangeError }}</cdx-message>
    <cdx-message v-else-if="emailChangeSent" type="success" inline>
      Σας στείλαμε email επιβεβαίωσης στο <strong>{{ newEmail }}</strong>. 
      Παρακαλώ ελέγξτε και τα δύο emails (παλιό και νέο) για επιβεβαίωση.
    </cdx-message>
    <template v-else>
      <p>Για να αλλάξετε το email σας, θα χρειαστεί να επιβεβαιώσετε και το παλιό και το νέο email.</p>
      <cdx-field
        :status="newEmailStatus"
        :messages="{ error: newEmailValidationMessage }"
      >
        <template #label>Νέο Email</template>
        <cdx-text-input
          v-model="newEmail"
          input-type="email"
          :disabled="isSendingEmailChange"
          @update:model-value="validateNewEmail"
        />
      </cdx-field>
    </template>
    <cdx-progress-bar v-if="isSendingEmailChange" inline />
  </cdx-dialog>

  <!-- Password Change Dialog -->
  <cdx-dialog
    :open="isChangingPassword"
    title="Αλλαγή Κωδικού Πρόσβασης"
    :primary-action="{ label: 'Αλλαγή', actionType: 'progressive', disabled: isChangingPasswordInProgress }"
    :default-action="{ label: 'Ακύρωση' }"
    @primary="onChangePassword"
    @default="onClosePasswordChange"
    @close="onClosePasswordChange"
  >
    <cdx-message v-if="passwordChangeError" type="error" inline>{{ passwordChangeError }}</cdx-message>
    
    <cdx-field
      :status="currentPasswordStatus"
      :messages="{ error: 'Ο τρέχων κωδικός είναι υποχρεωτικός' }"
    >
      <template #label>Τρέχων Κωδικός</template>
      <cdx-text-input
        v-model="currentPassword"
        input-type="password"
        :disabled="isChangingPasswordInProgress"
        @update:model-value="currentPasswordStatus = 'default'"
      />
    </cdx-field>

    <cdx-field
      :status="newPasswordStatus"
      :messages="{ error: 'Ο νέος κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες' }"
    >
      <template #label>Νέος Κωδικός</template>
      <cdx-text-input
        v-model="newPassword"
        input-type="password"
        :disabled="isChangingPasswordInProgress"
        @update:model-value="validateNewPassword"
      />
    </cdx-field>

    <cdx-field
      :status="confirmNewPasswordStatus"
      :messages="{ error: 'Οι κωδικοί δεν ταιριάζουν' }"
    >
      <template #label>Επιβεβαίωση Νέου Κωδικού</template>
      <cdx-text-input
        v-model="confirmNewPassword"
        input-type="password"
        :disabled="isChangingPasswordInProgress"
        @update:model-value="validateConfirmNewPassword"
      />
    </cdx-field>

    <cdx-progress-bar v-if="isChangingPasswordInProgress" inline />
  </cdx-dialog>

  <!-- Confirmation Dialog for Account Deletion -->
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

  <!-- OTP Entry Dialog for Account Deletion -->
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
  cdxIconUserAvatar
} from '@wikimedia/codex-icons';
import { 
  user, 
  signOut, 
  sendReauthenticationOtp,
  verifyReauthenticationOtp,
  changeEmail,
  updateUserPassword,
  reauthenticateWithPassword
} from '../auth';
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

// Account Deletion State
const isConfirmingDeletion = ref(false);
const isEnteringCode = ref(false);
const isSendingEmail = ref(false);
const isDeleting = ref(false);
const otpCode = ref('');
const emailError = ref('');
const deleteError = ref('');

// Email Change State
const isChangingEmail = ref(false);
const newEmail = ref('');
const newEmailStatus = ref('default');
const newEmailValidationMessage = ref('');
const isSendingEmailChange = ref(false);
const emailChangeSent = ref(false);
const emailChangeError = ref('');

// Password Change State
const isChangingPassword = ref(false);
const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');
const currentPasswordStatus = ref('default');
const newPasswordStatus = ref('default');
const confirmNewPasswordStatus = ref('default');
const isChangingPasswordInProgress = ref(false);
const passwordChangeError = ref('');

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

function validateNewEmail() {
  const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  if (!newEmail.value || !emailRegex.test(newEmail.value)) {
    newEmailStatus.value = 'error';
    newEmailValidationMessage.value = 'Πρέπει να δώσετε μια έγκυρη διεύθυνση email.';
    return false;
  }
  if (newEmail.value === user.value?.email) {
    newEmailStatus.value = 'error';
    newEmailValidationMessage.value = 'Το νέο email είναι ίδιο με το τρέχον.';
    return false;
  }
  newEmailStatus.value = 'default';
  newEmailValidationMessage.value = '';
  return true;
}

function validateNewPassword() {
  if (newPassword.value.length < 8) {
    newPasswordStatus.value = 'error';
    return false;
  }
  newPasswordStatus.value = 'default';
  return true;
}

function validateConfirmNewPassword() {
  if (newPassword.value !== confirmNewPassword.value) {
    confirmNewPasswordStatus.value = 'error';
    return false;
  }
  confirmNewPasswordStatus.value = 'default';
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
    isChangingEmail.value = false;
    isChangingPassword.value = false;
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

// === EMAIL CHANGE HANDLERS ===
async function onSendEmailChange() {
  if (!validateNewEmail()) return;

  isSendingEmailChange.value = true;
  emailChangeError.value = '';

  try {
    await changeEmail(newEmail.value);
    emailChangeSent.value = true;
    notificationService.push('Email επιβεβαίωσης στάλθηκε!', 'success');
  } catch (error) {
    emailChangeError.value = error.message;
    console.error('Error changing email:', error);
  } finally {
    isSendingEmailChange.value = false;
  }
}

function onCloseEmailChange() {
  isChangingEmail.value = false;
  newEmail.value = '';
  newEmailStatus.value = 'default';
  emailChangeSent.value = false;
  emailChangeError.value = '';
}

// === PASSWORD CHANGE HANDLERS ===
async function onChangePassword() {
  passwordChangeError.value = '';
  
  if (!currentPassword.value) {
    currentPasswordStatus.value = 'error';
    return;
  }
  
  if (!validateNewPassword() || !validateConfirmNewPassword()) {
    return;
  }

  isChangingPasswordInProgress.value = true;

  try {
    // Βήμα 1: Reauthentication με τον τρέχοντα κωδικό
    await reauthenticateWithPassword(currentPassword.value);
    
    // Βήμα 2: Αλλαγή κωδικού
    await updateUserPassword(newPassword.value);
    
    notificationService.push('Ο κωδικός άλλαξε με επιτυχία!', 'success');
    onClosePasswordChange();
    
  } catch (error) {
    passwordChangeError.value = error.message;
    console.error('Error changing password:', error);
  } finally {
    isChangingPasswordInProgress.value = false;
  }
}

function onClosePasswordChange() {
  isChangingPassword.value = false;
  currentPassword.value = '';
  newPassword.value = '';
  confirmNewPassword.value = '';
  currentPasswordStatus.value = 'default';
  newPasswordStatus.value = 'default';
  confirmNewPasswordStatus.value = 'default';
  passwordChangeError.value = '';
}

// === ACCOUNT DELETION HANDLERS ===
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
    // Στέλνουμε OTP email για reauthentication
    await sendReauthenticationOtp();
    isConfirmingDeletion.value = false;
    isEnteringCode.value = true;
    notificationService.push('Κωδικός επιβεβαίωσης στάλθηκε στο email σας.', 'success');
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
    // Βήμα 1: Επιβεβαίωση OTP
    await verifyReauthenticationOtp(otpCode.value);
    
    // Βήμα 2: Κλήση του Edge Function για διαγραφή
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

.password-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #c8ccd1;
}

.delete-section {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #c8ccd1;
}

.delete-section p {
  margin-bottom: 8px;
}

@media (max-width: 600px) {
  .image-url-field {
    flex-direction: column;
  }
}
</style>