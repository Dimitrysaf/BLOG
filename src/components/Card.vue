<template>
  <cdx-card
    :url="url"
    :thumbnail="codexCardThumbnail"
    :force-thumbnail="forceThumbnail"
  >
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #description>
      <slot name="description"></slot>
    </template>
    <template #supporting-text>
      <slot name="supporting-text"></slot>
    </template>
  </cdx-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CdxCard } from '@wikimedia/codex';

interface CodexThumbnail {
  url: string;
}

interface Props {
  url?: string;
  thumbnail?: { src: string; alt?: string } | null;
  forceThumbnail?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  url: '',
  thumbnail: null,
  forceThumbnail: false
});

const codexCardThumbnail = computed((): CodexThumbnail | null => {
  if (props.thumbnail && props.thumbnail.src) {
    return { url: props.thumbnail.src };
  }
  return null;
});
</script>

<style scoped>
:deep(.cdx-card--is-link:hover) {
  background-color: #f8f9fa;
}

:deep(.cdx-card--is-link:active) {
  background-color: #eaecf0; 
}
</style>