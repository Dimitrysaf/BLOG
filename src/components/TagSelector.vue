<template>
  <cdx-chip-input
    v-model:input-chips="internalChips"
    :menu-items="suggestionItems"
    placeholder="Add tags..."
  />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { CdxChipInput } from '@wikimedia/codex';
import { supabase } from '../supabase';

const props = defineProps({
  modelValue: { // Expects an array of tag objects: [{ id, name }, ...]
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const allTags = ref([]); // Stores all available tags from the database: [{ id, name }, ...]

onMounted(async () => {
  const { data, error } = await supabase.from('tags').select('id, name');
  if (error) {
    console.error('Error fetching tags:', error);
    return;
  }
  allTags.value = data;
});

/**
 * CdxChipInput's v-model:input-chips expects an array of objects with a `value` key,
 * e.g., [{ value: 'Technology' }, { value: 'VueJS' }].
 *
 * This computed property syncs the parent's `modelValue` (which is an array of full tag objects)
 * with the format required by the CdxChipInput component.
 */
const internalChips = computed({
  // GET: Transform the array of tag objects into the format for CdxChipInput.
  get() {
    return props.modelValue.map(tag => ({ value: tag.name }));
  },
  // SET: When chips change in the input, transform them back into full tag objects and emit.
  set(newChips) {
    const newModelValue = newChips.map(chip => {
      // Find the corresponding full tag object from the list of all available tags.
      return allTags.value.find(tag => tag.name === chip.value);
    }).filter(tag => tag); // Filter out any chips that don't correspond to a known tag.

    emit('update:modelValue', newModelValue);
  }
});

/**
 * Provides suggestions to the CdxChipInput component.
 * It filters out tags that have already been selected.
 */
const suggestionItems = computed(() => {
  const selectedTagNames = new Set(props.modelValue.map(t => t.name));
  return allTags.value
    .filter(tag => !selectedTagNames.has(tag.name))
    .map(tag => ({ value: tag.name, label: tag.name })); // Format for CdxChipInput menu
});
</script>
