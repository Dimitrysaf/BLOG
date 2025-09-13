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
      />
    </cdx-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  CdxButton,
  CdxDialog,
  CdxIcon,
  CdxSearchInput
} from '@wikimedia/codex';
import { cdxIconSearch } from '@wikimedia/codex-icons';

const open = ref(false);
const currentSearchTerm = ref('');

watch(open, (isOpen) => {
  if (!isOpen) {
    currentSearchTerm.value = '';
  }
});
</script>

<style scoped>
/* Styles removed for clarity as they were related to deleted elements. */
</style>
