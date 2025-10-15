<template>
  <Container>
    <div class="admin-dashboard">
      <h1>Πίνακας Ελέγχου</h1>
      <cdx-tabs>
        <cdx-tab
          v-for="(tab, index) in tabsData"
          :key="index"
          :name="tab.name"
          :label="tab.label"
          :disabled="tab.disabled"
        >
          <div v-if="tab.name === 'posts'" class="tab-content">
            <Articles />
          </div>
          <div v-else-if="tab.name === 'users'" class="tab-content">
            <Users />
          </div>
          <div v-else-if="tab.name === 'comments'" class="tab-content">
            <Comments />
          </div>
          <div v-else class="tab-content">
            <h2>{{ tab.label }}</h2>
            <p>Περιεχόμενο για τη σελίδα "{{ tab.label }}".</p>
          </div>
        </cdx-tab>
      </cdx-tabs>
    </div>
  </Container>
</template>

<script setup>
import { ref } from 'vue';
import { CdxTabs, CdxTab } from '@wikimedia/codex';
import Container from '../../components/Container.vue';
import Articles from './Articles.vue';
import Users from './Users.vue';
import Comments from './Comments.vue';

const tabsData = ref([
  {
    name: 'dashboard',
    label: 'Dashboard',
  },
  {
    name: 'users',
    label: 'Διαχείριση Χρηστών',
  },
  {
    name: 'posts',
    label: 'Διαχείριση Άρθρων',
  },
  {
    name: 'comments',
    label: 'Διαχείριση Σχολίων',
  }
]);

</script>

<style scoped>
.admin-dashboard {
  /* The main container now provides the horizontal padding */
}

h1 {
  margin-bottom: 20px;
}

.tab-content {
  padding: 80px 20px 20px; /* Adjusted for a 60px top gap */
  background-color: #fff; /* Ensure content area has a background */
}
</style>
