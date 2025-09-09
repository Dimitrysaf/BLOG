import { ref, watch } from 'vue';

// This data could eventually come from a store, a static JSON file, or another API.
const localData = [
  { value: 'vue', label: 'Vue.js', description: 'The Progressive JavaScript Framework.', url: 'https://vuejs.org/' },
  { value: 'vite', label: 'Vite', description: 'Next Generation Frontend Tooling.', url: 'https://vitejs.dev/' },
  { value: 'pinia', label: 'Pinia', description: 'The intuitive store for Vue.js.', url: 'https://pinia.vuejs.org/' },
  { value: 'vue-router', label: 'Vue Router', description: 'The official router for Vue.js.', url: 'https://router.vuejs.org/' },
  { value: 'composition-api', label: 'Composition API', description: 'A new way to write and organize Vue components.', url: 'https://vuejs.org/guide/reusability/composables.html' }
];

/**
 * A composable function for searching a local dataset.
 * @param {import('vue').Ref<string>} searchTerm - The reactive search term.
 * @returns {{searchResults: import('vue').Ref<Array>, hasSearched: import('vue').Ref<boolean>}}
 */
export function useLocalSearch(searchTerm) {
  const searchResults = ref([]);
  const hasSearched = ref(false);

  watch(searchTerm, (newVal) => {
    const term = newVal.trim().toLowerCase();

    if (!term) {
      searchResults.value = [];
      hasSearched.value = false;
      return;
    }

    hasSearched.value = true;
    searchResults.value = localData.filter(item =>
      item.label.toLowerCase().includes(term) ||
      (item.description && item.description.toLowerCase().includes(term))
    );
  });

  return { searchResults, hasSearched };
}
