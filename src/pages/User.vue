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
          <span>{{ new Date(user.created_at).toLocaleDateString() }}</span>
        </span>
      </div>
    </div>
    <!-- Only show the posts section if the user is not a subscriber -->
    <Container class="posts-section" v-if="user.role !== 'subscriber'">
      <h2 v-if="postsLoaded">Αναρτίσεις από {{ user.username }}</h2>
      <Posts :username="user.username" @loaded="handlePostsLoaded" />
    </Container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { CdxIcon } from '@wikimedia/codex';
import { cdxIconUserAvatarOutline, cdxIconCalendar } from '@wikimedia/codex-icons';
import Container from '../components/Container.vue';
import Posts from '../components/Posts.vue';
import loadingService from '../loading.js';

interface User {
  user_id: number;
  username: string;
  role: string;
  created_at: string; // ISO date string
}

const props = defineProps<{ user: User }>();

const translatedRole = computed(() => {
  if (!props.user) return '';
  const roles: { [key: string]: string } = {
    admin: 'Διαχειριστής',
    subscriber: 'Συνδρομιτής',
    author: 'Συγγραφέας'
  };
  return roles[props.user.role] || props.user.role;
});

const postsLoaded = ref(false);

function handlePostsLoaded() {
  postsLoaded.value = true;
  // The main page loader is controlled by the router guard, but we can
  // ensure it's hidden when posts are done.
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

.posts-section {
  padding-top: 24px;
  padding-bottom: 24px;
}

.posts-section h2 {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #54595d;
}

.posts-section h2::before,
.posts-section h2::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #c8ccd1;
}

.posts-section h2:not(:empty)::before {
  margin-right: 1em;
}

.posts-section h2:not(:empty)::after {
  margin-left: 1em;
}
</style>
