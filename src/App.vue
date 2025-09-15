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
    <div class="main-content">
      <!-- By adding the key, we tell Vue to re-create the component when the route changes -->
      <router-view :key="$route.fullPath" />
    </div>
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
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

.notification-container {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  width: 100%;
  max-width: 400px;
}
</style>
