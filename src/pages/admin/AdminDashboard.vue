<template>
  <Container>
    <div class="admin-dashboard">
      <h1>Πίνακας Ελέγχoυ</h1>
      <cdx-tabs v-model:active="activeTab">
        <cdx-tab name="links" label="Σύνδεσμοι">
          <div class="tab-content">
            <Links v-if="visitedTabs.has('links')" v-show="activeTab === 'links'" />
          </div>
        </cdx-tab>
        
        <cdx-tab name="users" label="Διαχείριση Χρηστών">
          <div class="tab-content">
            <Users v-if="visitedTabs.has('users')" v-show="activeTab === 'users'" />
          </div>
        </cdx-tab>
        
        <cdx-tab name="posts" label="Διαχείριση Άρθρων">
          <div class="tab-content">
            <Articles v-if="visitedTabs.has('posts')" v-show="activeTab === 'posts'" />
          </div>
        </cdx-tab>
        
        <cdx-tab name="comments" label="Διαχείριση Σχολίων">
          <div class="tab-content">
            <Comments v-if="visitedTabs.has('comments')" v-show="activeTab === 'comments'" />
          </div>
        </cdx-tab>
        
        <cdx-tab name="tags" label="Διαχείριση Ετικετών">
          <div class="tab-content">
            <Tags v-if="visitedTabs.has('tags')" v-show="activeTab === 'tags'" />
          </div>
        </cdx-tab>
      </cdx-tabs>
    </div>
  </Container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
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

const defaultTab = 'links';
const activeTab = ref(defaultTab);
const visitedTabs = ref(new Set([defaultTab]));

const syncTabFromHash = () => {
  const hash = route.hash.substring(1);
  const validTabs = ['links', 'users', 'posts', 'comments', 'tags'];
  
  if (hash && validTabs.includes(hash)) {
    activeTab.value = hash;
    visitedTabs.value.add(hash);
  } else {
    activeTab.value = defaultTab;
    router.replace({ hash: `#${defaultTab}` });
  }
};

watch(activeTab, (newTab) => {
  visitedTabs.value.add(newTab);
  if (route.hash !== `#${newTab}`) {
    router.push({ hash: `#${newTab}` });
  }
});

watch(() => route.hash, () => {
  syncTabFromHash();
});

onMounted(() => {
  syncTabFromHash();
});
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}

.tab-content {
  padding: 80px 20px 20px;
  background-color: #fff;
}
</style>