<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { federationData, type FederationDataItem } from '../composables/federationData.ts';
import Offices from '../components/Offices.vue';
import Breadcrumbs from '../components/Breadcrumbs.vue';

const route = useRoute();
const loading = ref(true);
const ministry = ref<FederationDataItem | null>(null);

const breadcrumbItems = computed(() => {
  if (ministry.value) {
    return [
      { text: 'Αρχική', link: '/' },
      { text: 'Ομοσπονδία', link: '/#federation' },
      { text: ministry.value.title, link: '' } // Current page
    ];
  }
  return [];
});

const loadMinistryData = () => {
  loading.value = true;
  ministry.value = null;
  const path = `/${route.params.ministry_name}`;
  // Simulate network delay for fetching data and assets
  setTimeout(() => {
    ministry.value = federationData.find(item => item.link === path) || null;
    loading.value = false;
  }, 500); // 500ms delay to show loading
};

watch(() => route.params.ministry_name, () => {
  loadMinistryData();
}, { immediate: true });

</script>

<template>
  <div class="loading-container" v-if="loading">
    <div class="spinner"></div>
  </div>

  <template v-else-if="ministry">
    <div class="blue-banner">
        <img v-if="ministry.thumbnail" :src="ministry.thumbnail" :alt="ministry.title" class="banner-thumbnail" />
        <h1 class="banner-title" v-html="ministry.title"></h1>
        <h2 class="banner-desc" v-html="ministry.description"></h2>
    </div>

    <Breadcrumbs v-if="breadcrumbItems.length" :items="breadcrumbItems" />

    <div v-if="ministry.offices.length > 0">
      <Offices :offices="ministry.offices" />
    </div>
  </template>
</template>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.blue-banner {
  background-color: #36c;
  border-bottom: 4px solid rgba(0, 0, 0, 0.096);
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}

.banner-thumbnail {
  width: 150px;
  height: 150px;
}

.banner-title {
  font-family: inherit;
  font-size: xxx-large;
  font-weight: normal;
  line-height: xxx-large;
  color: white;
  margin-bottom: 20px;
}

.banner-desc {
  font-family: inherit;
  font-size: x-large;
  font-weight: normal;
  line-height: x-large;
  color: #dadde3;
  margin-bottom: 20px;
}
</style>
