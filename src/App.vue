<template>
  <div id="app-container">
    <div class="notification-container">
      <Notification
        v-for="notification in notificationService.state.notifications"
        :key="notification.id"
        :notification="notification"
      />
    </div>
    <Navbar/>
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Notification from './components/Notification.vue';
import notificationService from './notification';
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  width: 100%;
  max-width: 400px;
}
</style>
