<!-- src/components/SEOMeta.vue -->
<script setup>
import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import StructuredData from './StructuredData.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'public/bradning.png'
  },
  type: {
    type: String,
    default: 'website'
  },
  author: {
    type: String,
    default: 'Δημήτρης Μηλιάτης'
  },
  publishedTime: {
    type: String,
    default: null
  },
  modifiedTime: {
    type: String,
    default: null
  }
})

const fullTitle = computed(() => 
  props.title === 'Το Ιστολόγιο του Δημήτρη' 
    ? props.title 
    : `${props.title} | Το Ιστολόγιο του Δημήτρη`
)

const fullUrl = computed(() => {
  if (typeof window === 'undefined') return 'https://dimblog.vercel.app'
  return `https://dimblog.vercel.app${window.location.pathname}`
})

const fullImageUrl = computed(() => {
  if (props.image.startsWith('http')) return props.image
  return `https://dimblog.vercel.app${props.image}`
})

const metaTags = computed(() => {
  const tags = [
    // Basic Meta Tags
    { name: 'description', content: props.description },
    { name: 'author', content: props.author },
    { name: 'robots', content: 'index, follow, max-image-preview:large' },
    { name: 'googlebot', content: 'index, follow' },
    
    // Open Graph
    { property: 'og:title', content: fullTitle.value },
    { property: 'og:description', content: props.description },
    { property: 'og:image', content: fullImageUrl.value },
    { property: 'og:url', content: fullUrl.value },
    { property: 'og:type', content: props.type },
    { property: 'og:site_name', content: 'Το Ιστολόγ-ιο του Δημήτρη' },
    { property: 'og:locale', content: 'el_GR' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle.value },
    { name: 'twitter:description', content: props.description },
    { name: 'twitter:image', content: fullImageUrl.value },
  ]

  // Add article-specific tags
  if (props.type === 'article') {
    tags.push({ property: 'og:type', content: 'article' })
    if (props.publishedTime) {
      tags.push({ property: 'article:published_time', content: props.publishedTime })
    }
    if (props.modifiedTime) {
      tags.push({ property: 'article:modified_time', content: props.modifiedTime })
    }
    tags.push({ property: 'article:author', content: props.author })
  }

  return tags
})

useHead({
  title: fullTitle.value,
  meta: metaTags.value,
  link: [
    { rel: 'canonical', href: fullUrl.value }
  ],
  htmlAttrs: {
    lang: 'el'
  }
})
</script>

<template>
  <StructuredData
    v-if="type === 'article'"
    type="Article"
    :title="title"
    :description="description"
    :image="fullImageUrl"
    :author="author"
    :publishedTime="publishedTime"
    :url="fullUrl"
  />
</template>
