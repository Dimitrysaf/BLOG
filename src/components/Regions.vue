<template>
  <div>
    <Container>
      <div class="header">
        <h1>Περιφέρειες</h1>
      </div>
      <GreeceMap @region-hover="handleRegionHover" />
      <div class="card-grid">
        <!-- Cards will be added here -->
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Container from './Container.vue';
import GreeceMap from './GreeceMap.vue';

const hoveredRegion = ref<string | null>(null);

function handleRegionHover(regionName: string | null) {
  hoveredRegion.value = regionName;
}
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
  margin-top: 24px;
}
</style>
