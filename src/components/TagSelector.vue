<template>
  <cdx-multiselect-lookup
    v-model:input-chips="chips"
    v-model:selected="selection"
    v-model:inputValue="currentInputValue"
    :menu-items="menuItems"
    :menu-config="menuConfig"
    :placeholder="placeholder"
    aria-label="Tag selector"
    @update:selected="onUpdateSelected"
  >
    <template #no-results>
      <span v-if="currentInputValue && !suggestionItems.length">
        No tags found.
      </span>
    </template>
  </cdx-multiselect-lookup>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { CdxMultiselectLookup } from '@wikimedia/codex';
import { supabase } from '../supabase';

const props = defineProps({
  modelValue: { 
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Add tags...',
  }
});

const emit = defineEmits(['update:modelValue']);

const allTags = ref([]);
const chips = ref([]);
const selection = ref([]);
const currentInputValue = ref('');

const menuConfig = {
  // Overwrites the default 6 item limit
  visibleItemLimit: 10 
};

/**
 * Fetch all available tags from the database when the component is mounted.
 */
onMounted(async () => {
  const { data, error } = await supabase.from('tags').select('id, name, description');
  if (error) {
    console.error('Error fetching tags:', error);
    return;
  }
  allTags.value = data;
  
  // Initialize both chips and the selection array from the prop.
  chips.value = props.modelValue.map(tag => ({ label: tag.name, value: tag.id }));
  selection.value = props.modelValue.map(tag => tag.id);
});

/**
 * Watch for external changes to modelValue and update internal state.
 */
watch(() => props.modelValue, (newValue) => {
  chips.value = newValue.map(tag => ({ label: tag.name, value: tag.id }));
  selection.value = newValue.map(tag => tag.id);
}, { deep: true });

/**
 * Filters menu items based on user input.
 */
const suggestionItems = computed(() => {
  if (!currentInputValue.value) {
    return [];
  }
  const lowerCaseInput = currentInputValue.value.toLowerCase();
  
  // Filter out already selected tags
  const selectedIds = new Set(selection.value);
  
  return allTags.value
    .filter(tag => !selectedIds.has(tag.id) && tag.name.toLowerCase().includes(lowerCaseInput));
});

/**
 * The final list of items to be displayed in the menu.
 */
const menuItems = computed(() => {
  return suggestionItems.value.map(tag => ({
    label: tag.name,
    value: tag.id,
    description: tag.description
  }));
});

/**
 * Handles the @update:selected event. This is the primary way tags are added or removed.
 * @param {Array} selectedValues An array of the selected values (tag ids).
 */
function onUpdateSelected(selectedValues) {
  const newSelectedTags = selectedValues
    .map(value => allTags.value.find(tag => tag.id === value))
    .filter(Boolean); // Filter out any undefined values

  emit('update:modelValue', newSelectedTags);
  
  // By clearing the model-bound value, the component's input field is now guaranteed to clear.
  currentInputValue.value = ''; 
}

</script>

<style scoped>
/* Scoped styles can be added here if needed */
</style>
