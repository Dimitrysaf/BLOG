<template>
  <Container>
    <div class="contact-container">
      <h1>Επικοινωνία</h1>

      <!-- Personal Contact Details -->
      <div class="details">
        <cdx-image
            src="https://lh3.googleusercontent.com/a/ACg8ocIN-WOKt6V8kgmdYPcYcCqeadQDwR3Ron1Y9Gn1bQDqZrFl1_nW=s288-c-no"
            alt="Demetris Meliates"
            aspect-ratio="1:1"
            class="contact-image"
          />
        <div class="info">
          <h2>Δημήτρης Μηλιάτης</h2>
          <p>Για οποιεσδήποτε ερωτήσεις, σχόλια ή ανησυχίες, μη διστάσετε να επικοινωνήσετε μαζί μου.</p>
          <a href="mailto:demetresmeliates+contact@gmail.com" class="email-link">demetresmeliates+contact@gmail.com</a>
        </div>
      </div>

      <!-- Purpose Section -->
      <div class="details secondary-section">
        <cdx-image
            src="/bradning.png"
            alt="Blog Logo"
            aspect-ratio="1:1"
            class="contact-image"
          />
        <div class="info">
          <h2>Σκοπός</h2>
          <p>
            Σε αυτόν τον χώρο, η συζήτηση εκτείνεται σε ένα ευρύ φάσμα θεμάτων. Από τις τρέχουσες πολιτικές εξελίξεις στην Ελλάδα και τον κόσμο, μέχρι τις αναλύσεις και σχολιασμό εξωτερικής πολιτικής και νομικών ζητημάτων. Παράλληλα, το ιστολόγιο ασχολείται με τις τεχνολογίες, τον προγραμματισμό, τα λειτουργικά συστήματα και τις νέες τεχνολογικές τάσεις που δημιουργούνται μέρα με την μέρα.
          </p>
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

.secondary-section {
  margin-top: 2.5rem; /* Adds space between the sections */
}

.contact-image {
  width: 128px;
  flex-shrink: 0;
  background-color: #353D47;
}

.info {
  overflow-wrap: break-word;
  word-break: break-word;
}

.info h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.info p {
  margin: 0 0 1rem 0;
  color: #555;
  line-height: 1.6;
}

.email-link {
  color: #36c;
  text-decoration: none;
  font-weight: bold;
}

.email-link:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .details {
    flex-direction: column;
  }
}
</style>
