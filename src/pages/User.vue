<template>
  <!-- v-if is important because the prop can be null/undefined initially -->
  <div v-if="user">
    <div class="blue-banner">
      <Container>
        <div class="user-details">
          <h1>{{ user.username }}</h1>
          <p>Ρόλος: {{ user.role }}</p>
          <p>Μέλος από: {{ new Date(user.created_at).toLocaleDateString() }}</p>
        </div>
      </Container>
    </div>
    <!-- Only show the posts section if the user is not a subscriber -->
    <Container class="posts-section" v-if="user.role !== 'subscriber'">
      <h2 v-if="postsLoaded">Αναρτίσεις από {{ user.username }}</h2>
      <Posts :username="user.username" @loaded="handlePostsLoaded" />
    </Container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Container from '../components/Container.vue';
import Posts from '../components/Posts.vue';
import loadingService from '../loading.js';

interface User {
  user_id: number;
  username: string;
  role: string;
  created_at: string; // ISO date string
}

// Reverted to accept 'user' as a prop from the router
defineProps<{ user: User }>();

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
}

.user-details p {
  color: #ccc;
  font-size: 1.0rem;
  margin: 5px 0;
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
