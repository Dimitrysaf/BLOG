<template>
	<div class="author-selector">
		<cdx-text-input
			ref="input"
			v-model="inputText"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="onClick"
			@blur="onBlur"
			@keydown="onKeydown"
			placeholder="Αναζήτηση συγγραφέα..."
		/>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedAuthorId"
			v-model:expanded="expanded"
			:menu-items="filteredMenuItems"
		>
      <!--
        By default, CdxMenu renders a CdxMenuItem for each item in the menu-items
        array and passes the item object to the component with v-bind. We just
        need to make sure our menuItem objects have the right properties.
      -->
    </cdx-menu>
	</div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import {
  CdxMenu,
  CdxMenuItem,
  CdxTextInput,
  useFloatingMenu
} from '@wikimedia/codex';
import { cdxIconUserAvatar } from '@wikimedia/codex-icons';
import { supabase } from '../supabase';

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['update:modelValue']);

const input = ref();
const menu = ref();
const expanded = ref(false);
const allAuthors = ref([]);
const inputText = ref('');
const menuId = `author-selector-menu-${Math.random().toString(36).substring(7)}`;

const selectedAuthorId = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
  }
});

const activeDescendant = computed(() => {
  const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
  return highlightedItem ? highlightedItem.id : undefined;
});

useFloatingMenu(input, menu);

onMounted(async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url');
  if (error) {
    console.error('Error fetching authors:', error);
    return;
  }
  allAuthors.value = data;
  updateInputText(props.modelValue);
});

const menuItems = computed(() => {
  if (!allAuthors.value) return [];
  return allAuthors.value.map(author => ({
    value: author.id,
    label: author.full_name || 'Άγνωστος Χρήστης',
    description: `ID: ${author.id}`,
    showThumbnail: true,
    thumbnail: author.avatar_url
      ? { url: author.avatar_url } // Use avatar if it exists
      : { icon: cdxIconUserAvatar } // Use fallback icon otherwise
  }));
});

const filteredMenuItems = computed(() => {
  const selectedAuthor = menuItems.value.find(item => item.value === props.modelValue);
  // If the input text matches the selected author's name, show all authors
  if (selectedAuthor && selectedAuthor.label === inputText.value) {
    return menuItems.value;
  }

  // If there's no input text, show all authors
  if (!inputText.value) {
    return menuItems.value;
  }

  // Otherwise, filter authors based on the input text
  return menuItems.value.filter(item =>
    item.label.toLowerCase().includes(inputText.value.toLowerCase())
  );
});

function updateInputText(authorId) {
  if (authorId && allAuthors.value.length) {
    const author = allAuthors.value.find(a => a.id === authorId);
    inputText.value = author ? (author.full_name || 'Άγνωστος Χρήστης') : '';
  } else {
    inputText.value = '';
  }
}

watch(() => props.modelValue, (newId) => {
  updateInputText(newId);
});

watch(allAuthors, () => {
  updateInputText(props.modelValue);
});

function onKeydown(e) {
  // Let the space key pass through for typing
  if (e.key === ' ' ) {
    return;
  }
  // Delegate other key events to the menu for navigation
  if (menu.value) {
    menu.value.delegateKeyNavigation(e);
  }
}

function onClick() {
  expanded.value = true;
}

function onBlur() {
  // Use a timeout to allow for a selection to be made before the menu closes
  setTimeout(() => {
    expanded.value = false;
    // If the user clicks away without selecting, reset to the current author's name
    updateInputText(props.modelValue);
  }, 200);
}

</script>

<style scoped>
.author-selector {
	position: relative;
}
</style>
