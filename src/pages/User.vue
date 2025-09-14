<template>
  <div class="blue-banner">
    <Container>
      <!-- CORRECTED: Displaying user.username, user.role, and user.created_at -->
      <div class="user-details">
        <h1>{{ user.username }}</h1>
        <p>Ρόλος: {{ user.role }}</p>
        <p>Μέλος από: {{ new Date(user.created_at).toLocaleDateString() }}</p>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from '../components/Container.vue';

interface User {
  user_id: number;
  username: string;
  role: string;
  created_at: string; // ISO date string
}

defineProps<{ user: User }>();
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
</style>
