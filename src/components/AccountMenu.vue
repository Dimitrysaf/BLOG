<template>
  <div class="account-menu-wrapper">
    <cdx-menu-button
      v-model:selected="selection"
      :menu-items="currentMenuItems"
      :footer="footer"
      aria-label="Account menu"
      :menu-config="{ renderInPlace: true }"
      @update:selected="onSelect"
    >
      <cdx-icon :icon="cdxIconUserAvatar" />
    </cdx-menu-button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { CdxMenuButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconUserAvatar, cdxIconLogIn, cdxIconLogOut, cdxIconUserAdd, cdxIconSettings, cdxIconUserAvatarOutline, cdxIconMoon, cdxIconHelp } from '@wikimedia/codex-icons';

const props = defineProps( {
  isLoggedIn: {
    type: Boolean,
    default: false
  }
} );

const selection = ref( null );

/* MENU */

const loggedInMenuItems = [
  {
    label: 'Account',
    items: [
      { label: 'My account', value: 'account', icon: cdxIconUserAvatarOutline },
      { label: 'Settings', value: 'settings', icon: cdxIconSettings },
      { label: 'Log out', value: 'logout', icon: cdxIconLogOut, action: 'destructive' },
    ]
  },
  {
    label: 'Appearance',
    items: [
      { label: 'Switch theme', value: 'theme', icon: cdxIconMoon }
    ]
  }
];

const notLoggedInMenuItems = [
  {
    label: 'Account',
    items: [
      { label: 'Log in', value: 'login', icon: cdxIconLogIn },
      { label: 'Sign up', value: 'signup', icon: cdxIconUserAdd },
    ]
  },
  {
    label: 'Appearance',
    items: [
      { label: 'Switch theme', value: 'theme', icon: cdxIconMoon }
    ]
  }
];

const currentMenuItems = computed( () => {
  return props.isLoggedIn ? loggedInMenuItems : notLoggedInMenuItems;
} );

const footer = {
  label: 'Help',
  value: 'help',
  icon: cdxIconHelp
};

/* FUNCTIONS */

function login() {
  console.log('Triggered login action');
}

function logout() {
  console.log('Triggered logout action');
}

function signup() {
  console.log('Triggered signup action');
}

function switchTheme() {
  console.log('Triggered switch theme action');
}

function openSettings() {
  console.log('Triggered open settings action');
}

function viewAccount() {
  console.log('Triggered view account action');
}

function getHelp() {
  console.log('Triggered get help action');
}

function onSelect( newSelection ) {
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
    case 'theme':
      switchTheme();
      break;
    case 'settings':
      openSettings();
      break;
    case 'account':
      viewAccount();
      break;
    case 'help':
      getHelp();
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
