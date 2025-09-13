<template>
  <div class="account-menu-wrapper">
    <cdx-menu-button
      v-model:selected="selection"
      :menu-items="currentMenuItems"
      aria-label="Account menu"
      :menu-config="{ renderInPlace: true }"
      @update:selected="onSelect"
    >
      <cdx-icon :icon="cdxIconUserAvatar" />
    </cdx-menu-button>

    <login-dialog
      v-model="isLoginDialogVisible"
      @login="handleLogin"
    />

    <sign-in-dialog
      v-model="isSignInDialogVisible"
      @signin="handleSignIn"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  CdxMenuButton,
  CdxIcon,
} from '@wikimedia/codex';
import { cdxIconUserAvatar, cdxIconLogIn, cdxIconLogOut, cdxIconUserAdd, cdxIconSettings, cdxIconUserAvatarOutline, cdxIconMoon, cdxIconHelp } from '@wikimedia/codex-icons';
import LoginDialog from './LoginDialog.vue';
import SignInDialog from './SignInDialog.vue';

const props = defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
});

const selection = ref(null);
const isLoginDialogVisible = ref(false);
const isSignInDialogVisible = ref(false);

/* MENU */

const loggedInMenuItems = [
  {
    label: 'Λογαριασμός',
    items: [
      { label: 'Ο λογαγιαριασμός μου', value: 'account', icon: cdxIconUserAvatarOutline },
      { label: 'Ρυθμίσεις', value: 'settings', icon: cdxIconSettings },
      { label: 'Αποσύνδεση', value: 'logout', icon: cdxIconLogOut, action: 'destructive' },
    ],
  },
];

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
  return props.isLoggedIn ? loggedInMenuItems : notLoggedInMenuItems;
});

/* FUNCTIONS */

function login() {
  isLoginDialogVisible.value = true;
}

function signup() {
  isSignInDialogVisible.value = true;
}

function logout() {
  console.log('Triggered logout action');
}

function openSettings() {
  console.log('Triggered open settings action');
}

function viewAccount() {
  console.log('Triggered view account action');
}

function handleLogin(credentials) {
  console.log('Handling login with credentials:', credentials);
}

function handleSignIn(credentials) {
  console.log('Handling sign in with credentials:', credentials);
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
    case 'settings':
      openSettings();
      break;
    case 'account':
      viewAccount();
      break;
    default:
      console.log(`Unknown selection: ${newSelection}`);
  }

  // Reset selection to allow the same item to be selected again
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
