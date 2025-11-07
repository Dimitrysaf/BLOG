<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'Article'
  },
  title: String,
  description: String,
  image: String,
  author: String,
  publishedTime: String,
  url: String
});

const jsonLd = computed(() => ({
  "@context": "https://schema.org",
  "@type": props.type,
  "headline": props.title,
  "description": props.description,
  "image": props.image,
  "author": {
    "@type": "Person",
    "name": props.author
  },
  "datePublished": props.publishedTime,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": props.url
  }
}));
</script>

<template>
  <component :is="'script'" type="application/ld+json">
    {{ JSON.stringify(jsonLd) }}
  </component>
</template>
