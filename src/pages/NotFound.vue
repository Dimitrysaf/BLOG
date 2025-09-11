<template>
  <Container>
    <div class="not-found">
      <h1 class="code">404</h1>
      <h2>Η σελίδα δεν βρέθηκε</h2>
      <p>Κωδικός: Τετρακόσιατέσερα, σημαίνει ότι η σελίδα δεν υπάρχει ή έχει μετακινηθεί.</p>
      <router-link to="/">
        <cdx-button>
          <cdx-icon :icon="cdxIconHome" />
          Επιστροφή στην αρχική σελίδα
        </cdx-button>
      </router-link>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconHome } from '@wikimedia/codex-icons';
import Container from '../components/Container.vue';
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.code {
  background-color: #36c;
  border-bottom: 4px solid rgba(0, 0, 0, 0.096);
  flex-direction: column;
  display: flex;
  color: white;
  padding-left: 100px;
  padding-right: 100px;
  align-items: center;
  text-align: center;
  position: relative;
}

h1 {
  font-size: 5rem;
  margin: 0;
}

h2 {
  font-size: 2rem;
  margin: 0;
}

a {
  text-decoration: none;
}
</style>