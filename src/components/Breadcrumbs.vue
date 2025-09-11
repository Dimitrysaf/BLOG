<template>
  <div class="breadcrumbs-container">
    <Container>
      <nav class="breadcrumbs">
        <ul>
          <li v-for="(item, index) in items" :key="index">
            <router-link v-if="index < items.length - 1" :to="item.link">{{ item.text }}</router-link>
            <span v-else>{{ item.text }}</span>
            <span v-if="index < items.length - 1" class="separator">&gt;</span>
          </li>
        </ul>
      </nav>
    </Container>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import Container from './Container.vue';

interface BreadcrumbItem {
  text: string;
  link: string;
}

defineProps({
  items: {
    type: Array as PropType<BreadcrumbItem[]>,
    required: true,
  },
});
</script>

<style scoped>
.breadcrumbs-container {
  padding: 12px 0;
  border-bottom: 1px solid #eaecf0;
  background-color: #f8f9fa;
  font-size: 14px;
}
.breadcrumbs ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;
}
.breadcrumbs li {
  display: flex;
  align-items: center;
}
.breadcrumbs .separator {
  margin: 0 8px;
  color: #54595d;
}
.breadcrumbs a {
  text-decoration: none;
  color: #36c;
}
.breadcrumbs a:hover {
  text-decoration: underline;
}
.breadcrumbs span {
  color: #1d2124;
}
</style>
