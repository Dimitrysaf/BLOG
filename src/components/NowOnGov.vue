<template>
  <div>
    <Container>
      <div class="header">
        <h1>Τώρα στο Gov</h1>
        <p class="sub-header">
          Μήνας: <span class="month">{{ currentMonth }}</span>
        </p>
      </div>
      <div class="card-grid">
        <Card v-for="item in monthlyData" :key="item.id" :url="item.link">
          <template #title>{{ item.title }}</template>
          <template #description>{{ item.description }}</template>
          <template #supporting-text>{{ item.supportingText }}</template>
        </Card>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Container from './Container.vue';
import Card from './Card.vue';
import { nowOnGovData } from '../composables/nowOnGovData.ts';

const greekMonths = [
  'Ιανουάριος',
  'Φεβρουάριος',
  'Μάρτιος',
  'Απρίλιος',
  'Μάιος',
  'Ιούνιος',
  'Ιούλιος',
  'Αύγουστος',
  'Σεπτέμβριος',
  'Οκτώβριος',
  'Νοέμβριος',
  'Δεκέμβριος',
];

// Get the current date in the Athens timezone to avoid issues with VPNs or different user timezones.
const athensDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Athens' }));
const currentMonth = ref(greekMonths[athensDate.getMonth()]);

const monthlyData = computed(() => {
  const month = currentMonth.value.toLowerCase();
  return nowOnGovData.filter((item) =>
    item.months.some((m) => m.toLowerCase() === month)
  );
});
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

.sub-header {
  font-family: sans-serif;
  font-size: 1.0em;
  margin-top: -23px;
  color: #54595d;
}

.month {
  font-size: 1.2em;
  color: #3366cc;
  font-family: 'Times New Roman', Times, serif;
  font-style: italic;
  font-weight: lighter;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}
</style>
