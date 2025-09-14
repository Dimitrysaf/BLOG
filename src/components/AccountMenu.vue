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
} from '@wikimedia/codex-icons';
import LoginDialog from './LoginDialog.vue';
import SignInDialog from './SignInDialog.vue';
import auth from '../auth'; // Import the shared auth state

const selection = ref(null);
const isLoginDialogVisible = ref(false);
const isSignInDialogVisible = ref(false);

// Menu items for a logged-in user, dynamically showing the username
const loggedInMenuItems = computed(() => [
  {
    label: auth.state.user ? auth.state.user.username : 'Λογαριασμός',
    items: [
      { label: 'Ο λογαριασμός μου', value: 'account', icon: cdxIconUserAvatarOutline },
      { label: 'Αποσύνδεση', value: 'logout', icon: cdxIconLogOut, action: 'destructive' },
    ],
  },
]);

// Menu items for a logged-out user
const notLoggedInMenuItems = [
  {
    label: 'Λογαριασμός',
    items: [
      { label: 'Σύνδεση', value: 'login', icon: cdxIconLogIn },
      { label: 'Εγγραφή', value: 'signup', icon: cdxIconUserAdd },
    ],
  },
];

// Dynamically switch between menu items based on the authentication state
const currentMenuItems = computed(() => {
  return auth.state.isLoggedIn ? loggedInMenuItems.value : notLoggedInMenuItems;
});

// --- Functions to handle menu actions ---

function login() {
  isLoginDialogVisible.value = true;
}

function signup() {
  isSignInDialogVisible.value = true;
}

function logout() {
  auth.setLoggedOut();
}

function viewAccount() {
  console.log('Triggered view account action');
}

// Handles the selection of a menu item
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
      viewAccount();
      break;
    default:
      // It's good practice to handle unknown selections
      break;
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
