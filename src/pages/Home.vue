<template>
    <div class="home-page-wrapper">
        <div class="blue-banner">
        <Container>
            <h1 class="banner-title">Το Ιστολόγιο του <span class="highlight">Δημήτρη</span></h1>
        </Container>
        </div>
        <div class="main-content-area">
            <Container class="content-container">
                <Posts />
            </Container>
        </div>
    </div>
</template>

<script setup lang="ts">
import Container from '../components/Container.vue';
import Posts from '../components/Posts.vue';
</script>

<style scoped>
.home-page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px); /* Adjust 60px based on your header's height */
}

.main-content-area {
  padding-top: 24px;
  padding-bottom: 24px;
  flex-grow: 1;
}

.content-container {
  background-color: white;
  padding-top: 24px; /* Add some padding inside the white box */
  padding-bottom: 24px;
}

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
}

.banner-logo {
  width: 150px;
  height: 150px;
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