<template>
  <div id="app-container">
    <SpeedInsights/>
    <div class="notification-container">
      <Notification
        v-for="notification in notificationService.state.notifications"
        :key="notification.id"
        :notification="notification"
      />
    </div>
    <Navbar/>
    <div class="main-content">
      <router-view :key="$route.fullPath" />
    </div>
    <CookieBanner />
    <Footer />
    <UserCompleteDialog 
      v-model="isCompleteProfileDialogOpen"
      @profile-completed="handleProfileCompleted"
    />
    <UserResetPsswd />
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import CookieBanner from './components/CookieBanner.vue'; // Import the new component
import Notification from './components/Notification.vue';
import UserCompleteDialog from './components/UserCompleteDialog.vue';
import UserResetPsswd from './components/UserResetPsswd.vue';
import notificationService from './notification';
import { user } from './auth';
import { isCompleteProfileDialogOpen, checkUserProfile, closeCompleteProfileDialog } from './profile';
import { SpeedInsights } from "@vercel/speed-insights/vue"

const router = useRouter();

// Watch for user changes (login/logout)
watch(user, (currentUser, previousUser) => {
  // User logs in
  if (currentUser && !previousUser) {
    checkUserProfile(currentUser);
  }
}, { immediate: true }); // immediate: true runs the watcher on component mount

onMounted(() => {
  const query = router.currentRoute.value.query;
  const hash = router.currentRoute.value.hash;

  // Final confirmation (after clicking link in new email)
  if (query['email-change-confirmed'] === 'true') {
    notificationService.push('Το email σας άλλαξε με επιτυχία.');
    const newQuery = { ...query };
    delete newQuery['email-change-confirmed'];
    router.replace({ query: newQuery, hash: '' }); // Clean URL
    return;
  }

  // Intermediate confirmation (after clicking link in old email)
  if (hash.includes('type=email_change')) {
    notificationService.push('Υπέροχα, επιβεβαιώθηκε ότι είστε εσείς! Τώρα ελέγξτε το νέο σας email και πατήστε τον σύνδεσμο για επιβεβαίωση.');
    router.replace({ hash: '' }); // Clean URL
  }
});

function handleProfileCompleted() {
  // Optionally, refresh the page or parts of it to show the new user name.
  // A simple way is to reload, but a smoother way would be to just update the necessary components.
  // router.go(0) would force a reload.
  closeCompleteProfileDialog();
}
</script>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
html {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>

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
  z-index: 9999;
  width: 100%;
  max-width: 400px;
}
</style>
