<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  title: String,
  description: String,
  image: String,
  author: String,
  publishedTime: String,
  url: String
});

const jsonLd = computed(() => {
  if (props.type === 'Article') {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
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
    };
  }

  if (props.type === 'WebSite') {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Το Ιστολόγιο του Δημήτρη",
      "url": "https://dimblog.vercel.app",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://dimblog.vercel.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };
  }

  return {};
});
</script>

<template>
  <component :is="'script'" type="application/ld+json">
    {{ JSON.stringify(jsonLd) }}
  </component>
</template>
