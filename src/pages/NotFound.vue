<template>
  <SEOMeta />
  <Container>
    <div class="not-found-page">
      <h1 class="code">404</h1>
      <h2>Η Σελίδα δεν Βρέθηκε</h2>
      <p>Αυτή η σελίδα δεν υπάρχει ή μπορεί να έχει μετακινηθεί.</p>
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
.not-found-page {
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
  color: #36c; /* Blue color for 404, similar to the original design */
}

h2 {
  margin-top: 0;
}
</style>
