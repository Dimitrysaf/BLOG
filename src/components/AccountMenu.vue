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

    <login-dialog v-model="isLoginDialogVisible" />

    <sign-in-dialog v-model="isSignInDialogVisible" />

    <settings-dialog v-model="isSettingsDialogVisible" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  CdxMenuButton,
  CdxIcon,
} from '@wikimedia/codex';
import {
  cdxIconUserAvatar,
  cdxIconLogIn,
  cdxIconLogOut,
  cdxIconUserAdd,
  cdxIconUserAvatarOutline,
  cdxIconSettings,
} from '@wikimedia/codex-icons';
import LoginDialog from './LoginDialog.vue';
import SignInDialog from './SignInDialog.vue';
import SettingsDialog from './SettingsDialog.vue';
import auth from '../auth';

const selection = ref(null);
const isLoginDialogVisible = ref(false);
const isSignInDialogVisible = ref(false);
const isSettingsDialogVisible = ref(false);

const loggedInMenuItems = computed(() => [
  {
    label: auth.state.user ? auth.state.user.username : 'Λογαριασμός',
    items: [
      {
        label: 'Ο λογαριασμός μου',
        value: 'account',
        icon: cdxIconUserAvatarOutline
      },
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
    ],
  },
]);

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
  return auth.state.isLoggedIn ? loggedInMenuItems.value : notLoggedInMenuItems;
});

function login() {
  isLoginDialogVisible.value = true;
}

function signup() {
  isSignInDialogVisible.value = true;
}

async function logout() {
  try {
    await fetch('/api/sessionLogout', { method: 'POST' });
  } catch (e) {
    console.error('Logout request failed', e);
  }
  await auth.setLoggedOut();
  // Force a reload on logout to clear all state
  window.location.reload();
}

function onSelect(newSelection) {
  switch (newSelection) {
    case 'login':
      login();
      break;
    case 'logout':
      logout();
      break;
    case 'signup':
      signup();
      break;
    case 'account':
      if (auth.state.user && auth.state.user.username) {
        // Use window.location.href to force a full page reload
        window.location.href = `/u/${auth.state.user.username}`;
      }
      break;
    case 'settings':
      isSettingsDialogVisible.value = true;
      break;
    default:
      break;
  }

  selection.value = null;
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
