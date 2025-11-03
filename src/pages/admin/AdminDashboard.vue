<template>
  <Container>
    <div class="admin-dashboard">
      <h1>Πίνακας Ελέγχoυ</h1>
      <cdx-tabs v-model="activeTab">
        <cdx-tab
          v-for="tab in tabsData"
          :key="tab.name"
          :name="tab.name"
          :label="tab.label"
          :disabled="tab.disabled"
        >
          <div v-if="tab.name === 'links'" class="tab-content">
            <Links />
          </div>
          <div v-else-if="tab.name === 'posts'" class="tab-content">
            <Articles />
          </div>
          <div v-else-if="tab.name === 'users'" class="tab-content">
            <Users />
          </div>
          <div v-else-if="tab.name === 'comments'" class="tab-content">
            <Comments />
          </div>
          <div v-else-if="tab.name === 'tags'" class="tab-content">
            <Tags />
          </div>
        </cdx-tab>
      </cdx-tabs>
    </div>
  </Container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CdxTabs, CdxTab } from '@wikimedia/codex';
import Container from '../../components/Container.vue';
import Articles from './Articles.vue';
import Users from './Users.vue';
import Comments from './Comments.vue';
import Links from './Links.vue';
import Tags from './Tags.vue';

const route = useRoute();
const router = useRouter();

const tabsData = ref([
  {
    name: 'links',
    label: 'Σύνδεσμοι',
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
  },
  {
    name: 'tags',
    label: 'Διαχείριση Ετικετών',
  }
]);

const defaultTab = tabsData.value[0].name;

const activeTab = computed({
  get() {
    const hash = route.hash.substring(1);
    return tabsData.value.some(tab => tab.name === hash) ? hash : defaultTab;
  },
  set(newTabName) {
    if (route.hash !== `#${newTabName}`) {
      router.push({ hash: `#${newTabName}` });
    }
  }
});

// On initial load, if there's no valid hash, set one.
onMounted(() => {
  if (!route.hash || !tabsData.value.some(tab => tab.name === route.hash.substring(1))) {
    router.replace({ hash: `#${defaultTab}` });
  }
});
</script>

<style scoped>

h1 {
  margin-bottom: 20px;
}

.tab-content {
  padding: 80px 20px 20px; /* Adjusted for a 60px top gap */
  background-color: #fff; /* Ensure content area has a background */
}
</style>
