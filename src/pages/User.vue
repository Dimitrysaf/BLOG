<template>
  <!-- v-if is important because the prop can be null/undefined initially -->
  <div v-if="user">
    <div class="blue-banner">
      <Container>
        <div class="user-details">
          <h1>{{ user.username }}</h1>
        </div>
      </Container>
      <div class="user-meta">
        <span class="meta-item">
          <cdx-icon :icon="cdxIconUserAvatarOutline" />
          <span>{{ translatedRole }}</span>
        </span>
        <span class="meta-item">
          <cdx-icon :icon="cdxIconCalendar" />
          <span>{{ new Date(user.created_at).toLocaleDateString('en-GB') }}</span>
        </span>
      </div>
    </div>

    <cdx-tabs v-model="activeTab" framed class="user-profile-tabs">
      <cdx-tab
        name="posts"
        label="Αναρτήσεις"
        :disabled="user.role === 'subscriber'"
      >
        <Posts :username="user.username" @loaded="handlePostsLoaded" />
      </cdx-tab>
      <cdx-tab name="comments" label="Σχόλια">
        <UserComments :username="user.username" @loaded="handleCommentsLoaded" />
      </cdx-tab>
    </cdx-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { CdxIcon, CdxTabs, CdxTab } from '@wikimedia/codex';
import { cdxIconUserAvatarOutline, cdxIconCalendar } from '@wikimedia/codex-icons';
import Container from '../components/Container.vue';
import Posts from '../components/Posts.vue';
import UserComments from '../components/UserComments.vue';
import loadingService from '../loading.js';

interface User {
  user_id: number;
  username: string;
  role: string;
  created_at: string; // ISO date string
}

const props = defineProps<{ user: User }>();

// Set the active tab based on the user's role
const activeTab = ref(props.user.role === 'subscriber' ? 'comments' : 'posts');

const translatedRole = computed(() => {
  if (!props.user) return '';
  const roles: { [key: string]: string } = {
    admin: 'Διαχειριστής',
    subscriber: 'Συνδρομιτής',
    author: 'Συγγραφέας'
  };
  return roles[props.user.role] || props.user.role;
});

// Show the loading bar when the posts tab is selected.
// The other tabs have their own internal loaders, so we can hide the main one.
watch(activeTab, (newTab) => {
  if (newTab === 'posts') {
    loadingService.show();
  } else {
    loadingService.hide();
  }
});

function handlePostsLoaded() {
  // Hide the loading bar once the posts component has finished loading.
  loadingService.hide();
}

function handleCommentsLoaded() {
  // The comments component has its own loader, but we still want to ensure
  // the main app loader is hidden, just in case.
  loadingService.hide();
}
</script>

<style scoped>
.blue-banner {
  background-color: #36c;
  border-bottom: 4px solid rgba(0, 0, 0, 0.096);
  height: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}

.user-details h1 {
  font-size: xxx-large;
  font-weight: normal;
  line-height: xxx-large;
  margin-bottom: 20px;
  font-family: 'Times New Roman', Times, serif;
  background-color: white;
  color: #36c;
  font-style: italic;
  text-decoration: underline;
  padding: 0 8px;
  word-break: break-all;
}

.user-meta {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 24px;
  color: white;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
}

.meta-item .cdx-icon {
  color: white;
}

/* The container for the tabs will stick to the banner and be full-width */
.user-profile-tabs {
  border-top: 0;
}

/* Center the tab links within the full-width header */
:deep(.user-profile-tabs .cdx-tabs__list) {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px;
}

/* Center the tab content and provide padding */
:deep(.user-profile-tabs .cdx-tabs__content) {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 16px;
}
</style>