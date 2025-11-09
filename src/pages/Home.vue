<template>
  <div>
    <SEOMeta
      title="Το Ιστολόγιο του Δημήτρη"
      description="Ένα blog για πολιτική, τεχνολογία, προγραμματισμό και τρέχοντα θέματα. Αναλύσεις, σχόλια και προβληματισμοί από τον Δημήτρη Μηλιάτη."
      image="/bradning.png"
      type="website"
    />
    
    <div class="blue-banner">
      <Container>
        <h1 class="banner-title">Το Ιστολόγιο του <span class="highlight">Δημήτρη</span></h1>
        <p class="banner-description">Καλώς ήρθατε στο Ιστολόγιό μου όπου μοιράζομαι τις σκέψεις μου για την πολιτική, την τεχνολογία, τον προγραμματισμό και τα τρέχοντα γεγονότα ή παντελώς άσχετα πράγματα. Ανάλυση, σχολιασμός και προβληματισμοί από μένα Δημήτρη Μηλιάτη.</p>
      </Container>
    </div>
    <Container>
      <Posts />
    </Container>
  </div>
</template>

<script setup>
import Container from '../components/Container.vue'
import Posts from '../components/Posts.vue'
import SEOMeta from '../components/SEOMeta.vue'
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

.banner-description {
  color: white;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}
</style>