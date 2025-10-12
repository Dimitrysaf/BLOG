<template>
  <Container>
    <div class="admin-dashboard">
      <h1>Πίνακας Ελέγχου</h1>
      <cdx-tabs :framed="true">
        <cdx-tab
          v-for="(tab, index) in tabsData"
          :key="index"
          :name="tab.name"
          :label="tab.label"
          :disabled="tab.disabled"
        >
          <!-- This is where the content for each tab will go -->
          <!-- For now, we'll just show a placeholder -->
          <div class="tab-content">
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
    name: 'settings',
    label: 'Ρυθμίσεις',
    disabled: true,
  },
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
  padding: 20px;
  /* The border is now handled by the framed tab-panel */
}
</style>
