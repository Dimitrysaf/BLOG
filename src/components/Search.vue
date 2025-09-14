<template>
  <div>
    <cdx-button weight="quiet" @click="open = true" aria-label="Αναζήτηση">
      <cdx-icon :icon="cdxIconSearch"></cdx-icon>
    </cdx-button>

    <cdx-dialog
        v-model:open="open"
        title="Αναζήτηση"
        :use-close-button="true"
    >
      <cdx-search-input
          v-model="currentSearchTerm"
          aria-label="Αναζήτηση..."
          placeholder="Αναζήτηση..."
          @update:model-value="debouncedSearch"
      />
    </cdx-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import {
  CdxButton,
  CdxDialog,
  CdxIcon,
  CdxSearchInput
} from '@wikimedia/codex';
import { cdxIconSearch } from '@wikimedia/codex-icons';
import loadingService from '../loading';

const open = ref(false);
const currentSearchTerm = ref('');
const router = useRouter();

// Debounce helpers
let debounceTimer: number;
const DEBOUNCE_DELAY = 500; // ms

async function performSearch() {
  if (!currentSearchTerm.value.trim()) {
    return;
  }

  loadingService.show();
  open.value = false; // Close the dialog immediately

  // Simulate an API call
  await new Promise(resolve => setTimeout(resolve, 750));

  try {
    await router.push({ path: '/search', query: { q: currentSearchTerm.value } });
  } finally {
    loadingService.hide();
  }
}

function debouncedSearch() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    performSearch();
  }, DEBOUNCE_DELAY);
}

watch(open, (isOpen) => {
  if (!isOpen) {
    currentSearchTerm.value = '';
    clearTimeout(debounceTimer);
  }
});
</script>

<style scoped>
/* Styles removed for clarity as they were related to deleted elements. */
</style>
