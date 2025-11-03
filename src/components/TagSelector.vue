<template>
  <cdx-chip-input
    v-model:input-chips="internalChips"
    v-model:input-value="currentInputValue"
    :menu-items="suggestionItems"
    :placeholder="placeholder"
    :status="validation.status"
    :message="validation.message"
    @keydown.enter.prevent="handleEnter"
    @blur="handleBlur"
  />
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { CdxChipInput } from '@wikimedia/codex';
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

const emit = defineEmits(['update:modelValue', 'update:validation']);

const allTags = ref([]);
const validation = ref({ status: 'default', message: '' });
const currentInputValue = ref('');
let validationTimeout = null;

watch(validation, (newValue) => {
  emit('update:validation', newValue);
}, { deep: true });

onMounted(async () => {
  const { data, error } = await supabase.from('tags').select('id, name');
  if (error) {
    console.error('Error fetching tags:', error);
    return;
  }
  allTags.value = data;
});

const clearValidation = () => {
  if (validationTimeout) clearTimeout(validationTimeout);
  validation.value = { status: 'default', message: '' };
};

const handleBlur = () => {
    // When the user clicks away, clear the input and any validation messages.
    // This provides a way to "cancel" typing a tag without triggering an error.
    currentInputValue.value = '';
    clearValidation();
};

const handleEnter = () => {
    clearValidation();
    const chipText = currentInputValue.value.trim().toLowerCase();

    if (!chipText) {
        return; // Do nothing if the input is empty
    }

    if (props.modelValue.some(tag => tag.name.toLowerCase() === chipText)) {
        validation.value = {
            status: 'error',
            message: 'Η ετικέτα έχει ήδη προστεθεί.'
        };
        validationTimeout = setTimeout(clearValidation, 3000);
        return;
    }

    const foundTag = allTags.value.find(tag => tag.name.toLowerCase() === chipText);

    if (!foundTag) {
        validation.value = {
            status: 'error',
            message: 'Η Ετικέτα δεν βρέθηκε'
        };
        validationTimeout = setTimeout(clearValidation, 3000);
        return;
    }

    // If valid, add the tag and clear the input
    emit('update:modelValue', [...props.modelValue, foundTag]);
    currentInputValue.value = '';
};


const internalChips = computed({
  get() {
    return props.modelValue.map(tag => ({ value: tag.name }));
  },
  set(newChips) {
    // This setter handles adding from the suggestion list and removing chips.
    // It is kept separate from the manual 'Enter' key logic.
    clearValidation(); // Clear any errors when the user selects a suggestion or deletes a chip.
    const newModelValue = newChips
      .map(chip => allTags.value.find(tag => tag.name.toLowerCase() === chip.value.toLowerCase()))
      .filter(tag => tag);

    emit('update:modelValue', newModelValue);
  }
});

const suggestionItems = computed(() => {
  const selectedTagNames = new Set(props.modelValue.map(t => t.name.toLowerCase()));
  return allTags.value
    .filter(tag => !selectedTagNames.has(tag.name.toLowerCase()))
    .map(tag => ({ value: tag.name, label: tag.name }));
});
</script>