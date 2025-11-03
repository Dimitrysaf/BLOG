<template>
  <div>
    <div class="blue-banner">
      <Container>
        <h1 class="banner-title">Το Ιστολόγιο του <span class="highlight">Δημήτρη</span></h1>
      </Container>
    </div>
    <Container>
      <Posts />
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from '../components/Container.vue';
import Posts from '../components/Posts.vue';
</script>

<style scoped>
.blue-banner {
  background-color: #36c;
  border-bottom: 4px solid rgba(0, 0, 0, 0.096);
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  margin-bottom: 24px;
}

.banner-title {
  font-family: inherit;
  font-size: xx-large;
  font-weight: normal;
  line-height: xx-large;
  color: white;
  margin-bottom: 20px;
}

.banner-title .highlight {
  font-family: 'Times New Roman', Times, serif;
  background-color: white;
  color: #36c;
  font-style: italic;
  text-decoration: underline;
  padding: 0 8px;
}
</style>
