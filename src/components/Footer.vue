<template>
  <footer class="footer">
    <Container>
      <div class="footer-content">
        <p class="footer-text">&copy; 2025 Η Ελληνική Συνομοσπονδία</p>
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
  background-color: #f8f9fa; /* A light gray background */
  margin-top: 2rem; /* Add space above the footer */
  padding: 0.5rem 0; /* Make footer a lot smaller */
  border-top: 1px solid #e9ecef; /* A slightly darker border */
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* Allow content to wrap on smaller screens */
  gap: 0.5rem; /* Reduce gap */
}

.footer-text {
  color: #54595d; /* A dark gray for text */
  font-family: sans-serif;
  font-size: 0.75em; /* Make text a lot smaller */
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap; /* Allow links to wrap */
  gap: 1rem; /* Reduce gap */
}

.footer-link {
  color: #36c; /* A standard blue for links */
  text-decoration: none;
  font-family: sans-serif;
  font-size: 0.75em; /* Make text a lot smaller */
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
