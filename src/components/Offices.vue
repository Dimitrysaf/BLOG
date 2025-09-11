<template>
  <div>
    <Container>
      <div class="header">
        <h1>Γραφεία & Υπηρεσίες</h1>
      </div>
      <div class="card-grid">
        <Card
          v-for="office in offices"
          :key="office.id"
          :url="office.link"
        >
          <template #title><span v-html="office.title"></span></template>
          <template #description><span v-html="office.description"></span></template>
          <template #supporting-text><span v-html="office.supportingText"></span></template>
        </Card>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from './Container.vue';
import Card from './Card.vue';
import Staff from './Staff.vue';
import type { PropType } from 'vue';
import type { Staff as StaffType } from '../composables/federationData';

interface Office {
  id: number;
  title: string;
  description: string;
  supportingText: string;
  link: string;
  staff: StaffType[];
}

defineProps({
  offices: {
    type: Array as PropType<Office[]>,
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
  border-bottom: 1px solid #c8ccd1; /* base70 */
}

h1::before {
  margin-right: 16px;
}

h1::after {
  margin-left: 16px;
}

.office-section {
    margin-bottom: 48px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}
</style>
