<!-- src/components/SEOMeta.vue -->
<script setup>
import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import StructuredData from './StructuredData.vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
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

const route = useRoute()

// Use prop if available, otherwise fall back to route meta
const finalTitle = computed(() => props.title || route.meta.title || 'Το Ιστολόγιο του Δημήτρη')
const finalDescription = computed(() => props.description || route.meta.description || 'Ένα ιστολόγιο για την τεχνολογία, τον προγραμματισμό και άλλα ενδιαφέροντα.')

const fullTitle = computed(() => 
  finalTitle.value === 'Το Ιστολόγιο του Δημήτρη' 
    ? finalTitle.value 
    : `${finalTitle.value} | Το Ιστολόγιο του Δημήτρη`
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
  const robotsContent = route.meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
  const googlebotContent = route.meta.noindex ? 'noindex, nofollow' : 'index, follow';

  const tags = [
    // Basic Meta Tags
    { name: 'description', content: finalDescription.value },
    { name: 'author', content: props.author },
    { name: 'robots', content: robotsContent },
    { name: 'googlebot', content: googlebotContent },
    
    // Open Graph
    { property: 'og:title', content: fullTitle.value },
    { property: 'og:description', content: finalDescription.value },
    { property: 'og:image', content: fullImageUrl.value },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: finalDescription.value },
    { property: 'og:url', content: fullUrl.value },
    { property: 'og:type', content: props.type },
    { property: 'og:site_name', content: 'Το Ιστολόγιο του Δημήτρη' },
    { property: 'og:locale', content: 'el_GR' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@dimitris_miliatis' },
    { name: 'twitter:creator', content: '@dimitris_miliatis' },
    { name: 'twitter:title', content: fullTitle.value },
    { name: 'twitter:description', content: finalDescription.value },
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
    :title="finalTitle"
    :description="finalDescription"
    :image="fullImageUrl"
    :author="author"
    :publishedTime="publishedTime"
    :url="fullUrl"
  />
</template>
