<template>
  <div>
    <cdx-button weight="quiet" @click="open = true" aria-label="Αναζήτηση">
      <cdx-icon :icon="cdxIconSearch"></cdx-icon>
    </cdx-button>

    <cdx-dialog
      v-model:open="open"
      title="Αναζήτηση Άρθρων"
      :use-close-button="true"
      @close="resetSearch"
    >
      <cdx-search-input
        v-model="searchTerm"
        aria-label="Αναζήτηση..."
        placeholder="Αναζήτηση..."
        @update:model-value="debouncedSearch"
      />

      <div class="results-container">
        <cdx-progress-bar v-if="isLoading" inline aria-label="Γίνεται αναζήτηση..."></cdx-progress-bar>
        
        <cdx-message v-else-if="error" type="error" inline>
          Παρουσιάστηκε σφάλμα: {{ error }}
        </cdx-message>

        <ul v-else-if="results.length > 0" class="results-list">
          <li v-for="post in results" :key="post.id">
            <a href="#" @click.prevent="navigateToPost(post.slug)" class="result-item">
              <span class="result-title">{{ post.title }}</span>
              <span class="result-date">{{ formatDate(post.created_at) }}</span>
            </a>
          </li>
        </ul>

        <cdx-message v-else-if="hasSearched && results.length === 0" type="notice" inline>
          Δεν βρέθηκαν αποτελέσματα για "{{ lastSearchedTerm }}".
        </cdx-message>
      </div>
    </cdx-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import {
  CdxButton,
  CdxDialog,
  CdxIcon,
  CdxSearchInput,
  CdxProgressBar,
  CdxMessage
} from '@wikimedia/codex';
import { cdxIconSearch } from '@wikimedia/codex-icons';
import { supabase } from '../supabase';

const open = ref(false);
const searchTerm = ref('');
const results = ref([]);
const isLoading = ref(false);
const error = ref(null);
const hasSearched = ref(false);
const lastSearchedTerm = ref('');
const router = useRouter();

let debounceTimer;
const DEBOUNCE_DELAY = 500; // ms

async function performSearch() {
  const query = searchTerm.value.trim();
  if (!query) {
    results.value = [];
    hasSearched.value = false;
    return;
  }

  isLoading.value = true;
  error.value = null;
  hasSearched.value = true;
  lastSearchedTerm.value = query;

  try {
    // Χρησιμοποιούμε plainto_tsquery για να μετατρέψουμε το κείμενο αναζήτησης σε όρους
    // που καταλαβαίνει η βάση δεδομένων για full-text search.
    const { data, error: searchError } = await supabase
      .from('posts')
      .select('id, title, slug, created_at')
      .filter('is_published', 'eq', true)
      .textSearch('title', query, {
        type: 'websearch',
        config: 'english'
      });

    if (searchError) throw searchError;

    results.value = data;
  } catch (err) {
    console.error('Search error:', err);
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}

function debouncedSearch() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(performSearch, DEBOUNCE_DELAY);
}

function navigateToPost(slug) {
  open.value = false;
  router.push({ name: 'Post', params: { slug } });
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('el-GR', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

function resetSearch() {
  searchTerm.value = '';
  results.value = [];
  isLoading.value = false;
  error.value = null;
  hasSearched.value = false;
  lastSearchedTerm.value = '';
  clearTimeout(debounceTimer);
}

watch(open, (isOpen) => {
  if (!isOpen) {
    resetSearch();
  }
});
</script>

<style scoped>
.results-container {
  margin-top: 20px;
  min-height: 100px;
  position: relative;
}

.results-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  border-radius: 2px;
  text-decoration: none;
  color: #202122;
  transition: background-color 0.2s;
}

.result-item:hover {
  background-color: #eaecf0;
}

.result-title {
  font-weight: bold;
}

.result-date {
  font-size: 0.9em;
  color: #54595d;
  flex-shrink: 0;
  margin-left: 16px;
}
</style>