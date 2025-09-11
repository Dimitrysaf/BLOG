<template>
  <div>
    <Container>
      <div class="header">
        <h1>Μέλη</h1>
      </div>
      <div class="card-grid">
        <Card
          v-for="person in staff"
          :key="person.id"
          :url="person.link"
          :thumbnail="{ src: person.image }"
          force-thumbnail
        >
          <template #title><span v-html="person.name"></span></template>
          <template #description><span v-html="person.title"></span></template>
        </Card>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from './Container.vue';
import Card from './Card.vue';
import type { PropType } from 'vue';
import type { Staff } from '../composables/federationData';

defineProps({
  staff: {
    type: Array as PropType<Staff[]>,
    required: true,
  },
});
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 24px;
}

h1 {
  display: flex;
  align-items: center;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 2em;
}

h1::before,
h1::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #c8ccd1; 
}

h1::before {
  margin-right: 16px;
}

h1::after {
  margin-left: 16px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

:deep(.cdx-card) {
  flex-direction: column;
}

:deep(.cdx-card__thumbnail) {
    width: 100%;
    margin-inline-end: 0;
    margin-block-end: 16px;
}

:deep(.cdx-card__thumbnail.cdx-thumbnail .cdx-thumbnail__image),
:deep(.cdx-card__thumbnail.cdx-thumbnail .cdx-thumbnail__placeholder) {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
