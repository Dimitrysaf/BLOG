<template>
  <div>
    <div class="blue-banner">
      <Container>
        <img src="/src/assets/Coat_of_arms_of_Greece.svg" alt="Coat of Arms of Greece" class="banner-logo" />
        <h1 class="banner-title">Η Ομοσ­πονδιακή Πύλη για την <span class="highlight">Ελλάδα</span></h1>
        <HomeSearch />
      </Container>
    </div>
    <NowOnGov />
  </div>
</template>

<script setup lang="ts">
import Container from '../components/Container.vue';
import HomeSearch from '../components/HomeSearch.vue';
import NowOnGov from '../components/NowOnGov.vue';
</script>

<style scoped>
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

.banner-logo {
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}

.banner-title {
  font-family: inherit;
  font-size: xxx-large;
  font-weight: normal;
  line-height: xxx-large;
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
