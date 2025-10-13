<template>
  <cdx-dialog
    :open="modelValue"
    title="Ολοκληρώστε το προφίλ σας"
    subtitle="Πείτε μας το όνομά σας για μια πιο προσωπική εμπειρία."
    :primary-action="{ label: 'Αποθήκευση', actionType: 'progressive', disabled: isLoading }"
    :default-action="{ label: 'Παράλειψη' }"
    @primary="onSave"
    @default="onSkip"
    @close="onSkip" 
  >
    <cdx-progress-bar v-if="isLoading" inline />
    <cdx-field 
      :status="fullNameStatus"
      :messages="{ error: fullNameError }"
    >
      <template #label>Ονοματεπώνυμο</template>
      <cdx-text-input 
        v-model="fullName"
        :disabled="isLoading"
        maxlength="35"
        @update:model-value="validateFullName"
      />
    </cdx-field>
    <p class="skip-info">Μπορείτε να παραλείψετε αυτό το βήμα. Θα σας δοθεί ένα τυχαίο όνομα, το οποίο μπορείτε να αλλάξετε αργότερα από τις ρυθμίσεις.</p>
  </cdx-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { CdxDialog, CdxField, CdxTextInput, CdxProgressBar } from '@wikimedia/codex';
import { supabase } from '../supabase';
import { user } from '../auth';
import notificationService from '../notification';

const props = defineProps({ modelValue: Boolean });
const emit = defineEmits(['update:modelValue', 'profile-completed']);

const isLoading = ref(false);
const fullName = ref('');
const fullNameStatus = ref('default');
const fullNameError = ref('');

function validateFullName() {
  if (!fullName.value || fullName.value.trim().length === 0) {
    fullNameStatus.value = 'error';
    fullNameError.value = 'Το ονοματεπώνυμο δεν μπορεί να είναι κενό.';
    return false;
  }

  if (fullName.value.length > 35) {
    fullNameStatus.value = 'error';
    fullNameError.value = 'Το ονοματεπώνυμο δεν πρέπει να υπερβαίνει τους 35 χαρακτήρες.';
    return false;
  }

  const nameRegex = /^[A-Za-zΑ-Ωα-ωίϊΐόάέύϋΰήώ\s_-]+$/;
  if (!nameRegex.test(fullName.value)) {
    fullNameStatus.value = 'error';
    fullNameError.value = 'Επιτρέπονται μόνο ελληνικοί/αγγλικοί χαρακτήρες, παύλες και κενά.';
    return false;
  }

  fullNameStatus.value = 'default';
  fullNameError.value = '';
  return true;
}

async function updateProfile(name) {
  if (!user.value) return;
  isLoading.value = true;

  try {
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: name })
      .eq('id', user.value.id);

    if (error) throw error;

    if (user.value && user.value.user_metadata) {
      user.value.user_metadata.full_name = name;
    }
    
    notificationService.push('Το προφίλ σας ενημερώθηκε!', 'success');
    emit('profile-completed');
    emit('update:modelValue', false);
  } catch (err) {
    notificationService.push(`Αποτυχία ενημέρωσης: ${err.message}`, 'error');
  } finally {
    isLoading.value = false;
  }
}

function onSave() {
  if (validateFullName()) {
    updateProfile(fullName.value.trim());
  }
}

function onSkip() {
  if (isLoading.value) return;
  const randomId = Math.floor(Math.random() * 100000);
  const randomName = `user-${randomId}`;
  updateProfile(randomName);
}
</script>

<style scoped>
.skip-info {
  font-size: 0.8em;
  color: #54595d;
  margin-top: 16px;
}
</style>
