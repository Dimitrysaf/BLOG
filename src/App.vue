<script setup>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';
import { CdxTypeaheadSearch } from '@wikimedia/codex';

const searchResults = ref([]);
const onInput = (value) => {
  if (value) {
    // Mock search results
    searchResults.value = [
      { label: `${value} result 1`, value: 1 },
      { label: `${value} result 2`, value: 2 },
      { label: `${value} result 3`, value: 3 },
    ];
  } else {
    searchResults.value = [];
  }
};
</script>

<template>
  <Navbar />
</template>

<style scoped>
.main-content {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
