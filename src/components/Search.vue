<template>
  <div>
    <cdx-button weight="quiet" @click="open = true">
      <cdx-icon :icon="cdxIconSearch"></cdx-icon>
    </cdx-button>

    <cdx-dialog
        v-model:open="open"
        title="Search"
        :use-close-button="true"
    >
      <cdx-search-input
          v-model="currentSearchTerm"
          aria-label="Search Wikidata"
          placeholder="Search Wikidata"
      />

      <div v-if="loading" class="search-status">Loading search results...</div>

      <ul v-else-if="searchResults.length > 0" class="search-results">
        <li v-for="result in searchResults" :key="result.value" class="search-result-item">
            <a :href="result.url" target="_blank" rel="noopener noreferrer">
              <span class="search-result-label">{{ result.label }}</span>
              <span v-if="result.description" class="search-result-description">{{ result.description }}</span>
            </a>
        </li>
      </ul>

      <div v-else-if="hasSearched && !loading" class="search-status">
        No results found for "{{ currentSearchTerm }}"
      </div>

      <div v-else class="recommended-searches">
        <p>Try searching for:</p>
        <cdx-button
          v-for="recommendation in recommended"
          :key="recommendation"
          @click="search(recommendation)"
        >
          {{ recommendation }}
        </cdx-button>
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
import { cdxIconSearch } from '@wikimedia/codex-icons';

const open = ref(false);
const recommended = ['Vue 3', 'Composition API', 'Vite', 'Pinia'];

const searchResults = ref([]);
const currentSearchTerm = ref('');
const loading = ref(false);
const hasSearched = ref(false);
let debounceTimer = null;

watch(currentSearchTerm, (newVal) => {
  clearTimeout(debounceTimer);

  if (!newVal.trim()) {
    searchResults.value = [];
    hasSearched.value = false;
    loading.value = false;
    return;
  }

  loading.value = true;
  hasSearched.value = true;

  debounceTimer = setTimeout(() => {
    fetchResults(newVal);
  }, 300);
});

watch(open, (isOpen) => {
  if (!isOpen) {
    // Reset state when dialog closes
    currentSearchTerm.value = '';
    searchResults.value = [];
    hasSearched.value = false;
    loading.value = false;
  }
});

function fetchResults(searchTerm) {
  const params = new URLSearchParams({
    origin: '*',
    action: 'wbsearchentities',
    format: 'json',
    limit: '20',
    props: 'url|description',
    language: 'en',
    uselang: 'en',
    type: 'item',
    search: searchTerm
  });
  fetch(`https://www.wikidata.org/w/api.php?${params.toString()}`)
    .then((response) => response.json())
    .then((data) => {
      searchResults.value = data.search && data.search.length > 0 ?
        adaptApiResponse(data.search) :
        [];
    }).catch(() => {
      searchResults.value = [];
    }).finally(() => {
      loading.value = false;
    });
}

function adaptApiResponse(pages) {
  return pages.map(({ id, label, url, description }) => ({
    value: id,
    label,
    description,
    url,
  }));
}

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
