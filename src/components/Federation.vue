<template>
  <div>
    <Container>
      <div class="header">
        <h1>Ομοσπονδία</h1>
      </div>
      <div class="card-grid">
        <Card
          v-for="item in federationData"
          :key="item.id"
          :url="item.link"
          :thumbnail="{ src: item.thumbnail, alt: item.title }"
          :force-thumbnail="true"
        >
          <template #title><span v-html="item.title"></span></template>
          <template #description><span v-html="item.description"></span></template>
          <template #supporting-text><span v-html="item.supportingText"></span></template>
        </Card>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from './Container.vue';
import Card from './Card.vue';
import { federationData } from '../composables/federationData.ts';
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 24px; /* Add some space below the header */
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
  border-bottom: 1px solid #c8ccd1; /* base70 */
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
</style>
