<template>
  <SEOMeta />
  <Container>
    <div class="admin-dashboard">
      <h1>Πίνακας Ελέγχoυ</h1>
      <cdx-tabs v-model:active="activeTab">
        <cdx-tab name="posts" label="Διαχείριση Άρθρων">
          <div class="tab-content">
            <Articles />
          </div>
        </cdx-tab>
        
        <cdx-tab name="links" label="Σύνδεσμοι">
          <div class="tab-content">
            <Links />
          </div>
        </cdx-tab>
        
        <cdx-tab name="users" label="Διαχείριση Χρηστών">
          <div class="tab-content">
            <Users />
          </div>
        </cdx-tab>
        
        <cdx-tab name="comments" label="Διαχείριση Σχολίων">
          <div class="tab-content">
            <Comments />
          </div>
        </cdx-tab>
        
        <cdx-tab name="tags" label="Διαχείριση Ετικετών">
          <div class="tab-content">
            <Tags />
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
import Links from './Links.vue';
import Tags from './Tags.vue';
import SEOMeta from '../../components/SEOMeta.vue';

const activeTab = ref('posts');
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