<template>
  <div class="account-menu-wrapper">
    <cdx-menu-button
      v-model:selected="selection"
      :menu-items="currentMenuItems"
      aria-label="Μενού λογαριασμού"
      :menu-config="{ renderInPlace: true }"
      @update:selected="onSelect"
    >
      <cdx-icon :icon="cdxIconUserAvatar" />
    </cdx-menu-button>

    <login-dialog />
    <sign-in-dialog />
    <user-forgot-psswd />
    <settings-dialog v-model="isSettingsDialogVisible" />

    <cdx-dialog
      v-model:open="isLogoutConfirmVisible"
      title="Επιβεβαίωση Αποσύνδεσης"
      primary-action-label="Αποσύνδεση"
      secondary-action-label="Ακύρωση"
      @primary="confirmLogout"
      @secondary="cancelLogout"
      :show-close-button="false"
      close-on-escape
      close-on-outside-click
    >
      <p>Είστε βέβαιοι ότι θέλετε να αποσυνδεθείτε;</p>
    </cdx-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import {
  CdxMenuButton,
  CdxIcon,
  CdxDialog
} from '@wikimedia/codex';
import {
  cdxIconUserAvatar,
  cdxIconLogIn,
  cdxIconLogOut,
  cdxIconUserAdd,
  cdxIconSettings,
  cdxIconLayout
} from '@wikimedia/codex-icons';
import LoginDialog from './LoginDialog.vue';
import SignInDialog from './SignInDialog.vue';
import UserForgotPsswd from './UserForgotPsswd.vue';
import SettingsDialog from './SettingsDialog.vue';
import { user, session, signOut, openAuthDialog, openRegisterDialog } from '../auth';
import { supabase } from '../supabase';

const router = useRouter();
const selection = ref(null);
const isSettingsDialogVisible = ref(false);
const isLogoutConfirmVisible = ref(false);
const userRole = ref(null);

watch(user, async (currentUser) => {
  if (currentUser) {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', currentUser.id)
      .single();
    userRole.value = error ? null : data.role;
  } else {
    userRole.value = null;
  }
}, { immediate: true });

const loggedInMenuItems = computed(() => {
  const items = [
    {
      label: 'Ρυθμίσεις',
      value: 'settings',
      icon: cdxIconSettings
    },
    {
      label: 'Αποσύνδεση',
      value: 'logout',
      icon: cdxIconLogOut,
      action: 'destructive'
    },
  ];

  if (userRole.value === 'admin') {
    items.unshift({
      label: 'Διαχείριση',
      value: 'admin',
      icon: cdxIconLayout
    });
  }

  return [{
    label: user.value?.user_metadata?.username || 'Λογαριασμός',
    items: items
  }];
});

const notLoggedInMenuItems = [
  {
    label: 'Λογαριασμός',
    items: [
      { label: 'Σύνδεση', value: 'login', icon: cdxIconLogIn },
      { label: 'Εγγραφή', value: 'signup', icon: cdxIconUserAdd },
    ],
  },
];

const currentMenuItems = computed(() => {
  return session.value ? loggedInMenuItems.value : notLoggedInMenuItems;
});

async function handleLogout() {
  await signOut();
  router.push('/');
}

function confirmLogout() {
  handleLogout();
  isLogoutConfirmVisible.value = false;
}

function cancelLogout() {
  isLogoutConfirmVisible.value = false;
}

function onSelect(newSelection) {
  switch (newSelection) {
    case 'login':
      openAuthDialog();
      break;
    case 'logout':
      isLogoutConfirmVisible.value = true;
      break;
    case 'signup':
      openRegisterDialog();
      break;
    case 'settings':
      isSettingsDialogVisible.value = true;
      break;
    case 'admin':
      router.push('/admin');
      break;
    default:
      break;
  }
  selection.value = null; // Reset selection
}
</script>

<style scoped>
.account-menu-wrapper {
  position: relative;
}

.account-menu-wrapper :deep(.cdx-menu) {
  min-width: 250px;
  right: 0;
  left: auto;
}
</style>
