<template>
  <footer class="footer">
    <Container>
      <div class="footer-content">
        <p class="footer-text">&copy; 2025 Το Ιστολόγιο του Δημήτρη</p>
        <ul class="footer-links">
          <li><a href="#" class="footer-link">Πολιτικές απορύτου</a></li>
          <li><a href="#" class="footer-link">Όροι χρήσης</a></li>
          <li><a href="#" class="footer-link">Επικοινωνία</a></li>
        </ul>
      </div>
    </Container>
  </footer>
</template>

<script setup lang="ts">
import Container from './Container.vue';
</script>

<style scoped>
.footer {
  background-color: #f8f9fa; 
  margin-top: 2rem; 
  padding: 0.5rem 0; 
  border-top: 1px solid #e9ecef; 
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; 
  gap: 0.5rem; 
}

.footer-text {
  color: #54595d; 
  font-family: sans-serif;
  font-size: 0.75em; 
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap; 
  gap: 1rem; 
}

.footer-link {
  color: #36c;
  text-decoration: none;
  font-family: sans-serif;
  font-size: 0.75em;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
