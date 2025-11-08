<template>
  <footer class="footer">
    <Container>
      <div class="footer-content">
        <p class="footer-text">&copy; 2025 Το Ιστολόγιο του Δημήτρη</p>
        <ul class="footer-links">
          <li><router-link to="/privacy-policy" class="footer-link">Πολιτικές απορρήτου</router-link></li>
          <li><router-link to="/contact" class="footer-link">Επικοινωνία</router-link></li>
          <li><a href="https://github.com/Dimitrysaf/BLOG" target="_blank" class="footer-link">Πηγαίος Κώδικας</a></li>
        </ul>
      </div>
    </Container>
  </footer>
</template>

<script setup>
import Container from './Container.vue';
</script>

<style scoped>
.footer {
  background-color: #f8f9fa; 
  margin-top: 2rem; 
  padding: 0.5rem 0; 
  border-top: 1.714px solid #c8ccd1; 
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
