<template>
  <SEOMeta />
  <Container>
    <div class="forbidden-page">
      <h1 class="code">403</h1>
      <h2>Απαγορευμένη Πρόσβαση</h2>
      <p>Δεν έχετε τα απαραίτητα δικαιώματα για να δείτε αυτή τη σελίδα.</p>
      <router-link to="/">
        <cdx-button>
          <cdx-icon :icon="cdxIconHome" />
          Επιστροφή στην αρχική σελίδα
        </cdx-button>
      </router-link>
    </div>
  </Container>
</template>

<script setup>
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconHome } from '@wikimedia/codex-icons';
import Container from '../components/Container.vue';
import SEOMeta from '../components/SEOMeta.vue';
</script>

<style scoped>
.forbidden-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px); /* Adjust height to be less than full viewport */
  text-align: center;
}

.code {
  font-size: 6rem;
  font-weight: bold;
  color: #d33; /* A reddish color for emphasis */
}

h2 {
  margin-top: 0;
}
</style>
