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
  
      <!-- The dialogs are now controlled by the centralized auth state -->
      <login-dialog />
      <sign-in-dialog />
      <user-forgot-psswd />
  
      <settings-dialog v-model="isSettingsDialogVisible" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    CdxMenuButton,
    CdxIcon,
  } from '@wikimedia/codex';
  import {
    cdxIconUserAvatar,
    cdxIconLogIn,
    cdxIconLogOut,
    cdxIconUserAdd,
    cdxIconSettings,
  } from '@wikimedia/codex-icons';
  import LoginDialog from './LoginDialog.vue';
  import SignInDialog from './SignInDialog.vue';
  import UserForgotPsswd from './UserForgotPsswd.vue';
  import SettingsDialog from './SettingsDialog.vue';
  import { user, session, signOut, openAuthDialog, openRegisterDialog } from '../auth';
  
  const router = useRouter();
  const selection = ref(null);
  const isSettingsDialogVisible = ref(false);
  
  const loggedInMenuItems = computed(() => [
    {
      label: user.value?.user_metadata?.username || 'Λογαριασμός',
      items: [
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
    return session.value ? loggedInMenuItems.value : notLoggedInMenuItems;
  });
  
  async function handleLogout() {
    await signOut();
    router.push('/');
  }
  
  function onSelect(newSelection) {
    switch (newSelection) {
      case 'login':
        openAuthDialog();
        break;
      case 'logout':
        handleLogout();
        break;
      case 'signup':
        openRegisterDialog();
        break;
      case 'settings':
        isSettingsDialogVisible.value = true;
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