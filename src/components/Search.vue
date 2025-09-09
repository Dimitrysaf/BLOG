<template>
  <div>
    <cdx-button weight="quiet" @click="open = true">
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

      <ul v-if="searchResults.length > 0" class="search-results">
        <li v-for="result in searchResults" :key="result.value" class="search-result-item">
            <a :href="result.url" target="_blank" rel="noopener noreferrer">
              <span class="search-result-label">{{ result.label }}</span>
              <span v-if="result.description" class="search-result-description">{{ result.description }}</span>
            </a>
        </li>
      </ul>

      <div v-else-if="hasSearched" class="search-status">
        Κανένα αποτέλεσμα για "{{ currentSearchTerm }}"
      </div>

      <div v-else class="recommended-searches">
        <p>Προτινόμενα:</p>
        <Card
          v-for="recommendation in recommended"
          :key="recommendation.label"
          :icon="recommendation.icon"
          :url="'javascript:void(0);'"
          @click="search(recommendation.label)"
        >
          <template #title>{{ recommendation.label }}</template>
          <template #description>{{ recommendation.description }}</template>
        </Card>
      </div>
    </cdx-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import {
  CdxButton,
  CdxDialog,
  CdxIcon,
  CdxSearchInput
} from '@wikimedia/codex';
import {
  cdxIconSearch,
  cdxIconBook,
  cdxIconCode,
  cdxIconArticle,
  cdxIconInfoFilled
} from '@wikimedia/codex-icons';
import { useLocalSearch } from '../composables/useLocalSearch.js';
import Card from './Card.vue';

const open = ref(false);
const recommended = [
  {
    label: '1',
    icon: cdxIconBook,
    description: '1'
  },
  {
    label: '2',
    icon: cdxIconCode,
    description: '2'
  },
  {
    label: '3',
    icon: cdxIconArticle,
    description: '3'
  },
  {
    label: '4',
    icon: cdxIconInfoFilled,
    description: '4'
  }
];

const currentSearchTerm = ref('');
const { searchResults, hasSearched } = useLocalSearch(currentSearchTerm);

watch(open, (isOpen) => {
  if (!isOpen) {
    // Reset state when dialog closes
    currentSearchTerm.value = '';
  }
});

const search = (searchTerm) => {
  currentSearchTerm.value = searchTerm;
};

</script>

<style scoped>
.recommended-searches {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.recommended-searches p {
    grid-column: 1 / -1; /* Span full width */
    margin: 0 0 8px 0;
}

.search-status {
  padding: 24px;
  text-align: center;
  color: #54595d;
}

.search-results {
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
}

.search-result-item a {
  display: block;
  padding: 12px 24px;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
}

.search-result-item a:hover {
  background-color: #f0f0f0;
}

.search-result-label {
  font-weight: bold;
  display: block;
}

.search-result-description {
  font-size: 0.9em;
  color: #54595d;
}

@media screen and (max-width: 600px) {
  .recommended-searches {
    grid-template-columns: 1fr;
  }
}
</style>
