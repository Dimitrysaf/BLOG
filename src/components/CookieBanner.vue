<template>
  <div v-if="isVisible" class="cookie-banner-container">
    <CdxMessage type="notice" :icon="null" class="cookie-banner">
      <div class="banner-content">
        <div class="banner-text-content">
          <p><strong>Χρησιμοποιούμε cookies για τη βελτίωση της ιστοσελίδας.</strong></p>
          <p>
            Αυτός ο ιστότοπος χρησιμοποιεί cookies για τη βασική λειτουργικότητα. Εάν δημιουργήσετε λογαριασμό, θα συλλεχθούν πρόσθετες πληροφορίες που εσείς παρέχετε. Πατώντας "ΟΚ", αποδέχεστε τη συλλογή τους.
            <a href="#">Μάθετε περισσότερα</a>.
          </p>
        </div>
        <CdxButton 
          weight="primary" 
          action="progressive"
          class="accept-button"
          @click="acceptCookies"
        >
          ΟΚ
        </CdxButton>
      </div>
    </CdxMessage>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CdxMessage, CdxButton } from '@wikimedia/codex';

const isVisible = ref(false);
const CONSENT_KEY = 'cookie_consent_acknowledged';

// When the user clicks "OK"
function acceptCookies() {
  try {
    localStorage.setItem(CONSENT_KEY, 'true');
    isVisible.value = false;
  } catch (e) {
    console.error('Could not save cookie consent to localStorage:', e);
    // Hide banner anyway for this session
    isVisible.value = false;
  }
}

// When the component is first added to the page
onMounted(() => {
  try {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent !== 'true') {
      // Show the banner only if consent has not been given
      isVisible.value = true;
    }
  } catch (e) {
    console.error('Could not read cookie consent from localStorage:', e);
    // If localStorage is unavailable, show the banner as a fallback
    isVisible.value = true;
  }
});
</script>

<style scoped>
.cookie-banner-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Ensure it's above other content */
  padding: 16px;
}

.cookie-banner {
  max-width: 1200px;
  margin: 0 auto;
}

.banner-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.banner-text-content p {
  margin: 0;
}
.banner-text-content p:first-child {
  margin-bottom: 8px; /* Space between the two paragraphs */
}
.banner-text-content a {
  color: inherit;
  text-decoration: underline;
}

.accept-button {
  width: 100%;
}

@media (min-width: 720px) {
  .banner-content {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .accept-button {
    width: auto; /* On larger screens, button is not full-width */
  }
}
</style>
