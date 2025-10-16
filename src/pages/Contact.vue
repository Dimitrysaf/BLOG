<template>
  <Container>
    <div class="contact-container">
      <h1>Επικοινωνία</h1>
      <div class="details">
        <cdx-image
            src="https://lh3.googleusercontent.com/a/ACg8ocIN-WOKt6V8kgmdYPcYcCqeadQDwR3Ron1Y9Gn1bQDqZrFl1_nW=s288-c-no"
            alt="Demetris Meliates"
            aspect-ratio="1:1"
            class="profile-image"
          />
        <div class="info">
          <h2>Δημήτρης Μηλιάτης</h2>
          <p>Για οποιεσδήποτε ερωτήσεις, σχόλια ή ανησυχίες, μη διστάσετε να επικοινωνήσετε μαζί μου.</p>
          <a href="mailto:demetresmeliates+contact@gmail.com" class="email-link">demetresmeliates+contact@gmail.com</a>
        </div>
      </div>
    </div>
  </Container>
</template>

<script setup>
import Container from '../components/Container.vue';
import { CdxImage } from '@wikimedia/codex';
</script>

<style scoped>
.details {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.profile-image {
  width: 128px;
  flex-shrink: 0;
}

.info h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.info p {
  margin: 0 0 1rem 0;
  color: #555;
}

.email-link {
  color: #36c;
  text-decoration: none;
  font-weight: bold;
}

.email-link:hover {
  text-decoration: underline;
}
</style>
